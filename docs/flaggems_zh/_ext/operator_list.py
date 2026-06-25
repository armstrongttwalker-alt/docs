# docs-sphinx/_ext/operator_list.py
"""
Sphinx directive to generate operator list table from conf/operators.yaml

Usage in MyST Markdown:
    ```{operator-list}
    :stage: stable
    ```

Options:
    :stage: Filter by stage (stable, beta, alpha)
    :kind: Filter by kind (Math, NeuralNetwork, etc.)
"""
from docutils import nodes
from docutils.parsers.rst import directives
from sphinx.util.docutils import SphinxDirective
from sphinx.application import Sphinx
import yaml
import json
import re
from pathlib import Path
from typing import List, Dict, Any


class OperatorListDirective(SphinxDirective):
    """Generate operator list table from YAML data."""

    has_content = False
    required_arguments = 0
    optional_arguments = 0

    option_spec = {
        'stage': directives.unchanged,
        'kind': directives.unchanged,
    }

    def run(self) -> List[nodes.Node]:
        """Generate the table."""
        yaml_path = Path(self.config.operator_yaml_path)

        if not yaml_path.exists():
            warning = nodes.warning(
                '',
                nodes.paragraph(
                    '',
                    f"Warning: operators.yaml not found at {yaml_path}"
                )
            )
            return [warning]

        # Load YAML data
        try:
            with open(yaml_path, 'r', encoding='utf-8') as f:
                data = yaml.safe_load(f)
        except Exception as e:
            error = nodes.error(
                '',
                nodes.paragraph('', f"Error loading operators.yaml: {e}")
            )
            return [error]

        ops = data.get('ops', [])

        # Apply filters
        stage_filter = self.options.get('stage')
        kind_filter = self.options.get('kind')

        if stage_filter:
            ops = [op for op in ops if self._has_stage(op, stage_filter)]
        if kind_filter:
            ops = [op for op in ops if kind_filter in op.get('kind', [])]

        if not ops:
            return [nodes.paragraph('', 'No operators found matching the criteria.')]

        # Prepare data for Tabulator
        table_data = []
        kind_values = set()
        stage_values = set()
        since_values = set()

        for idx, op in enumerate(ops, 1):
            stage = self._get_latest_stage(op)
            since = self._get_since_version(op)
            labels = op.get('labels', [])
            kind = op.get('kind', [])
            desc = op.get('description', '').strip()

            kind_str = ', '.join(kind)
            stage_str = stage.title() if stage != '-' else '-'

            kind_values.add(kind_str if kind_str else '-')
            stage_values.add(stage_str)
            since_values.add(since)

            table_data.append({
                'no': idx,
                'id': op.get('id', ''),
                'kind': kind_str if kind_str else '-',
                'stage': stage_str,
                'since': since,
                'labels': ', '.join(labels) if labels else '-',
                'description': desc,
            })

        # Build filter values dictionaries
        kind_filter_values = {"": "All"}
        for v in sorted(kind_values):
            kind_filter_values[v] = v

        stage_filter_values = {"": "All"}
        for v in sorted(stage_values):
            stage_filter_values[v] = v

        since_filter_values = {"": "All"}
        for v in sorted(since_values):
            since_filter_values[v] = v

        # Create container
        container = nodes.container()

        # Build HTML content
        html_parts = [
            '<button id="reset-filter-btn" style="margin-bottom: 10px; padding: 5px 15px; cursor: pointer;">Reset Filters</button>',
            '<div id="operator-table"></div>',
            '<script type="application/json" id="operator-data">' + json.dumps(table_data) + '</script>',
            '<script>',
            'document.addEventListener("DOMContentLoaded", function() {',
            '    var data = JSON.parse(document.getElementById("operator-data").textContent);',
            '    var table = new Tabulator("#operator-table", {',
            '        data: data,',
            '        layout: "fitColumns",',
            '        height: "70vh",',
            '        columns: [',
            '            {title: "No.", field: "no", sorter: "number", widthGrow: 1},',
            '            {title: "Name", field: "id", sorter: "string", headerFilter: "input", headerFilterPlaceholder: "Filter...", widthGrow: 2},',
            '            {title: "Kind", field: "kind", sorter: "string", headerFilter: "list", headerFilterParams: {values: ' + json.dumps(kind_filter_values) + '}, widthGrow: 2},',
            '            {title: "Stage", field: "stage", sorter: "string", headerFilter: "list", headerFilterParams: {values: ' + json.dumps(stage_filter_values) + '}, widthGrow: 1},',
            '            {title: "Since", field: "since", sorter: "string", headerFilter: "list", headerFilterParams: {values: ' + json.dumps(since_filter_values) + '}, widthGrow: 1},',
            '            {title: "Labels", field: "labels", sorter: "string", headerFilter: "input", headerFilterPlaceholder: "Filter...", widthGrow: 2},',
            '            {title: "Description", field: "description", sorter: "string", widthGrow: 4, tooltip: function(e, cell) {',
            '                var value = cell.getValue() || "";',
            '                var div = document.createElement("div");',
            '                div.style.whiteSpace = "pre-wrap";',
            '                div.style.maxWidth = "400px";',
            '                // Parse backticks as code',
            '                var parts = value.split("`");',
            '                for (var i = 0; i < parts.length; i++) {',
            '                    if (i % 2 === 0) {',
            '                        div.appendChild(document.createTextNode(parts[i]));',
            '                    } else {',
            '                        var code = document.createElement("code");',
            '                        code.style.backgroundColor = "#f0f0f0";',
            '                        code.style.padding = "1px 4px";',
            '                        code.style.borderRadius = "3px";',
            '                        code.style.fontFamily = "monospace";',
            '                        code.textContent = parts[i];',
            '                        div.appendChild(code);',
            '                    }',
            '                }',
            '                return div;',
            '            }, formatter: function(cell) {',
            '                var value = cell.getValue() || "";',
            '                var div = document.createElement("div");',
            '                div.style.whiteSpace = "nowrap";',
            '                div.style.overflow = "hidden";',
            '                div.style.textOverflow = "ellipsis";',
            '                // Parse backticks as code',
            '                var parts = value.split("`");',
            '                for (var i = 0; i < parts.length; i++) {',
            '                    if (i % 2 === 0) {',
            '                        div.appendChild(document.createTextNode(parts[i]));',
            '                    } else {',
            '                        var code = document.createElement("code");',
            '                        code.style.backgroundColor = "#f0f0f0";',
            '                        code.style.padding = "1px 4px";',
            '                        code.style.borderRadius = "3px";',
            '                        code.style.fontFamily = "monospace";',
            '                        code.textContent = parts[i];',
            '                        div.appendChild(code);',
            '                    }',
            '                }',
            '                return div;',
            '            }},',
            '        ],',
            '    });',
            '',
            '    // Reset button functionality',
            '    document.getElementById("reset-filter-btn").addEventListener("click", function() {',
            '        table.clearHeaderFilter();',
            '    });',
            '});',
            '</script>',
        ]

        html_node = nodes.raw('', '\n'.join(html_parts), format='html')
        container += html_node

        return [container]

    def _has_stage(self, op: Dict[str, Any], stage: str) -> bool:
        """Check if operator has the specified stage."""
        stages = op.get('stages', [])
        for s in stages:
            if stage.lower() in [k.lower() for k in s.keys()]:
                return True
        return False

    def _get_latest_stage(self, op: Dict[str, Any]) -> str:
        """Get the latest stage of an operator."""
        stages = op.get('stages', [])
        if not stages:
            return '-'
        last = stages[-1]
        for key in last.keys():
            return key
        return '-'

    def _get_since_version(self, op: Dict[str, Any]) -> str:
        """Get the version when the operator was introduced."""
        stages = op.get('stages', [])
        if not stages:
            return '-'
        last = stages[-1]
        for value in last.values():
            return str(value)
        return '-'


def setup(app: Sphinx) -> Dict[str, Any]:
    """Register the directive with Sphinx."""
    app.add_config_value('operator_yaml_path', '../conf/operators.yaml', 'html')
    app.add_directive('operator-list', OperatorListDirective)
    # Add Tabulator JS
    app.add_js_file('js/tabulator.min.js')

    return {
        'version': '1.0',
        'parallel_read_safe': True,
        'parallel_write_safe': True,
    }

#!/usr/bin/env python3
"""
Convert Hugo markdown files to MyST markdown for Sphinx.

Usage: python convert_hugo_to_myst.py
"""
import os
import re
from pathlib import Path


def convert_front_matter(content: str) -> str:
    """Remove Hugo front matter, keep only title if needed."""
    # Pattern to match Hugo front matter
    pattern = r'^---\n.*?---\n+'

    # Extract title from front matter
    title_match = re.search(r'^title:\s*(.+)$', content, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else None

    # Remove front matter
    content = re.sub(pattern, '', content, flags=re.DOTALL)

    return content


def convert_links(content: str) -> str:
    """Convert Hugo links to MyST links."""
    # Convert /FlagGems/path/ to ../path/ or ./path/
    # Internal links: /FlagGems/section/page/ -> ../page or page
    content = re.sub(
        r'\[([^\]]+)\]\(/FlagGems/([^)]+)/?\)',
        lambda m: f'[{m.group(1)}]({convert_path(m.group(2))})',
        content
    )

    # Convert image links
    content = re.sub(
        r'\[([^\]]*)\]\(/FlagGems/images/([^)]+)\)',
        r'[\1](_static/images/\2)',
        content
    )

    return content


def convert_path(hugo_path: str) -> str:
    """Convert Hugo path to relative path."""
    parts = hugo_path.strip('/').split('/')
    if len(parts) >= 2:
        # Remove the last part if it's an index
        if parts[-1] == parts[-2]:
            parts = parts[:-1]
        return '../' + '/'.join(parts[-2:]) if len(parts) >= 2 else './' + parts[-1]
    return './' + parts[-1] if parts else './'


def convert_shortcodes(content: str) -> str:
    """Convert Hugo shortcodes to MyST directives."""
    # operator-list
    content = re.sub(
        r'\{\{<\s*operator-list\s*>\}\}',
        '\n```{operator-list}\n```\n',
        content
    )

    # operator-list with options
    content = re.sub(
        r'\{\{<\s*operator-list\s+([^>]+)\s*>\}\}',
        lambda m: f'\n```{{operator-list}}\n:{m.group(1).strip()}\n```\n',
        content
    )

    # benchmark-table
    content = re.sub(
        r'\{\{<\s*benchmark-table\s*>\}\}',
        '\n```{benchmark-table}\n```\n',
        content
    )

    # coverage-data
    content = re.sub(
        r'\{\{<\s*coverage-data\s*>\}\}',
        '\n```{coverage-data}\n```\n',
        content
    )

    return content


def convert_callouts(content: str) -> str:
    """Convert Hugo callouts to MyST admonitions."""
    # {{% callout note %}} -> ```{note}
    content = re.sub(
        r'\{\{%\s*callout\s+(\w+)\s*%\}\}',
        lambda m: f'\n```{{{m.group(1)}}}\n',
        content
    )
    content = re.sub(
        r'\{\{%\s*/callout\s*%\}\}',
        '\n```\n',
        content
    )

    return content


def convert_file(filepath: Path) -> None:
    """Convert a single markdown file."""
    print(f"Converting: {filepath}")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Apply conversions
    content = convert_front_matter(content)
    content = convert_links(content)
    content = convert_shortcodes(content)
    content = convert_callouts(content)

    # Clean up multiple blank lines
    content = re.sub(r'\n{3,}', '\n\n', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)


def main():
    """Main conversion function."""
    source_dir = Path('source')

    # Find all markdown files
    md_files = list(source_dir.rglob('*.md'))

    print(f"Found {len(md_files)} markdown files to convert")

    for filepath in md_files:
        convert_file(filepath)

    print(f"Converted {len(md_files)} files")


if __name__ == '__main__':
    main()
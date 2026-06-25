#!/bin/bash
# build_docs.sh - Build FlagGems documentation

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo "Building FlagGems documentation..."

# Clean previous build
rm -rf _build

# Build HTML documentation
echo "Building HTML documentation..."
sphinx-build -b html . _build/html

echo ""
echo "Build complete!"
echo "Open _build/html/index.html in your browser to view the documentation."
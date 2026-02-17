#!/bin/bash

# Developer Environment Setup Script
# Automates the initial setup for new developers

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║    🚀 jlucus.dev Developer Environment Setup              ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Helper functions
print_step() {
  echo -e "${BLUE}▶ $1${NC}"
}

print_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
  echo -e "${RED}✗ $1${NC}"
}

# Check prerequisites
print_step "Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
  print_error "Node.js is not installed!"
  echo "Please install Node.js 18 or later from https://nodejs.org/"
  exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  print_error "Node.js version must be 18 or higher (current: $(node -v))"
  exit 1
fi
print_success "Node.js $(node -v) installed"

# Check npm
if ! command -v npm &> /dev/null; then
  print_error "npm is not installed!"
  exit 1
fi
print_success "npm $(npm -v) installed"

# Check Git
if ! command -v git &> /dev/null; then
  print_error "Git is not installed!"
  echo "Please install Git from https://git-scm.com/"
  exit 1
fi
print_success "Git $(git --version | cut -d' ' -f3) installed"

echo ""

# Install dependencies
print_step "Installing dependencies..."
npm install
print_success "Dependencies installed"

echo ""

# Set up environment file
print_step "Setting up environment variables..."
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  print_success "Created .env.local from .env.example"
  print_warning "Please update .env.local with your configuration"
else
  print_warning ".env.local already exists, skipping"
fi

echo ""

# Initialize Husky
print_step "Initializing Git hooks..."
npm run prepare
print_success "Git hooks configured"

echo ""

# Run type check
print_step "Running type check..."
npm run type-check
print_success "TypeScript checks passed"

echo ""

# Run linter
print_step "Running linter..."
npm run lint
print_success "Linting passed"

echo ""

# Optional: Run build
read -p "Do you want to run a test build? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  print_step "Running test build..."
  npm run build
  print_success "Build successful"
  echo ""
fi

# Summary
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║    ✅ Setup Complete!                                      ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Next steps:"
echo ""
echo "  1. Review and update .env.local with your configuration"
echo "  2. Start the development server:"
echo "     ${GREEN}npm run dev${NC}"
echo ""
echo "  3. Open http://localhost:3000 in your browser"
echo ""
echo "Useful commands:"
echo "  ${BLUE}npm run dev${NC}          - Start development server"
echo "  ${BLUE}npm run build${NC}        - Build for production"
echo "  ${BLUE}npm run lint${NC}         - Run linter"
echo "  ${BLUE}npm run lint:fix${NC}     - Fix linting errors"
echo "  ${BLUE}npm run format${NC}       - Format code with Prettier"
echo "  ${BLUE}npm run type-check${NC}   - Check TypeScript types"
echo ""
echo "📚 Documentation:"
echo "  - README.md         - Project overview"
echo "  - QUICKSTART.md     - Quick start guide"
echo "  - CONTRIBUTING.md   - Contribution guidelines"
echo "  - DEVELOPMENT.md    - Development guide"
echo ""
echo "Happy coding! 🚀"
echo ""

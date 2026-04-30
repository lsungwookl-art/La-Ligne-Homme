#!/bin/bash
set -e

CLAUDE_DIR="$HOME/.claude"
SKILLS_DIR="$CLAUDE_DIR/skills"
AGENTS_DIR="$CLAUDE_DIR/agents"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "  Claude Code Toolkit Installer"
echo "  =============================="
echo ""

# Create directories
mkdir -p "$SKILLS_DIR"
mkdir -p "$AGENTS_DIR"

# Install skills
echo "  [1/2] Installing skills..."
installed_skills=0
skipped_skills=0

for skill_dir in "$SCRIPT_DIR"/skills/*/; do
  skill_name=$(basename "$skill_dir")
  target="$SKILLS_DIR/$skill_name"

  if [ -d "$target" ]; then
    echo "    - $skill_name (skipped, already exists)"
    skipped_skills=$((skipped_skills + 1))
  else
    cp -R "$skill_dir" "$target"
    echo "    + $skill_name"
    installed_skills=$((installed_skills + 1))
  fi
done

# Install agents
echo ""
echo "  [2/2] Installing agents..."
installed_agents=0
skipped_agents=0

for agent_file in "$SCRIPT_DIR"/agents/*.md; do
  agent_name=$(basename "$agent_file")
  target="$AGENTS_DIR/$agent_name"

  if [ -f "$target" ]; then
    echo "    - ${agent_name%.md} (skipped, already exists)"
    skipped_agents=$((skipped_agents + 1))
  else
    cp "$agent_file" "$target"
    echo "    + ${agent_name%.md}"
    installed_agents=$((installed_agents + 1))
  fi
done

echo ""
echo "  Done!"
echo "  Skills:  $installed_skills installed, $skipped_skills skipped"
echo "  Agents:  $installed_agents installed, $skipped_agents skipped"
echo ""
echo "  Restart Claude Code to apply changes."
echo ""

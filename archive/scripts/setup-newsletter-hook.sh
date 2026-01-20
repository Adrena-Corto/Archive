#!/bin/bash

# Setup git pre-push hook for newsletter digest

HOOK_PATH="../../.git/hooks/pre-push"

cat > "$HOOK_PATH" << 'EOF'
#!/bin/bash

# Newsletter digest on push
# Only runs when pushing to main/master

while read local_ref local_sha remote_ref remote_sha; do
  if [[ "$remote_ref" == *"main"* ]] || [[ "$remote_ref" == *"master"* ]]; then
    echo "📬 Checking for newsletter updates..."
    cd archive && node scripts/send-newsletter.mjs
  fi
done

exit 0
EOF

chmod +x "$HOOK_PATH"
echo "✓ Pre-push hook installed at .git/hooks/pre-push"

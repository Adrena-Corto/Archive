# Claude Project Setup

Minimal, powerful Claude configuration for web development.

## Structure

```
your-project/
├── CLAUDE.md              # Main instructions (customize this)
└── .claude/
    ├── settings.json      # Permissions and model config
    ├── agents/            # Specialized agents
    │   ├── reviewer.md    # Code review
    │   ├── refactor.md    # Refactoring
    │   ├── debug.md       # Debugging
    │   └── architect.md   # Design decisions
    └── skills/            # Reusable patterns
        ├── component.md   # React components
        ├── api.md         # API integration
        └── testing.md     # Testing patterns
```

## Usage

### Basic
Just have `CLAUDE.md` in your project root. Claude reads it automatically.

### Agents
Reference agents when you want specialized behavior:

```
Use @reviewer.md to review this PR
```

```
Use @debug.md — the login form submits but nothing happens
```

### Skills
Reference skills when generating code:

```
Create a UserProfile component following @component.md
```

## Customization

1. Edit `CLAUDE.md` with your actual tech stack
2. Add project-specific agents as needed
3. Add skills for patterns you repeat often

## Keep It Simple

- Don't over-engineer the config
- Add agents/skills only when you notice repetition
- Update CLAUDE.md as patterns emerge

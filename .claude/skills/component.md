# Component Skill

Generate React components following project conventions.

## Template

```tsx
import { type FC } from 'react'

type Props = {
  // required props first
  // optional props after
}

export const ComponentName: FC<Props> = ({ prop1, prop2 }) => {
  // hooks first
  // derived state
  // handlers
  // early returns for loading/error
  // main render

  return (
    <div>
      {/* content */}
    </div>
  )
}
```

## Conventions

- Named exports, not default
- Props type inline unless reused
- Destructure props in signature
- No `React.FC` — use `FC` import
- Tailwind for styling

## File Structure

For simple component:
```
components/
  Button.tsx
```

For complex component:
```
components/
  Button/
    index.ts        # export { Button } from './Button'
    Button.tsx      # main component
    Button.test.tsx # tests
    types.ts        # if types are complex
```

## Checklist

- [ ] Props typed correctly
- [ ] Loading/error states handled
- [ ] Accessible (aria labels, keyboard nav)
- [ ] Responsive if needed
- [ ] Memoized if expensive render

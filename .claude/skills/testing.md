# Testing Skill

Patterns for testing React applications.

## Philosophy

- Test behavior, not implementation
- Test what users see and do
- Don't test third-party code
- One assertion per test when possible

## Component Testing (Vitest + Testing Library)

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders label', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click me</Button>)
    
    await userEvent.click(screen.getByRole('button'))
    
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is disabled when loading', () => {
    render(<Button loading>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

## Hook Testing

```typescript
import { renderHook, waitFor } from '@testing-library/react'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('increments', () => {
    const { result } = renderHook(() => useCounter(0))
    
    act(() => {
      result.current.increment()
    })
    
    expect(result.current.count).toBe(1)
  })
})
```

## Mocking

```typescript
// Mock module
vi.mock('./api', () => ({
  getUser: vi.fn(),
}))

// Mock implementation per test
import { getUser } from './api'

it('shows user name', async () => {
  vi.mocked(getUser).mockResolvedValue({ name: 'John' })
  
  render(<UserProfile id="1" />)
  
  await waitFor(() => {
    expect(screen.getByText('John')).toBeInTheDocument()
  })
})
```

## Query Selectors (Prefer Order)

1. `getByRole` — most accessible
2. `getByLabelText` — form fields
3. `getByPlaceholderText` — inputs
4. `getByText` — non-interactive elements
5. `getByTestId` — last resort

## What to Test

| Test | Skip |
|------|------|
| User interactions | Internal state |
| Conditional rendering | Styling |
| Error states | Third-party components |
| Accessibility | Implementation details |
| Integration points | Snapshot tests (usually) |

## File Naming

```
Button.tsx
Button.test.tsx    # unit tests
Button.e2e.ts      # e2e tests (Playwright)
```

# API Skill

Patterns for API integration.

## Fetch Wrapper

```typescript
const BASE_URL = import.meta.env.VITE_API_URL

type ApiError = {
  message: string
  status: number
}

async function api<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`
  
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!res.ok) {
    const error: ApiError = {
      message: await res.text(),
      status: res.status,
    }
    throw error
  }

  return res.json()
}

export const api = {
  get: <T>(endpoint: string) => 
    api<T>(endpoint),
  
  post: <T>(endpoint: string, body: unknown) =>
    api<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  
  put: <T>(endpoint: string, body: unknown) =>
    api<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  
  delete: <T>(endpoint: string) =>
    api<T>(endpoint, { method: 'DELETE' }),
}
```

## With TanStack Query

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Query keys factory
export const userKeys = {
  all: ['users'] as const,
  list: () => [...userKeys.all, 'list'] as const,
  detail: (id: string) => [...userKeys.all, 'detail', id] as const,
}

// Query hook
export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => api.get<User>(`/users/${id}`),
  })
}

// Mutation hook
export function useUpdateUser() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: UpdateUserDto) => 
      api.put<User>(`/users/${data.id}`, data),
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
  })
}
```

## Validation with Zod

```typescript
import { z } from 'zod'

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  createdAt: z.string().datetime(),
})

type User = z.infer<typeof UserSchema>

// Use in API call
async function getUser(id: string): Promise<User> {
  const data = await api.get(`/users/${id}`)
  return UserSchema.parse(data) // throws if invalid
}
```

## Error Handling in Components

```tsx
function UserProfile({ id }: { id: string }) {
  const { data, error, isLoading } = useUser(id)

  if (isLoading) return <Spinner />
  if (error) return <Error message={error.message} />
  if (!data) return null

  return <Profile user={data} />
}
```

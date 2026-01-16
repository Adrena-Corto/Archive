# Site Map

Visual map of all pages and their interconnections.

## Page Hierarchy

```
/                          Home
├── /artifacts             Artifacts Collection
├── /coins                 Coins Collection
├── /item/[id]             Individual Item Detail (dynamic)
├── /timeline              Interactive Timeline
├── /library               Library Hub
│   ├── /library/articles  Articles List
│   │   └── /library/articles/[id]  Article Detail (dynamic)
│   └── /library/books     Books List
│       └── /library/books/[id]     Book Detail (dynamic)
├── /about                 About Page
└── /search                Search Page
```

## Navigation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         HEADER NAV                              │
│  [ARCHIVE]  Artifacts  Coins  Timeline  Library  About  [⌘K]   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                           HOME (/)                              │
│                                                                 │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐     │
│   │  Browse      │    │  Browse      │    │  Featured    │     │
│   │  Artifacts   │───▶│  Coins       │───▶│  Items       │     │
│   └──────────────┘    └──────────────┘    └──────────────┘     │
│          │                   │                   │              │
└──────────│───────────────────│───────────────────│──────────────┘
           │                   │                   │
           ▼                   ▼                   ▼
    /artifacts            /coins              /item/[id]
```

## Page Connections

### Home → Everything

```
                    ┌──────────────┐
                    │     HOME     │
                    │      /       │
                    └──────────────┘
                           │
       ┌───────────┬───────┼───────┬───────────┐
       │           │       │       │           │
       ▼           ▼       ▼       ▼           ▼
  /artifacts    /coins  /item/*  /library  /timeline
```

### Collection Browsing

```
┌────────────────┐         ┌────────────────┐
│   /artifacts   │         │    /coins      │
│                │         │                │
│  Filter by:    │         │  Filter by:    │
│  - category    │         │  - tag         │
│  - tag         │         │  - material    │
└───────┬────────┘         └───────┬────────┘
        │                          │
        └──────────┬───────────────┘
                   │
                   ▼
          ┌────────────────┐
          │   /item/[id]   │
          │                │
          │  Links to:     │
          │  ← prev item   │
          │  → next item   │
          │  • related     │
          │  • tags        │
          │  ↑ back to     │
          │    category    │
          └────────────────┘
```

### Library Section

```
┌────────────────────────────────────────────────────┐
│                    /library                         │
│                  (Library Hub)                      │
│                                                     │
│    ┌─────────────────┐    ┌─────────────────┐      │
│    │    Articles     │    │     Books       │      │
│    │    Preview      │    │    Preview      │      │
│    └────────┬────────┘    └────────┬────────┘      │
└─────────────│──────────────────────│───────────────┘
              │                      │
              ▼                      ▼
     /library/articles        /library/books
              │                      │
              ▼                      ▼
   /library/articles/[id]   /library/books/[id]
              │
              │ (collection embeds)
              ▼
         /item/[id]
```

### Item Detail Page Links

```
┌─────────────────────────────────────────────────────────────┐
│                      /item/[id]                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  BREADCRUMB:  Coins > Roman > [Item Name]                   │
│               ↓        ↓                                    │
│            /coins   /coins?tag=roman                        │
│                                                             │
│  ┌─────────┐                              ┌─────────┐       │
│  │  ← Prev │                              │  Next → │       │
│  │  Item   │                              │  Item   │       │
│  └────┬────┘                              └────┬────┘       │
│       │                                        │            │
│       └───────────── /item/[id] ───────────────┘            │
│                                                             │
│  RELATED ITEMS:                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │  Item 1  │  │  Item 2  │  │  Item 3  │                  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘                  │
│       │             │             │                         │
│       └─────────────┼─────────────┘                         │
│                     ▼                                       │
│               /item/[id]                                    │
│                                                             │
│  TAGS: [roman] [gold] [imperial]                           │
│           ↓      ↓        ↓                                │
│    /coins?tag=roman  (filtered views)                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## All Routes

| Route | File | Type | Description |
|-------|------|------|-------------|
| `/` | `pages/index.astro` | Static | Home page |
| `/artifacts` | `pages/artifacts/index.astro` | Static | Artifacts collection |
| `/coins` | `pages/coins/index.astro` | Static | Coins collection |
| `/item/[id]` | `pages/item/[id].astro` | Dynamic | Item detail pages |
| `/timeline` | `pages/timeline.astro` | Static | Interactive timeline |
| `/library` | `pages/library/index.astro` | Static | Library hub |
| `/library/articles` | `pages/library/articles/index.astro` | Static | Articles list |
| `/library/articles/[id]` | `pages/library/articles/[id].astro` | Dynamic | Article detail |
| `/library/books` | `pages/library/books/index.astro` | Static | Books list |
| `/library/books/[id]` | `pages/library/books/[id].astro` | Dynamic | Book detail |
| `/about` | `pages/about.astro` | Static | About page |
| `/search` | `pages/search.astro` | Static | Search (Pagefind) |

### Redirect Routes

| From | To | Status |
|------|----|----|
| `/articles` | `/library/articles` | 301 |
| `/articles/[id]` | `/library/articles/[id]` | 301 |
| `/collection` | `/artifacts` | 301 |

## Query Parameters

| Page | Parameter | Effect |
|------|-----------|--------|
| `/artifacts` | `?category=ring` | Filter by category |
| `/artifacts` | `?tag=gold` | Filter by tag |
| `/coins` | `?tag=roman` | Filter by tag |
| `/library/articles` | `?tag=grading` | Filter by tag |

## Global Navigation

Present on every page via `BaseLayout.astro`:

**Desktop:**
- Logo (→ `/`)
- Artifacts (→ `/artifacts`)
- Coins (→ `/coins`)
- Timeline (→ `/timeline`)
- Library (→ `/library`)
- About (→ `/about`)
- Search icon (opens modal, `⌘K` shortcut)

**Mobile:**
- Hamburger menu with same links
- Library expands to show Articles/Books submenu

## Cross-Page Features

- **Search Modal**: Global `⌘K` search via Pagefind
- **View Transitions**: Smooth navigation between pages
- **Breadcrumbs**: Context navigation on detail pages
- **RSS Feed**: `/rss.xml` for articles

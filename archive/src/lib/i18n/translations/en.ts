/**
 * English (default) translations
 */
export const en = {
  // Navigation
  nav: {
    artifacts: 'Artifacts',
    coins: 'Coins',
    timeline: 'Timeline',
    library: 'Library',
    about: 'About',
    search: 'Search',
    articles: 'Articles',
    books: 'Books',
  },
  
  // Common UI
  common: {
    close: 'Close',
    open: 'Open',
    back: 'Back',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    submit: 'Submit',
    cancel: 'Cancel',
    readMore: 'Read more',
    viewDetails: 'View details',
    skipToContent: 'Skip to content',
    toggleMenu: 'Toggle navigation menu',
    scrollToTop: 'Scroll to top',
  },
  
  // Non-English accuracy notice
  accuracyNotice: {
    title: 'Translation Notice',
    message: 'This article has been automatically translated. See something inaccurate?',
    reportIssue: 'Report an issue',
  },
  
  // Report page
  report: {
    title: 'Report an Issue',
    subtitle: 'Help us improve our content',
    description: 'Found an inaccuracy in a translation? Let us know and we\'ll review it.',
    urlLabel: 'Page URL',
    urlPlaceholder: 'https://theantiquearchive.com/...',
    localeLabel: 'Language',
    issueLabel: 'Issue Type',
    issuePlaceholder: 'Select the type of issue',
    issueTypes: {
      translation: 'Translation error',
      formatting: 'Formatting issue',
      missing: 'Missing content',
      other: 'Other',
    },
    detailsLabel: 'Details',
    detailsPlaceholder: 'Please describe the issue in detail...',
    submitButton: 'Send Report',
    submitVia: 'Or send via email:',
    emailSubject: 'Translation Issue Report',
    successMessage: 'Thank you! Your report has been submitted.',
    required: 'Required',
    optional: 'Optional',
  },
  
  // Footer
  footer: {
    stayUpdated: 'Stay Updated',
    getNotified: 'Get notified of new articles and collection additions.',
    support: 'Support',
    personalCollection: 'Personal Collection Display',
    location: 'Hong Kong',
  },
  
  // Meta
  meta: {
    siteName: 'The Antique Archive',
    siteDescription: 'A curated collection of ancient coins, Mesopotamian cylinder seals, Byzantine jewelry, and rare artifacts spanning 5,000 years.',
    articleListDescription: 'Essays and guides on ancient coins, cylinder seals, and collecting antiques.',
  },
  
  // Articles
  articles: {
    title: 'Articles',
    subtitle: 'Knowledge Base',
    description: 'Essays, guides, and notes on collecting and identification.',
    noArticles: 'No articles published yet',
    readTime: 'min read',
    publishedOn: 'Published',
    updatedOn: 'Updated',
    backToArticles: 'Back to Articles',
    tags: 'Tags',
    filterByTag: 'Filter by tag',
    clearFilter: 'Clear filter',
    allArticles: 'All',
  },
  
  // Structured data
  structuredData: {
    websiteName: 'The Antique Archive',
    organizationName: 'The Antique Archive',
    collectionName: 'The Archive',
  },
} as const;

export type Translations = typeof en;

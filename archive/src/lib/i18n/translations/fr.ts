import type { Translations } from './en';

/**
 * French translations
 */
export const fr: Translations = {
  // Navigation
  nav: {
    artifacts: 'Artéfacts',
    coins: 'Monnaies',
    timeline: 'Chronologie',
    library: 'Bibliothèque',
    about: 'À propos',
    search: 'Recherche',
    articles: 'Articles',
    books: 'Livres',
  },
  
  // Common UI
  common: {
    close: 'Fermer',
    open: 'Ouvrir',
    back: 'Retour',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    submit: 'Envoyer',
    cancel: 'Annuler',
    readMore: 'Lire la suite',
    viewDetails: 'Voir les détails',
    skipToContent: 'Passer au contenu',
    toggleMenu: 'Basculer le menu de navigation',
    scrollToTop: 'Retour en haut',
  },
  
  // Non-English accuracy notice
  accuracyNotice: {
    title: 'Note de traduction',
    message: 'Cet article a été traduit automatiquement. Vous voyez une erreur ?',
    reportIssue: 'Signaler un problème',
  },
  
  // Report page
  report: {
    title: 'Signaler un problème',
    subtitle: 'Aidez-nous à améliorer notre contenu',
    description: 'Vous avez trouvé une erreur dans une traduction ? Faites-le nous savoir et nous l\'examinerons.',
    urlLabel: 'URL de la page',
    urlPlaceholder: 'https://theantiquearchive.com/...',
    localeLabel: 'Langue',
    issueLabel: 'Type de problème',
    issuePlaceholder: 'Sélectionnez le type de problème',
    issueTypes: {
      translation: 'Erreur de traduction',
      formatting: 'Problème de mise en forme',
      missing: 'Contenu manquant',
      other: 'Autre',
    },
    detailsLabel: 'Détails',
    detailsPlaceholder: 'Veuillez décrire le problème en détail...',
    submitButton: 'Envoyer le rapport',
    submitVia: 'Ou envoyer par email :',
    emailSubject: 'Signalement de problème de traduction',
    successMessage: 'Merci ! Votre signalement a été envoyé.',
    required: 'Obligatoire',
    optional: 'Optionnel',
  },
  
  // Footer
  footer: {
    stayUpdated: 'Restez informé',
    getNotified: 'Recevez une notification des nouveaux articles et ajouts à la collection.',
    support: 'Support',
    personalCollection: 'Exposition de collection personnelle',
    location: 'Hong Kong',
  },
  
  // Meta
  meta: {
    siteName: 'The Antique Archive',
    siteDescription: 'Une collection soigneusement sélectionnée de monnaies anciennes, de sceaux cylindres mésopotamiens, de bijoux byzantins et d\'artéfacts rares couvrant 5 000 ans.',
    articleListDescription: 'Essais et guides sur les monnaies anciennes, les sceaux cylindres et la collection d\'antiquités.',
  },
  
  // Articles
  articles: {
    title: 'Articles',
    subtitle: 'Base de connaissances',
    description: 'Essais, guides et notes sur la collection et l\'identification.',
    noArticles: 'Aucun article publié pour le moment',
    readTime: 'min de lecture',
    publishedOn: 'Publié le',
    updatedOn: 'Mis à jour le',
    backToArticles: 'Retour aux articles',
    tags: 'Tags',
    filterByTag: 'Filtrer par tag',
    clearFilter: 'Effacer le filtre',
    allArticles: 'Tous',
  },
  
  // Structured data
  structuredData: {
    websiteName: 'The Antique Archive',
    organizationName: 'The Antique Archive',
    collectionName: 'L\'Archive',
  },
};

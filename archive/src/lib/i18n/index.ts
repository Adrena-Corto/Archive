import type { AstroGlobal } from 'astro';
import type { Locale, Translations } from './config';
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  LOCALE_PATHS,
  PATH_TO_LOCALE,
  LOCALE_LABELS,
  LOCALE_HTML_LANG,
  OG_LOCALES,
  isValidLocale,
  getLocaleFromPath,
  getLocalePath,
  getAlternateUrls,
} from './config';
import { en } from './translations/en';
import { fr } from './translations/fr';
import { es } from './translations/es';
import { zhCN } from './translations/zh-CN';

// Export configuration
export {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  LOCALE_PATHS,
  PATH_TO_LOCALE,
  LOCALE_LABELS,
  LOCALE_HTML_LANG,
  OG_LOCALES,
  isValidLocale,
  getLocaleFromPath,
  getLocalePath,
  getAlternateUrls,
};
export type { Locale, Translations };

// Translation dictionaries
const translations: Record<Locale, Translations> = {
  'en': en,
  'fr': fr,
  'es': es,
  'zh-CN': zhCN,
};

/**
 * Get translations for a specific locale
 */
export function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? translations[DEFAULT_LOCALE];
}

/**
 * Get the current locale from Astro's context
 * Uses Astro's built-in currentLocale when available, falls back to pathname parsing
 */
export function getCurrentLocale(Astro: AstroGlobal): Locale {
  // First try Astro's built-in i18n locale
  if (Astro.currentLocale && isValidLocale(Astro.currentLocale)) {
    return Astro.currentLocale as Locale;
  }
  
  // Fall back to pathname parsing
  const { locale } = getLocaleFromPath(Astro.url.pathname);
  return locale;
}

/**
 * Helper to get all i18n-related data for a page
 * Returns: locale, translations, pathWithoutLocale, alternateUrls
 */
export function getI18nData(Astro: AstroGlobal) {
  const locale = getCurrentLocale(Astro);
  const t = getTranslations(locale);
  const { pathWithoutLocale } = getLocaleFromPath(Astro.url.pathname);
  const alternateUrls = getAlternateUrls(pathWithoutLocale, Astro.site?.toString() || 'https://theantiquearchive.com');
  
  return {
    locale,
    t,
    pathWithoutLocale,
    alternateUrls,
    htmlLang: LOCALE_HTML_LANG[locale],
    ogLocale: OG_LOCALES[locale],
  };
}

/**
 * Generate hreflang link tags for SEO
 * Returns an array of link tag objects
 */
export function generateHreflangTags(
  currentLocale: Locale,
  alternateUrls: Record<Locale, string>,
  pathWithoutLocale: string
): Array<{ rel: string; hreflang: string; href: string }> {
  const tags: Array<{ rel: string; hreflang: string; href: string }> = [];
  
  // Add alternate links for each locale
  for (const locale of SUPPORTED_LOCALES) {
    const url = alternateUrls[locale];
    const hreflang = locale === 'zh-CN' ? 'zh-Hans' : locale;
    
    tags.push({
      rel: 'alternate',
      hreflang,
      href: url,
    });
  }
  
  // Add x-default for the default locale (English)
  tags.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: alternateUrls[DEFAULT_LOCALE],
  });
  
  return tags;
}

/**
 * Check if a translation exists for a specific article
 * This checks if a localized content file exists
 */
export function hasArticleTranslation(articleId: string, locale: Locale): boolean {
  // English is the default, always available
  if (locale === DEFAULT_LOCALE) return true;
  
  // Check if the locale has a corresponding article file
  // French articles are in articlesFr collection
  if (locale === 'fr') {
    // List of translated French articles (batch #1)
    const frenchArticles = [
      'egyptian-scarabs',
      'marcus-aurelius-coins', 
      'cylinder-seals-mesopotamia',
      'coin-grading-guide',
      'identifying-roman-denarii',
      'islamic-seals-calligraphy',
      'byzantine-magical-amulets',
      'sasanian-stamp-seals',
      'bronze-age-collapse',
      'gold-fever'
    ];
    return frenchArticles.includes(articleId);
  }
  
  // Spanish and Chinese not yet translated
  return false;
}

/**
 * Get the URL for switching to a different locale while preserving page context
 * Returns null if the page doesn't have a translation in the target locale
 */
export function getLocaleSwitchUrl(
  targetLocale: Locale,
  currentLocale: Locale,
  pathWithoutLocale: string,
  isArticle: boolean = false
): string | null {
  // If target is default locale, return path without locale prefix
  if (targetLocale === DEFAULT_LOCALE) {
    return pathWithoutLocale || '/';
  }
  
  // For articles, check if translation exists
  if (isArticle) {
    // Extract article ID from path (e.g., /library/articles/my-article -> my-article)
    const match = pathWithoutLocale.match(/\/library\/articles\/([^/]+)/);
    if (match) {
      const articleId = match[1];
      if (!hasArticleTranslation(articleId, targetLocale)) {
        return null; // No translation available
      }
    }
  }
  
  return getLocalePath(targetLocale, pathWithoutLocale);
}

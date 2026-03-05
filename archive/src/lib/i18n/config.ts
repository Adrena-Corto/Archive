/**
 * Internationalization configuration for The Antique Archive
 * Supports: English (default), French, Spanish, Chinese (Simplified)
 */

export type Locale = 'en' | 'fr' | 'es' | 'zh-CN';

export const DEFAULT_LOCALE: Locale = 'en';

export const SUPPORTED_LOCALES: Locale[] = ['en', 'fr', 'es', 'zh-CN'];

/**
 * URL path segment mapping for locales
 * - 'en' uses no prefix (default)
 * - 'zh-CN' maps to 'zh-cn' in URLs (lowercase for consistency)
 */
export const LOCALE_PATHS: Record<Locale, string> = {
  'en': '',
  'fr': 'fr',
  'es': 'es',
  'zh-CN': 'zh-cn',
};

/**
 * Reverse mapping from URL path to locale
 */
export const PATH_TO_LOCALE: Record<string, Locale> = {
  '': 'en',
  'fr': 'fr',
  'es': 'es',
  'zh-cn': 'zh-CN',
};

/**
 * Language display names for the language switcher
 */
export const LOCALE_LABELS: Record<Locale, string> = {
  'en': 'English',
  'fr': 'Français',
  'es': 'Español',
  'zh-CN': '中文',
};

/**
 * HTML lang attribute values
 */
export const LOCALE_HTML_LANG: Record<Locale, string> = {
  'en': 'en',
  'fr': 'fr',
  'es': 'es',
  'zh-CN': 'zh-CN',
};

/**
 * OG locale values for Open Graph
 */
export const OG_LOCALES: Record<Locale, string> = {
  'en': 'en_US',
  'fr': 'fr_FR',
  'es': 'es_ES',
  'zh-CN': 'zh_CN',
};

/**
 * Check if a string is a valid locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

/**
 * Get the locale from a URL pathname
 * Returns the detected locale and the path without locale prefix
 */
export function getLocaleFromPath(pathname: string): { locale: Locale; pathWithoutLocale: string } {
  // Remove leading slash and split
  const path = pathname.replace(/^\//, '');
  const firstSegment = path.split('/')[0];
  
  const locale = PATH_TO_LOCALE[firstSegment];
  if (locale && locale !== 'en') {
    const pathWithoutLocale = path.slice(firstSegment.length) || '/';
    return { locale, pathWithoutLocale: '/' + pathWithoutLocale.replace(/^\//, '') };
  }
  
  return { locale: 'en', pathWithoutLocale: pathname };
}

/**
 * Get the URL path for a locale
 */
export function getLocalePath(locale: Locale, path: string = ''): string {
  const prefix = LOCALE_PATHS[locale];
  if (!prefix) {
    return path || '/';
  }
  return `/${prefix}${path}`;
}

/**
 * Get alternate language URLs for hreflang tags
 * Returns an object with locale keys and full URLs
 */
export function getAlternateUrls(pathWithoutLocale: string, site: string): Record<Locale, string> {
  const urls: Partial<Record<Locale, string>> = {};
  
  for (const locale of SUPPORTED_LOCALES) {
    const path = getLocalePath(locale, pathWithoutLocale);
    urls[locale] = new URL(path, site).href;
  }
  
  return urls as Record<Locale, string>;
}

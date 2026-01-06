import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

export interface Item {
  id: string;
  name: string;
  category: 'coin' | 'jewelry' | 'ring' | 'seal' | 'misc';
  era: string;
  period: string;
  origin: string;
  material: string;
  weight?: string;
  dimensions?: string;
  condition?: string;
  description: string;
  images: string[];
  tags: string[];
  featured?: boolean;
}

const itemsDir = path.join(process.cwd(), 'src/data/items');

export function getAllItems(): Item[] {
  if (!fs.existsSync(itemsDir)) {
    return [];
  }

  const files = fs.readdirSync(itemsDir).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));

  return files.map(file => {
    const content = fs.readFileSync(path.join(itemsDir, file), 'utf-8');
    return yaml.parse(content) as Item;
  }).sort((a, b) => a.name.localeCompare(b.name));
}

export function getItemById(id: string): Item | undefined {
  const items = getAllItems();
  return items.find(item => item.id === id);
}

export function getItemsByCategory(category: Item['category']): Item[] {
  return getAllItems().filter(item => item.category === category);
}

export function getFeaturedItems(): Item[] {
  return getAllItems().filter(item => item.featured);
}

export function getAllCategories(): Item['category'][] {
  return ['coin', 'jewelry', 'ring', 'seal', 'misc'];
}

export function getAllMaterials(): string[] {
  const items = getAllItems();
  const materials = new Set(items.map(item => item.material));
  return Array.from(materials).sort();
}

export function getAllPeriods(): string[] {
  const items = getAllItems();
  const periods = new Set(items.map(item => item.period));
  return Array.from(periods).sort();
}

export function getRelatedItems(currentItem: Item, limit: number = 3): Item[] {
  const allItems = getAllItems().filter(item => item.id !== currentItem.id);

  const scored = allItems.map(item => {
    let score = 0;
    if (item.category === currentItem.category) score += 3;
    if (item.period === currentItem.period) score += 2;
    if (item.material === currentItem.material) score += 2;
    const sharedTags = item.tags.filter(tag => currentItem.tags.includes(tag));
    score += sharedTags.length;
    return { item, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.item);
}

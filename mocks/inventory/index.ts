import sku001 from './sku-001.json';
import sku002 from './sku-002.json';

export interface InventoryRecord {
  available: number;
}

const fixtures: Record<string, InventoryRecord> = {
  'sku-001': sku001,
  'sku-002': sku002,
};

export default fixtures;

export abstract class IInventoryClient {
  abstract checkStock(productId: string, quantity: number): Promise<boolean>;
}
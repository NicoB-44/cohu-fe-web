export interface Drop {
    dropId: string;
    productId: string;
    productName: string;
    productSku: string;
    productCountry: string;
    dropStart: string;
    dropEnd: string;
    dropDuration: number;
}

export type DropHistory = Drop[];

export interface Product {
  productId: string;
  productName: string;
  productSku: string | null;
  productCountry: string;
  productGpu: string;
  productTitle: string;
  productUpc: string;
  productImage: string;
  productMsrp: string | null;
  productPrice: string;
  productCurrency: string | null;
  cohuAvailability: {
    available: boolean;
    last_update: string; // ISO 8601 string (e.g., "2025-08-06T19:09:34.520086")
  };
}

export type ProductList = Product[];
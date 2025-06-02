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
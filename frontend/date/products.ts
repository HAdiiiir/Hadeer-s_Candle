// data/products.ts
export interface CandleProduct {
    _id: string;
    name: string;
    price: number;
    size?: string;
    type: string;
    category: string;
    fragrance: string;
    waxType: string;
    burnTime: string;
    description: string;
    images: string[];
  }
  
  export const featuredProducts: CandleProduct[] = [
    // Your complete product array here
    // (the one you provided in your question)
  ];
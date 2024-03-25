export interface Product{
    id: string;
    name?:string | null;
    description?:string | null ;
    image?: string | null;
    price?: number | null;
    quantity?: number | null;
    createdAt?: string | null;
    updatedAt?: string | null; 
    category: {
        id: string;
        name: string;
    };
}
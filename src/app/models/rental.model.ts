export interface Rental{
    id: string;
    start_date:string;
    end_date:string;
    rental_duration: number;
    reltal_fee?: number | null;
    status?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null; 
    total?: number;
    products: string[];
}
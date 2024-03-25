export class CreateProductModal{
    constructor(
        public name:string,
        public categoryId:string,
        public description?:string,
        public price?:number,
        public quantity?:number,
        public image?: File,
        
    ){}
}
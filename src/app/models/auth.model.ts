export class User{
    constructor(
        private access_token:string,
        private email:string,
        private expiresIn:number
    ){}

    get getExpires(){
        return this.expiresIn;
    }

    get getToken(){
        return this.access_token;
    }
}
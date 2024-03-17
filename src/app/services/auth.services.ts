import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/enviroment";
import { AuthResponseData } from "../models/auth-response.model";
import { Observable, catchError, throwError } from "rxjs";
import { User } from "../models/auth.model";
import { AppState } from "../store/app.state";
import { Store } from "@ngrx/store";
import { autoLogout } from "../auth/state/auth.actions";


@Injectable({
    providedIn: 'root'
})
export class AuthService{
    timeoutInterval:any;
    constructor(
        private http: HttpClient,
        private store: Store<AppState>
        ){}

    login(email:string, password: string):Observable<AuthResponseData>{
        return this.http.post<AuthResponseData>(`${environment.apiUrl}auth/login`, {email, password})
    }

    setUserInLocalStorage(user: User){
       
        localStorage.setItem('userData', JSON.stringify(user))

       
        this.runTimeoutInterval(user)
    }
    
    runTimeoutInterval(user :User){
        const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
        const delay = (user.getExpires - currentTime) * 1000; // delay in milliseconds

        this.timeoutInterval=setTimeout(()=>{
            //logout
            this.store.dispatch(autoLogout())
        },delay)
    }

    getUserFromLocalStorage(){
        const userDataString= localStorage.getItem('userData');
        if(userDataString){
            const userData= JSON.parse(userDataString);
            const user=new User(userData.access_token, userData.email, userData.expiresIn);
            this.runTimeoutInterval(user);
            return user;
        }
        return null;
    }


    logout(){
        localStorage.removeItem('userData');
        if(this.timeoutInterval){
            clearTimeout(this.timeoutInterval);
            this.timeoutInterval=null;
        }
    }
}
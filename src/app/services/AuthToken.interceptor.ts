import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable, exhaustMap, take } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.state";
import { getToken } from "../auth/state/auth.selector";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor{
    constructor(
        private store: Store<AppState>
    ){}
    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        return this.store.select(getToken).pipe(
            take(1),
            exhaustMap((token)=>{
            if(!token){
                return next.handle(req);
            }
            // ---api/posts?auth=token
            // let modifiedReq = req.clone({
            //     params: req.params.append('auth', token)
            // })
            let modifiedReq=req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
            return next.handle(modifiedReq);
        }))
        
    }
}
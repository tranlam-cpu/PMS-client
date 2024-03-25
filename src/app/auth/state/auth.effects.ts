import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { autoLogin, autoLogout, loginStart, loginSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { AuthService } from "src/app/services/auth.services";
import { User } from "src/app/models/auth.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { setLoading, setMessage } from "src/app/store/shared/shared.action";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects{
    constructor(
        private action$: Actions, 
        private authService: AuthService,
        private store: Store<AppState>,
        private router: Router
    ){}

    login$ = createEffect(()=>{    
        return this.action$.pipe(
            // ofType(...[loginStart, login2, login3]), 
            ofType(loginStart), 
            // Chỉ phát ra giá trị từ Observable mới nhất được phát ra
            exhaustMap((action)=>{
                return this.authService.login(action.email, action.password).pipe(
                    map((data)=>{
                        this.store.dispatch(setLoading({status:false}))
                        const user=new User(data.access_token,data.email,data.exp);
                        this.authService.setUserInLocalStorage(user);
                        return loginSuccess({user , redirect: true})
                    }),
                    catchError((error)=>{
                        this.store.dispatch(setLoading({status:false}))
                        return of(setMessage({message:error.error.message}))
                    })
                )
            }),
        )
    })

    loginRedirect$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(loginSuccess),
            //tao ra mot operator - thuc hien mot tac vu bat ky
            tap(action=>{
                if(action.redirect){
                    this.router.navigate(['/'])
                }         
            })
        )
    },{dispatch: false})

    autoLogin$=createEffect(()=>{
        return this.action$.pipe(
            ofType(autoLogin),
            //chuyen doi observable thanh mot observable khac
            mergeMap((action)=>{
               
                const user=this.authService.getUserFromLocalStorage();
                if(user) return of(loginSuccess({ user ,redirect: false}));
                return of()
                
            })
        )
    })

    logout$=createEffect(()=>{
        return this.action$.pipe(
            ofType(autoLogout),
            // Chuyển đổi mỗi giá trị được phát ra từ một Observable thành một giá trị mới
            map((action)=>{
               
                this.authService.logout();
                this.router.navigate(['/auth']);
            })
        )
    },{dispatch: false})
}
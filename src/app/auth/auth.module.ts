import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { AUTH_STATE_NAME } from "./state/auth.selector";
import { AuthReducer } from "./state/auth.reducer";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./state/auth.effects";


const routes: Routes=[
    {
        path: '', children:[
            {path: '',redirectTo: 'login',pathMatch: 'full'},
            {path:'login', component: LoginComponent},
        ]
    }
]

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule, 
        EffectsModule.forFeature(),
        RouterModule.forChild(routes),
    ],
})
export class AuthModule{

}
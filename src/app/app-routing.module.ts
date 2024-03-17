import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./services/auth.guard";


const routes: Routes = [
    // {path: '', redirectTo: 'auth', pathMatch: 'full'},
    {
      path: '',
      component: DashboardComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'auth', 
      loadChildren:()=> import('./auth/auth.module').then(m => m.AuthModule)
    },
    {path: '**', component: NotFoundComponent}
]

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
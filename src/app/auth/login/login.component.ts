import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginStart } from '../state/auth.actions';
import { AppState } from 'src/app/store/app.state';
import { getLoading, getMessage } from 'src/app/store/shared/shared.selector';
import { Observable, map } from 'rxjs';
import { setLoading, setMessage } from 'src/app/store/shared/shared.action';
import { Router } from '@angular/router';
import { isAuthenticated } from '../state/auth.selector';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;

  eye:string='pi pi-eye';
  typePassword:string='password';

  showLoading!: Observable<boolean>
  errorMessage!: Observable<string>
  
 

  constructor(
    private store: Store<AppState>,
    private route: Router
  ){}
    
  ngOnInit(): void {
    this.showLoading=this.store.select(getLoading)
    this.errorMessage=this.store.select(getMessage)

    this.store.select(isAuthenticated).subscribe(authenticate=>{
        if(authenticate){
          return this.route.navigate(['/'])
        }
        return true
    })

    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required])
    });
  }

  onLoginSubmit(){
    const email=this.loginForm.value.email;
    const password=this.loginForm.value.password;
    this.store.dispatch(setLoading({status:true}))
    this.store.dispatch(setMessage({message:""}))
    this.store.dispatch(loginStart({email, password}));
    
  }

  onEyeClick(){
    this.eye=this.eye==='pi pi-eye'?'pi pi-eye-slash':'pi pi-eye';
    this.typePassword=this.typePassword==='password'?'text':'password';
  }
}

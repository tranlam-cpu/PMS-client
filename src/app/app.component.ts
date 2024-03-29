import { Component, OnInit } from '@angular/core';
import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';
import { autoLogin } from './auth/state/auth.actions';
import { PrimeNGConfig } from 'primeng/api';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'pms';

  constructor(
    private store: Store<AppState>,
    private primengConfig: PrimeNGConfig
  ){}

  ngOnInit(): void {
    this.store.dispatch(autoLogin())
    this.primengConfig.ripple = true;
  }
}

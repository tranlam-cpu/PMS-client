import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-common',
  templateUrl: './create-common.component.html',
  styleUrls: ['./create-common.component.css']
})
export class CreateCommonComponent implements OnInit{


  currentRoute!: string;

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void { 
    this.currentRoute = this.router.url;   

  }
  
}

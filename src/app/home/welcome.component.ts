import { Component,OnInit } from '@angular/core';


@Component({
  templateUrl: './welcome.component.html',
 styleUrls:['./welcome.component.css']
})
export class WelcomeComponent {
  public pageTitle = 'Welcome';
  constructor(){

  }
  ngOnInit():void{
 
}
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-static-header',
  templateUrl: './static-header.component.html',
  styleUrls: ['./static-header.component.css']
})
export class StaticHeaderComponent {

  
constructor(private _router:Router){}

gotPage(){
  document.getElementById("trigger-overlay")?.click();
}
}

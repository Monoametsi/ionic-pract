import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentPageHome = false;
  constructor(private router: Router, private popOver: PopoverController) { }

  ngOnInit() {
    this.checkIfHome();
  }

  checkIfHome(){
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        if(this.router.url === '/landing'){
          this.currentPageHome = true;
        }else{
          this.currentPageHome = false;
        }
      }
    })
  }

  async presentPopOver(){
    
  }

}

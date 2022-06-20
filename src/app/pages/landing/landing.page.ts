import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  
  isModalOpen: boolean;

  constructor() { }

  ngOnInit() {
  }

  openModal(){
    this.isModalOpen = true;
  }

}

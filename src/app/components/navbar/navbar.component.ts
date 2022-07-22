import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { AddBudgetModalComponent } from '../add-budget-modal/add-budget-modal.component';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentPageHome = false;
  constructor(private router: Router, public popOverCtrl: PopoverController, public modalCtrl: ModalController) { }

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

  async presentPopOver(e: Event){
    const popOver = await this.popOverCtrl.create({
      component: PopoverComponent,
      event: e
    })

    await popOver.present();
  }

  async presentModal(){
    const modal = await this.modalCtrl.create({
      component: AddBudgetModalComponent
    })

    await modal.present();
  }

}

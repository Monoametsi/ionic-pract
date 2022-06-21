import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent implements OnInit {

  @Input() firstName: string;

  constructor() { }

  ngOnInit() {}

  check(){
    if(this.firstName === 'Douglas'){
      return true
    }
  }

}

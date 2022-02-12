import { Agreement } from './../entities/agreement';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataTransferService } from '../services/data-transfer.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {


  subscription: Subscription = new Subscription();
  selectedAgreement:Agreement = new Agreement();

  constructor(private data: DataTransferService, public commonService : CommonService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentAgreement.subscribe(agreement => this.selectedAgreement = agreement);
  }

  policyList = [
    {
      id: 0,
      policyName: 'Invalid',
    },
    {
      id: 1,
      policyName: 'Ayakta Tedavi',
    },
    {
      id: 2,
      policyName: 'Yatarak Tedavi',
    },
    {
      id: 3,
      policyName: 'Yatarak + Ayakta Tedavi',
    },
  ];




  closeDetailWindow(){
    let detailWindow = document.getElementById("detail-window");
    if(detailWindow){
      detailWindow.style.display = "none";
    }
  }

}

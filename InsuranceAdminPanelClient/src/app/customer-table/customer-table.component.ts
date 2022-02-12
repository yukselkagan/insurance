import { DataTransferService } from './../services/data-transfer.service';
import { Agreement } from './../entities/agreement';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit {

  agreements:Agreement[] = [];
  selectedAgreement:Agreement = new Agreement();


  subscription: Subscription = new Subscription();


  constructor(private customerService: CustomerService, private data: DataTransferService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentAgreement.subscribe(agreement => this.selectedAgreement = agreement);
    this.getAgreementList();
  }

  changeSelectedAgreement(){
    let temagg = new Agreement()
    temagg.agreementName = "wolf";
    temagg.person.firstName = "osman";
    this.data.changeAgreement(temagg);
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


  getAgreementList() {
    this.customerService.getCustomers().subscribe(response => {
      this.agreements = response.data;
      //console.log(this.agreements);
    });

  }

  formatDate(input:Date){
    let createdDate = new Date(input);
    let formattedDate = `${createdDate.getDate()}-${createdDate.getMonth()+1}-${createdDate.getFullYear()} `;

    return formattedDate;
  }


  openDetailWindow(itemIndex:number){
    this.data.changeAgreement(this.agreements[itemIndex]);



    let detailWindow = document.getElementById("detail-window");
    if(detailWindow){
      detailWindow.style.display = "block";
      detailWindow.scrollTo(0, 0);
    }

  }



}

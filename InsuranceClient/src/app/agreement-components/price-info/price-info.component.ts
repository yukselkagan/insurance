import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-price-info',
  templateUrl: './price-info.component.html',
  styleUrls: ['./price-info.component.scss']
})
export class PriceInfoComponent implements OnInit {
  @Output() installmentChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() inheritedChangeAgreementPart = new EventEmitter<string>();

  @Input() customerFirstName = '';
  @Input() customerLastName = '';
  @Input() totalPrice = 0;

  selectedInstallment:number = 1;


  installmentList = [
    {
      amount : 0
    }
  ];





  constructor() { }

  ngOnInit(): void {
  }

  prepareInstallment(){
    let installmentAmount = Number((this.totalPrice / this.selectedInstallment).toFixed(2));
    this.installmentList = [];
    for(let i=1; i <=this.selectedInstallment; i++){
      this.installmentList.push( {
        amount : installmentAmount
      });
    }
    return this.installmentList;
  }

  callInheritedChangeAgreementPart(): void {
    this.inheritedChangeAgreementPart.next('');
  }

}

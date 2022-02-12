import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-policy-select',
  templateUrl: './policy-select.component.html',
  styleUrls: ['./policy-select.component.scss']
})
export class PolicySelectComponent implements OnInit {
  @Output() inheritedChangeAgreementPart = new EventEmitter<string>();
  @Output() selectedPolicyChange:EventEmitter<String> = new EventEmitter<String>();
  selectedPolicy:number = 0;
  @Input() pageChange = false;

  constructor() { }

  ngOnInit(): void {
  }



  callInheritedChangeAgreementPart(): void {
    this.pageChange = true;
    this.inheritedChangeAgreementPart.next('');
  }



}

import { InsuranceResponse } from './../entities/response';
import { RouterModule } from '@angular/router';
import { PersonInfoComponent } from './../agreement-components/person-info/person-info.component';
import { AgreementService } from './../services/agreement.service';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewRef,
  Renderer2,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { PolicySelectComponent } from '../agreement-components/policy-select/policy-select.component';
import { Agreement } from '../entities/agreement';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insurance-form',
  templateUrl: './insurance-form.component.html',
  styleUrls: ['./insurance-form.component.scss'],
})
export class InsuranceFormComponent implements OnInit, AfterViewInit {
  activeTab = 'policy-select';

  //Policy Select Part
  selectedPolicyId: number = 0;
  inputTotalPrice: number = 0;

  //Person Info Part
  inputIdentityNumber: any;
  inputFirstName: any;
  inputLastName: any;
  inputGender: any = 'female';
  inputBirthday: any;
  inputPhoneNumber: any;
  inputEmail: any;
  inputCountry: any;
  inputProvince: any;
  inputDistrict: any;
  inputAddress: any;

  //Price Info Part
  inputInstallment: any = 1;

  partChangeControl_1 = false;
  isPersonInfoGroupValid: boolean = false;

  agreementParts = [
    {
      partCode: 'policy-select',
      partString: 'Ürün Seçimi',
    },
    {
      partCode: 'person-info',
      partString: 'Kişi Bilgileri',
    },
    {
      partCode: 'price-info',
      partString: 'Prim Bilgileri',
    },
    {
      partCode: 'confirm',
      partString: 'Onay',
    },
  ];

  policyList = [
    {
      id: 0,
      policyName: 'Invalid',
      policyPrice: 0,
    },
    {
      id: 1,
      policyName: 'Ayakta Tedavi',
      policyPrice: 1000,
    },
    {
      id: 2,
      policyName: 'Yatarak Tedavi',
      policyPrice: 500,
    },
    {
      id: 3,
      policyName: 'Yatarak + Ayakta Tedavi',
      policyPrice: 1300,
    },
  ];

  constructor(
    private renderer: Renderer2,
    private http: HttpClient,
    private agreementService: AgreementService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.agreementService.showToastMethodFromComponent.subscribe((value) => {
      this.showToast(value, 'error');
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  receivePersonInfo($event: any) {
    this.inputIdentityNumber = $event.get('identityNumber').value;
    this.inputFirstName = $event.controls['firstName'].value;
    this.inputLastName = $event.controls['lastName'].value;
    this.inputGender = $event.controls['gender'].value;
    this.inputBirthday = $event.controls['birthday'].value;

    this.inputPhoneNumber = $event.controls['phoneNumber'].value;
    this.inputEmail = $event.controls['email'].value;

    this.inputCountry = $event.controls['country'].value;
    this.inputProvince = $event.controls['province'].value;
    this.inputDistrict = $event.controls['district'].value;
    this.inputAddress = $event.controls['address'].value;
    this.isPersonInfoGroupValid = $event.valid;
  }

  receiveInstallmentInfo($event: any) {
    this.inputInstallment = $event;
  }

  receiveSelectedPolicy($event: any) {
    this.selectedPolicyId = $event;
    this.inputTotalPrice =
      this.policyList[this.selectedPolicyId].policyPrice;
  }

  postAgreement() {

    let createdAgreement = this.createAgreement();
    this.agreementService
      .postAgreement(createdAgreement)
      .subscribe((response) => {
        console.log('Server response: ' + response);
        if (response.statusCode == 500) {
          console.log('Console: Server error');
          this.showToast(`Sunucu kaynaklı hata: ${response.message}`,"error");
        }else if(response.statusCode == 200){
          console.log("Console: Success")
          this.router.navigateByUrl("/success");
        }
      });
  }

  //Using for transferred methods
  /*
  callMethod(){
    this.agreementService.callShowToast();
  }
  */

  createAgreement() {
    let newAgreement = new Agreement();
    newAgreement.AgreementName = 'Standart';
    newAgreement.PolicyId = this.selectedPolicyId;
    newAgreement.TotalPrice = this.inputTotalPrice;
    newAgreement.Installment = this.inputInstallment;
    newAgreement.Person.IdentityNumber = this.inputIdentityNumber;
    newAgreement.Person.FirstName = this.inputFirstName;
    newAgreement.Person.LastName = this.inputLastName;
    newAgreement.Person.Gender = this.inputGender;
    newAgreement.Person.Birthday = this.inputBirthday;
    newAgreement.Person.PhoneNumber = this.inputPhoneNumber;
    newAgreement.Person.Email = this.inputEmail;
    newAgreement.Person.Country = this.inputCountry;
    newAgreement.Person.Province = this.inputProvince;
    newAgreement.Person.District = this.inputDistrict;
    newAgreement.Person.Address = this.inputAddress;



    return newAgreement;
  }

  changeAgreementPart(partName: string) {
    let validationControlPolicy: boolean = this.validationPolicySelect();
    let validationControlPerson: boolean = this.validationPersonInfo();

    switch (partName) {
      case 'policy-select':
        this.activeTab = partName;
        this.closeToast();
        break;
      case 'person-info':
        this.partChangeControl_1 = true;

        if (validationControlPolicy) {
          this.activeTab = partName;
          this.closeToast();
        } else {
          this.showToast('Form doldurulmadı');
        }
        break;
      case 'price-info':
        if (validationControlPolicy && validationControlPerson) {
          this.activeTab = partName;
          this.closeToast();
        } else {
          this.showToast('Form doldurulmadı');
        }
        break;
      case 'confirm':
        if (validationControlPolicy && validationControlPerson) {
          this.activeTab = partName;
          this.closeToast();
        } else {
          this.showToast('Form doldurulmadı');
        }
        break;
    }
  }

  validationPolicySelect(): boolean {
    if (this.selectedPolicyId > 0 && this.selectedPolicyId <= 3) {
      return true;
    } else {
      return false;
    }
  }

  validationPersonInfo(): boolean {
    if (this.isPersonInfoGroupValid == true) {
      return true;
    } else {
      return false;
    }
  }

  showToast(message: string, type: string = 'normal') {
    if (type == 'error') {
      document.getElementById('insuranceToast')?.classList.remove('bg-primary');
      document.getElementById('insuranceToast')?.classList.add('bg-danger');
    }

    document.getElementById('insuranceToast')?.classList.add('show');
    let toastTextElement = document.getElementById(
      'insuranceToastText'
    ) as HTMLInputElement;
    toastTextElement.innerHTML = message;
  }

  closeToast() {
    document.getElementById('insuranceToast')?.classList.remove('show');
  }
}

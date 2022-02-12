import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss'],
})
export class PersonInfoComponent implements OnInit {
  @Output() inheritedChangeAgreementPart = new EventEmitter<string>();
  @Output() identityNumberChange: EventEmitter<String> = new EventEmitter<String>();
  @Output() personInfoChange: EventEmitter<any> = new EventEmitter<any>();

  inputIdentityNumber: number = 0;


  countryList = [
    {
      countryName: 'Turkey',
      provinces: [
        {
          provinceName: 'İstanbul',
          districts: ['Adalar', 'Arnavutköy'],
        },
        {
          provinceName: 'Ankara',
          districts: ['Altındağ', 'Çankaya'],
        },
      ],
    },
    {
      countryName: 'England',
      provinces: [
        {
          provinceName: 'London',
          districts: ['Addington', 'Arkley'],
        },
        {
          provinceName: 'Nottingham',
          districts: ['Ashfield', 'Bassetlaw'],
        },
      ],
    },
    {
      countryName: 'Germany',
      provinces: [
        {
          provinceName: 'Berlin',
          districts: ['Reinickendorf', 'Pankow'],
        },
        {
          provinceName: 'Hamburg',
          districts: ['Bergedorf', 'Wandsbek'],
        },
      ],
    },
  ];

  provinceList: any = [];
  districtList: any = [];




  personInfoObject: FormGroup = new FormGroup({
    identityNumber: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(11),
    ]),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    gender: new FormControl('female', Validators.required),
    birthday: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    country: new FormControl('Turkey', Validators.required),
    province: new FormControl('İstanbul', Validators.required),
    district: new FormControl('Adalar', Validators.required),
    address: new FormControl(null, Validators.required),
  });

  onSubmit() {}



  constructor() {
    this.changeCountry();
    this.changeProvince();
  }

  ngOnInit(): void {
    this.personInfoObject.markAllAsTouched;
  }


  changeCountry() {
    let targetCountry = this.personInfoObject.controls['country'].value;
    this.provinceList = this.countryList.find(
      (item) => item.countryName == targetCountry
    )?.provinces.map(item => item.provinceName);
    this.personInfoObject.controls['province'].setValue(this.provinceList[0]);
    this.changeProvince();
    this.updateParent();
  }

  changeProvince(){
    let targetCountry = this.personInfoObject.controls['country'].value;
    let targetProvince = this.personInfoObject.controls['province'].value;
    this.districtList = this.countryList.find(
      (item) => item.countryName == targetCountry
    )?.provinces.find( (item) => item.provinceName == targetProvince )?.districts;
    this.personInfoObject.controls['district'].setValue(this.districtList[0]);
    //console.log("change province"+ targetProvince);
    this.updateParent();

  }


  updateParent() {
    this.personInfoChange.emit(this.personInfoObject);
  }




  callInheritedChangeAgreementPart(): void {
    this.personInfoObject.markAllAsTouched();
    this.inheritedChangeAgreementPart.next('');
  }



}

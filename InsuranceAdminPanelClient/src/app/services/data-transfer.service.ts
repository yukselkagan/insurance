import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Agreement } from '../entities/agreement';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private agreementSource = new BehaviorSubject(new Agreement());
  currentAgreement = this.agreementSource.asObservable();

  constructor() { }


  changeAgreement(newAgreement: Agreement) {
    this.agreementSource.next(newAgreement)
  }

}

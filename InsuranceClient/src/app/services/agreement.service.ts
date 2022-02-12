import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { InsuranceResponse } from '../entities/response';


@Injectable({
  providedIn: 'root'
})
export class AgreementService {
  baseUrl:string = "https://localhost:44326/api/";

  constructor(private http: HttpClient) { }


  postAgreement(model:any){
    return this.http.post<InsuranceResponse>(this.baseUrl+"Agreement", model);
  }



  private componentMethodCallSource = new Subject<any>();
  showToastMethodFromComponent = this.componentMethodCallSource.asObservable();


  callShowToast(){
    this.componentMethodCallSource.next("API sunucuya bağlanılamadı");
  }


}



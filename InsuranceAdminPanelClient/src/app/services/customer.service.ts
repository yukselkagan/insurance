import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InsuranceResponse } from '../entities/response';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl:string = "https://localhost:44356/api/";

  constructor(private http: HttpClient) { }


  getCustomers(){
    return this.http.get<InsuranceResponse>(this.baseUrl+"Agreement");
  }


}

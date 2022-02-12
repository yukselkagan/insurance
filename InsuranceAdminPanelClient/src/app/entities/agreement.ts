import { Person } from "./person";

export class Agreement{
  public agreementName:string = "";
  public policyId:number = 0;
  public totalPrice:number = 0;
  public installment = 1;
  public person:Person = new Person();

  public startDate:Date = new Date();
  public endDate:Date = new Date();

  constructor(){
  }

}

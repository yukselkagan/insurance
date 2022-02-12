import { Person } from "./person";

export class Agreement{
  public AgreementName:string = "";
  public PolicyId:number = 0;
  public TotalPrice:number = 0;
  public Installment = 1;
  public Person:Person = new Person();

  constructor(){
  }

}

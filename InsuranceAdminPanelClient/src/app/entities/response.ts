import { Agreement } from './agreement';


export class InsuranceResponse{
  data:Agreement[] = [];
  message :string =  "";
  statusCode:number = 0;
}

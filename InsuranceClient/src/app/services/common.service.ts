import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }


  showToast(message:string, type:string="normal"){
    if(type == "error"){
      document.getElementById("insuranceToast")?.classList.remove("bg-primary");
      document.getElementById("insuranceToast")?.classList.add("bg-danger");
    }

    document.getElementById("insuranceToast")?.classList.add("show");
    let toastTextElement = document.getElementById("insuranceToastText") as HTMLInputElement;
    toastTextElement.innerHTML = message;
  }

}

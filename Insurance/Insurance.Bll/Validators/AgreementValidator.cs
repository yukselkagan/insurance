using Insurance.Entity.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Insurance.Bll.Validators
{
    public class AgreementValidator 
    {
        public AgreementValidator()
        {

        }

        public void Validate(AgreementDto item)
        {
            if (item.AgreementName == null )
            {
                throw new Exception("Agreement name is empty");
            }

            if (item.PolicyId < 1 || item.PolicyId > 3)
            {
                throw new Exception("Invalid Policy");
            }

            int[] availableInstallments = { 1, 3, 6 };
            if(!availableInstallments.Contains(item.Installment))
            {
                throw new Exception("Invalid Installment");
            }

            if (item.Person.IdentityNumber.ToString().Length != 11)
            {
                throw new Exception($"Identity number must be 11 character, You enter {item.Person.IdentityNumber.ToString().Length} character");
            }

            if (item.Person.FirstName == null || item.Person.FirstName == "" )
            {
                throw new Exception("First name is empty");
            }

            if (item.Person.LastName == null || item.Person.LastName == "")
            {
                throw new Exception("Last name is empty");
            }

            if (!(item.Person.Gender == "male"  || item.Person.Gender == "female"))
            {
                throw new Exception("Invalid gender");
            }

            if(item.Person.Email == null)
            {
                throw new Exception("Email empty");
            }
            else if (!item.Person.Email.Contains("@"))
            {
                throw new Exception("Invalid email");
            }

            if(item.Person.Birthday == null)
            {
                throw new Exception("Birthday empty");
            }


            if (item.Person.PhoneNumber == null)
            {
                throw new Exception("Phone number empty");
            }

            if (item.Person.Address == null)
            {
                throw new Exception("Address empty");
            }



        }





    }
}

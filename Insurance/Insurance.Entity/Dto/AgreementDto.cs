using Insurance.Entity.Base;
using Insurance.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Insurance.Entity.Dto
{
    public class AgreementDto : DtoBase
    {
        public string AgreementName { get; set; }
        public int PolicyId { get; set; }
        public double TotalPrice { get; set; }
        public int Installment { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public PersonDto Person { get; set; }
    }
}

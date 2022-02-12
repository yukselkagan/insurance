using Insurance.Entity.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Insurance.Entity.Models
{
    public class Agreement : EntityBase
    {
        public int AgreementId { get; set; }
        public string AgreementName { get; set; }
        public int PolicyId { get; set; }
        public double TotalPrice { get; set; }
        public int Installment { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public Person Person { get; set; }

    }
}

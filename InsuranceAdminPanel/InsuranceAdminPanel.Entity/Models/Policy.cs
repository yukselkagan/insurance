using InsuranceAdminPanel.Entity.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceAdminPanel.Entity.Models
{
    public class Policy : EntityBase
    {
        public int PolicyId { get; set; }
        public string PolicyName { get; set; }
        public double PolicyPrice { get; set; }
    }
}

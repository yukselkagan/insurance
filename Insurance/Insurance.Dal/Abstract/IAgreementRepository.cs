using Insurance.Entity.Dto;
using Insurance.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Insurance.Dal.Abstract
{
    public interface IAgreementRepository
    {
        public List<Agreement> GetAll();
        public Agreement Add(Agreement item);
    }
}

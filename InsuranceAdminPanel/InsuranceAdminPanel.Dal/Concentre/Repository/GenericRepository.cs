using InsuranceAdminPanel.Dal.Abstract;
using InsuranceAdminPanel.Entity.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceAdminPanel.Dal.Concentre.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : EntityBase
    {
    }
}

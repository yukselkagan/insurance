using Insurance.Entity.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Insurance.Dal.Abstract
{
    public interface IGenericRepository<T> where T : EntityBase
    {
    }
}

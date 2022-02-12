using Insurance.Dal.Abstract;
using Insurance.Entity.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Insurance.Dal.Concentre.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : EntityBase
    {
    }
}

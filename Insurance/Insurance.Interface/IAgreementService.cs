using Insurance.Entity.Dto;
using Insurance.Entity.IBase;
using Insurance.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Insurance.Interface
{
    public interface IAgreementService : IGenericService<Agreement, AgreementDto>
    {
        public IResponse<List<AgreementDto>> GetAll();
        public IResponse<AgreementDto> Add(AgreementDto item, bool saveChanges = true);
    }
}

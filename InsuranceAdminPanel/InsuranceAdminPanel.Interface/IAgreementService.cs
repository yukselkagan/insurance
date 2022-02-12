using InsuranceAdminPanel.Entity.Dto;
using InsuranceAdminPanel.Entity.IBase;
using InsuranceAdminPanel.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceAdminPanel.Interface
{
    public interface IAgreementService : IGenericService<Agreement, AgreementDto>
    {
        public IResponse<List<AgreementDto>> GetAll();
    }
}

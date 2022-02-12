using InsuranceAdminPanel.Bll.Base;
using InsuranceAdminPanel.Dal.Abstract;
using InsuranceAdminPanel.Entity.Base;
using InsuranceAdminPanel.Entity.Dto;
using InsuranceAdminPanel.Entity.IBase;
using InsuranceAdminPanel.Entity.Models;
using InsuranceAdminPanel.Interface;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceAdminPanel.Bll
{
    public class AgreementManager : BllBase, IAgreementService
    {
        private readonly IAgreementRepository repository;
        public AgreementManager(IAgreementRepository repository)
        {
            this.repository = repository;
        }

        public IResponse<List<AgreementDto>> GetAll()
        {
            try
            {
                List<Agreement> itemList = repository.GetAll();
                List<AgreementDto> itemDtoList = itemList.Select(x => ObjectMapper.Mapper.Map<AgreementDto>(x)).ToList();

                return new Response<List<AgreementDto>>
                {
                    Message = "Success",
                    StatusCode = StatusCodes.Status200OK,
                    Data = itemDtoList
                };

            }
            catch (Exception ex)
            {
                return new Response<List<AgreementDto>>
                {
                    Message = "Error: " + ex.Message,
                    StatusCode = StatusCodes.Status500InternalServerError,
                    Data = null
                };

            }
        }



    }
}

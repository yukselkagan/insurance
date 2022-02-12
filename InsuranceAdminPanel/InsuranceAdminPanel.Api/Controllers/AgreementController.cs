using InsuranceAdminPanel.Api.Controllers.Base;
using InsuranceAdminPanel.Entity.Base;
using InsuranceAdminPanel.Entity.Dto;
using InsuranceAdminPanel.Entity.IBase;
using InsuranceAdminPanel.Entity.Models;
using InsuranceAdminPanel.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InsuranceAdminPanel.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgreementController : ApiBaseController<IAgreementService, Agreement, AgreementDto>
    {
        private readonly IAgreementService service;
        public AgreementController(IAgreementService service) : base(service)
        {
            this.service = service;
        }



        [HttpGet]
        public IResponse<List<AgreementDto>> GetAll()
        {
            try
            {
                IResponse<List<AgreementDto>> entity = service.GetAll();
                return entity;
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

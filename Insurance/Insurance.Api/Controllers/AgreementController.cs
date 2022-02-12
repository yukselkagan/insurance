using Insurance.Api.Controllers.Base;
using Insurance.Bll;
using Insurance.Dal.Concentre.Repository;
using Insurance.Entity.Base;
using Insurance.Entity.Dto;
using Insurance.Entity.IBase;
using Insurance.Entity.Models;
using Insurance.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Insurance.Api.Controllers
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





        [HttpPost]
        public IResponse<AgreementDto> Add(AgreementDto item)
        {
            try
            {
                IResponse<AgreementDto> response = service.Add(item);
                return response;
            }
            catch (Exception ex)
            {
                return new Response<AgreementDto>
                {
                    Message = "Error: " + ex.Message,
                    StatusCode = StatusCodes.Status500InternalServerError,
                    Data = null
                };
            }
        }










    }
}

using InsuranceAdminPanel.Entity.Base;
using InsuranceAdminPanel.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InsuranceAdminPanel.Api.Controllers.Base
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApiBaseController<TIService, T, TDto> : ControllerBase where TIService : IGenericService<T, TDto> where T : EntityBase
    {
        private readonly TIService service;
        public ApiBaseController(TIService service)
        {
            this.service = service;
        }
    }
}

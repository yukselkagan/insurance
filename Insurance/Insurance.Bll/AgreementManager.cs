using Insurance.Bll.Base;
using Insurance.Bll.Validators;
using Insurance.Dal.Abstract;
using Insurance.Dal.Concentre.Repository;
using Insurance.Entity.Base;
using Insurance.Entity.Dto;
using Insurance.Entity.IBase;
using Insurance.Entity.Models;
using Insurance.Interface;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Insurance.Bll
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
                    Message = "Error: "+ex.Message,
                    StatusCode = StatusCodes.Status500InternalServerError,
                    Data = null
                };
            }
            

        }

        public IResponse<AgreementDto> Add(AgreementDto itemDto, bool saveChanges = true)
        {
            try
            {
                Agreement item = ObjectMapper.Mapper.Map<Agreement>(itemDto);
                AgreementValidator agreementValidator = new AgreementValidator();
                agreementValidator.Validate(itemDto);
                var result = repository.Add(item);
                if (saveChanges)
                {
                    Save();
                }

                return new Response<AgreementDto>
                {
                    Message = "Success",
                    StatusCode = StatusCodes.Status200OK,
                    Data = ObjectMapper.Mapper.Map<AgreementDto>(result)
                };
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

        public void Save()
        {

        }


    }
}

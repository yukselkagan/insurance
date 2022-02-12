using AutoMapper;
using InsuranceAdminPanel.Entity.Dto;
using InsuranceAdminPanel.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceAdminPanel.Entity.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Agreement, AgreementDto>().ReverseMap();
            CreateMap<Person, PersonDto>().ReverseMap();
        }
    }
}

using AutoMapper;
using Insurance.Entity.Dto;
using Insurance.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Insurance.Entity.Mapper
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

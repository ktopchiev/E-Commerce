using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.MappingProfiles
{
    public class BasketProfile : Profile
    {
        public BasketProfile()
        {
            CreateMap<Basket, BasketDto>().ForMember(x => x.Items, i => i.MapFrom(m => m.Items));
        }
    }
}
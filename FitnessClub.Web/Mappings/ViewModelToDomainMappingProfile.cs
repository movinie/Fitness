using AutoMapper;
using System.Linq;
using FitnessClub.Model.Models;
using FitnessClub.Web.ViewModels;

namespace FitnessClub.Web.Mappings
{
    public class ViewModelToDomainMappingProfile : Profile
    {
        public override string ProfileName
        {
            get { return "ViewModelToDomainMappings"; }
        }

        protected override void Configure()
        {
            Mapper.CreateMap<SportViewModel, ClientSports>()
                .ForMember(g => g.Id, map => map.MapFrom(vm => vm.SportId))
                .ForMember(g => g.SportTitle, map => map.MapFrom(vm => vm.Name));

            Mapper.CreateMap<ClientViewModel, Clients>()
                              .ForMember(g => g.Id, map => map.MapFrom(vm => vm.ClientId))
               .ForMember(g => g.FirstName, map => map.MapFrom(vm => vm.FirstName))
               .ForMember(g => g.LastName, map => map.MapFrom(vm => vm.LastName))
               .ForMember(g => g.Gender, map => map.MapFrom(vm => vm.Gender))
               .ForMember(g => g.Email, map => map.MapFrom(vm => vm.Email))
               .ForMember(g => g.Date, map => map.MapFrom(vm => !string.IsNullOrEmpty(vm.Date) ?
               System.Convert.ToDateTime(vm.Date) :
               (System.DateTime?)null))
               .ForMember(g => g.City, map => map.MapFrom(vm => vm.City))
               .ForMember(g => g.Zip, map => map.MapFrom(vm => vm.Zip))
               .ForMember(g => g.Country, map => map.MapFrom(vm => vm.Country));              
        }
    }
}
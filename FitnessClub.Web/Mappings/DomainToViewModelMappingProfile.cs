using AutoMapper;
using FitnessClub.Web.ViewModels;
using System.Linq;
using FitnessClub.Model.Models;

namespace FitnessClub.Web.Mappings
{
    public class DomainToViewModelMappingProfile : Profile
    {
        public override string ProfileName
        {
            get { return "DomainToViewModelMappings"; }
        }

        protected override void Configure()
        {
            Mapper.CreateMap<ClientSports, SportViewModel>()
                .ForMember(g => g.SportId, map => map.MapFrom(vm => vm.SportId))
                .ForMember(g => g.Name, map => map.MapFrom(vm => vm.SportTitle));
            Mapper.CreateMap<Clients, ClientViewModel>()
    .ForMember(g => g.ClientId, map => map.MapFrom(vm => vm.Id))
    .ForMember(g => g.FirstName, map => map.MapFrom(vm => vm.FirstName))
    .ForMember(g => g.LastName, map => map.MapFrom(vm => vm.LastName))
    .ForMember(g => g.Gender, map => map.MapFrom(vm => vm.Gender))
    .ForMember(g => g.Email, map => map.MapFrom(vm => vm.Email))
    .ForMember(g => g.Date, map => map.MapFrom(vm => vm.Date.HasValue ?
    vm.Date.Value.ToString("yyyy/MM/dd") : string.Empty))
    .ForMember(g => g.City, map => map.MapFrom(vm => vm.City))
    .ForMember(g => g.Zip, map => map.MapFrom(vm => vm.Zip))
    .ForMember(g => g.Country, map => map.MapFrom(vm => vm.Country));
        }
    }
}
using System.Net.Http;
using FitnessClub.Service;
using System.Web.Http;
using FitnessClub.Model.Models;
using AutoMapper;
using System.Collections.Generic;
using FitnessClub.Web.ViewModels;
using System.Linq;

namespace FitnessClub.Web.Controllers
{
    public class ClientApiController : BaseAPIController
    {
        private readonly IClientsService _clientsService;

        public ClientApiController(IClientsService clientsService)
        {
            _clientsService = clientsService;
        }
        
        public HttpResponseMessage Get()
        {
            return ToJson(Mapper.Map<IEnumerable<Clients>, IEnumerable<ClientViewModel>>(_clientsService.Get()));
        }

        public HttpResponseMessage Post([FromBody]ClientViewModel value)
        {
            return ToJson(_clientsService.Create(Mapper.Map<ClientViewModel, Clients>(value)));
        }

        public HttpResponseMessage Put(int id, [FromBody]ClientViewModel value)
        {
            return ToJson(_clientsService.Update(id, Mapper.Map<ClientViewModel, Clients>(value)));
        }

        public HttpResponseMessage Delete(int id)
        {
            return ToJson(_clientsService.Delete(id));
        }
    }
}

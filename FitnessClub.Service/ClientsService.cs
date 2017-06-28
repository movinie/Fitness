using System.Collections.Generic;
using FitnessClub.Model.Models;
using FitnessClub.Data.Repositories;

namespace FitnessClub.Service
{
    public interface IClientsService
    {
        bool Create(Clients client);
        IEnumerable<Clients> Get();
        bool Update(int id, Clients client);
        bool Delete(int id);
    }

    public class ClientsService : IClientsService
    {
        private readonly IClientsRepository _clientsRepository;

        public ClientsService(IClientsRepository clientsRepository)
        {
            this._clientsRepository = clientsRepository;
        }

        #region IClientsRepository Clients

        public bool Create(Clients client)
        {
           return _clientsRepository.Create(client);
        }
       
        public IEnumerable<Clients> Get()
        {
            return _clientsRepository.Get();
        }

        public bool Update(int id, Clients client)
        {
            return _clientsRepository.Update(id, client);
        }

        public bool Delete(int id)
        {
            return _clientsRepository.Delete(id);
        }

        #endregion
    }
}

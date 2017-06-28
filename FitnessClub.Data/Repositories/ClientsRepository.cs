using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using FitnessClub.Model.Models;
using FitnessClub.Data.Infrastructure;

namespace FitnessClub.Data.Repositories
{
    public class ClientsRepository : RepositoryBase<Clients>, IClientsRepository
    {
        public ClientsRepository(IDbFactory dbFactory)
            : base(dbFactory) { }

        public Clients Get(int id)
        {
            return DbContext.Clients.FirstOrDefault(c => c.Id == id);
        }

        public IEnumerable<Clients> Get()
        {
            return DbContext.Clients.Include(m=>m.ClientSports);
        }
        
        public IEnumerable<Clients> Get(int page, int pageSize)
        {
            return DbContext
                .Clients
                .Skip(page * pageSize)
                .Take(pageSize)
                .ToList();
        }

        public bool Create(Clients client)
        {
            try
            {
                DbContext.Clients.Add(client);
                DbContext.SaveChanges();
                return true;
            }
            catch { return false; }
        }

        public bool Update(int id, Clients client)
        {
            var item = DbContext.Clients
                .Include(m => m.ClientSports)
                .FirstOrDefault(m => m.Id == id);
            if (item != null)
            {
                try
                {
                    DbContext.Entry(item).CurrentValues.SetValues(client);
                    if (item.ClientSports != null && item.ClientSports.Any()&& client.ClientSports!=null && client.ClientSports.Any())
                    {
                        foreach (var sport in item.ClientSports.ToList())
                        {
                            if (client.ClientSports.FirstOrDefault(m => m.SportId == sport.SportId) == null)
                                DbContext.ClientSports.Remove(sport);
                        }
                    }
                    if (client.ClientSports != null&& client.ClientSports.Any())
                    {
                        foreach (var sport in client.ClientSports)
                        {
                            if (item.ClientSports != null && 
                                (!item.ClientSports.Any() || item.ClientSports.FirstOrDefault(m => m.SportId == sport.SportId) ==
                                                             null))
                            {
                                var clientSport = new ClientSports { SportId = sport.SportId, ClientId = item.Id };
                                DbContext.ClientSports.Attach(clientSport);
                                DbContext.ClientSports.Add(clientSport);
                            }
                        }
                    }


                    DbContext.SaveChanges();
                    return true;
                }
                catch { return false; }
            }
            return false;
        }

        public bool Delete(int id)
        {
            var item = DbContext.Clients.FirstOrDefault(m => m.Id == id);
            if (item != null)
            {
                try
                {
                    DbContext.Clients.Remove(item);
                    DbContext.SaveChanges();
                }
                catch { return false; }
            }
            return false;
        }
    }

    public interface IClientsRepository : IRepository<Clients>
    {
        Clients Get(int id);
        IEnumerable<Clients> Get();
        bool Create(Clients client);
        bool Update(int id, Clients client);
        bool Delete(int id);
    }
}

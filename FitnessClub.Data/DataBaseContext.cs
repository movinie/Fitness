using System.Collections.Generic;
using System.Data.Entity;
using FitnessClub.Model.Models;

namespace FitnessClub.Data
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext() : base("DataBaseContext") { }

        public DbSet<Clients> Clients { get; set; }
        public DbSet<ClientSports> ClientSports { get; set; }
    }

    public class DatabaseInitializer : CreateDatabaseIfNotExists<DataBaseContext>
    {
        protected override void Seed(DataBaseContext context)
        {
            GetClients().ForEach(c => context.Clients.Add(c));
            context.SaveChanges();
            base.Seed(context);
        }

        private static List<Clients> GetClients()
        {
            return new List<Clients>
           {
               new Clients
               {
                   FirstName ="Алла",
                   LastName ="Смирнова",
                   Gender ="Женский",
                   Email ="allasmirnova@mail.ru",
                   Date =System.DateTime.Now.AddYears(-1),
                   City ="Москва",
                   Zip ="451236",
                   Country ="Россия",
               }
           };
        }
    }
}

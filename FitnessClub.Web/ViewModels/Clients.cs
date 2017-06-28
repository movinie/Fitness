using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FitnessClub.Web.ViewModels
{
    public class ClientsViewModel
    {
        public IEnumerable<ClientViewModel> Clients { get; set; }
    }

    public class ClientViewModel
    {
        public int ClientId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Date { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        public string Country { get; set; }
        public List<SportViewModel> ClientSports { get; set; }
    }

    public class SportViewModel
    {
        public short SportId { get; set; }
        public string Name { get; set; }
    }
}
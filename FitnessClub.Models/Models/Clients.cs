using System;
using System.Collections;
using System.Collections.Generic;

namespace FitnessClub.Model.Models
{
    public class Clients
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public DateTime? Date { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        public string Country { get; set; }

        public ICollection<ClientSports> ClientSports { get; set; }
    }
}
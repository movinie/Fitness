using FitnessClub.Model.Models;


namespace FitnessClub.Model.Models
{
   public class ClientSports
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public short SportId { get; set; }
        public string SportTitle { get; set; }

        public Clients Client { get; set; }
    }
}

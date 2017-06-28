using FitnessClub.Service;
using System.Web.Mvc;

namespace FitnessClub.Web.Controllers
{
    public class MainController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
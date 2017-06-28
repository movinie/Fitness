using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace FitnessClub.Web.Controllers
{
    public class BaseAPIController : ApiController
    {    
        protected HttpResponseMessage ToJson(dynamic obj)
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(obj), 
                Encoding.UTF8, "application/json");
            return response;
        }

        protected HttpResponseMessage ErrorJson(dynamic obj)
        {
            var response = Request.CreateResponse(HttpStatusCode.Unauthorized);
            response.Content = new StringContent(JsonConvert.SerializeObject(obj), 
                Encoding.UTF8, "application/json");
            return response;
        }
    }
}

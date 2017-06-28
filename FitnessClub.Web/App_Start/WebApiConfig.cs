using System.Net.Http.Headers;
using System.Web.Http;


namespace FitnessClub.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Formatters.JsonFormatter
                .SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/octet-stream"));

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}

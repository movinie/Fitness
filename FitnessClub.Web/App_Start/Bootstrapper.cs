using System.Reflection;
using System.Web.Mvc;
using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using FitnessClub.Data.Infrastructure;
using FitnessClub.Data.Repositories;
using FitnessClub.Service;
using FitnessClub.Web.Mappings;
using System.Web.Http;

namespace FitnessClub.Web.App_Start
{
    public static class Bootstrapper
    {
        public static void Run()
        {
            SetAutofacContainer();
            AutoMapperConfiguration.Configure();
        }

        private static void SetAutofacContainer()
        {
            var builder = new ContainerBuilder();
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterControllers(Assembly.GetExecutingAssembly());
            builder.RegisterType<DbFactory>().As<IDbFactory>().InstancePerRequest();

               builder.RegisterAssemblyTypes(typeof(ClientsRepository).Assembly)
                   .Where(t => t.Name.EndsWith("Repository"))
                   .AsImplementedInterfaces().InstancePerRequest();
               builder.RegisterAssemblyTypes(typeof(ClientsService).Assembly)
                  .Where(t => t.Name.EndsWith("Service"))
                  .AsImplementedInterfaces().InstancePerRequest();
   

          /*  builder.RegisterType<ClientsRepository>().As<IClientsRepository>();
            builder.RegisterType<ClientsService>().As<IClientsService>();*/

            IContainer container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
            GlobalConfiguration.Configuration.DependencyResolver = 
                new AutofacWebApiDependencyResolver(container);
        }
    }
}
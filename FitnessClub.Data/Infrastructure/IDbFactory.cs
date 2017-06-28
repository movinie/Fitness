using System;

namespace FitnessClub.Data.Infrastructure
{
    public interface IDbFactory : IDisposable
    {
        DataBaseContext Init();
    }
}

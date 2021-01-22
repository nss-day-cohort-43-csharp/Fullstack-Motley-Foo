using System.Collections.Generic;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public interface ISubscriptionRepository
    {
        void Add(Subscription subscription);
        List<Subscription> GetByUserId(int userId);
        void Update(Subscription subscription);
    }
}
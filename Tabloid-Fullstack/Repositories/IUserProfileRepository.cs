using Tabloid_Fullstack.Models;
using System.Collections.Generic;

namespace Tabloid_Fullstack.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        List<UserProfile> GetAll();
        void Update(UserProfile userProfile);
        UserProfile GetByFirebaseUserIdBare(string firebaseUserId);
    }
}
using System.Collections.Generic;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public interface IPostTagRepository
    {
        void Add(int postId, int tagId);
        void Delete(int id);
        List<PostTag> GetAll();
        List<PostTag> GetByPostId(int id);
    }
}
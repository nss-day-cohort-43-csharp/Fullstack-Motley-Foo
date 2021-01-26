using System.Collections.Generic;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public interface ICommentRepository
    {
        public List<Comment> GetByPostId(int id);

        public void Add(Comment comment);

        public void Delete(int id);

        public Comment GetByCommentId(int id);
    }
}
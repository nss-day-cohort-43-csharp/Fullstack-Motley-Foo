using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Data;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private ApplicationDbContext _context;
        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Comment> GetByPostId(int id)
        {
            return _context.Comment.Where(c => c.PostId == id).OrderBy(c => c.CreateDateTime).ToList();
        }

        public void Add(Comment category)
        {
            _context.Add(category);
            _context.SaveChanges();
        }
    }
}

using Microsoft.EntityFrameworkCore;
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
            return _context.Comment
                .Include(c => c.UserProfile)
                .Where(c => c.PostId == id)
                .OrderBy(c => c.CreateDateTime)
                .ToList();
        }

        public void Add(Comment comment)
        {
            _context.Add(comment);
            _context.SaveChanges();
        }

        public void Delete(Comment comment)
        {
            _context.Comment.Remove(comment);
            _context.SaveChanges();
        }
    }
}

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
                .OrderByDescending(c => c.CreateDateTime)
                .ToList();
        }

        public Comment GetByCommentId(int id)
        {
            return _context.Comment.Where(c => c.Id == id).FirstOrDefault();
        }

        public void Add(Comment comment)
        {
            _context.Add(comment);
            _context.SaveChanges();
        }

        public void Update(Comment comment)
        {
            _context.Entry(comment).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {

            var comment = _context.Comment.Where(c => c.Id == id).FirstOrDefault();

            _context.Comment.Remove(comment);
            _context.SaveChanges();
        }
    }
}

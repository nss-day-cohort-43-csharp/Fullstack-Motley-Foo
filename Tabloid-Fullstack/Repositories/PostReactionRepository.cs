using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Data;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public class PostReactionRepository : IPostReactionRepository
    {
        private ApplicationDbContext _context;

        public PostReactionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Add(PostReaction postReaction)
        {
            _context.Add(postReaction);
            _context.SaveChanges();
        }
    }
}

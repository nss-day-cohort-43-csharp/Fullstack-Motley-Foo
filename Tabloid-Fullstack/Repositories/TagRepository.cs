using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Data;
using Tabloid_Fullstack.Models;
using Microsoft.EntityFrameworkCore;

namespace Tabloid_Fullstack.Repositories
{
    public class TagRepository : ITagRepository
    {
        private ApplicationDbContext _context;
        public TagRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Tag> Get()
        {
            return _context.Tag.OrderBy(c => c.Name).ToList();
        }
        public Tag GetById(int id)
        {
            return _context.Tag.FirstOrDefault(p => p.Id == id);
        }
        public List<Tag> GetActiveTags()
        {
            return _context.Tag.Where(c => c.Active == true).ToList();
        }
        public void Add(Tag tag)
        {
            _context.Add(tag);
            _context.SaveChanges();
        }
        public void Update(Tag tag)
        {
            _context.Entry(tag).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}

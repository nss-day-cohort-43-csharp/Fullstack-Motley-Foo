using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Data;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private ApplicationDbContext _context;
        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Category> Get()
        {
            return _context.Category.OrderBy(c => c.Name).ToList();
        }

        public void Add(Category category)
        {
            _context.Add(category);
            _context.SaveChanges();
        }

        public void deleteCategory(int id)
        {
            Category cat = (Category)_context.Category.Where(c => c.Id == id).First();
            _context.Category.Remove(cat);
        }
    }
}

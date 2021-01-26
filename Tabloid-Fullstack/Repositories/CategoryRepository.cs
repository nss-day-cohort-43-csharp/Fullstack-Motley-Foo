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
            return _context.Category.OrderBy(c => c.Name).Where(c=>c.IsActive==true).ToList();
        }

        public void Add(Category category)
        {
            _context.Add(category);
            _context.SaveChanges();
        }

        public void deleteCategory(int id)
        {
            var cat = _context.Category.FirstOrDefault(c => c.Id == id);
            if (cat != null)
            {
                cat.IsActive = false;
                _context.SaveChanges();
            }
        }
        public void editCategory(Category category, int id)
        {
            Category cat = _context.Category.FirstOrDefault(c => c.Id == id);
            if (cat!= null&&category.Name!=null)
            {
                cat.Name = category.Name;
                _context.SaveChanges();
            }
        }
    }
}

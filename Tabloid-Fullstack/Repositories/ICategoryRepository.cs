using System.Collections.Generic;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> Get();
        void Add(Category category);
        void deleteCategory(int id);
    }
}
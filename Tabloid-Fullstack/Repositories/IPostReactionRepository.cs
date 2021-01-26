using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public interface IPostReactionRepository
    {
        void Add(PostReaction postReaction);
    }
}
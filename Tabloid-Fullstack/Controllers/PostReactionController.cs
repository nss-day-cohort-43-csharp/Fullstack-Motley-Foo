using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Repositories;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class PostReactionController : ControllerBase
    {
        private IPostReactionRepository _postReactionRepo;

        public PostReactionController(IPostReactionRepository postReactionRepo)
        {
            _postReactionRepo = postReactionRepo;
        }

        [HttpPost]
        public IActionResult Post(PostReaction postReaction)
        {
            _postReactionRepo.Add(postReaction);
            return NoContent();
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Repositories;
using Tabloid_Fullstack.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Tabloid_Fullstack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class PostReactionController : ControllerBase
    {
        private IPostReactionRepository _postReactionRepo;
        private IUserProfileRepository _userRepo;

        public PostReactionController(IPostReactionRepository postReactionRepo, IUserProfileRepository userRepo)
        {
            _postReactionRepo = postReactionRepo;
            _userRepo = userRepo;
        }

        [HttpPost]
        public IActionResult Post(PostReaction postReaction)
        {
            var currentUser = GetCurrentUserProfile();

            if (currentUser.Id != postReaction.UserProfileId)
            {
                return Unauthorized();
            }

            _postReactionRepo.Add(postReaction);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}

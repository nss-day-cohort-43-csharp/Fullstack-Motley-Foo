using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Models.ViewModels;
using Tabloid_Fullstack.Repositories;
using Tabloid_Fullstack.Models;
using System.Security.Claims;

namespace Tabloid_Fullstack.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostTagController : ControllerBase
    {

        private IPostTagRepository _postTagRepo;
        private IUserProfileRepository _userRepo;
        private IPostRepository _postRepo;
        private ITagRepository _tagRepo;

        public PostTagController(IPostTagRepository postTagRepo, IUserProfileRepository userRepo, IPostRepository postRepo, ITagRepository tagRepo)
        {
            _postTagRepo = postTagRepo;
            _userRepo = userRepo;
            _postRepo = postRepo;
            _tagRepo = tagRepo;
        }


        [HttpGet]
        public IActionResult Get()
        {
            var postTags = _postTagRepo.GetAll();
            return Ok(postTags);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var postTags = _postTagRepo.GetByPostId(id);
            if (postTags == null)
            {
                return NotFound();
            }

            return Ok(postTags);
        }
        [HttpPost]
        public IActionResult Post(PostTag postTag)
        {
            var currentUser = GetCurrentUserProfile();
            var postUserId = _postRepo.GetById(postTag.PostId);

            if (currentUser.Id != postUserId.UserProfileId)
            {
                return NotFound();
            }

            _postTagRepo.Add(postTag);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUser = GetCurrentUserProfile();
            var postUserId = _postRepo.GetById(id);

            if (currentUser.Id != postUserId.UserProfileId)
            {
                return NotFound();
            }

            _postTagRepo.Delete(id);
            return NoContent();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
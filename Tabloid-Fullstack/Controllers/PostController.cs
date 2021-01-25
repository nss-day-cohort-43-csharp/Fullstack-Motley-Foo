using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid_Fullstack.Models;
using Tabloid_Fullstack.Models.ViewModels;
using Tabloid_Fullstack.Repositories;

namespace Tabloid_Fullstack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {

        private IPostRepository _repo;
        private IUserProfileRepository _userRepo;
        private ICommentRepository _commentRepo;

        public PostController(IPostRepository repo, IUserProfileRepository userRepo, ICommentRepository commentRepo)
        {
            _repo = repo;
            _userRepo = userRepo;
            _commentRepo = commentRepo;
        }


        [HttpGet]
        public IActionResult Get()
        {
            var posts = _repo.Get();
            return Ok(posts);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var post = _repo.GetById(id);
            if (post == null)
            {
                return NotFound();
            }

            var reactionCounts = _repo.GetReactionCounts(id);
            var comments = _commentRepo.GetByPostId(id);
            var readTime = post.Content.Length / 265;
            var postDetails = new PostDetails()
            {
                Post = post,
                ReactionCounts = reactionCounts,
                Comments = comments,
                ReadTime=readTime
            };
            return Ok(postDetails);
        }

        [HttpGet("getbyuser/{id}")]
        public IActionResult GetByUser(int id)
        {
            var posts = _repo.GetByUserProfileId(id);
            return Ok(posts);
        }

        [HttpPost]
        public IActionResult Post(Post post)
        {
            var currentUser = GetCurrentUserProfile();

            post.UserProfileId = currentUser.Id;

            _repo.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = GetCurrentUserProfile();
            var postToDelete = _repo.GetById(id);

            if (postToDelete.UserProfileId != user.Id)
            {
                return Unauthorized();
            }           
            
            _repo.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            var user = GetCurrentUserProfile();

            if (user.Id != post.UserProfileId)
            {
                return Unauthorized();
            }

            _repo.Update(post);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserIdBare(firebaseUserId);
        }
    }
}

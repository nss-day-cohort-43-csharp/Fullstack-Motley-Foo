using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {

        private ICommentRepository _commentRepo;
        private IUserProfileRepository _userRepo;

        public CommentController(ICommentRepository commentRepo, IUserProfileRepository userRepo)
        {
            _commentRepo = commentRepo;
            _userRepo = userRepo;
        }

        [HttpGet("{id}")]
        public IActionResult GetByPostId(int id) 
        {
            var comments = _commentRepo.GetByPostId(id);
            return Ok(comments);
        }


        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            var User = GetCurrentUserProfile();
            comment.UserProfileId = User.Id;
            comment.CreateDateTime = DateTime.Now;
            _commentRepo.Add(comment);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            var user = GetCurrentUserProfile();
            if (user.Id != comment.UserProfileId)
            {
                return Unauthorized();
            }

            var existingComment = _commentRepo.GetByCommentId(comment.Id);

            existingComment.Content = comment.Content;
            existingComment.Subject = comment.Subject;

            _commentRepo.Update(existingComment);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id) 
        {
            var user = GetCurrentUserProfile();
            var commentToDelete = _commentRepo.GetByCommentId(id);

            if (commentToDelete.UserProfileId != user.Id)
            {
                return Unauthorized();
            }

            _commentRepo.Delete(id);
            return NoContent();

        }
        
        //this is a tool to simply get the current user.
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}

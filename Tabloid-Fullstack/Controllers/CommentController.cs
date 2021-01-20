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
    public class CommentController : ControllerBase
    {

        private ICommentRepository _commentRepo;
        private IUserProfileRepository _userRepo;

        public CommentController(ICommentRepository commentRepo, IUserProfileRepository userRepo)
        {
            _commentRepo = commentRepo;
            _userRepo = userRepo;
        }


        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            _commentRepo.Add(comment);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }
    }
}

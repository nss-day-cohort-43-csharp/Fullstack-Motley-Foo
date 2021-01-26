using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid_Fullstack.Models;
using Tabloid_Fullstack.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid_Fullstack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TagController : ControllerBase
    {
        private ITagRepository _tagRepo;
        private IUserProfileRepository _userRepo;

        public TagController(ITagRepository tagRepo, IUserProfileRepository userRepo)
        {
            _tagRepo = tagRepo;
            _userRepo = userRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var tags = _tagRepo.Get();
            return Ok(tags);
        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var tag = _tagRepo.GetById(id);
            return Ok(tag);
        }

        [HttpGet("active/")]
        public IActionResult GetActiveTags()
        {
            var tags = _tagRepo.GetActiveTags();
            return Ok(tags);
        }

        [HttpPost]
        public IActionResult Post(Tag tag)
        {
            var currentUser = GetCurrentUserProfile();

            if (currentUser.UserTypeId != UserType.ADMIN_ID)
            {
                return NotFound();
            }

            _tagRepo.Add(tag);
            return CreatedAtAction("Get", new { id = tag.Id }, tag);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, Tag tag)
        {
            if (id != tag.Id)
            {
                return BadRequest();
            }

            _tagRepo.Update(tag);
            return NoContent();
        }


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}

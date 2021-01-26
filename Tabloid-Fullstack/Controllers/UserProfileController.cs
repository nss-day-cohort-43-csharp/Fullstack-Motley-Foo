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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _repo;
        public UserProfileController(IUserProfileRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            var user = _repo.GetByFirebaseUserId(firebaseUserId);
            if (user.Active == false)
            {
                return BadRequest();
            }
            else
            {
                return Ok(user);
            }

        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.UserTypeId = UserType.AUTHOR_ID;
            userProfile.Active = true;
            _repo.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            var currentUser = GetCurrentUserProfile();

            if (currentUser.UserTypeId != UserType.ADMIN_ID)
            {
                return NotFound();
            }

            var tags = _repo.GetAll();
            return Ok(tags);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile userProfile)
        {
            var currentUser = GetCurrentUserProfile();

            if (currentUser.Id == userProfile.Id)
            {
                currentUser.UserTypeId = userProfile.UserTypeId;
                _repo.Update(currentUser);
                return NoContent();
            }


            if (currentUser.UserTypeId != UserType.ADMIN_ID)
            {
                return NotFound();
            }
            else
            {
                _repo.Update(userProfile);
                return NoContent();
            }                                 
        }

        [HttpPut]
        public IActionResult Put(UserProfile userProfile)
        {
            var currentUser = GetCurrentUserProfile();

            if (currentUser.Id == userProfile.Id)
            {
                currentUser.UserTypeId = userProfile.UserTypeId;
                _repo.Update(currentUser);
                return NoContent();
            }


            if (currentUser.UserTypeId != UserType.ADMIN_ID)
            {
                return NotFound();
            }
            else
            {
                _repo.Update(userProfile);
                return NoContent();
            }
        }




        //private bool Auth()
        //{
        //    var currentUser = GetCurrentUserProfile();

        //    if (currentUser.UserTypeId != UserType.ADMIN_ID)
        //    {
        //        return false;
        //    }
        //    else
        //    {
        //        return true;
        //    }
        //    //return true;
        //}

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _repo.GetByFirebaseUserIdBare(firebaseUserId);
        }
    }
}

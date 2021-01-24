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
    public class SubscriptionController : ControllerBase
    {
        private ISubscriptionRepository _subRepo;
        private IUserProfileRepository _userRepo;

        public SubscriptionController(ISubscriptionRepository subRepo, IUserProfileRepository userRepo)
        {
            _subRepo = subRepo;
            _userRepo = userRepo;
        }

        [HttpGet("getbyuser/{userProfileId}")]
        public IActionResult GetById(int userProfileId)
        {
            if(GetCurrentUserProfile().Id != userProfileId)
            {
                return null;
            }

            List <Subscription> subs = _subRepo.GetByUserId(userProfileId);
            return Ok(subs);
        }

        [HttpPost]
        public IActionResult Post(Subscription subscription)
        {
            subscription.BeginDateTime = DateTime.Now;
            subscription.EndDateTime = DateTime.MaxValue;
            var currentUser = GetCurrentUserProfile();

            if (currentUser.Id != subscription.SubscriberUserProfileId)
            {
                return NotFound();
            }

            _subRepo.Add(subscription);
            return CreatedAtAction("Get", new { id = subscription.Id }, subscription);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Subscription subscription)
        {

            if (id != subscription.Id)
            {
                return BadRequest();
            }

            if(subscription.EndDateTime > DateTime.Now)
            {
                subscription.EndDateTime = DateTime.Now;
            }
            else
            {
                subscription.EndDateTime = DateTime.MaxValue;
            }

            _subRepo.Update(subscription);
            return NoContent();
        }


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Data;
using Tabloid_Fullstack.Models;
using Microsoft.EntityFrameworkCore;
using Tabloid_Fullstack.Models.ViewModels;

namespace Tabloid_Fullstack.Repositories
{
    public class SubscriptionRepository : ISubscriptionRepository
    {
        private ApplicationDbContext _context;
        public SubscriptionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Subscription> GetByUserId(int userId)
        {
            return _context.Subscription.Where(sub => sub.SubscriberUserProfileId == userId).ToList();
        }
        public void Add(Subscription subscription)
        {
            _context.Add(subscription);
            _context.SaveChanges();
        }
        public void Update(Subscription subscription)
        {
            _context.Entry(subscription).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public List<Subscription> GetSubscribedPosts(int userId)
        {
            return _context.Subscription.Where(sub => sub.SubscriberUserProfileId == userId)
                .Include(sub => sub.ProviderUserProfile)
                .Include(sub => sub.ProviderUserProfile.Post).ThenInclude(p => p.Category)
                .ToList();
        }
    }
}

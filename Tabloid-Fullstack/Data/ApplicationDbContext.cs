﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Models;


namespace Tabloid_Fullstack.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Post> Post { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<UserProfile> UserProfile { get; set; }
        public DbSet<UserType> UserType { get; set; }
        public DbSet<Reaction> Reaction { get; set; }
        public DbSet<PostReaction> PostReaction { get; set; }
        public DbSet<Tag> Tag { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<PostTag> PostTag { get; set; }
        public DbSet<Subscription> Subscription { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Subscription>()
                .HasOne(s => s.SubscriberUserProfile)
                .WithMany(up => up.Subscriptions)
                .HasForeignKey(s => s.SubscriberUserProfileId);
        }
    }
}

﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Data;
using Tabloid_Fullstack.Models;
using Tabloid_Fullstack.Models.ViewModels;

namespace Tabloid_Fullstack.Repositories
{
  public class PostRepository : IPostRepository
  {
    private ApplicationDbContext _context;

    public PostRepository(ApplicationDbContext context)
    {
      _context = context;
    }

    public List<PostSummary> Get()
    {
      return _context.Post
          .Include(p => p.Category)
          .Where(p => p.IsApproved)
          .Where(p => p.PublishDateTime <= DateTime.Now)
          .OrderByDescending(p => p.PublishDateTime)
          .Select(p => new PostSummary()
          {
            Id = p.Id,
            ImageLocation = p.ImageLocation,
            Title = p.Title,
            AuthorId = p.UserProfileId,
            AuthorName = p.UserProfile.DisplayName,
            AbbreviatedText = p.Content.Substring(0, 200),
            PublishDateTime = p.PublishDateTime,
            Category = p.Category
          })
          .ToList();
    }

    public Post GetById(int id)
    {
      return _context.Post
          .Include(p => p.UserProfile)
          .Include(p => p.Category)
          .Include(p => p.PostReactions)
          .Include(p => p.PostTags)
          .Include(p => p.Comments)
          .Where(p => p.Id == id && p.PublishDateTime < DateTime.Now)
          .FirstOrDefault();
    }

    public List<ReactionCount> GetReactionCounts(int postId)
    {
      return _context.Reaction
          .Select(r => new ReactionCount()
          {
            Reaction = r,
            Count = r.PostReactions.Count(pr => pr.PostId == postId)
          })
          .ToList();
    }

    public void Add(Post post)
    {
      post.CreateDateTime = DateTime.Now;

      if (post.PublishDateTime == null)
      {
        post.PublishDateTime = DateTime.Now;
      }

      _context.Add(post);
      _context.SaveChanges();
    }

    public void Update(Post post)
    {
      _context.Entry(post).State = EntityState.Modified;
      _context.SaveChanges();
    }

    public void Delete(int id)
    {
      var post = GetById(id);

      var comments = post.Comments;
      foreach (Comment comment in comments)
      {
        _context.Comment.Remove(comment);
      }

      var postReactions = post.PostReactions;
      foreach (PostReaction postReaction in postReactions)
      {
        _context.PostReaction.Remove(postReaction);
      }

      var tags = post.PostTags;
      foreach (PostTag tag in tags)
      {
        _context.PostTag.Remove(tag);
      }

      _context.Post.Remove(post);
      _context.SaveChanges();
    }

    public List<PostSummary> GetByUserProfileId(int id)
    {
      return _context.Post
          .Include(p => p.Category)
          .Where(p => p.UserProfileId == id)
          .OrderByDescending(p => p.CreateDateTime)
          .Select(p => new PostSummary()
          {
            Id = p.Id,
            ImageLocation = p.ImageLocation,
            Title = p.Title,
            AuthorId = p.UserProfileId,
            AuthorName = p.UserProfile.DisplayName,
            AbbreviatedText = p.Content.Substring(0, 200),
            PublishDateTime = p.PublishDateTime,
            Category = p.Category
          })
          .ToList();
    }


    public List<PostTag> GetByTagId(int tagId)
    {
      return _context.PostTag
          .Where(pt => pt.TagId == tagId)
          .Include(pt => pt.Post).ThenInclude(p => p.Category)
          .Include(pt => pt.Post.UserProfile)
          .ToList();
    }
    public List<PostSummary> GetHome()
    {
      return _context.Post
         .Include(p => p.Category)
         .Where(p => p.IsApproved)
         .Where(p => p.PublishDateTime <= DateTime.Now)
         .OrderByDescending(p => p.PublishDateTime)
         .Take(4)
         .Select(p => new PostSummary()
         {
           Id = p.Id,
           ImageLocation = p.ImageLocation,
           Title = p.Title,
           AuthorId = p.UserProfileId,
           AuthorName = p.UserProfile.DisplayName,
           AbbreviatedText = p.Content.Substring(0, 200),
           PublishDateTime = p.PublishDateTime,
           Category = p.Category
         })
         .ToList();
    }
    public List<PostSummary> GetUnapprovedPosts()
    {
      return _context.Post
         .Include(p => p.Category)
         .Where(p => !p.IsApproved)
         .Where(p => p.PublishDateTime <= DateTime.Now)
         .OrderBy(p => p.PublishDateTime)
         .Select(p => new PostSummary()
         {
           Id = p.Id,
           ImageLocation = p.ImageLocation,
           Title = p.Title,
           AuthorId = p.UserProfileId,
           AuthorName = p.UserProfile.DisplayName,
           AbbreviatedText = p.Content.Substring(0, 200),
           PublishDateTime = p.PublishDateTime,
           Category = p.Category
         })
         .ToList();
    }
  }
}

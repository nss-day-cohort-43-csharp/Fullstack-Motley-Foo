﻿using System.Collections.Generic;
using Tabloid_Fullstack.Models;
using Tabloid_Fullstack.Models.ViewModels;

namespace Tabloid_Fullstack.Repositories
{
  public interface IPostRepository
  {
    void Add(Post post);
    void Delete(int id);
    List<PostSummary> Get();
    Post GetById(int id);

    List<PostSummary> GetByUserProfileId(int id);
    List<ReactionCount> GetReactionCounts(int postId);
    void Update(Post post);
    List<PostTag> GetByTagId(int tagId);
    List<PostSummary> GetHome();
    List<PostSummary> GetUnapprovedPosts();

  }
}
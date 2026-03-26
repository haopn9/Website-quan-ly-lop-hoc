using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Group
{
    public int GroupId { get; set; }

    public string GroupName { get; set; } = null!;

    public int MaxMembers { get; set; }

    public int ClassId { get; set; }

    public int? LeaderId { get; set; }

    public virtual Class Class { get; set; } = null!;

    public virtual User? Leader { get; set; }

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();

    public virtual ICollection<User> Students { get; set; } = new List<User>();
}

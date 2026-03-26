using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? UserCode { get; set; }

    public string Username { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public DateOnly? BirthDay { get; set; }

    public string? Address { get; set; }

    public bool? Sex { get; set; }

    public string? NumberPhone { get; set; }

    public string? Email { get; set; }

    public string? AvatarUrl { get; set; }

    public int RoleId { get; set; }

    public virtual ICollection<Class> Classes { get; set; } = new List<Class>();

    public virtual ICollection<Group> Groups { get; set; } = new List<Group>();

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();

    public virtual Role Role { get; set; } = null!;

    public virtual ICollection<TaskHistory> TaskHistories { get; set; } = new List<TaskHistory>();

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();

    public virtual ICollection<Class> ClassesNavigation { get; set; } = new List<Class>();

    public virtual ICollection<Group> GroupsNavigation { get; set; } = new List<Group>();
}

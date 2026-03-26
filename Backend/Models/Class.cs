using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Class
{
    public int ClassId { get; set; }

    public string? ClassCode { get; set; }

    public string ClassName { get; set; } = null!;

    public string? Description { get; set; }

    public int TeacherId { get; set; }

    public virtual ICollection<Group> Groups { get; set; } = new List<Group>();

    public virtual User Teacher { get; set; } = null!;

    public virtual ICollection<User> Students { get; set; } = new List<User>();
}

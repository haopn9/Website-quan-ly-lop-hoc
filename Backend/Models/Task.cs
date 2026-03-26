using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Task
{
    public int TaskId { get; set; }

    public int GroupId { get; set; }

    public string TaskName { get; set; } = null!;

    public string? Description { get; set; }

    public int? AssigneeId { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? DueDate { get; set; }

    public string? Priority { get; set; }

    public string? Status { get; set; }

    public int? CompletionPercent { get; set; }

    public virtual User? Assignee { get; set; }

    public virtual Group Group { get; set; } = null!;

    public virtual ICollection<TaskHistory> TaskHistories { get; set; } = new List<TaskHistory>();
}

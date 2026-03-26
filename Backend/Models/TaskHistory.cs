using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class TaskHistory
{
    public int HistoryId { get; set; }

    public int TaskId { get; set; }

    public int UpdatedById { get; set; }

    public DateTime? UpdateDate { get; set; }

    public string? Status { get; set; }

    public int? CompletionPercent { get; set; }

    public string? Note { get; set; }

    public virtual Task Task { get; set; } = null!;

    public virtual User UpdatedBy { get; set; } = null!;
}

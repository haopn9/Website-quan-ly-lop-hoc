using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Attachment
{
    public int AttachmentId { get; set; }

    public int MessageId { get; set; }

    public string FileName { get; set; } = null!;

    public string FilePath { get; set; } = null!;

    public string? FileType { get; set; }

    public virtual Message Message { get; set; } = null!;
}

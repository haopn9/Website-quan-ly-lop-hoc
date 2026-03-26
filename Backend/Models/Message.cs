using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Message
{
    public int MessageId { get; set; }

    public int GroupId { get; set; }

    public int SenderId { get; set; }

    public string Content { get; set; } = null!;

    public DateTime? SendTime { get; set; }

    public int? ParentMessageId { get; set; }

    public virtual ICollection<Attachment> Attachments { get; set; } = new List<Attachment>();

    public virtual Group Group { get; set; } = null!;

    public virtual ICollection<Message> InverseParentMessage { get; set; } = new List<Message>();

    public virtual Message? ParentMessage { get; set; }

    public virtual User Sender { get; set; } = null!;
}

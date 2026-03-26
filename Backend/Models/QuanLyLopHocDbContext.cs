using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

public partial class QuanLyLopHocDbContext : DbContext
{
    public QuanLyLopHocDbContext()
    {
    }

    public QuanLyLopHocDbContext(DbContextOptions<QuanLyLopHocDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Attachment> Attachments { get; set; }

    public virtual DbSet<Class> Classes { get; set; }

    public virtual DbSet<Group> Groups { get; set; }

    public virtual DbSet<Message> Messages { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Task> Tasks { get; set; }

    public virtual DbSet<TaskHistory> TaskHistories { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
            optionsBuilder.UseSqlServer("Server=WUANGPC\\SQLEXPRESS;Database=QuanLyLopHocDB;Trusted_Connection=True;TrustServerCertificate=True;");
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Attachment>(entity =>
        {
            entity.HasKey(e => e.AttachmentId).HasName("PK__Attachme__442C64BE6C7162B6");

            entity.Property(e => e.FileName).HasMaxLength(255);
            entity.Property(e => e.FilePath).IsUnicode(false);
            entity.Property(e => e.FileType)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Message).WithMany(p => p.Attachments)
                .HasForeignKey(d => d.MessageId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Attachmen__Messa__5FB337D6");
        });

        modelBuilder.Entity<Class>(entity =>
        {
            entity.HasKey(e => e.ClassId).HasName("PK__Classes__CB1927C018C77F82");

            entity.HasIndex(e => e.ClassCode, "UQ__Classes__2ECD4A5583F6FD7F").IsUnique();

            entity.Property(e => e.ClassCode)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.ClassName).HasMaxLength(100);

            entity.HasOne(d => d.Teacher).WithMany(p => p.Classes)
                .HasForeignKey(d => d.TeacherId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Classes__Teacher__412EB0B6");

            entity.HasMany(d => d.Students).WithMany(p => p.ClassesNavigation)
                .UsingEntity<Dictionary<string, object>>(
                    "ClassStudent",
                    r => r.HasOne<User>().WithMany()
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__ClassStud__Stude__44FF419A"),
                    l => l.HasOne<Class>().WithMany()
                        .HasForeignKey("ClassId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__ClassStud__Class__440B1D61"),
                    j =>
                    {
                        j.HasKey("ClassId", "StudentId").HasName("PK__ClassStu__483575797541F361");
                        j.ToTable("ClassStudents");
                    });
        });

        modelBuilder.Entity<Group>(entity =>
        {
            entity.HasKey(e => e.GroupId).HasName("PK__Groups__149AF36A72BBB9FF");

            entity.Property(e => e.GroupName).HasMaxLength(100);

            entity.HasOne(d => d.Class).WithMany(p => p.Groups)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Groups__ClassId__47DBAE45");

            entity.HasOne(d => d.Leader).WithMany(p => p.Groups)
                .HasForeignKey(d => d.LeaderId)
                .HasConstraintName("FK__Groups__LeaderId__48CFD27E");

            entity.HasMany(d => d.Students).WithMany(p => p.GroupsNavigation)
                .UsingEntity<Dictionary<string, object>>(
                    "GroupMember",
                    r => r.HasOne<User>().WithMany()
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__GroupMemb__Stude__4CA06362"),
                    l => l.HasOne<Group>().WithMany()
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__GroupMemb__Group__4BAC3F29"),
                    j =>
                    {
                        j.HasKey("GroupId", "StudentId").HasName("PK__GroupMem__97B6A1D3F47A1CFD");
                        j.ToTable("GroupMembers");
                    });
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.HasKey(e => e.MessageId).HasName("PK__Messages__C87C0C9CB12FD17F");

            entity.Property(e => e.SendTime)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Group).WithMany(p => p.Messages)
                .HasForeignKey(d => d.GroupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Messages__GroupI__5AEE82B9");

            entity.HasOne(d => d.ParentMessage).WithMany(p => p.InverseParentMessage)
                .HasForeignKey(d => d.ParentMessageId)
                .HasConstraintName("FK__Messages__Parent__5CD6CB2B");

            entity.HasOne(d => d.Sender).WithMany(p => p.Messages)
                .HasForeignKey(d => d.SenderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Messages__Sender__5BE2A6F2");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Roles__8AFACE1AC1175EB0");

            entity.Property(e => e.RoleName).HasMaxLength(50);
        });

        modelBuilder.Entity<Task>(entity =>
        {
            entity.HasKey(e => e.TaskId).HasName("PK__Tasks__7C6949B1DBE899B2");

            entity.Property(e => e.CompletionPercent).HasDefaultValue(0);
            entity.Property(e => e.DueDate).HasColumnType("datetime");
            entity.Property(e => e.Priority).HasMaxLength(50);
            entity.Property(e => e.StartDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasDefaultValue("chưa bắt đầu");
            entity.Property(e => e.TaskName).HasMaxLength(255);

            entity.HasOne(d => d.Assignee).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.AssigneeId)
                .HasConstraintName("FK__Tasks__AssigneeI__52593CB8");

            entity.HasOne(d => d.Group).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.GroupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Tasks__GroupId__5165187F");
        });

        modelBuilder.Entity<TaskHistory>(entity =>
        {
            entity.HasKey(e => e.HistoryId).HasName("PK__TaskHist__4D7B4ABDC88FB888");

            entity.ToTable("TaskHistory");

            entity.Property(e => e.Status).HasMaxLength(50);
            entity.Property(e => e.UpdateDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Task).WithMany(p => p.TaskHistories)
                .HasForeignKey(d => d.TaskId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TaskHisto__TaskI__5629CD9C");

            entity.HasOne(d => d.UpdatedBy).WithMany(p => p.TaskHistories)
                .HasForeignKey(d => d.UpdatedById)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TaskHisto__Updat__571DF1D5");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4C9555F0BE");

            entity.HasIndex(e => e.UserCode, "UQ__Users__1DF52D0C7139F3BF").IsUnique();

            entity.HasIndex(e => e.Username, "UQ__Users__536C85E4D54F2E35").IsUnique();

            entity.HasIndex(e => e.NumberPhone, "UQ__Users__A2BA67DA2609F92D").IsUnique();

            entity.HasIndex(e => e.Email, "UQ__Users__A9D1053407F614BF").IsUnique();

            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.NumberPhone)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.UserCode)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Users__RoleId__3D5E1FD2");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

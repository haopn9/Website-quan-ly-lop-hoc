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

    public virtual DbSet<CauHinhHeThong> CauHinhHeThongs { get; set; }

    public virtual DbSet<DeTai> DeTais { get; set; }

    public virtual DbSet<DiemSo> DiemSos { get; set; }

    public virtual DbSet<HocKy> HocKies { get; set; }

    public virtual DbSet<Khoa> Khoas { get; set; }

    public virtual DbSet<LichSuNhiemVu> LichSuNhiemVus { get; set; }

    public virtual DbSet<LopHoc> LopHocs { get; set; }

    public virtual DbSet<NguoiDung> NguoiDungs { get; set; }

    public virtual DbSet<NhiemVu> NhiemVus { get; set; }

    public virtual DbSet<Nhom> Nhoms { get; set; }

    public virtual DbSet<TepDinhKem> TepDinhKems { get; set; }

    public virtual DbSet<TinNhan> TinNhans { get; set; }

    public virtual DbSet<VaiTro> VaiTros { get; set; }

    public virtual DbSet<YeuCauChuyenNhom> YeuCauChuyenNhoms { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=QuanLyLopHocDBv2;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CauHinhHeThong>(entity =>
        {
            entity.HasKey(e => e.KhoaCauHinh).HasName("PK__CauHinhH__1D21252056C9D506");

            entity.ToTable("CauHinhHeThong");

            entity.Property(e => e.KhoaCauHinh)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.MoTa).HasMaxLength(255);
        });

        modelBuilder.Entity<DeTai>(entity =>
        {
            entity.HasKey(e => e.MaDeTai).HasName("PK__DeTai__9F967D5BDF3D7D8F");

            entity.ToTable("DeTai");

            entity.Property(e => e.NgayBatDau).HasColumnType("datetime");
            entity.Property(e => e.NgayKetThuc).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.TenDeTai).HasMaxLength(255);

            entity.HasOne(d => d.MaLopNavigation).WithMany(p => p.DeTais)
                .HasForeignKey(d => d.MaLop)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DeTai__MaLop__534D60F1");
        });

        modelBuilder.Entity<DiemSo>(entity =>
        {
            entity.HasKey(e => e.MaDiem).HasName("PK__DiemSo__33326025692255C1");

            entity.ToTable("DiemSo");

            entity.HasIndex(e => new { e.MaSinhVien, e.MaLop }, "UQ__DiemSo__B0236A53E5F3D96C").IsUnique();

            entity.Property(e => e.DiemCaNhan).HasColumnType("decimal(4, 2)");
            entity.Property(e => e.DiemNhom).HasColumnType("decimal(4, 2)");
            entity.Property(e => e.NgayCham)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.MaGiangVienNavigation).WithMany(p => p.DiemSoMaGiangVienNavigations)
                .HasForeignKey(d => d.MaGiangVien)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DiemSo__MaGiangV__07C12930");

            entity.HasOne(d => d.MaLopNavigation).WithMany(p => p.DiemSos)
                .HasForeignKey(d => d.MaLop)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DiemSo__MaLop__06CD04F7");

            entity.HasOne(d => d.MaNhomNavigation).WithMany(p => p.DiemSos)
                .HasForeignKey(d => d.MaNhom)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DiemSo__MaNhom__05D8E0BE");

            entity.HasOne(d => d.MaSinhVienNavigation).WithMany(p => p.DiemSoMaSinhVienNavigations)
                .HasForeignKey(d => d.MaSinhVien)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DiemSo__MaSinhVi__04E4BC85");
        });

        modelBuilder.Entity<HocKy>(entity =>
        {
            entity.HasKey(e => e.MaHocKy).HasName("PK__HocKy__1EB55110D325758C");

            entity.ToTable("HocKy");

            entity.Property(e => e.LaHienTai).HasDefaultValue(false);
            entity.Property(e => e.TenHocKy).HasMaxLength(50);
        });

        modelBuilder.Entity<Khoa>(entity =>
        {
            entity.HasKey(e => e.MaKhoa).HasName("PK__Khoa__653904056CFCEBD1");

            entity.ToTable("Khoa");

            entity.HasIndex(e => e.KyHieuKhoa, "UQ__Khoa__936E2DCF1937F0A7").IsUnique();

            entity.Property(e => e.KyHieuKhoa)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.TenKhoa).HasMaxLength(100);
        });

        modelBuilder.Entity<LichSuNhiemVu>(entity =>
        {
            entity.HasKey(e => e.MaLichSu).HasName("PK__LichSuNh__C443222A5E802CE0");

            entity.ToTable("LichSuNhiemVu");

            entity.Property(e => e.NgayCapNhat)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.TrangThaiMoi).HasMaxLength(50);

            entity.HasOne(d => d.MaNguoiCapNhatNavigation).WithMany(p => p.LichSuNhiemVus)
                .HasForeignKey(d => d.MaNguoiCapNhat)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LichSuNhi__MaNgu__73BA3083");

            entity.HasOne(d => d.MaNhiemVuNavigation).WithMany(p => p.LichSuNhiemVus)
                .HasForeignKey(d => d.MaNhiemVu)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LichSuNhi__MaNhi__72C60C4A");
        });

        modelBuilder.Entity<LopHoc>(entity =>
        {
            entity.HasKey(e => e.MaLop).HasName("PK__LopHoc__3B98D2730E216BF1");

            entity.ToTable("LopHoc");

            entity.HasIndex(e => e.MaLopHoc, "UQ__LopHoc__FEE05785DA7CFB37").IsUnique();

            entity.Property(e => e.MaLopHoc)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.TenLop).HasMaxLength(100);
            entity.Property(e => e.ThoiGianHoc).HasMaxLength(255);

            entity.HasOne(d => d.MaGiangVienNavigation).WithMany(p => p.LopHocs)
                .HasForeignKey(d => d.MaGiangVien)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LopHoc__MaGiangV__4AB81AF0");

            entity.HasOne(d => d.MaHocKyNavigation).WithMany(p => p.LopHocs)
                .HasForeignKey(d => d.MaHocKy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LopHoc__MaHocKy__4BAC3F29");

            entity.HasMany(d => d.MaSinhViens).WithMany(p => p.MaLops)
                .UsingEntity<Dictionary<string, object>>(
                    "SinhVienLop",
                    r => r.HasOne<NguoiDung>().WithMany()
                        .HasForeignKey("MaSinhVien")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__SinhVienL__MaSin__4F7CD00D"),
                    l => l.HasOne<LopHoc>().WithMany()
                        .HasForeignKey("MaLop")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__SinhVienL__MaLop__4E88ABD4"),
                    j =>
                    {
                        j.HasKey("MaLop", "MaSinhVien").HasName("PK__SinhVien__72A17C0461C7B489");
                        j.ToTable("SinhVienLop");
                    });
        });

        modelBuilder.Entity<NguoiDung>(entity =>
        {
            entity.HasKey(e => e.MaNguoiDung).HasName("PK__NguoiDun__C539D7624B070BED");

            entity.ToTable("NguoiDung");

            entity.HasIndex(e => e.MaSo, "UQ__NguoiDun__2725087C4A3272D0").IsUnique();

            entity.HasIndex(e => e.TenDangNhap, "UQ__NguoiDun__55F68FC033B9947E").IsUnique();

            entity.HasIndex(e => e.Email, "UQ__NguoiDun__A9D105340EC42203").IsUnique();

            entity.Property(e => e.DangHoatDong).HasDefaultValue(true);
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.HoTen).HasMaxLength(100);
            entity.Property(e => e.MaSo)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.MatKhauHash)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.SoDienThoai)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.TenDangNhap)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.MaKhoaNavigation).WithMany(p => p.NguoiDungs)
                .HasForeignKey(d => d.MaKhoa)
                .HasConstraintName("FK__NguoiDung__MaKho__46E78A0C");

            entity.HasOne(d => d.MaVaiTroNavigation).WithMany(p => p.NguoiDungs)
                .HasForeignKey(d => d.MaVaiTro)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__NguoiDung__MaVai__45F365D3");
        });

        modelBuilder.Entity<NhiemVu>(entity =>
        {
            entity.HasKey(e => e.MaNhiemVu).HasName("PK__NhiemVu__69582B2FFF7EF815");

            entity.ToTable("NhiemVu");

            entity.Property(e => e.HanHoanThanh).HasColumnType("datetime");
            entity.Property(e => e.MucDoUuTien).HasMaxLength(50);
            entity.Property(e => e.NgayBatDau).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.PhanTramHoanThanh).HasDefaultValue(0);
            entity.Property(e => e.TenNhiemVu).HasMaxLength(255);
            entity.Property(e => e.TrangThai)
                .HasMaxLength(50)
                .HasDefaultValue("Chưa bắt đầu");

            entity.HasOne(d => d.MaDeTaiNavigation).WithMany(p => p.NhiemVus)
                .HasForeignKey(d => d.MaDeTai)
                .HasConstraintName("FK__NhiemVu__MaDeTai__6B24EA82");

            entity.HasOne(d => d.MaNhomNavigation).WithMany(p => p.NhiemVus)
                .HasForeignKey(d => d.MaNhom)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__NhiemVu__MaNhom__6A30C649");

            entity.HasMany(d => d.MaNguoiDungs).WithMany(p => p.MaNhiemVus)
                .UsingEntity<Dictionary<string, object>>(
                    "PhanCongNhiemVu",
                    r => r.HasOne<NguoiDung>().WithMany()
                        .HasForeignKey("MaNguoiDung")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__PhanCongN__MaNgu__6EF57B66"),
                    l => l.HasOne<NhiemVu>().WithMany()
                        .HasForeignKey("MaNhiemVu")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__PhanCongN__MaNhi__6E01572D"),
                    j =>
                    {
                        j.HasKey("MaNhiemVu", "MaNguoiDung").HasName("PK__PhanCong__550BB6596EDC9986");
                        j.ToTable("PhanCongNhiemVu");
                    });
        });

        modelBuilder.Entity<Nhom>(entity =>
        {
            entity.HasKey(e => e.MaNhom).HasName("PK__Nhom__234F91CDFCC7354A");

            entity.ToTable("Nhom");

            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.SoThanhVienToiDa).HasDefaultValue(5);
            entity.Property(e => e.TenNhom).HasMaxLength(100);

            entity.HasOne(d => d.MaDeTaiNavigation).WithMany(p => p.Nhoms)
                .HasForeignKey(d => d.MaDeTai)
                .HasConstraintName("FK__Nhom__MaDeTai__59FA5E80");

            entity.HasOne(d => d.MaLopNavigation).WithMany(p => p.Nhoms)
                .HasForeignKey(d => d.MaLop)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Nhom__MaLop__5812160E");

            entity.HasOne(d => d.MaNhomTruongNavigation).WithMany(p => p.Nhoms)
                .HasForeignKey(d => d.MaNhomTruong)
                .HasConstraintName("FK__Nhom__MaNhomTruo__59063A47");

            entity.HasMany(d => d.MaSinhViens).WithMany(p => p.MaNhoms)
                .UsingEntity<Dictionary<string, object>>(
                    "ThanhVienNhom",
                    r => r.HasOne<NguoiDung>().WithMany()
                        .HasForeignKey("MaSinhVien")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__ThanhVien__MaSin__5DCAEF64"),
                    l => l.HasOne<Nhom>().WithMany()
                        .HasForeignKey("MaNhom")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__ThanhVien__MaNho__5CD6CB2B"),
                    j =>
                    {
                        j.HasKey("MaNhom", "MaSinhVien").HasName("PK__ThanhVie__6A763FBA651141E6");
                        j.ToTable("ThanhVienNhom");
                    });
        });

        modelBuilder.Entity<TepDinhKem>(entity =>
        {
            entity.HasKey(e => e.MaTep).HasName("PK__TepDinhK__314EA1A8B0CB603E");

            entity.ToTable("TepDinhKem");

            entity.Property(e => e.NgayUpload)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.TenTep).HasMaxLength(255);

            entity.HasOne(d => d.MaDeTaiNavigation).WithMany(p => p.TepDinhKems)
                .HasForeignKey(d => d.MaDeTai)
                .HasConstraintName("FK__TepDinhKe__MaDeT__7F2BE32F");

            entity.HasOne(d => d.MaNguoiUploadNavigation).WithMany(p => p.TepDinhKems)
                .HasForeignKey(d => d.MaNguoiUpload)
                .HasConstraintName("FK__TepDinhKe__MaNgu__00200768");

            entity.HasOne(d => d.MaNhiemVuNavigation).WithMany(p => p.TepDinhKems)
                .HasForeignKey(d => d.MaNhiemVu)
                .HasConstraintName("FK__TepDinhKe__MaNhi__7E37BEF6");

            entity.HasOne(d => d.MaTinNhanNavigation).WithMany(p => p.TepDinhKems)
                .HasForeignKey(d => d.MaTinNhan)
                .HasConstraintName("FK__TepDinhKe__MaTin__7D439ABD");
        });

        modelBuilder.Entity<TinNhan>(entity =>
        {
            entity.HasKey(e => e.MaTinNhan).HasName("PK__TinNhan__E5B3062A37758F32");

            entity.ToTable("TinNhan");

            entity.Property(e => e.ThoiGianGui)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.MaNguoiGuiNavigation).WithMany(p => p.TinNhans)
                .HasForeignKey(d => d.MaNguoiGui)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TinNhan__MaNguoi__787EE5A0");

            entity.HasOne(d => d.MaNhomNavigation).WithMany(p => p.TinNhans)
                .HasForeignKey(d => d.MaNhom)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TinNhan__MaNhom__778AC167");

            entity.HasOne(d => d.MaTinNhanChaNavigation).WithMany(p => p.InverseMaTinNhanChaNavigation)
                .HasForeignKey(d => d.MaTinNhanCha)
                .HasConstraintName("FK__TinNhan__MaTinNh__797309D9");
        });

        modelBuilder.Entity<VaiTro>(entity =>
        {
            entity.HasKey(e => e.MaVaiTro).HasName("PK__VaiTro__C24C41CF8AD7ECFF");

            entity.ToTable("VaiTro");

            entity.Property(e => e.TenVaiTro).HasMaxLength(50);
        });

        modelBuilder.Entity<YeuCauChuyenNhom>(entity =>
        {
            entity.HasKey(e => e.MaYeuCau).HasName("PK__YeuCauCh__CFA5DF4EA49B6765");

            entity.ToTable("YeuCauChuyenNhom");

            entity.Property(e => e.NgayGui)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NgayXuLy).HasColumnType("datetime");
            entity.Property(e => e.TrangThai)
                .HasMaxLength(50)
                .HasDefaultValue("Chờ duyệt");

            entity.HasOne(d => d.MaNhomHienTaiNavigation).WithMany(p => p.YeuCauChuyenNhomMaNhomHienTaiNavigations)
                .HasForeignKey(d => d.MaNhomHienTai)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__YeuCauChu__MaNho__6383C8BA");

            entity.HasOne(d => d.MaNhomMuonNavigation).WithMany(p => p.YeuCauChuyenNhomMaNhomMuonNavigations)
                .HasForeignKey(d => d.MaNhomMuon)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__YeuCauChu__MaNho__6477ECF3");

            entity.HasOne(d => d.MaSinhVienNavigation).WithMany(p => p.YeuCauChuyenNhoms)
                .HasForeignKey(d => d.MaSinhVien)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__YeuCauChu__MaSin__628FA481");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

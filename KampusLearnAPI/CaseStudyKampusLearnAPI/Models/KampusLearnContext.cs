using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CaseStudyKampusLearnAPI.Models
{
    public partial class KampusLearnContext : DbContext
    {
        public KampusLearnContext()
        {
        }

        public KampusLearnContext(DbContextOptions<KampusLearnContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Admin> Admin { get; set; }
        public virtual DbSet<Batch> Batch { get; set; }
        public virtual DbSet<Candidate> Candidate { get; set; }
        public virtual DbSet<CandidateCourse> CandidateCourse { get; set; }
        public virtual DbSet<Course> Course { get; set; }
        public virtual DbSet<Payment> Payment { get; set; }
        public virtual DbSet<Trainer> Trainer { get; set; }
        public virtual DbSet<TrainerCourse> TrainerCourse { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                optionsBuilder.UseSqlServer("Server=LAPTOP-0MQC0OIN;database=KampusLearn;Integrated security=True");
//            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Admin>(entity =>
            {
                entity.Property(e => e.AdminId).HasColumnName("admin_id");

                entity.Property(e => e.Address)
                    .HasColumnName("address")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Contact)
                    .IsRequired()
                    .HasColumnName("contact")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("datetime");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedAt)
                    .HasColumnName("updated_at")
                    .HasColumnType("datetime");
            });

            modelBuilder.Entity<Batch>(entity =>
            {
                entity.HasKey(e => e.BatchName)
                    .HasName("PK__Batch__56AD32F48F8DAD6C");

                entity.Property(e => e.BatchName)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<Candidate>(entity =>
            {
                entity.Property(e => e.CandidateId).HasColumnName("candidate_id");

                entity.Property(e => e.Address)
                    .HasColumnName("address")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Contact)
                    .IsRequired()
                    .HasColumnName("contact")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("datetime");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedAt)
                    .HasColumnName("updated_at")
                    .HasColumnType("datetime");
            });

            modelBuilder.Entity<CandidateCourse>(entity =>
            {
                entity.ToTable("Candidate_Course");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CandidateId).HasColumnName("candidate_id");

                entity.Property(e => e.CourseId).HasColumnName("course_id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('Not Active')");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnName("updated_at")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.Candidate)
                    .WithMany(p => p.CandidateCourse)
                    .HasForeignKey(d => d.CandidateId)
                    .HasConstraintName("FK__Candidate__candi__4F7CD00D");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.CandidateCourse)
                    .HasForeignKey(d => d.CourseId)
                    .HasConstraintName("FK__Candidate__cours__5070F446");
            });

            modelBuilder.Entity<Course>(entity =>
            {
                entity.Property(e => e.CourseId).HasColumnName("course_id");

                entity.Property(e => e.AdminId).HasColumnName("admin_id");

                entity.Property(e => e.CourseCategory)
                    .IsRequired()
                    .HasColumnName("course_category")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CourseName)
                    .IsRequired()
                    .HasColumnName("course_name")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("datetime");

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.Totalparticipant)
                    .HasColumnName("totalparticipant")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnName("updated_at")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.Admin)
                    .WithMany(p => p.Course)
                    .HasForeignKey(d => d.AdminId)
                    .HasConstraintName("FK__Course__admin_id__38996AB5");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.Property(e => e.PaymentId).HasColumnName("payment_id");

                entity.Property(e => e.CandidateId).HasColumnName("candidate_id");

                entity.Property(e => e.CourseId).HasColumnName("course_id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasColumnName("isActive")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnName("updated_at")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.Candidate)
                    .WithMany(p => p.Payment)
                    .HasForeignKey(d => d.CandidateId)
                    .HasConstraintName("FK__Payment__candida__3B75D760");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.Payment)
                    .HasForeignKey(d => d.CourseId)
                    .HasConstraintName("FK__Payment__course___3C69FB99");
            });

            modelBuilder.Entity<Trainer>(entity =>
            {
                entity.Property(e => e.TrainerId).HasColumnName("trainer_id");

                entity.Property(e => e.Address)
                    .HasColumnName("address")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.AdminId).HasColumnName("admin_id");

                entity.Property(e => e.Contact)
                    .IsRequired()
                    .HasColumnName("contact")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("datetime");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Qualification)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedAt)
                    .HasColumnName("updated_at")
                    .HasColumnType("datetime");

                entity.Property(e => e.YearOfExperience).HasColumnName("yearOfExperience");

                entity.HasOne(d => d.Admin)
                    .WithMany(p => p.Trainer)
                    .HasForeignKey(d => d.AdminId)
                    .HasConstraintName("FK__Trainer__admin_i__4CA06362");
            });

            modelBuilder.Entity<TrainerCourse>(entity =>
            {
                entity.ToTable("Trainer_Course");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AdminId).HasColumnName("admin_id");

                entity.Property(e => e.BatchName)
                    .HasColumnName("Batch_Name")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.CourseId).HasColumnName("course_id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasColumnName("isActive")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.TrainerId).HasColumnName("trainer_id");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnName("updated_at")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.Admin)
                    .WithMany(p => p.TrainerCourse)
                    .HasForeignKey(d => d.AdminId)
                    .HasConstraintName("FK__Trainer_C__admin__01142BA1");

                entity.HasOne(d => d.BatchNameNavigation)
                    .WithMany(p => p.TrainerCourse)
                    .HasForeignKey(d => d.BatchName)
                    .HasConstraintName("FK__Trainer_C__Batch__1332DBDC");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.TrainerCourse)
                    .HasForeignKey(d => d.CourseId)
                    .HasConstraintName("FK__Trainer_C__cours__4BAC3F29");

                entity.HasOne(d => d.Trainer)
                    .WithMany(p => p.TrainerCourse)
                    .HasForeignKey(d => d.TrainerId)
                    .HasConstraintName("FK__Trainer_C__train__4AB81AF0");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

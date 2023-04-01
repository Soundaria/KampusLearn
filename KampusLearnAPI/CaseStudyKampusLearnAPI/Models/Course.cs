using System;
using System.Collections.Generic;

namespace CaseStudyKampusLearnAPI.Models
{
    public partial class Course
    {
        public Course()
        {
            CandidateCourse = new HashSet<CandidateCourse>();
            Payment = new HashSet<Payment>();
            TrainerCourse = new HashSet<TrainerCourse>();
        }

        public int CourseId { get; set; }
        public string CourseName { get; set; }
        public string CourseCategory { get; set; }
        public int Price { get; set; }
        public bool? IsActive { get; set; }
        public int? AdminId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int DurationInHours { get; set; }
        public int? Totalparticipant { get; set; }

        public virtual Admin Admin { get; set; }
        public virtual ICollection<CandidateCourse> CandidateCourse { get; set; }
        public virtual ICollection<Payment> Payment { get; set; }
        public virtual ICollection<TrainerCourse> TrainerCourse { get; set; }
    }
}

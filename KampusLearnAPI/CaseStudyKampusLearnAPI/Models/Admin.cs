using System;
using System.Collections.Generic;

namespace CaseStudyKampusLearnAPI.Models
{
    public partial class Admin
    {
        public Admin()
        {
            Course = new HashSet<Course>();
            Trainer = new HashSet<Trainer>();
            TrainerCourse = new HashSet<TrainerCourse>();
        }

        public int AdminId { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Contact { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual ICollection<Course> Course { get; set; }
        public virtual ICollection<Trainer> Trainer { get; set; }
        public virtual ICollection<TrainerCourse> TrainerCourse { get; set; }
    }
}

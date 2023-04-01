using System;
using System.Collections.Generic;

namespace CaseStudyKampusLearnAPI.Models
{
    public partial class Trainer
    {
        public Trainer()
        {
            TrainerCourse = new HashSet<TrainerCourse>();
        }

        public int TrainerId { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Contact { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? AdminId { get; set; }
        public int? YearOfExperience { get; set; }
        public string Qualification { get; set; }

        public virtual Admin Admin { get; set; }
        public virtual ICollection<TrainerCourse> TrainerCourse { get; set; }
    }
}

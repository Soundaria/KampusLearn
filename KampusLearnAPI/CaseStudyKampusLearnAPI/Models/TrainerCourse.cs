using System;
using System.Collections.Generic;

namespace CaseStudyKampusLearnAPI.Models
{
    public partial class TrainerCourse
    {
        public int Id { get; set; }
        public int? TrainerId { get; set; }
        public int? CourseId { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? AdminId { get; set; }
        public string BatchName { get; set; }

        public virtual Admin Admin { get; set; }
        public virtual Batch BatchNameNavigation { get; set; }
        public virtual Course Course { get; set; }
        public virtual Trainer Trainer { get; set; }
    }
}

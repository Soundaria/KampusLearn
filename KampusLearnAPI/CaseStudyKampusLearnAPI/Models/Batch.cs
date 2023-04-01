using System;
using System.Collections.Generic;

namespace CaseStudyKampusLearnAPI.Models
{
    public partial class Batch
    {
        public Batch()
        {
            TrainerCourse = new HashSet<TrainerCourse>();
        }

        public int Id { get; set; }
        public string BatchName { get; set; }

        public virtual ICollection<TrainerCourse> TrainerCourse { get; set; }
    }
}

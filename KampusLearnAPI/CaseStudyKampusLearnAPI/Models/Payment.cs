using System;
using System.Collections.Generic;

namespace CaseStudyKampusLearnAPI.Models
{
    public partial class Payment
    {
        public int PaymentId { get; set; }
        public int? CandidateId { get; set; }
        public int? CourseId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool? IsActive { get; set; }

        public virtual Candidate Candidate { get; set; }
        public virtual Course Course { get; set; }
    }
}

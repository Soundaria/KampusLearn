using System;
using System.Collections.Generic;

namespace CaseStudyKampusLearnAPI.Models
{
    public partial class CandidateCourse
    {
        public int Id { get; set; }
        public int? CandidateId { get; set; }
        public int? CourseId { get; set; }
        public bool IsPaymentDone { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string Status { get; set; }

        public virtual Candidate Candidate { get; set; }
        public virtual Course Course { get; set; }
    }
}

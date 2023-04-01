using System;
using System.Collections.Generic;

namespace CaseStudyKampusLearnAPI.Models
{
    public partial class Candidate
    {
        public Candidate()
        {
            CandidateCourse = new HashSet<CandidateCourse>();
            Payment = new HashSet<Payment>();
        }

        public int CandidateId { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Contact { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public virtual ICollection<CandidateCourse> CandidateCourse { get; set; }
        public virtual ICollection<Payment> Payment { get; set; }
    }
}

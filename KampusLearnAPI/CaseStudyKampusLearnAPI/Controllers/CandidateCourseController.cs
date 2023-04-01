using System.Collections.Generic;
using System.Linq;
using System;
using CaseStudyKampusLearnAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using log4net.Repository.Hierarchy;
using Microsoft.Extensions.Logging;

namespace CaseStudyKampusLearnAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CandidateCourseController : ControllerBase
	{
		private readonly KampusLearnContext repo;
		private readonly ILogger<CandidateCourse> logger;
		public CandidateCourseController(KampusLearnContext repo,ILogger<CandidateCourse> logger)
		{
			this.repo = repo;
			this.logger = logger;
		}

		[HttpPost("AddCoursetoCandidate/{candidateId}")]
		public IActionResult AddCourse([FromBody] CandidateCourse candidateCourse,int candidateId)
		{
			try
			{
				candidateCourse.CandidateId = candidateId;
				candidateCourse.Status = "Not Active";
				candidateCourse.CreatedAt = DateTime.Now;
				List<CandidateCourse> candicourse = repo.CandidateCourse.ToList();
				var duplicate = candicourse.FindAll(x => x.CandidateId == candidateId && x.CourseId == candidateCourse.CourseId);
				if (duplicate.Count ==0)
				{
					repo.CandidateCourse.Add(candidateCourse);
					repo.SaveChanges();
					logger.LogInformation("Course to the candidate is Added");
					return StatusCode(201, "Courses registerted successfully");
				}
				else
				{
					logger.LogInformation("Course registered already");
					return StatusCode(200, "Already Course is registered");
				}
				
				//List<CandidateCourse> partcipants = repo.CandidateCourse.ToList();
				//var totalCourse = partcipants.GroupBy(s => s.CourseId).Select(g => new { courseID = g.Key, total = g.Count() });
				//foreach (var item in totalCourse)
				//{
				//	var course = repo.Course.Find(item.courseID);
				//	course.TotalParticipant = item.total;
				//}
				//repo.SaveChanges();
				
			}
			catch (NullReferenceException ex)
			{
				logger.LogWarning("Data not found" + ex.Message);
				return StatusCode(404, "Data Not Found");
			}
			catch (Exception ex)
			{
				logger.LogWarning("Contact to Admin.. Server Error" + ex.Message);
				return StatusCode(500, "Internal Server Error");
			}
		}

		//Getting Course to Candidate Details

		[HttpGet("GetCandidateAndCourse")]
		public IActionResult GetCandidateAndCourse()
		{
			try
			{
				List<Candidate> candidate = repo.Candidate.ToList();
				List<Course> course = repo.Course.ToList();
				List<CandidateCourse> candidateCourse = repo.CandidateCourse.ToList();
				//List<Course> course = repo.Course.ToList();

				if (candidateCourse.Count != 0)
				{
					logger.LogInformation("Candidates according to their courses are listed");
					return StatusCode(200, candidateCourse.Where(status => status.IsActive == true));
				}
				else
				{
					logger.LogWarning("No details available");
					return StatusCode(204, "No content");
				}
			}
			catch (NullReferenceException ex)
			{
				logger.LogWarning("Data not found" + ex.Message);
				return StatusCode(404, "Data Not Found");
			}
			catch (Exception ex)
			{
				logger.LogWarning("Contact to Admin.. Server Error" + ex.Message);
				return StatusCode(500, "Internal Server Error");
			}
		}

		//Getting CandidateCourse by Candidateid
		[HttpGet("GetCourseOfCandidate/{CandidateId}")]
		public IActionResult GetCourseOfCandidate(int CandidateId)
		{
			try
			{
				
				List<CandidateCourse> candidate = repo.CandidateCourse.ToList();
				List<Course> course = repo.Course.ToList();
				var candidateCourse = candidate.FindAll(x => x.CandidateId == CandidateId);
				if (candidateCourse != null)
				{
					logger.LogInformation("Candidates according to their courses are listed");
					return StatusCode(200, candidateCourse);
				}
				else
				{
					logger.LogWarning("No details available");
					return StatusCode(404, "Course not found");
				}
			}
			catch (NullReferenceException ex)
			{
				logger.LogWarning("Data not found" + ex.Message);
				return StatusCode(404, "Data Not Found");
			}
			catch (Exception ex)
			{
				logger.LogWarning("Contact to Admin.. Server Error" + ex.Message);
				return StatusCode(500, "Internal Server Error");
			}
		}


		//Cousre whcih are completed
		[HttpGet("GetCourseNotActive")]
		public IActionResult GetCourseCompleted()
		{
			try
			{
				List<CandidateCourse> candidateCourse = repo.CandidateCourse.ToList();
				logger.LogInformation("Candidates according to their courses which are not active are listed");
				return StatusCode(200, candidateCourse.Where(status => status.Status == "Not Active"));
			}
			catch (NullReferenceException ex)
			{
				logger.LogWarning("Data not found" + ex.Message);
				return StatusCode(404, "Data Not Found");
			}
			catch (Exception ex)
			{
				logger.LogWarning("Contact to Admin.. Server Error" + ex.Message);
				return StatusCode(500, "Internal Server Error");
			}
		}

		//Cousre whcih are Active
		[HttpGet("GetCourseActive")]
		public IActionResult GetCourseActive()
		{
			try
			{
				List<CandidateCourse> candidateCourse = repo.CandidateCourse.ToList();
				logger.LogInformation("Candidates according to their courses which are active are listed");
				return StatusCode(200, candidateCourse.Where(status => status.Status == "Active"));
			}
			catch (NullReferenceException ex)
			{
				logger.LogWarning("Data not found" + ex.Message);
				return StatusCode(404, "Data Not Found");
			}
			catch (Exception ex)
			{
				logger.LogWarning("Contact to Admin.. Server Error" + ex.Message);
				return StatusCode(500, "Internal Server Error");
			}
		}

	}
}

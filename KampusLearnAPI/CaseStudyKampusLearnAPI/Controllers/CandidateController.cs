using CaseStudyKampusLearnAPI.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System;
using CaseStudyKampusLearnAPI.Repository;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace CaseStudyKampusLearnAPI.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]


	public class CandidateController : ControllerBase
	{

		private readonly KampusLearnContext repo;
		private readonly ILogger<Admin> logger;
		private readonly IJWTManagerRepository jWTManagerRepository;
		public CandidateController(KampusLearnContext repo, ILogger<Admin> logger, IJWTManagerRepository jWTManagerRepositor)
		{
			this.repo = repo;
			this.logger = logger;
			this.jWTManagerRepository = jWTManagerRepositor;
		}

		[AllowAnonymous]
		[HttpPost("ValidatingCandidate")]
		public IActionResult ValidatingCandidate([FromBody] Candidate candidateObj)
		{
			try
			{
				List<Candidate> candidate = repo.Candidate.ToList();
				Candidate id = candidate.Find(e => e.Email == candidateObj.Email && e.Password == candidateObj.Password);
				if (id != null)
				{
					var jwt = jWTManagerRepository.AuthenticateCandidate(id.Email, id.Password);
					logger.LogInformation("Candidate Added successfully");
					return StatusCode(200, new { jwt, id });
				}
				else
				{
					logger.LogInformation("No candidate details found");
					return StatusCode(404, "Incorrect email or password");
				}
			}
			catch (NullReferenceException ex)
			{
				logger.LogWarning("Data not found" + ex.Message);
				return StatusCode(404, "Data Not Found");
			}
			catch (UnauthorizedAccessException ex)
			{
				logger.LogWarning("Access not given" + ex.Message);
				return StatusCode(401, "Unauthorised");
			}
			catch (Exception ex)
			{
				logger.LogWarning("Contact to Admin.. Server Error" + ex.Message);
				return StatusCode(500, "Internal Server Error");
			}
		}

		//Getting Candidate Details 
		[AllowAnonymous]
		[HttpGet("GetCandidate")]
		public IActionResult getCandidate()
		{
			try
			{
				List<Candidate> candidate = repo.Candidate.ToList();
				if (candidate.Count != 0)
				{
					logger.LogInformation("Candidates are listed");
					return StatusCode(200, candidate.Where(status => status.IsActive == true));
				}
				else
				{
					logger.LogWarning("No candidates availble is list");
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

		//Getting Candidate by id
		[HttpGet("GetCandidatebyId")]
		public IActionResult GetCandidate()
		{
			try
			{
				int candidateId = Convert.ToInt32(HttpContext.User.FindFirstValue("CandidateId"));
				Candidate candidate = repo.Candidate.Find(candidateId);
				if (candidate != null)
				{
					return StatusCode(200, candidate);
				}
				else
				{
					return StatusCode(404, "Candidate not found");
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
		[AllowAnonymous]
		//Add Candidate
		[HttpPost("AddCandidate")]
		public IActionResult AddCandidate([FromBody] Candidate candidate)
		{
			try
			{
				candidate.CreatedAt = DateTime.Now;
				repo.Candidate.Add(candidate);
				repo.SaveChanges();
				return StatusCode(201, "Candidate Added succesfully");
			}
			catch (NullReferenceException ex)
			{
				logger.LogWarning("Data not found" + ex.Message);
				return StatusCode(404, "Data Not Found");
			}
			catch (Exception ex)
			{
				logger.LogWarning("Contact to Admin.. Server Error" + ex.Message);
				return StatusCode(500, ex.Message);
			}
		}
		
		//Update Candidate
		[HttpPut("UpdateCandidate")]
		public IActionResult Updatecandidate( [FromBody] Candidate candidateobj)
		{
			try
			{
				int candidateId = Convert.ToInt32(HttpContext.User.FindFirstValue("candidateId"));
				Candidate candidate = repo.Candidate.Find(candidateId);
				if (candidate != null)
				{
					candidate.Name = candidateobj.Name;
					candidate.Password = candidateobj.Password;
					candidate.Contact = candidateobj.Contact;
					candidate.Email = candidateobj.Email;
					candidate.Address = candidateobj.Address;
					candidate.IsActive = true;
					candidate.UpdatedAt = DateTime.Now;
					repo.SaveChanges();
					return StatusCode(200, "Update successfull");
				}
				else
				{
					return StatusCode(404, "Candidate not found");
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



		//Delete Candidate
		[HttpDelete("DeleteCandidate")]
		public IActionResult DeleteCandidate()
		{
			try
			{
				int candidateId = Convert.ToInt32(HttpContext.User.FindFirstValue("candidateId"));
				List<CandidateCourse> candidateCourses = repo.CandidateCourse.ToList();
				List<Payment> payments = repo.Payment.ToList();
				var candidateCourse = candidateCourses.FindAll(x => x.CandidateId == candidateId);
				if (candidateCourse != null)
				{
					foreach (var item in candidateCourse)
					{
						item.Status = "Not Active";
						item.IsActive = false;
					}
				}
				
				var payment=payments.FindAll(x => x.CandidateId == candidateId);
				if (payment != null)
				{
					foreach (var item in payment)
					{
						item.IsActive = false;
					}
				}
				Candidate candidate = repo.Candidate.Find(candidateId);
				if (candidate != null)
				{
					candidate.IsActive = false;
					repo.SaveChanges();
					return Ok("candidate deleted successfully");
				}
				else
				{

					return StatusCode(404, "Candidate not found");
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

		//Candidates who are not active
		[HttpGet("GetCandidateNotActive")]
		public IActionResult GetCandidateNotActive()
		{
			try
			{
				List<Candidate> candidate = repo.Candidate.ToList();

				return StatusCode(200, candidate.Where(status => status.IsActive == false));
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

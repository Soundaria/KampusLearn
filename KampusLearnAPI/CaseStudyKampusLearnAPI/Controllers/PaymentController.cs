using CaseStudyKampusLearnAPI.Models;
using System.Collections.Generic;
using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.Extensions.Logging;

namespace CaseStudyKampusLearnAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PaymentController : ControllerBase
	{

		private readonly KampusLearnContext repo;
		private readonly ILogger<Admin> logger;
		public PaymentController(KampusLearnContext repo, ILogger<Admin> logger)
		{
			this.repo = repo;
			this.logger = logger;
		}


		//Add Payment
		[HttpPost("AddPayment/{candidateId}")]
		public IActionResult AddPayment([FromBody] Payment payment,int candidateId)
		{
			try
			{
				payment.IsActive = true;
				payment.CandidateId = candidateId;
				payment.CreatedAt = DateTime.Now;
				repo.Payment.Add(payment);
				repo.SaveChanges();
				List<CandidateCourse> candidateCourse = repo.CandidateCourse.ToList();
				var id = candidateCourse.Find(x => x.CandidateId == candidateId && x.CourseId == payment.CourseId);
				id.IsPaymentDone = true;
				id.Status = "Active";
				repo.SaveChanges();
				logger.LogInformation("Payment Added details");
				return Created("Payment added", payment);
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

		//Getting Payment Details

		[HttpGet("GetPayment")]
		public IActionResult GetPayment()
		{
			try
			{
				List<Candidate> candidate = repo.Candidate.ToList();
				List<Course> course = repo.Course.ToList();
 				List<Payment> payment = repo.Payment.ToList();
				if (payment.Count != 0)
				{
					logger.LogInformation("Payment Added details are listed");
					return StatusCode(200, payment.Where(status => status.IsActive == true));
				}
				else
				{
					logger.LogInformation("No Payment details are there in the listed");
					return StatusCode(204, "No Contetnt");
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


		//Payment which are not active
		[HttpGet("GetPaymentNotActive")]
		public IActionResult GetPaymentNotActive()
		{
			try
			{
				List<Payment> payment = repo.Payment.ToList();
				//List<Candidate> candidate = repo.Candidate.ToList();
				//var candidateid = candidate.FindAll(x => x.IsActive == false);
				//foreach(var item in candidateid)
				//{
				//	var paymentid = repo.Payment.Find(item.CandidateId);
				//	if (paymentid != null)
				//	{
				//		paymentid.IsActive = false;
				//	}
				//}
				repo.SaveChanges();
				logger.LogInformation("Payments for whcih course are completed");
				return StatusCode(200, payment.Where(status => status.IsActive == false));
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

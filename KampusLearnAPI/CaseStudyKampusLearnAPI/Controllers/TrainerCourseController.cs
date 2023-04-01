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
	public class TrainerCourseController : ControllerBase
	{

		private readonly KampusLearnContext repo;
		private readonly ILogger<Admin> logger;
		public TrainerCourseController(KampusLearnContext repo, ILogger<Admin> logger)
		{
			this.repo = repo;
			this.logger = logger;
		}

		//Getting Course by Trainer id
		[HttpGet("GetCourseOfTrainer/{trainerId}")]
		public IActionResult GetCourseOfTrainer(int trainerId)
		{
			try
			{
				List<TrainerCourse> trainercourse = repo.TrainerCourse.ToList();
				List<Trainer> trainer = repo.Trainer.ToList();
				List<Admin> admin = repo.Admin.ToList();
				List<Course> course = repo.Course.ToList();
				var id = trainercourse.FindAll(x => x.TrainerId == trainerId);
				if (id != null)
				{
					logger.LogInformation("Course added to trainers and the details are listed");
					return StatusCode(200, id);
				}
				else
				{
					logger.LogWarning("no trainer with courses found");
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

		//Delete
		[HttpDelete("DeleteCourseAndTrainer/{id}")]
		public IActionResult DeleteCourseAndTrainer(int id)
		{
			try
			{
				TrainerCourse trainerCourse= repo.TrainerCourse.Find(id);
				if (trainerCourse != null)
				{
					trainerCourse.IsActive = false;
					repo.SaveChanges();
					logger.LogInformation("Trainer and Course details are deletd successfully");
					return Ok("Trainer and Course deleted successfully");
				}
				else
				{
					logger.LogWarning("Details not found. Try again.");
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
		

	}
}

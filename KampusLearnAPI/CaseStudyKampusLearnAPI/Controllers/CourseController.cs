using CaseStudyKampusLearnAPI.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System;
using Microsoft.Extensions.Logging;

namespace CaseStudyKampusLearnAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CourseController : ControllerBase
	{
		
		private readonly KampusLearnContext repo;
		private readonly ILogger<Course> logger;

		public CourseController(KampusLearnContext repo, ILogger<Course> logger)
		{
			this.repo = repo;
			this.logger = logger;
		}

		//Getting Course Details

		[HttpGet("GetCourse")]
		public IActionResult GetCourse()
		{
			List<Course> course = repo.Course.ToList();
			List<Admin> adminlist = repo.Admin.ToList();
			var admincourse = from courses in course
							   join admin in adminlist
							   on courses.AdminId equals admin.AdminId
							   into coursetrainerjoin
							   from admins in coursetrainerjoin.DefaultIfEmpty()
							   select new { courses, admins };
			logger.LogInformation("Course details are listed");
			return StatusCode(200, admincourse.Where(status => status.courses.IsActive == true));
		}

		//Get Course by id
		[HttpGet("GetCoursebyid/{courseId}")]
		public IActionResult GetCourseById(int courseId)
		{
			var id = repo.Course.Find(courseId);
			if (id != null)
			{
				logger.LogInformation("Course details are listed by admin id : "+ courseId);
				return StatusCode(200, id);
			}
			else
			{
				logger.LogError("Course details not found");
				return StatusCode(404, "Course not found");
			}
		}

		//Get Course by Category
		[HttpGet("GetCoursebyCategory/{courseCategory}")]
		public IActionResult GetCourseByCategory(string courseCategory)
		{
			List<Course> course = repo.Course.ToList();
			var category = course.FindAll(t=>t.CourseCategory.ToLower()==courseCategory.ToLower());
			if (category != null)
			{
				logger.LogInformation("Course details are listed by category : "+courseCategory);
				return StatusCode(200, category);
			}
			else
			{
				logger.LogError("Course details not found");
				return StatusCode(404, "Course not found");
			}
		}

		//Get Course by Ascending order of course Name
		[HttpGet("GetCoursebyAscName")]
		public IActionResult GetCourseOrderByAscName()
		{
			List<Course> course = repo.Course.ToList();
			var ascCourse=course.OrderBy(t => t.CourseName);
			logger.LogInformation("Course details are listed by ascending name of course name" );
			return StatusCode(200, ascCourse.Where(status => status.IsActive == true));
		}

		//Get Course by Descending order of course Name
		[HttpGet("GetCoursebyDescName")]
		public IActionResult GetCourseOrderByDescName()
		{
			List<Course> course = repo.Course.ToList();
			var descCourse = course.OrderByDescending(t => t.CourseName);
			logger.LogInformation("Course details are listed by descending name of course name");
			return StatusCode(200, descCourse.Where(status => status.IsActive == true));
		}

		//Get Course by Ascending order of Price
		[HttpGet("GetCoursebyAscPrice")]
		public IActionResult GetCourseOrderByAscprice()
		{
			List<Course> course = repo.Course.ToList();
			var ascCourse = course.OrderBy(t => t.Price);
			logger.LogInformation("Course details are listed by ascending order of price");
			return StatusCode(200, ascCourse.Where(status => status.IsActive == true));
		}

		//Get Course by Descending order of Price
		[HttpGet("GetCoursebyDescPrice")]
		public IActionResult GetCourseOrderByDescPrice()
		{
			List<Course> course = repo.Course.ToList();
			var descCourse = course.OrderByDescending(t => t.Price);
			logger.LogInformation("Course details are listed by descending order of price");
			return StatusCode(200, descCourse.Where(status => status.IsActive == true));
		}

		//Get Course by Ascending order of Duration of hours
		[HttpGet(" ")]
		public IActionResult GetCourseOrderByAscDuration()
		{
			List<Course> course = repo.Course.ToList();
			var ascCourse = course.OrderBy(t => t.DurationInHours);
			logger.LogInformation("Course details are listed by ascending order of duration");
			return StatusCode(200, ascCourse.Where(status => status.IsActive == true));
		}

		//Get Course by Descending order of Duration of hours
		[HttpGet("GetCoursebyDescDuration")]
		public IActionResult GetCourseOrderByDescDuration()
		{
			List<Course> course = repo.Course.ToList();
			var descCourse = course.OrderByDescending(t => t.DurationInHours);
			logger.LogInformation("Course details are listed by descending order of duration");
			return StatusCode(200, descCourse.Where(status => status.IsActive == true));
		}


	

		//Courses which are not active
		[HttpGet("GetCourseNotActive")]
		public IActionResult GetCourseNotActive()
		{
			List<Course> course = repo.Course.ToList();
			logger.LogInformation("Course which are not active details are listed ");
			return StatusCode(200, course.Where(status => status.IsActive == false));
		}
	}
}

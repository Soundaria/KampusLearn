using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using CaseStudyKampusLearnAPI.Models;
using CaseStudyKampusLearnAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace CaseStudyKampusLearnAPI.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	
	public class AdminController : ControllerBase
	{
		private readonly KampusLearnContext repo;
		private readonly ILogger<Admin> logger;
		private readonly IJWTManagerRepository jWTManagerRepository;
		public AdminController(KampusLearnContext repo, ILogger<Admin> logger,IJWTManagerRepository jWTManagerRepositor)
		{
			this.repo = repo;
			this.logger = logger;
			this.jWTManagerRepository = jWTManagerRepositor;
		}

		//Validating Admin
		[AllowAnonymous]
		[HttpPost("ValidatingAdmin")]
		public IActionResult ValidatingAdmin([FromBody] Admin admin)
		{
			try
			{
				List<Admin> user = repo.Admin.ToList();
				Admin id = user.Find(e => (e.Email == admin.Email) && (e.Password == admin.Password));
				if (id != null)
				{
					var jwt = jWTManagerRepository.AuthenticateAdmin(id.Email, id.Password);
					logger.LogInformation("Admin added successfully.. And JWt token is created");
					return Ok(new { jwt, id });
					//return StatusCode(200, jwt);
				}
				else
				{
					logger.LogError("No admin data found.. Try again");
					return StatusCode(404, "UserName or Password is incorrect");
				}
			}
			catch (NullReferenceException ex)
			{
				logger.LogWarning("Data not found"+ex.Message);
				return StatusCode(404,"Data Not Found");
			}
			catch(Exception ex)
			{
				logger.LogWarning("Contact to Admin.. Server Error" + ex.Message);
				return StatusCode(500 ,"Internal Server Error");
			}
			
		}
		//public string GetIdTokenExpiry(string idtoken)
		//{
		//	var token = new JwtSecurityToken(jwtEncodedString: idtoken);
		//	string expiry = token.Claims.First(c => c.Type == "Expires").Value;
		//	return expiry;
		//}


		//[HttpGet("currentUser")]
		//public IActionResult currentuser()
		//{
		//	int id = Convert.ToInt32(HttpContext.User.FindFirstValue("AdminId"));
		//	return Ok(new { userid = id });
		//}



		//Add Admin
		[HttpPost("AddAdmin")]
		public IActionResult AddAdmin([FromBody] Admin admin)
		{
			try
			{
				admin.CreatedAt = DateTime.Now;
				repo.Admin.Add(admin);
				repo.SaveChanges();
				logger.LogInformation("Admin Added Successfully.");
				return StatusCode(201, "Admin created succesfully");
			}
			catch (NullReferenceException ex)
			{
				logger.LogWarning("Data not found" + ex.Message);
				return StatusCode(404, "Data Not Found");
			}
			catch (UnauthorizedAccessException ex)
			{
				logger.LogWarning("No Access" + ex.Message);
				return StatusCode(404, "No Access");
			}
			catch (Exception ex)
			{
				logger.LogWarning("Contact to Admin.. Server Error" + ex.Message);
				return StatusCode(500, "Internal Server Error");
			}
		}

		//Getting Admin Details
		
		[HttpGet("GetAdmin")]
		public IActionResult GetAdmin()
		{
			try
			{
				//int adminId = Convert.ToInt32(HttpContext.User.FindFirstValue("adminId"));

				List<Admin> admin = repo.Admin.ToList();
				if (admin.Count() != 0)
				{
					logger.LogInformation("Admin details are listed");
					return StatusCode(200, admin.Where(status => status.IsActive == true));
				}
				else
				{
					logger.LogInformation("No admins are available");
					return StatusCode(404,"No Admin data are available");
				}
			}
			catch (Exception ex)
			{
				logger.LogWarning("Contact to Admin.. Server Error" + ex.Message);
				return StatusCode(500, "Internal Server Error");
			}
		}
		
		//Getting Admin by id
		[HttpGet("GetAdminbyId")]
		public IActionResult GetAdminbyId()
		{
			try
			{
				int adminId = Convert.ToInt32(HttpContext.User.FindFirstValue("adminId"));
				
				Admin admin = repo.Admin.Find(adminId);
				if (admin != null)
				{
					logger.LogInformation("Admin details are listed by id : " + adminId);
					return StatusCode(200, new { admin, adminId });
				}
				else
				{
					logger.LogError("Admin id not found");
					return StatusCode(404, "Admin not found");
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

		//Update Admin
		[HttpPut("UpdateAdmin")]
		public IActionResult UpdateAdmin( [FromBody] Admin adminobj)
		{
			try
			{
				int adminId = Convert.ToInt32(HttpContext.User.FindFirstValue("adminId"));
			
				Admin admin = repo.Admin.Find(adminId);
				if (admin != null)
				{
					admin.Name = adminobj.Name;
					admin.Password = adminobj.Password;
					admin.Contact = adminobj.Contact;
					admin.Email = adminobj.Email;
					admin.Address = adminobj.Address;
					admin.CreatedAt = admin.CreatedAt;
					admin.IsActive = true;
					admin.UpdatedAt = DateTime.Now;
					repo.SaveChanges();
					logger.LogInformation("Admin Details updated Successfully ");
					return StatusCode(200, "Admin details updated successfully");
				}
				else
				{
					logger.LogError("Admin details Not found");
					return StatusCode(404, "Admin not found");
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

		//Delete Admin
		[HttpDelete("DeleteAdmin/{adminId}")]
		public IActionResult DeleteAdmin(int adminId)
		{
			try
			{
				//int adminId = Convert.ToInt32(HttpContext.User.FindFirstValue("adminId"));
				Admin admin = repo.Admin.Find(adminId);

				if (admin != null)
				{
					admin.IsActive = false;
					repo.SaveChanges();
					logger.LogInformation("Admin details deleted successfully");
					return Ok("Admin deleted Successfully");
				}
				else
				{
					logger.LogError("Admin details Not found");
					return StatusCode(404, "Admin not found");
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

		//Admin who are not active
		[HttpGet("GetAdminNotActive")]
		public IActionResult GetAdminNotActive()
		{
			try
			{
				//int adminId = Convert.ToInt32(HttpContext.User.FindFirstValue("adminId"));
				List<Admin> admin = repo.Admin.ToList();

				return StatusCode(200, admin.Where(status => status.IsActive == false));
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


		//Adding Trainer
		[HttpPost("AddTrainer")]
		public IActionResult AddTrainer([FromBody] Trainer trainer)
		{
			try
			{
				int adminId= Convert.ToInt32(HttpContext.User.FindFirstValue("adminId"));
				trainer.CreatedAt = DateTime.Now;
				trainer.AdminId = adminId;
				repo.Trainer.Add(trainer);
				repo.SaveChanges();
				logger.LogInformation("Trainer details added successfully");
				return StatusCode(201, "Trainer Created successfully");
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

		//Get Trainer by Admin
		[HttpGet("GetTrainerbyAdmin")]
		public IActionResult GetTrainerbyAdmin()
		{
			try
			{
				int adminId= Convert.ToInt32(HttpContext.User.FindFirstValue("adminId"));
				List<Trainer> list = repo.Trainer.ToList();
				var trainer = list.FindAll(x => x.AdminId == adminId);
				if (trainer != null)
				{
					logger.LogInformation("Trainers details are listed with id : " + adminId);
					return StatusCode(200, trainer.Where(x => x.IsActive == true));
				}
				else
				{
					logger.LogWarning("No trainer found with this id");
					return StatusCode(404, "Trainer not found");
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
			//Adding Courses
			[HttpPost("AddCourse")]
		public IActionResult AddCourse( [FromBody] Course course)
		{
			try
			{

				int adminId = Convert.ToInt32(HttpContext.User.FindFirstValue("adminId"));
				course.CreatedAt = DateTime.Now;
				course.AdminId = adminId;
				repo.Course.Add(course);
				repo.SaveChanges();
				logger.LogInformation("Course details added successfully");
				return StatusCode(201, "Course Created successfully");
			}
			catch (Exception ex)
			{
				logger.LogWarning("Contact to Admin.. Server Error" + ex);
				return StatusCode(500, "Internal Server Error");
			}
		}

		//Get course added by Admin  
		[HttpGet("GetCoursebyAdminId")]
		public IActionResult GetCourseById()
		{
			int adminId = Convert.ToInt32(HttpContext.User.FindFirstValue("adminId"));
			List<Course> course = repo.Course.ToList();
			var id = course.FindAll(x=>x.AdminId==adminId);
			if (id != null)
			{
				logger.LogInformation("Course details are listed by admin id : " + adminId);
				return StatusCode(200, id.Where(x=>x.IsActive==true));
			}
			else
			{
				logger.LogError("Course details not found");
				return StatusCode(404, "Course not found");
			}
		}

		[HttpGet("GetTrainer")]
		public IActionResult getTrainer()
		{
			try
			{
				List<Trainer> trainer = repo.Trainer.ToList();
				List<Admin> adminlist = repo.Admin.ToList();
				var admintrainer = from trainee in trainer
								   join admin in adminlist
								   on trainee.AdminId equals admin.AdminId
								   into admintrainerjoin
								   from admins in admintrainerjoin.DefaultIfEmpty()
								   select new { trainee, admins };

				if (trainer.Count != 0)
				{
					logger.LogInformation("Trainers details are listed");
					return StatusCode(200, admintrainer.Where(status => status.trainee.IsActive == true));
				}
				else
				{
					logger.LogWarning("No trainer added");
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


		//Add Course To Trainer
		[HttpPost("AddCourseToTrainer")]
		public IActionResult AddCourseToTrainer([FromBody] TrainerCourse trainerCourse)
		{
			try
			{
				int adminId = Convert.ToInt32(HttpContext.User.FindFirstValue("adminId"));
				trainerCourse.AdminId = adminId;
				trainerCourse.CreatedAt = DateTime.Now;
				repo.TrainerCourse.Add(trainerCourse);
				repo.SaveChanges();
				logger.LogInformation("Course added to trainer");
				return StatusCode(201, "Course added to Trainer");
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

		//Update Course to trainer
		[HttpPut("UpdateCourseToTrainer/{Id}")]
		public IActionResult UpdateCourseToTrainer([FromBody] TrainerCourse trainerCourseobj, int Id)
		{
			try
			{
				int admin = Convert.ToInt32(HttpContext.User.FindFirstValue("adminId"));
				var trainercourse = repo.TrainerCourse.Find(Id);
				trainercourse.CourseId = trainerCourseobj.CourseId;
				trainercourse.TrainerId = trainerCourseobj.TrainerId;
				trainercourse.BatchName = trainerCourseobj.BatchName;
				trainercourse.AdminId = admin;
				trainercourse.CreatedAt = trainercourse.CreatedAt;
				trainercourse.UpdatedAt = DateTime.Now;
				repo.SaveChanges();
				logger.LogInformation("Course updated to trainer");
				return StatusCode(200, "Course updated to Trainer");
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

		//Getting Course of Trainer Details

		[HttpGet("GetCourseOfTrainer")]
		public IActionResult GetCourseOfTrainer()
		{

			//int adminId = Convert.ToInt32(HttpContext.User.FindFirstValue("adminId"));
			List<Trainer> trainer = repo.Trainer.ToList();
			List<Admin> admin = repo.Admin.ToList();
			List<Course> course = repo.Course.ToList();
			List<TrainerCourse> trainerCourse = repo.TrainerCourse.ToList();
			return StatusCode(200, trainerCourse.Where(status => status.IsActive == true));
		}


		[HttpGet("GetCourseOfTrainer/{id}")]
		public IActionResult GetCourseOfTrainerbyid(int id)
		{

			//int adminId = Convert.ToInt32(HttpContext.User.FindFirstValue("adminId"));

			List<Trainer> trainer = repo.Trainer.ToList();
			List<Admin> admin = repo.Admin.ToList();
			List<Course> course = repo.Course.ToList();
			var trainercourse = repo.TrainerCourse.Find(id);
			return StatusCode(200, trainercourse);
		}

		//Update Course
		[HttpPut("UpdateCourse/{CourseId}")]
		public IActionResult UpdateCourse(int CourseId, [FromBody] Course CourseObj)
		{
			try
			{
				//int adminId = Convert.ToInt32(HttpContext.User.FindFirstValue("adminId"));
				Course course = repo.Course.Find(CourseId);
				if (course != null)
				{
					course.CourseName = CourseObj.CourseName;
					course.CourseCategory = CourseObj.CourseCategory;
					course.Price = CourseObj.Price;
					course.DurationInHours = CourseObj.DurationInHours;
					course.IsActive = true;
					course.UpdatedAt = DateTime.Now;
					repo.SaveChanges();
					logger.LogInformation("Course details are updated successfully");
					return StatusCode(200, "Course Updated sucessfully");
				}
				else
				{
					logger.LogWarning("Course details cannot be found");
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

		
		//Delete Course
		[HttpDelete("DeleteCourse/{courseId}")]
		public IActionResult DeleteCourse(int courseId)
		{
			try
			{
				Course course = repo.Course.Find(courseId);
				if (course != null)
				{
					course.IsActive = false;
					repo.SaveChanges();
					logger.LogInformation("Course details are deletd successfully");
					return Ok("Course deleted successfully");
				}
				else
				{
					logger.LogWarning("Course details not found. Try again.");
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

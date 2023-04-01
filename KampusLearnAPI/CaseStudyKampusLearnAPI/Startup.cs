using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CaseStudyKampusLearnAPI.Models;
using CaseStudyKampusLearnAPI.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace CaseStudyKampusLearnAPI
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			var jwtSection = Configuration.GetSection("JWTSettings");
			services.Configure<JWTSettings>(jwtSection);

			var jwtSettings = jwtSection.Get<JWTSettings>();
			var Key = Encoding.UTF8.GetBytes(jwtSettings.Key);
			services.AddAuthentication(x =>
			{
				x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			}).AddJwtBearer(jwt =>
			{
				jwt.RequireHttpsMetadata = false;
				jwt.SaveToken = true;
				jwt.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuer = false,
					ValidateAudience = false,
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = new SymmetricSecurityKey(Key)
				};
			});

			services.AddControllers();

			services.AddCors();

			//Dbcontext is a dependency class.
			services.AddDbContext<KampusLearnContext>(options => options.UseSqlServer(Configuration.GetConnectionString("KampusLearn_CS")));

			services.AddScoped<IJWTManagerRepository, JWTManagerRepository>();


					services.AddControllers().AddNewtonsoftJson(x =>
			x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env,ILoggerFactory loggerFactory)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			loggerFactory.AddLog4Net();

			app.UseHttpsRedirection();

			app.UseCors(option => option.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

			app.UseRouting();

			app.UseAuthentication();

			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}

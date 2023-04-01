using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using CaseStudyKampusLearnAPI.Models;
using System.Linq;
using Microsoft.Extensions.Options;

namespace CaseStudyKampusLearnAPI.Repository
{
	public class JWTManagerRepository:IJWTManagerRepository
	{	
		private readonly KampusLearnContext repo;
		private readonly JWTSettings jWTSettings;
		public JWTManagerRepository(KampusLearnContext repo, IOptions<JWTSettings> jWTSettings)
		{
			this.repo = repo;
			this.jWTSettings = jWTSettings.Value;
		}
		public string AuthenticateAdmin(string email, string password)
		{
			List<Admin> adminRecords = repo.Admin.ToList();
			var admin = adminRecords.FirstOrDefault(x => x.Email == email && x.Password == password && x.IsActive==true);
			if (admin==null)
			{
				return null;
			}

			// Else we generate JSON Web Token
			var tokenHandler = new JwtSecurityTokenHandler();
			var tokenKey = Encoding.UTF8.GetBytes(jWTSettings.Key);
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new Claim[]
			  {
			 new Claim(ClaimTypes.Name, admin.AdminId.ToString()),
			 new Claim("AdminId", admin.AdminId.ToString()),
			 new Claim(ClaimTypes.Version,"V3.1")
			  }),
				Expires = DateTime.UtcNow.AddMinutes(1440),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
			};
			var token = tokenHandler.CreateToken(tokenDescriptor);
			var GetToken = tokenHandler.WriteToken(token);
			

			return GetToken;
		}
		public string AuthenticateTrainer(string email, string password)
		{
			List<Trainer> trainerRecords = repo.Trainer.ToList();
			var  trainer = trainerRecords.FirstOrDefault(x => x.Email == email && x.Password == password && x.IsActive == true);
			if (trainer == null)
			{
				return null;
			}

			// Else we generate JSON Web Token
			var tokenHandler = new JwtSecurityTokenHandler();
			var tokenKey = Encoding.UTF8.GetBytes(jWTSettings.Key);
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new Claim[]
			  {
			 new Claim(ClaimTypes.Name, trainer.TrainerId.ToString()),
			  new Claim("TrainerId", trainer.TrainerId.ToString()),
			 new Claim(ClaimTypes.Version,"V3.1")
			  }),
				Expires = DateTime.UtcNow.AddMinutes(30),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
			};
			var token = tokenHandler.CreateToken(tokenDescriptor);
			var GetToken = tokenHandler.WriteToken(token);
			

			return GetToken;
		}

		public string AuthenticateCandidate(string email, string password)
		{
			List<Candidate> candidateRecords = repo.Candidate.ToList();
			var candidate = candidateRecords.FirstOrDefault(x => x.Email == email && x.Password == password && x.IsActive == true);
			if (candidate == null)
			{
				return null;
			}

			// Else we generate JSON Web Token
			var tokenHandler = new JwtSecurityTokenHandler();
			var tokenKey = Encoding.UTF8.GetBytes(jWTSettings.Key);
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new Claim[]
			  {
			 new Claim(ClaimTypes.Name, candidate.CandidateId.ToString()),
			  new Claim("CandidateId", candidate.CandidateId.ToString()),
			 new Claim(ClaimTypes.Version,"V3.1")
			  }),
				Expires = DateTime.UtcNow.AddMinutes(30),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
			};
			var token = tokenHandler.CreateToken(tokenDescriptor);
			var GetToken = tokenHandler.WriteToken(token);

			return GetToken;
		}
	}
}

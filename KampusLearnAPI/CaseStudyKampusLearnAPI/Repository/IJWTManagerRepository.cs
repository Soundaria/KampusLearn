using CaseStudyKampusLearnAPI.Models;


namespace CaseStudyKampusLearnAPI.Repository
{
	public interface IJWTManagerRepository
	{
		string AuthenticateAdmin(string email,string password);
		string AuthenticateTrainer(string email, string password);
		string AuthenticateCandidate(string email, string password);
	}
}

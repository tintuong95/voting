using Voting.Models;

namespace Voting.Services.Interfaces
{
    public interface IRatingService
    {
        Rating GetAsync(int id);

        List<Rating> GetAllAsync();

        Rating CreateAsync(Rating author);

        Rating UpdateAsync(int id, Rating author);

        int RemoveAsync(int id);

        string RemoveAllAsync();
    }
}

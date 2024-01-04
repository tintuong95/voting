using Voting.Models;

namespace Voting.Services.Interfaces
{
    public interface IAlbumService
    {
        Album GetAsync(int id);

        List<Album> GetAllAsync();

        Album CreateAsync(Album account);

        Album UpdateAsync(int id, Album account);

        int RemoveAsync(int id);
    }
}

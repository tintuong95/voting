using Voting.Models;

namespace Voting.Services.Interfaces
{
    public interface IAuthorService
    {
        Author GetAsync(int id);

        List<Author> GetAllAsync();

        Author CreateAsync(Author author);

        Author UpdateAsync(int id, Author author);

        int RemoveAsync(int id);
    }
}

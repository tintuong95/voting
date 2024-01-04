using Voting.Models;

namespace Voting.Services.Interfaces
{
    public interface IAccountService
    {
        Account GetAsync(int id);

        List<Account> GetAllAsync();

        Account CreateAsync(Account account);

        Account UpdateAsync(int id, Account account);

        int RemoveAsync(int id);

        Account Signin(Account account);
    }
}

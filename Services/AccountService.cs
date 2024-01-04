using Newtonsoft.Json;

using Voting.Models;
using Voting.Services.Interfaces;

namespace Voting.Services
{
    public class AccountService : IAccountService
    {
        public List<Account> Accounts { get; set; }

        public AccountService()
        {
            using (StreamReader r = new StreamReader("./Data/Account.json"))
            {
                string json = r.ReadToEnd();
                Accounts = JsonConvert.DeserializeObject<List<Account>>(json)!;
            }
        }

        public Account GetAsync(int id)
        {
            return Accounts.Where(c => c.Id == id).FirstOrDefault()!;
        }

        public List<Account> GetAllAsync()
        {
            return Accounts.ToList();
        }

        public Account CreateAsync(Account account)
        {
            account.Id = new Random().Next(10000);
            Accounts.Add(account);
            string jsonString = JsonConvert.SerializeObject(Accounts);

            System.IO.File.WriteAllText(@"./Data/Account.json", jsonString);
            return account;
        }

        public Account UpdateAsync(int id, Account account)
        {
            var rs = Accounts.Where(c => c.Id == id).FirstOrDefault();
            rs.Username = account.Username;
            rs.Password = account.Password;
            rs.Id = account.Id;

            string jsonString = JsonConvert.SerializeObject(Accounts);

            System.IO.File.WriteAllText(@"./Data/Account.json", jsonString);
            return account;

        }

        public int RemoveAsync(int id)
        {
            Accounts.RemoveAll(c => c.Id == id);



            string jsonString = JsonConvert.SerializeObject(Accounts);

            System.IO.File.WriteAllText(@"./Data/Account.json", jsonString);
            return id;
        }

        public Account Signin(Account account)
        {
            var rs = Accounts.Where(c => c.Username == account.Username && c.Password == c.Password).FirstOrDefault();
            return rs;
        }


    }
}

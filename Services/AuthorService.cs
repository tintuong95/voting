using Newtonsoft.Json;

using Voting.Models;
using Voting.Services.Interfaces;


namespace Voting.Services
{
    public class AuthorService : IAuthorService
    {
        public List<Author> Authors { get; set; }

        public AuthorService()
        {
            using (StreamReader r = new StreamReader("./Data/Author.json"))
            {
                string json = r.ReadToEnd();
                Authors = JsonConvert.DeserializeObject<List<Author>>(json)!;
            }
        }

        public Author GetAsync(int id)
        {
            return Authors.Where(c => c.Id == id).FirstOrDefault()!;
        }

        public List<Author> GetAllAsync()
        {
            return Authors.ToList();
        }

        public Author CreateAsync(Author author)
        {
            author.Id = new Random().Next(10000);
            Authors.Add(author);
            string jsonString = JsonConvert.SerializeObject(Authors);

            System.IO.File.WriteAllText(@"./Data/Author.json", jsonString);
            return author;
        }

        public Author UpdateAsync(int id, Author author)
        {
            var rs = Authors.Where(c => c.Id == id).FirstOrDefault();
            rs.Name = author.Name;
            rs.Description = author.Description;
            rs.Id = author.Id;

            string jsonString = JsonConvert.SerializeObject(Authors);

            System.IO.File.WriteAllText(@"./Data/Author.json", jsonString);
            return author;

        }

        public int RemoveAsync(int id)
        {
            Authors.RemoveAll(c => c.Id == id);



            string jsonString = JsonConvert.SerializeObject(Authors);

            System.IO.File.WriteAllText(@"./Data/Author.json", jsonString);
            return id;
        }
    }
}

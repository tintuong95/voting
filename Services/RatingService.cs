using Newtonsoft.Json;

using Voting.Models;
using Voting.Services.Interfaces;


namespace Voting.Services
{
    public class RatingService : IRatingService
    {
        public List<Rating> Ratings { get; set; }

        public RatingService()
        {
            using (StreamReader r = new StreamReader("./Data/Rating.json"))
            {
                string json = r.ReadToEnd();
                Ratings = JsonConvert.DeserializeObject<List<Rating>>(json)!;
            }
        }

        public Rating GetAsync(int id)
        {
            return Ratings.Where(c => c.Id == id).FirstOrDefault()!;
        }

        public List<Rating> GetAllAsync()
        {
            return Ratings.ToList();
        }

        public Rating CreateAsync(Rating rating)
        {
            rating.Id = new Random().Next(10000);
            Ratings.Add(rating);
            string jsonString = JsonConvert.SerializeObject(Ratings);

            System.IO.File.WriteAllText(@"./Data/Rating.json", jsonString);
            return rating;
        }

        public Rating UpdateAsync(int id, Rating rating)
        {
            var rs = Ratings.Where(c => c.Id == id).FirstOrDefault();
            rs.AccountId = rating.AccountId;
            rs.AlbumId = rating.AlbumId;
            rs.Id = rating.Id;
            rs.Point = rating.Point;

            string jsonString = JsonConvert.SerializeObject(Ratings);

            System.IO.File.WriteAllText(@"./Data/Rating.json", jsonString);
            return rating;

        }

        public int RemoveAsync(int id)
        {
            Ratings.RemoveAll(c => c.Id == id);



            string jsonString = JsonConvert.SerializeObject(Ratings);

            System.IO.File.WriteAllText(@"./Data/Rating.json", jsonString);
            return id;
        }
    }
}

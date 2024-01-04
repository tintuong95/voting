using Newtonsoft.Json;

using Voting.Models;
using Voting.Services.Interfaces;

namespace Voting.Services
{
    public class AlbumService : IAlbumService
    {
        public List<Album> Albums { get; set; }

        public AlbumService()
        {
            using (StreamReader r = new StreamReader("./Data/Album.json"))
            {
                string json = r.ReadToEnd();
                Albums = JsonConvert.DeserializeObject<List<Album>>(json)!;
            }
        }

        public Album GetAsync(int id)
        {
            return Albums.Where(c => c.Id == id).FirstOrDefault()!;
        }

        public List<Album> GetAllAsync()
        {
            return Albums.ToList();
        }

        public Album CreateAsync(Album album)
        {
            album.Id = new Random().Next(10000);
            Albums.Add(album);
            string jsonString = JsonConvert.SerializeObject(Albums);

            System.IO.File.WriteAllText(@"./Data/Album.json", jsonString);
            return album;
        }

        public Album UpdateAsync(int id, Album album)
        {
            var rs = Albums.Where(c => c.Id == id).FirstOrDefault();
            rs.Name = album.Name;
            rs.AuthorId = album.AuthorId;
            rs.Description = album.Description;
            rs.Id = album.Id;
            rs.Like = album.Like;
            rs.Share = album.Share;
            string jsonString = JsonConvert.SerializeObject(Albums);

            System.IO.File.WriteAllText(@"./Data/Album.json", jsonString);
            return album;

        }

        public int RemoveAsync(int id)
        {
            Albums.RemoveAll(c => c.Id == id);



            string jsonString = JsonConvert.SerializeObject(Albums);

            System.IO.File.WriteAllText(@"./Data/Album.json", jsonString);
            return id;
        }

    }
}

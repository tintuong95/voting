namespace Voting.Models
{
    public class Album
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }
        public int AuthorId { get; set; }

        public int Like { get; set; }
        public int Share { get; set; }

    }
}

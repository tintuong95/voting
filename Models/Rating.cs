﻿namespace Voting.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public string AccountId { get; set; }
        public int AlbumId { get; set; }

        public int Point { get; set; }
    }
}

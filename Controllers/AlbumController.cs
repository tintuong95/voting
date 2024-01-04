using Microsoft.AspNetCore.Mvc;
using Voting.Models;
using Voting.Services.Interfaces;

namespace Voting.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AlbumController : ControllerBase
    {
        public IAlbumService _albumService { get; set; }

        public AlbumController(IAlbumService albumService)
        {
            _albumService = albumService;
        }

        [HttpGet]
        public IActionResult GetAllAlbum()
        {
            var rs = _albumService.GetAllAsync();
            return Ok(rs);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetAlbum(int id)
        {
            var rs = _albumService.GetAsync(id);
            return Ok(rs);
        }

        [HttpPost]
        [Route("create")]
        public IActionResult Create([FromBody] Album album)
        {
            var rs = _albumService.CreateAsync(album);
            return Ok(rs);
        }

        [HttpPut]
        [Route("update/{id:int}")]
        public IActionResult Update(int id, [FromBody] Album album)
        {
            var rs = _albumService.CreateAsync(album);
            return Ok(rs);
        }

        [HttpGet]
        [Route("photos/{albumId:int}")]
        public IActionResult Photos(int albumId)
        {
            try
            {
                string directloc = $"./StaticFile/{albumId}";

                string[] fyles = Directory.GetFiles(directloc);
                return Ok(fyles);
            }
            catch (Exception e)
            {
                return Ok();
            }
        }
    }
}

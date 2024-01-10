using Microsoft.AspNetCore.Mvc;
using Voting.Models;
using Voting.Services.Interfaces;

namespace Voting.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RatingController : ControllerBase
    {
        public IRatingService _ratingService { get; set; }

        public RatingController(IRatingService ratingService)
        {
            _ratingService = ratingService;
        }

        [HttpGet]
        public IActionResult GetAllRating()
        {
            var rs = _ratingService.GetAllAsync();
            return Ok(rs);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetRating(int id)
        {
            var rs = _ratingService.GetAsync(id);
            return Ok(rs);
        }

        [HttpPost]
        [Route("create")]
        public IActionResult Create([FromBody] Rating rating)
        {
            try
            {
                var rs = _ratingService.CreateAsync(rating);
                if (rs == null) return NotFound();
                return Ok(rs);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        [HttpPut]
        [Route("update/{id:int}")]
        public IActionResult Update(int id, [FromBody] Rating rating)
        {
            var rs = _ratingService.CreateAsync(rating);
            return Ok(rs);
        }

        [HttpGet]
        [Route("remove-all")]
        public IActionResult RemoveAll()
        {
            var rs = _ratingService.RemoveAllAsync();
            return Ok(rs);
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Voting.Models;
using Voting.Services.Interfaces;

namespace Voting.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthorController : ControllerBase
    {
        public IAuthorService _authorService { get; set; }

        public AuthorController(IAuthorService authorService)
        {
            _authorService = authorService;
        }

        [HttpGet]
        public IActionResult GetAllAuthor()
        {
            var rs = _authorService.GetAllAsync();
            return Ok(rs);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetAuthor(int id)
        {
            var rs = _authorService.GetAsync(id);
            return Ok(rs);
        }

        [HttpPost]
        [Route("create")]
        public IActionResult Create([FromBody] Author author)
        {
            var rs = _authorService.CreateAsync(author);
            return Ok(rs);
        }

        [HttpPut]
        [Route("update/{id:int}")]
        public IActionResult Update(int id, [FromBody] Author author)
        {
            var rs = _authorService.CreateAsync(author);
            return Ok(rs);
        }
    }
}

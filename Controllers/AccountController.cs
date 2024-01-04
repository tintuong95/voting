using Microsoft.AspNetCore.Mvc;
using Voting.Models;
using Voting.Services.Interfaces;

namespace Voting.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        public IAccountService _accountService { get; set; }

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet]
        public IActionResult GetAllAccount()
        {
            var rs = _accountService.GetAllAsync();
            return Ok(rs);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetAccount(int id)
        {
            var rs = _accountService.GetAsync(id);
            return Ok(rs);
        }

        [HttpPost]
        [Route("create")]
        public IActionResult Create([FromBody] Account account)
        {
            var rs = _accountService.CreateAsync(account);
            return Ok(rs);
        }

        [HttpPut]
        [Route("update/{id:int}")]
        public IActionResult Update(int id, [FromBody] Account account)
        {
            var rs = _accountService.CreateAsync(account);
            return Ok(rs);
        }

        [HttpPost]
        [Route("signin")]
        public IActionResult Signin([FromBody] Account account)
        {
            try
            {
                var rs = _accountService.Signin(account);
                if (rs == null) return NotFound();
                return Ok(rs);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
    }
}

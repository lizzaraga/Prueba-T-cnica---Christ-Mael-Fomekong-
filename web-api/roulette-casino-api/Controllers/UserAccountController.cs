using Microsoft.AspNetCore.Mvc;
using roulette_casino_api.Filters;
using roulette_casino_api.Models.Dtos;
using roulette_casino_api.Models.Entities;
using roulette_casino_api.Services.Ifcs;

namespace roulette_casino_api.Controllerse;


[ApiController]
[Route(("Api/[controller]"))]
public class UserAccountController(IUserAccountService accountService): ControllerBase
{
    [HttpPost("SaveOrUpdate")]
    [TypeFilter<CheckIfUserAccountAlreadyExistsAttribute>]
    public async Task<ActionResult<UserAccount>> SaveOrUpdate(UserAccountDto request)
    {
        var userAccount = HttpContext.Items["userAccount"] as UserAccount;
        return Ok(await accountService.SaveOrUpdate(request, userAccount));
    }

    [HttpGet("FindByName/{name}")]
    public async Task<ActionResult<UserAccount>> FindUserAccountByName([FromRoute] string name)
    {
        var userAccount = await accountService.FindByName(name);
        if (userAccount is not null) return Ok(userAccount);
        ModelState.AddModelError("error", "User doesn't exist");
        return new NotFoundObjectResult(ModelState);

    }
}

using Microsoft.AspNetCore.Mvc.Filters;
using roulette_casino_api.Models.Data;
using roulette_casino_api.Models.Dtos;

namespace roulette_casino_api.Filters;

public class CheckIfUserAccountAlreadyExistsAttribute(RouletteCasinoDbContext dbContext): ActionFilterAttribute
{
    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        if (context.ActionArguments["request"] is UserAccountDto request)
        {
            var userAccount = dbContext.UserAccounts.FirstOrDefault(u =>
                u.Name.Equals(request.Name.ToLowerInvariant()));
            context.HttpContext.Items["userAccount"] = userAccount;
        }
        await base.OnActionExecutionAsync(context, next);
    }
}

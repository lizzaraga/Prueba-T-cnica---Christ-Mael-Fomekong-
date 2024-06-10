using Microsoft.EntityFrameworkCore;
using roulette_casino_api.Models.Data;
using roulette_casino_api.Models.Dtos;
using roulette_casino_api.Models.Entities;
using roulette_casino_api.Services.Ifcs;

namespace roulette_casino_api.Services;

public class UserAccountService(
    RouletteCasinoDbContext dbContext
    ): IUserAccountService
{
    public async Task<UserAccount> SaveOrUpdate(UserAccountDto accountDto, UserAccount? account)
    {
        if (account is not null)
        {
            // We're in the case where we need to update user account
            account.RemainingAmount = accountDto.RemainingAmount;
            dbContext.UserAccounts.Update(account);
            await dbContext.SaveChangesAsync();
            return account;
        }

        var newUserAccount = new UserAccount()
        {
            Name = accountDto.Name.ToLower(),
            RemainingAmount = accountDto.RemainingAmount,
        };
        dbContext.UserAccounts.Add(newUserAccount);
        await dbContext.SaveChangesAsync();
        return newUserAccount;
    }

    public async Task<UserAccount?> FindByName(string name)
    {
        return await dbContext.UserAccounts.FirstOrDefaultAsync(u => u.Name.Equals(name.ToLower()));
    }
}

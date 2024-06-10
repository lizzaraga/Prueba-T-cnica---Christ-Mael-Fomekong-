using roulette_casino_api.Models.Dtos;
using roulette_casino_api.Models.Entities;

namespace roulette_casino_api.Services.Ifcs;

public interface IUserAccountService
{
    Task<UserAccount> SaveOrUpdate(UserAccountDto accountDto, UserAccount? account);
    Task<UserAccount?> FindByName(string name);
}

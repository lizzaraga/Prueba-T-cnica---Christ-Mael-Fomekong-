using roulette_casino_api.Models.Dtos;

namespace roulette_casino_api.Services.Ifcs;

public interface IBetService
{
    BetResultDto GenerateRandomBetResult();
}

using roulette_casino_api.Models.Dtos;
using roulette_casino_api.Services.Ifcs;
using roulette_casino_api.utils;

namespace roulette_casino_api.Services;

public class BetService: IBetService
{
    public BetResultDto GenerateRandomBetResult()
    {
        var color = AppUtils.BetColors[Random.Shared.Next(AppUtils.BetColors.Length)];
        var number = Random.Shared.Next(0, 37);

        return new BetResultDto()
        {
            Color = color,
            Number = number
        };
    }
}

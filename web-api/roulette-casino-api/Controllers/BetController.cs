using Microsoft.AspNetCore.Mvc;
using roulette_casino_api.Models.Dtos;
using roulette_casino_api.Services.Ifcs;

namespace roulette_casino_api.Controllerse;


[ApiController]
[Route(("Api/[controller]"))]
public class BetController(
    IBetService betService
    ): ControllerBase
{
    [HttpGet("GenerateBetResult")]
    public ActionResult<BetResultDto> GenerateRandomBetResult()
    {
        return Ok(betService.GenerateRandomBetResult());
    }
}

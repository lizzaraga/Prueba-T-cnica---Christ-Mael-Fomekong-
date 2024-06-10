using System.ComponentModel.DataAnnotations;

namespace roulette_casino_api.Models.Dtos;

public class UserAccountDto
{
    [Required]
    public string Name { get; set; }
    [Required]
    public int RemainingAmount { get; set; }
}

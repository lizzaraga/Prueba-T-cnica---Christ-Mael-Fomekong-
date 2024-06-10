using System.ComponentModel.DataAnnotations;

namespace roulette_casino_api.Models.Entities;

public class UserAccount
{
    public string Name { get; set; }
    public int RemainingAmount { get; set; }
}

using Microsoft.EntityFrameworkCore;
using roulette_casino_api.Models.Entities;

namespace roulette_casino_api.Models.Data;

public class RouletteCasinoDbContext(
    DbContextOptions<RouletteCasinoDbContext> options
    ): DbContext(options)
{

    public DbSet<UserAccount> UserAccounts { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserAccount>()
            .HasKey(account => account.Name);
        base.OnModelCreating(modelBuilder);
    }
}

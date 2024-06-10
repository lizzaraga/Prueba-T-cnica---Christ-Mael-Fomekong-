using Microsoft.EntityFrameworkCore;
using roulette_casino_api.Models.Data;
using roulette_casino_api.Services;
using roulette_casino_api.Services.Ifcs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();
    
    options.AddDefaultPolicy(policyBuilder => policyBuilder.WithOrigins(allowedOrigins ?? new String[]{}).AllowAnyHeader().AllowAnyMethod() );
});
builder.Services.AddDbContext<RouletteCasinoDbContext>(optionsBuilder =>
{   
    optionsBuilder.UseNpgsql(builder.Configuration.GetConnectionString("AppConnectionString"));
});

builder.Services.AddScoped<IBetService, BetService>();
builder.Services.AddScoped<IUserAccountService, UserAccountService>();


builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.UseCors();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

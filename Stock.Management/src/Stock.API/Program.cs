using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Stock.API.Endpoints;
using Stock.Application.Handlers;
using Stock.Infrastructure.Persistence;
using Stock.Infrastructure.Repositories;
using Azure.Identity;

var builder = WebApplication.CreateBuilder(args);

// --- 1. Gestão de Segredos (Azure Key Vault) ---
if (builder.Environment.IsProduction())
{
    var keyVaultEndpoint = new Uri(builder.Configuration["AzureKeyVault:Endpoint"]!);
    builder.Configuration.AddAzureKeyVault(keyVaultEndpoint, new DefaultAzureCredential());
}

// --- 2. Segurança Real (OAuth2 / JWT) ---
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["Jwt:Authority"]!;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"]!
        };
    });

builder.Services.AddAuthorization();

// --- 3. Infraestrutura e Aplicação ---
builder.Services.AddDbContext<StockDbContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IStockRepository, StockRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<StockHandler>();
builder.Services.AddScoped<IEndpoint, StockEndpoints>();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

// Map Endpoints
app.Services.GetServices<IEndpoint>().ToList().ForEach(e => e.MapEndpoint(app));

app.Run();

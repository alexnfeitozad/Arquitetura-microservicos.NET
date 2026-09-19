using Notification.API.Endpoints;
using Notification.Application.Handlers;
using Notification.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Infrastructure
builder.Services.AddDbContext<NotificationDbContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Application
builder.Services.AddScoped<SendNotificationHandler>();
// In a real app, we would implement the Repository and UoW here
// For the Golden Path example, we focus on the structure

var app = builder.Build();

// Map Endpoints
var endpoints = app.Services.GetServices<IEndpoint>();
foreach (var endpoint in endpoints)
{
    endpoint.MapEndpoint(app);
}

app.Run();

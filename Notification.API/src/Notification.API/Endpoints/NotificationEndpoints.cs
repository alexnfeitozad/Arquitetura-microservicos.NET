using Microsoft.AspNetCore.Mvc;
using Notification.Application.DTOs;
using Notification.Application.Handlers;

namespace Notification.API.Endpoints;

public interface IEndpoint
{
    void MapEndpoint(IEndpointRouteBuilder app);
}

public class NotificationEndpoints(SendNotificationHandler handler) : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/notifications");

        group.MapPost("/", async (SendNotificationRequest request, CancellationToken ct) =>
        {
            var response = await handler.HandleAsync(new SendNotificationCommand(request), ct);
            return Results.Created($"/api/v1/notifications/{response.Id}", response);
        });
    }
}

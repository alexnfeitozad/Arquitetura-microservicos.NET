using Microsoft.AspNetCore.Mvc;
using Stock.Application.DTOs;
using Stock.Application.Handlers;

namespace Stock.API.Endpoints;

public class StockEndpoints(StockHandler handler) : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/stock").WithTags("Stock").RequireAuthorization();

        group.MapPost("/", async (CreateStockRequest request, CancellationToken ct) =>
        {
            var response = await handler.CreateAsync(new CreateStockCommand(request), ct);
            return Results.Created($"/api/v1/stock/{response.Id}", response);
        });

        group.MapPatch("/update", async (UpdateStockRequest request, CancellationToken ct) =>
        {
            await handler.UpdateAsync(new UpdateStockCommand(request), ct);
            return Results.NoContent();
        });
    }
}

public interface IEndpoint { void MapEndpoint(IEndpointRouteBuilder app); }

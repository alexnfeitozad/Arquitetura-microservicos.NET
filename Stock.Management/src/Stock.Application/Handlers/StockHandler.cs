using Stock.Application.DTOs;
using Stock.Domain.Entities;
using Stock.Domain.ValueObjects;

namespace Stock.Application.Handlers;

public record CreateStockCommand(CreateStockRequest Request);
public record UpdateStockCommand(UpdateStockRequest Request);

public class StockHandler(IStockRepository repository, IUnitOfWork unitOfWork)
{
    public async Task<StockResponse> CreateAsync(CreateStockCommand command, CancellationToken ct)
    {
        var stock = ProductStock.Create(new Sku(command.Request.Sku), new WarehouseId(command.Request.WarehouseId), new Quantity(command.Request.InitialQuantity), command.Request.Threshold);
        await repository.AddAsync(stock, ct);
        await unitOfWork.CommitAsync(ct);
        return new StockResponse(stock.Id, stock.ProductSku.Value, stock.AvailableQuantity.Value, stock.IsActive);
    }

    public async Task UpdateAsync(UpdateStockCommand command, CancellationToken ct)
    {
        var stock = await repository.GetByIdAsync(command.Request.ProductStockId, ct) ?? throw new KeyNotFoundException();
        var quantity = new Quantity(Math.Abs(command.Request.Amount));
        if (command.Request.IsAddition) stock.AddStock(quantity, command.Request.Reason);
        else stock.RemoveStock(quantity, command.Request.Reason);
        await repository.UpdateAsync(stock, ct);
        await unitOfWork.CommitAsync(ct);
    }
}

public interface IStockRepository {
    Task<ProductStock?> GetByIdAsync(Guid id, CancellationToken ct);
    Task AddAsync(ProductStock stock, CancellationToken ct);
    Task UpdateAsync(ProductStock stock, CancellationToken ct);
}
public interface IUnitOfWork { Task CommitAsync(CancellationToken ct); }

using Stock.Domain.Core;
using Stock.Domain.ValueObjects;
using Stock.Domain.Events;

namespace Stock.Domain.Entities;

public class ProductStock : AggregateRoot
{
    public Guid Id { get; private set; }
    public Sku ProductSku { get; private set; }
    public WarehouseId WarehouseId { get; private set; }
    public Quantity AvailableQuantity { get; private set; }
    public int LowStockThreshold { get; private set; }
    public bool IsActive { get; private set; }
    public byte[] RowVersion { get; private set; } = Array.Empty<byte>();

    private readonly List<StockMovement> _movements = new();
    public IReadOnlyCollection<StockMovement> Movements => _movements.AsReadOnly();

    private ProductStock() { }

    public static ProductStock Create(Sku sku, WarehouseId warehouseId, Quantity initialQuantity, int threshold)
    {
        var stock = new ProductStock
        {
            Id = Guid.NewGuid(),
            ProductSku = sku,
            WarehouseId = warehouseId,
            AvailableQuantity = initialQuantity,
            LowStockThreshold = threshold,
            IsActive = true
        };
        stock.RaiseDomainEvent(new StockUpdatedEvent(stock.Id, initialQuantity.Value, DateTime.UtcNow));
        return stock;
    }

    public void AddStock(Quantity amount, string reason)
    {
        if (!IsActive) throw new InvalidOperationException("Inactive stock.");
        AvailableQuantity = AvailableQuantity.Add(amount);
        _movements.Add(new StockMovement(Guid.NewGuid(), amount, MovementType.Addition, reason, DateTime.UtcNow));
        RaiseDomainEvent(new StockUpdatedEvent(Id, AvailableQuantity.Value, DateTime.UtcNow));
    }

    public void RemoveStock(Quantity amount, string reason)
    {
        if (!IsActive) throw new InvalidOperationException("Inactive stock.");
        if (AvailableQuantity.Value < amount.Value) throw new InvalidOperationException("Insufficient stock.");
        AvailableQuantity = AvailableQuantity.Subtract(amount);
        _movements.Add(new StockMovement(Guid.NewGuid(), amount, MovementType.Removal, reason, DateTime.UtcNow));
        RaiseDomainEvent(new StockUpdatedEvent(Id, AvailableQuantity.Value, DateTime.UtcNow));
        if (AvailableQuantity.Value == 0) RaiseDomainEvent(new StockOutofStockEvent(Id, ProductSku.Value, DateTime.UtcNow));
    }
}

public record StockMovement(Guid Id, Quantity Amount, MovementType Type, string Reason, DateTime OccurredOn);
public enum MovementType { Addition, Removal, Adjustment, Return }

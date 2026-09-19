namespace Stock.Domain.Events;

public record StockUpdatedEvent(Guid ProductStockId, int NewQuantity, DateTime OccurredOn);
public record StockOutofStockEvent(Guid ProductStockId, string Sku, DateTime OccurredOn);
public record StockThresholdReachedEvent(Guid ProductStockId, int CurrentQuantity, int Threshold, DateTime OccurredOn);

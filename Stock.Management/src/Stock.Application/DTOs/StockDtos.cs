namespace Stock.Application.DTOs;

public readonly record struct CreateStockRequest(string Sku, Guid WarehouseId, int InitialQuantity, int Threshold);
public readonly record struct UpdateStockRequest(Guid ProductStockId, int Amount, string Reason, bool IsAddition);
public readonly record struct StockResponse(Guid Id, string Sku, int CurrentQuantity, bool IsActive);

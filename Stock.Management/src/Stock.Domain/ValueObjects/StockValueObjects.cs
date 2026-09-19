namespace Stock.Domain.ValueObjects;

public readonly record struct Sku(string Value)
{
    public Sku {
        if (string.IsNullOrWhiteSpace(Value)) 
            throw new ArgumentException("SKU cannot be empty.");
    }
}

public readonly record struct Quantity(int Value)
{
    public Quantity {
        if (Value < 0) 
            throw new ArgumentException("Quantity cannot be negative.");
    }
    public static Quantity Zero => new(0);
    public Quantity Add(Quantity other) => new(this.Value + other.Value);
    public Quantity Subtract(Quantity other) => new(this.Value - other.Value);
}

public readonly record struct WarehouseId(Guid Value);

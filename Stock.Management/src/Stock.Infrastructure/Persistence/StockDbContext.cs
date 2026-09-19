using Microsoft.EntityFrameworkCore;
using Stock.Domain.Entities;

namespace Stock.Infrastructure.Persistence;

public class StockDbContext : DbContext
{
    public StockDbContext(DbContextOptions<StockDbContext> options) : base(options) { }
    public DbSet<ProductStock> ProductStocks => Set<ProductStock>();
    public DbSet<StockMovement> StockMovements => Set<StockMovement>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new ProductStockConfiguration());
    }
}

public class ProductStockConfiguration : IEntityTypeConfiguration<ProductStock>
{
    public void Configure(EntityTypeBuilder<ProductStock> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.RowVersion).IsRowVersion();
        builder.ComplexProperty(x => x.ProductSku, cp => cp.Property(s => s.Value).HasColumnName("Sku").IsRequired().HasMaxLength(50));
        builder.ComplexProperty(x => x.WarehouseId, cp => cp.Property(w => w.Value).HasColumnName("WarehouseId").IsRequired());
        builder.ComplexProperty(x => x.AvailableQuantity, cp => cp.Property(q => q.Value).HasColumnName("Quantity").IsRequired());
        builder.Property(x => x.LowStockThreshold).IsRequired();
        builder.Property(x => x.IsActive).IsRequired();
        builder.HasMany(x => x.Movements).WithOne().OnDelete(DeleteBehavior.Cascade);
    }
}

using Microsoft.EntityFrameworkCore;
using Stock.Application.Handlers;
using Stock.Domain.Entities;
using Stock.Infrastructure.Persistence;

namespace Stock.Infrastructure.Repositories;

public class StockRepository(StockDbContext context) : IStockRepository
{
    public async Task<ProductStock?> GetByIdAsync(Guid id, CancellationToken ct) => await context.ProductStocks.FindAsync(new object[] { id }, ct);
    public async Task AddAsync(ProductStock stock, CancellationToken ct) => await context.ProductStocks.AddAsync(stock, ct);
    public async Task UpdateAsync(ProductStock stock, CancellationToken ct) => context.ProductStocks.Update(stock);
}

public class UnitOfWork(StockDbContext context) : IUnitOfWork
{
    public async Task CommitAsync(CancellationToken ct) => await context.SaveChangesAsync(ct);
}

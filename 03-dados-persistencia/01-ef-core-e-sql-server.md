---
title: "EF Core 10 e SQL Server: DbContext, Mapeamento e Migrations"
tags:
  - efcore10
  - sqlserver
  - persistence
  - migrations
  - database
chapter: 3
status: completed
---

# 🗄️ EF Core 10 e SQL Server: DbContext, Mapeamento e Migrations

> "Mapeamento Objeto-Relacional (ORM) não existe para esconder o banco de dados de você, mas para traduzir com eficiência o seu modelo de domínio sem sacrificar o desempenho do banco relacional."

O **Entity Framework Core 10 (EF Core 10)** é o ORM oficial e de alta performance do .NET 10. Em microsserviços, cada serviço possui seu próprio `DbContext` e cuida exclusivamente do seu esquema no SQL Server.

---

## 🧭 Estrutura do DbContext no .NET 10

Um `DbContext` moderno deve ser limpo e utilizar as configurações fluentes segregadas (`IEntityTypeConfiguration<T>`) para manter o princípio da responsabilidade única:

```csharp
namespace EShop.Infrastructure.Persistence;

using EShop.Domain.Orders;
using Microsoft.EntityFrameworkCore;

public sealed class OrderingDbContext(DbContextOptions<OrderingDbContext> options) : DbContext(options)
{
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Aplica automaticamente todas as configurações fluentes do assembly atual
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(OrderingDbContext).Assembly);
    }
}
```

---

## 📐 Configuração Fluente e Relacionamentos com Fluent API

Evite Data Annotations (`[Table]`, `[Column]`) nas entidades de domínio, pois elas poluem o núcleo com dependências de persistência. Use **Fluent API**:

```csharp
namespace EShop.Infrastructure.Persistence.Configurations;

using EShop.Domain.Orders;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public sealed class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable("Orders", "ordering");

        builder.HasKey(o => o.Id);
        builder.Property(o => o.Id).ValueGeneratedNever(); // GUID gerado na aplicação

        builder.Property(o => o.CustomerId).IsRequired();

        builder.Property(o => o.Status)
            .HasConversion<string>() // Salva como VARCHAR para maior legibilidade
            .HasMaxLength(30)
            .IsRequired();

        builder.Property(o => o.CreatedAtUtc).IsRequired();

        // Mapeamento de 1 para N com backing field privado
        builder.HasMany(o => o.Items)
            .WithOne()
            .HasForeignKey(i => i.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

        // Configuração do backing field para a coleção encapsulada
        builder.Navigation(o => o.Items)
            .UsePropertyAccessMode(PropertyAccessMode.Field);
    }
}
```

---

## 🔄 Migrations Idempotentes para Ambientes de Produção

> [!CAUTION]
> **Nunca execute `context.Database.Migrate()` durante a inicialização do container em produção!**
> Se você tiver 10 instâncias da API subindo simultaneamente no Kubernetes, todas tentarão aplicar migrations ao mesmo tempo, causando locks, corridas de concorrência e corrupção da tabela `__EFMigrationsHistory`.

### Como rodar Migrations de forma profissional no CI/CD:
Gere **scripts SQL idempotentes** durante o pipeline de build e execute-os via ferramenta de deploy de banco de dados:

```bash
# Gera um script SQL seguro com checagens IF NOT EXISTS
dotnet ef migrations script --idempotent --context OrderingDbContext --output migrations.sql
```

Exemplo do script gerado pelo EF Core:
```sql
IF NOT EXISTS (SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20260911_InitialCreate')
BEGIN
    CREATE TABLE [ordering].[Orders] (
        [Id] uniqueidentifier NOT NULL,
        [CustomerId] uniqueidentifier NOT NULL,
        [Status] nvarchar(30) NOT NULL,
        [CreatedAtUtc] datetime2 NOT NULL,
        CONSTRAINT [PK_Orders] PRIMARY KEY ([Id])
    );
END;
```

---

## 🌱 Seed Data: Dados Iniciais sem Travar Migrations

Existem duas formas de carregar dados iniciais:
1. **HasData() no Fluent API**: Ideal apenas para dados mestres estáticos (ex: Lista de Países, Tipos de Pagamento fixos).
2. **Database Initializer assíncrono**: Ideal para dados de catálogo, usuários padrão e ambientes de desenvolvimento/staging.

```csharp
public static class DatabaseExtensions
{
    public static async Task SeedInitialDataAsync(this IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<OrderingDbContext>();

        if (!await context.Orders.AnyAsync())
        {
            // Adiciona dados iniciais de demonstração
            var demoOrder = Order.Create(Guid.NewGuid());
            demoOrder.AddItem(Guid.NewGuid(), "Clean Code .NET 10", 89.90m, 1);
            
            context.Orders.Add(demoOrder);
            await context.SaveChangesAsync();
        }
    }
}
```

---

## 🎙️ Perguntas de Entrevista Sênior

### 1. "Qual a diferença entre `DeleteBehavior.Cascade`, `ClientCascade` e `Restrict` no EF Core?"
**Resposta Esperada**: *`Cascade` configura o banco de dados (ON DELETE CASCADE) para deletar os filhos automaticamente no nível do SQL Server quando o pai é excluído. `ClientCascade` instrui o EF Core a buscar os filhos na memória e deletá-los explicitamente se forem rastreados. `Restrict` impede a exclusão do pai se houver filhos associados, levantando um erro de integridade referencial, sendo a opção mais segura para entidades financeiras.*

### 2. "Como você lida com migrations quando dois desenvolvedores criam migrations concorrentes na mesma branch de desenvolvimento?"
**Resposta Esperada**: *Gera-se um conflito no arquivo de Snapshot (`ModelSnapshot.cs`). A melhor prática é reverter a migration local (`dotnet ef migrations remove`), atualizar a branch local com a master (`git pull --rebase`) e gerar a migration novamente (`dotnet ef migrations add NovaMigration`), garantindo uma linha de tempo linear e sem duplicação de migrações.*

---

## 🔗 Conexões do Grafo (Obsidian)
- [Clean Architecture em Camadas](../01-fundamentos-arquitetura/01-clean-architecture.md)
- [Entidades e Regras de Negócio](../02-dominio-ddd-pratico/01-entidades-e-regras-de-dominio.md)
- [Transações e Concorrência](02-transacoes-e-concorrencia.md)
- [Performance e Otimização de Queries](03-performance-e-otimizacao-queries.md)

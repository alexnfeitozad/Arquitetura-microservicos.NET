# 🗄️ Capítulo 3: Dados e Persistência

Bem-vindo ao terceiro capítulo. Aqui abordamos a camada de dados e persistência em microsserviços com **EF Core 10**, **SQL Server** e **Redis / HybridCache**, dominando desde mapeamentos fluentes e migrações idempotentes até controle de concorrência, otimização extrema de queries e cache em camadas.

## 📑 Aulas e Tópicos Deste Capítulo

1. **[EF Core 10 e SQL Server: DbContext, Mapeamento e Migrations](01-ef-core-e-sql-server.md)**
   - Configuração de DbContext e Fluent API sem poluir o domínio.
   - Relacionamentos, Foreign Keys e Backing Fields para coleções protegidas.
   - Migrations idempotentes em pipelines de CI/CD e Initial Seed.
2. **[Transações, Níveis de Isolamento e Concorrência no EF Core 10](02-transacoes-e-concorrencia.md)**
   - Concorrência Otimista com `RowVersion` e tratamento de `DbUpdateConcurrencyException`.
   - Níveis de isolamento no SQL Server: por que usar Snapshot Isolation.
   - Execution Strategy para retries automáticos com transações manuais.
3. **[Performance e Otimização de Queries no EF Core 10](03-performance-e-otimizacao-queries.md)**
   - O problema do N+1 e como eliminá-lo com Projeções diretas.
   - `AsSplitQuery()` para evitar explosão cartesiana de dados.
   - `AsNoTracking()` vs Tracking de entidades.
   - Paginação Keyset (Seek) de alta velocidade vs Offset (`Skip/Take`).
   - Índices de cobertura (`INCLUDE`) e índices filtrados.
4. **[Cache Distribuído com Redis e HybridCache no .NET 10](04-cache-distribuido-redis-e-hybridcache.md)**
   - O problema do Cache Stampede (Efeito Manada).
   - A nova abstração do .NET 10: `HybridCache` (L1 em memória + L2 no Redis).
   - Invalidação cirúrgica por Tags.

---
⬅️ Voltar para o **[Capítulo 2: Domínio e DDD Prático](../02-dominio-ddd-pratico/README.md)** | Avançar para o **[Capítulo 4: APIs e HTTP](../04-apis-e-http/README.md)** ➡️

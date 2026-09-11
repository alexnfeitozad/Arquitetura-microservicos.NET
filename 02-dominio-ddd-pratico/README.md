# 🧩 Capítulo 2: Domínio e DDD Prático

Bem-vindo ao segundo capítulo. Aqui desmistificamos o Domain-Driven Design (DDD), aplicando seus princípios táticos e estratégicos com foco no negócio, sem rituais desnecessários e sem transformar o projeto em uma "religião".

## 📑 Aulas e Tópicos Deste Capítulo

1. **[Entidades, Identidade e Regras de Negócio Invioláveis](01-entidades-e-regras-de-dominio.md)**
   - O que define uma entidade: identidade contínua vs atributos.
   - Modelo Anêmico vs Modelo Rico em .NET 10.
   - Protegendo coleções com `IReadOnlyCollection<T>` e protegendo invariantes.
2. **[Value Objects e Imutabilidade com C# 14 Records](02-value-objects-e-imutabilidade.md)**
   - Eliminando a *Primitive Obsession* (`Money`, `Address`, `Sku`).
   - Igualdade estrutural e imutabilidade nativa com `readonly record struct`.
   - Mapeamento no EF Core 10 com `ComplexProperty`.
3. **[Agregados, Aggregate Roots e Limites Transacionais](03-agregados-e-aggregate-roots.md)**
   - O papel da Raiz de Agregado e limites de consistência.
   - As 4 regras de ouro do design de agregados (Vaughn Vernon).
   - Por que alterar apenas 1 agregado por transação.
4. **[Domain Services, Domain Events e Abstração de Repositórios](04-domain-services-e-events.md)**
   - Domain Service vs Application Service: a fronteira cirúrgica.
   - Domain Events (em memória) vs Integration Events (rede/RabbitMQ).
   - Despacho transacional via interceptors no EF Core 10.
5. **[DDD Estratégico vs Tático: Bounded Contexts e Context Mapping](05-ddd-estrategico-vs-tatico.md)**
   - Linguagem Ubíqua sem ambiguidades entre squads.
   - Bounded Contexts como fronteiras naturais de microsserviços.
   - Anti-Corruption Layer (ACL) e onde o DDD ajuda vs onde é exagero.

---
⬅️ Voltar para o **[Capítulo 1: Fundamentos de Arquitetura](../01-fundamentos-arquitetura/README.md)** | Avançar para o **[Capítulo 3: Dados e Persistência](../03-dados-persistencia/README.md)** ➡️

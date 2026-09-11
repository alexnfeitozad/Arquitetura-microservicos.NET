# 🧱 Capítulo 1: Fundamentos de Software e Arquitetura

Bem-vindo ao primeiro capítulo do nosso livro técnico. Aqui construímos as bases que sustentam qualquer arquitetura de software sólida, moderna e pronta para produção com **.NET 10**.

## 📑 Aulas e Tópicos Deste Capítulo

1. **[Clean Architecture em Camadas Modernas](01-clean-architecture.md)**
   - O porquê do isolamento do domínio.
   - Divisão de responsabilidades: Domain, Application, Infrastructure e API.
   - Regra de dependência estrita e inversão de controle.
2. **[Injeção de Dependência e IoC no .NET 10](02-injecao-dependencia-e-ioc.md)**
   - Lifetimes: Transient, Scoped e Singleton.
   - A armadilha de Captive Dependencies e como o .NET valida escopos.
   - Keyed Services em C# 14 / .NET 10.
3. **[SOLID e Princípios de POO em C# Moderno](03-solid-e-oop-moderno.md)**
   - SRP, OCP, LSP, ISP e DIP aplicados sem burocracia.
   - Encapsulamento de dados, classes `sealed` e records imutáveis.
   - Por que favorecer Composição sobre Herança.
4. **[Configuração, Options Pattern, Contratos e DTOs](04-configuracao-options-e-contratos.md)**
   - `IOptions`, `IOptionsSnapshot` e `IOptionsMonitor`.
   - Fail-fast no startup com validações de `DataAnnotations`.
   - Contratos de entrada e saída (DTOs) e mapeamento zero-alocação com Riok.Mapperly.
5. **[Versionamento de APIs e Architecture Decision Records (ADR)](05-versionamento-e-adrs.md)**
   - Estratégias de versionamento HTTP (URL, Query, Headers).
   - O que é breaking change e estratégias de deprecation.
   - Como documentar decisões técnicas irreversíveis com ADRs.
6. **[Monólito vs Monólito Modular vs Microsserviços](06-monolito-vs-modular-vs-microsservicos.md)**
   - Quando usar cada abordagem e a matriz de trade-offs.
   - O padrão inegociável do *Database per Service*.
   - Serviços Stateless e os princípios dos Twelve-Factor Apps.

---
⬅️ Voltar para o **[Sumário Geral Mestre](../README.md)** | Avançar para o **[Capítulo 2: Domínio e DDD Prático](../02-dominio-ddd-pratico/README.md)** ➡️

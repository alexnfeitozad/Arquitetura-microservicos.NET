# 🧪 Capítulo 12: Testes

Bem-vindo ao décimo segundo capítulo. Aqui construímos a fortaleza de qualidade dos nossos microsserviços em **.NET 10**, dominando desde a pureza e velocidade dos testes unitários de domínio e aplicação com **xUnit**, **FluentAssertions** e **NSubstitute**, até testes de integração reais contra bancos e filas efêmeras com **Testcontainers** e testes de contrato com **Pact**.

## 📑 Aulas e Tópicos Deste Capítulo

1. **[A Pirâmide de Testes em Microsserviços e Testes Unitários no .NET 10](01-piramide-de-testes.md)**
   - A estrutura da pirâmide: Unitários vs Contrato/Integração vs E2E.
   - Test Doubles desmistificados: Dummies, Stubs, Mocks e Fakes.
   - Testes unitários puros de Domínio (sem mocks) e testes de Aplicação com NSubstitute.
   - Por que o banco em memória do EF Core (`UseInMemoryDatabase`) é uma armadilha.
2. **[Testcontainers para .NET 10, WebApplicationFactory e Testes de Contrato](02-testcontainers-e-testes-integracao.md)**
   - O fim dos mocks de banco: subindo SQL Server e RabbitMQ reais sob demanda em containers efêmeros.
   - `WebApplicationFactory<Program>` e fixtures assíncronas reutilizáveis no .NET 10.
   - Testes de ponta a ponta de endpoints HTTP e validação com `ProblemDetails`.
   - Consumer-Driven Contract Testing com Pact: blindando quebras de contrato entre squads.

---
⬅️ Voltar para o **[Capítulo 11: CI/CD e DevOps](../11-cicd-devops/README.md)** | Avançar para o **[Capítulo 13: Mensageria e Eventos](../13-mensageria-eventos/README.md)** ➡️

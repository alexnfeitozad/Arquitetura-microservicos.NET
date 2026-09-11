# 📨 Capítulo 13: Mensageria e Eventos

Bem-vindo ao décimo terceiro capítulo. Aqui nos aprofundamos no coração assíncrono da arquitetura distribuída com **RabbitMQ** e **MassTransit** no **.NET 10**, dominando a topologia de exchanges e filas, controle fino de concorrência com prefetch, retries com Dead Letter Exchanges e orquestração de transações distribuídas através do **Padrão Saga**.

## 📑 Aulas e Tópicos Deste Capítulo

1. **[RabbitMQ Avançado: Topologia, Exchanges, Filas e MassTransit no .NET 10](01-rabbitmq-avancado.md)**
   - Topologia AMQP: Direct, Fanout, Topic e Headers Exchanges.
   - O perigo do desbalanceamento: ajustando `PrefetchCount` e concorrência.
   - Estratégias de retries com Dead Letter Exchange (DLX) e filas de erro.
   - Configuração profissional com MassTransit.
2. **[Sagas Distribuídas: Coreografia vs Orquestração e Transações Compensatórias](02-sagas-coreografia-vs-orquestracao.md)**
   - O que é o padrão Saga e como substituir transações distribuídas 2PC.
   - Coreografia vs Orquestração: evitando o "Event Spaghetti".
   - A mecânica das Transações de Compensação (desfazendo ações semânticas).
   - Implementação de Máquina de Estados da Saga com MassTransit no .NET 10.

---
⬅️ Voltar para o **[Capítulo 12: Testes](../12-testes/README.md)** | Avançar para o **[Capítulo 14: Gateway / BFF](../14-gateway-bff/README.md)** ➡️

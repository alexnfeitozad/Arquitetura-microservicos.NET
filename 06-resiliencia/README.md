# 🛡️ Capítulo 6: Resiliência

Bem-vindo ao sexto capítulo. Aqui transformamos microsserviços frágeis em um ecossistema antifrágil, aplicando padrões consagrados de resiliência e a nova biblioteca **Polly v8** no **.NET 10**, culminando no teste prático de injeção de falhas e caos controlado.

## 📑 Aulas e Tópicos Deste Capítulo

1. **[Padrões Fundamentais de Resiliência em Sistemas Distribuídos](01-padroes-resiliencia-retry-circuit-breaker.md)**
   - O perigo de falhas em cascata (*Cascading Failures*) e colapso do pool de threads.
   - Timeout rígido, Retry com Exponential Backoff e a matemática do **Jitter**.
   - Máquina de estados do **Circuit Breaker** (Closed, Open, Half-Open).
   - Degradação graciosa com Fallback e isolamento por Bulkhead.
2. **[Polly v8: Resilience Pipelines e Testes de Caos na Prática (.NET 10)](02-polly-v8-pipelines-na-pratica.md)**
   - A nova arquitetura do Polly v8: adeus `PolicyWrap`, bem-vindo `ResiliencePipelineBuilder`.
   - Composição de pipeline completa: Fallback $\to$ Retry $\to$ Circuit Breaker $\to$ Timeout.
   - Cenário de Caos Prático: Simulação de `Ordering.API` $\to$ `Payment.API` 💥 indisponível e comportamento observado.

---
⬅️ Voltar para o **[Capítulo 5: Comunicação entre Microsserviços](../05-comunicacao-microsservicos/README.md)** | Avançar para o **[Capítulo 7: Segurança](../07-seguranca/README.md)** ➡️

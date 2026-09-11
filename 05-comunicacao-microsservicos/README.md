# 🔄 Capítulo 5: Comunicação entre Microsserviços

Bem-vindo ao quinto capítulo. Aqui desvendamos a espinha dorsal dos sistemas distribuídos: como os microsserviços conversam entre si sem criar acoplamento temporal frágil ou inconsistências catastróficas em produção.

## 📑 Aulas e Tópicos Deste Capítulo

1. **[Comunicação Síncrona via HTTP e IHttpClientFactory no .NET 10](01-comunicacao-sincrona-http.md)**
   - O perigo do `new HttpClient()`: Socket Exhaustion vs DNS Staleness.
   - Resolução definitiva com `IHttpClientFactory` e Typed Clients.
   - O efeito cascata de disponibilidade e latência na comunicação síncrona.
2. **[Comunicação Assíncrona e Eventos de Integração no .NET 10](02-comunicacao-assincrona-eventos.md)**
   - Desacoplamento temporal com mensageria e RabbitMQ.
   - Contratos de mensagens imutáveis com records do C# 14.
   - O mito do "Exactly-Once Delivery": Teorema dos Dois Generais e a realidade *At-Least-Once*.
3. **[O Problema da Escrita Dupla e os Padrões Outbox e Inbox](03-outbox-inbox-patterns.md)**
   - Por que salvar no banco e publicar na fila cria inconsistência silenciosa.
   - O Transactional Outbox Pattern implementado no EF Core 10 com MassTransit.
   - O Transactional Inbox Pattern para proteção contra processamentos repetidos.
4. **[Consistência Eventual, Idempotência e Dead Letter Queues (DLQ)](04-consistencia-eventual-e-idempotencia.md)**
   - Consistência eventual na prática e expectativas de negócio.
   - Idempotência natural vs sintética com chaves de deduplicação.
   - Tratamento de mensagens fora de ordem e proteção contra *Poison Messages* com DLQ.

---
⬅️ Voltar para o **[Capítulo 4: APIs e HTTP](../04-apis-e-http/README.md)** | Avançar para o **[Capítulo 6: Resiliência](../06-resiliencia/README.md)** ➡️

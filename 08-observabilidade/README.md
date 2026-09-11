# 👁️ Capítulo 8: Observabilidade

Bem-vindo ao oitavo capítulo. Aqui montamos a torre de controle dos nossos microsserviços em **.NET 10**, dominando os três pilares da observabilidade moderna (Logs, Métricas e Traces Distribuídos) através de **Serilog**, **Correlation IDs**, **OpenTelemetry** e **Health Checks**, respondendo com precisão cirúrgica a qualquer incidente em produção.

## 📑 Aulas e Tópicos Deste Capítulo

1. **[Structured Logging, Serilog e Correlation ID no .NET 10](01-structured-logging-e-correlation-id.md)**
   - O fim dos logs em texto puro: message templates e propriedades estruturadas.
   - O papel do Correlation ID na rastreabilidade fim a fim.
   - Implementação de middleware assíncrono e escopos de log.
   - Configuração de alta performance com Serilog.
2. **[OpenTelemetry, Tracing Distribuído e 'Onde a Requisição Morreu?'](02-opentelemetry-tracing-e-metricas.md)**
   - O padrão W3C TraceContext: `traceparent`, `TraceId` e `SpanId`.
   - Instrumentação nativa do .NET 10 com `System.Diagnostics.Activity`.
   - Health Checks profissionais: a regra inegociável de Liveness vs Readiness no Kubernetes.
   - O Grande Cenário: Investigação prática no Jaeger do fluxo `Cliente -> BFF -> Ordering -> RabbitMQ -> Payment` e diagnóstico exato da falha.

---
⬅️ Voltar para o **[Capítulo 7: Segurança](../07-seguranca/README.md)** | Avançar para o **[Capítulo 9: Containerização](../09-containerizacao/README.md)** ➡️

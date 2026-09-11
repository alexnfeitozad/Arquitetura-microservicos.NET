# 🏗️ Capítulo 18: Arquitetura Distribuída

Bem-vindo ao décimo oitavo capítulo. Aqui encaramos a física da computação distribuída, entendendo as 8 falácias clássicas da rede, os teoremas **CAP** e **PACELC**, e como garantir a coordenação de recursos compartilhados sem pontos únicos de falha através de **Distributed Locks com Redis (RedLock)** e tokens de fencing.

## 📑 Aulas e Tópicos Deste Capítulo

1. **[Teorema CAP, PACELC e as 8 Falácias da Computação Distribuída](01-teorema-cap-e-falhas-rede.md)**
   - As 8 falácias da computação distribuída de Peter Deutsch.
   - O Teorema CAP na prática: por que sistemas em nuvem são forçados a escolher entre CP e AP.
   - O teorema PACELC: o trade-off constante entre latência e consistência em condições normais de operação.
2. **[Locks Distribuídos com Redis (RedLock) e Transações Distribuídas no .NET 10](02-transacoes-distribuidas-e-locks.md)**
   - Por que o `lock` em memória do C# falha em pods replicados no Kubernetes.
   - O algoritmo RedLock com Redis e implementação via `RedLock.net`.
   - A armadilha do clock drift e pausas de Garbage Collector: a necessidade de Fencing Tokens e concorrência otimista.

---
⬅️ Voltar para o **[Capítulo 17: Cloud](../17-cloud/README.md)** | Avançar para o **[Capítulo 19: Arquitetura e Decisões](../19-arquitetura-decisoes/README.md)** ➡️

# ⚡ Capítulo 15: Performance

Bem-vindo ao décimo quinto capítulo. Aqui levamos o runtime do **.NET 10** e o compilador C# ao limite da física da computação, dominando a medição científica com **BenchmarkDotNet**, a gestão interna de gerações do Garbage Collector (Gen 0, 1, 2, LOH e POH) e a programação com alocação zero através de **`Span<T>`**, **`ArrayPool<T>`** e **`ValueTask<T>`**.

## 📑 Aulas e Tópicos Deste Capítulo

1. **[Performance Extrema, Profiling e Otimizações de Memória no .NET 10](01-profiling-e-otimizacoes-dotnet.md)**
   - Medição científica sem achismos: BenchmarkDotNet com `[MemoryDiagnoser]`.
   - As entranhas do Garbage Collector: Gen 0, Gen 1, Gen 2, Large Object Heap (LOH) e Pinned Object Heap (POH).
   - Zero-allocation com `ReadOnlySpan<char>` e `Span<T>`.
   - Reutilização de buffers com `ArrayPool<T>.Shared`.
   - A decisão cirúrgica: quando usar `Task<T>` vs `ValueTask<T>`.

---
⬅️ Voltar para o **[Capítulo 14: Gateway / BFF](../14-gateway-bff/README.md)** | Avançar para o **[Capítulo 16: C# / .NET para Entrevistas Sênior](../16-csharp-dotnet-entrevistas/README.md)** ➡️

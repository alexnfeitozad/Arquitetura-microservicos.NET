---
title: "Top 10 Perguntas Quentes de C# e .NET para Entrevistas Sênior"
tags:
  - interview
  - csharp-senior
  - dotnet10
  - linq
  - threading
  - architecture
chapter: 16
status: completed
---

# 🎙️ Top 10 Perguntas Quentes de C# e .NET para Entrevistas Sênior

> "Em uma entrevista técnica para nível Sênior ou Especialista, o entrevistador não quer saber a sintaxe do `for` ou do `switch`. Ele quer testar sua compreensão dos mecanismos internos do runtime, diagnósticos de concorrência e decisões arquiteturais defensivas."

Abaixo estão as 10 perguntas mais frequentes e decisivas em entrevistas de alto nível para engenheiros .NET, acompanhadas das explicações técnicas detalhadas.

---

## 1. Qual a diferença fundamental entre `IEnumerable<T>` e `IQueryable<T>` no Entity Framework?

**A Pegadinha**: Ambos parecem iguais ao usar métodos LINQ como `.Where()` ou `.Select()`.

**Resposta Técnica**:
- **`IEnumerable<T>`**: Opera em memória (LINQ to Objects). A avaliação é feita pelo delegates C# (`Func<T, bool>`). Se você aplicar um `.Where()` sobre um `IEnumerable<T>` vindo do EF Core, o EF Core é obrigado a **trazer toda a tabela do banco de dados para a memória da aplicação** e fazer o filtro localmente no C#!
- **`IQueryable<T>`**: Opera sobre árvores de expressão (`Expression<Func<T, bool>>`). O provedor do EF Core inspeciona a árvore em tempo de compilação/execução e **traduz o código C# em uma cláusula SQL nativa** (`WHERE coluna = @param`). A filtragem ocorre dentro do motor do SQL Server, transferindo pela rede apenas as linhas filtradas.

---

## 2. Como uma Closure em expressões Lambda pode causar Memory Leak silencioso?

**Resposta Técnica**:
Quando uma função lambda captura uma variável local de fora do seu escopo, o compilador do C# gera uma classe oculta (`DisplayClass`) na Heap para armazenar essa variável.
Se essa lambda for registrada em um evento estático ou passada para um serviço Singleton de longa duração:
- A `DisplayClass` permanece viva enquanto o Singleton viver.
- Se a variável capturada pertencer a uma instância de Controller ou Handler com referências a `DbContext`, **toda a requisição HTTP e suas entidades ficarão presas na memória RAM**, impedindo o Garbage Collector de liberá-las!

```csharp
// ⚠️ CUIDADO: Captura da instância inteira 'this'
public void RegisterOrderListener()
{
    // A classe do evento estático agora segura a referência desta classe para sempre!
    GlobalNotificationBus.OnMessage += (msg) => ProcessOrder(msg, _heavyData);
}
```

---

## 3. Qual a diferença entre `lock`, `Monitor`, `SemaphoreSlim` e `Mutex`?

| Mecanismo de Sincronização | Escopo | Suporta `async/await`? | Custo / Performance |
| :--- | :--- | :--- | :--- |
| **`lock` / `Monitor`** | Intra-processo (Thread única) | ❌ **NÃO** (Trava a thread física; não pode usar await dentro) | Ultraleve (apenas algumas instruções de CPU). |
| **`SemaphoreSlim`** | Intra-processo (Limita N acessos) | ✅ **SIM** (`await semaphore.WaitAsync()`) | **O padrão moderno para código assíncrono**. |
| **`Mutex`** | **Inter-processos** (Nível de SO) | ❌ NÃO | Pesado (faz chamadas de kernel do Windows/Linux). Usado para garantir instância única de app. |

---

## 4. Por que usar `Task.Run` dentro de controllers ou endpoints de API é considerado um antipadrão?

**Resposta Técnica**:
O Kestrel (servidor web do ASP.NET Core) já aloca uma thread do `ThreadPool` para cada requisição HTTP que chega.
Se você chamar `await Task.Run(() => ...)` dentro do endpoint:
1. Você retira uma **segunda thread** do mesmo ThreadPool para executar a tarefa.
2. A thread original da requisição fica esperando a conclusão.
3. Isso dobra a pressão sobre o ThreadPool sem nenhum ganho real de velocidade, acelerando a ocorrência de **ThreadPool Starvation** sob carga concorrente.
*`Task.Run` só deve ser usado em aplicações Desktop com UI (WPF/MAUI) para tirar processamento pesado da thread gráfica de interface.*

---

## 5. Como funciona a igualdade estrutural em `record` do C#?

**Resposta Técnica**:
Em classes tradicionais (`class`), a igualdade padrão é por **referência** (dois objetos são iguais apenas se apontarem para o mesmo endereço na memória Heap).
Em um **`record class`** ou **`record struct`**, o compilador sintetiza automaticamente:
- Uma sobrescrita de `Equals(object)` e `GetHashCode()` baseada no valor de todas as propriedades.
- Uma implementação de `IEquatable<T>`.
- Operadores `==` e `!=`.
- Um construtor de cópia para suportar a expressão de mutação não destrutiva `with` (`var order2 = order1 with { Status = "Paid" };`).

---

## 6. O que é ThreadPool Starvation e como diagnosticar?

**Resposta Técnica**:
Ocorre quando todas as threads do ThreadPool estão ocupadas ou bloqueadas (frequentemente por código que faz sync-over-async via `.Result`, `.Wait()` ou chamadas de banco bloqueantes). Novas requisições entram em uma fila interna de espera. Como o algoritmo de injeção de threads do CLR adiciona novas threads em uma cadência lenta (aproximadamente 1 thread a cada 500ms), o tempo de resposta da API passa de 5ms para 30 segundos.
- **Como diagnosticar**: Usando o comando `dotnet-counters monitor --counters System.Runtime`:
  Se o valor de `ThreadPool Thread Count` estiver subindo sem parar e o `ThreadPool Queue Length` estiver acumulando milhares de itens, a aplicação está sofrendo de Starvation.

---

## 7. Qual a diferença entre `string` imutável, `StringBuilder` e `string.Create()`?

**Resposta Técnica**:
- `string`: Imutável. Qualquer concatenação (`a + b`) aloca uma nova string na Heap e descarta as anteriores.
- `StringBuilder`: Mantém um buffer expansível mutável, ideal para loops dinâmicos com dezenas de iterações.
- **`string.Create()` (.NET 10)**: A ferramenta definitiva de alocação zero. Aloca a string final no tamanho exato uma única vez na Heap e fornece um `Span<char>` para você preencher os caracteres diretamente na memória sem buffers intermediários!

---

## 8. Por que `System.Threading.Channels` é superior a `BlockingCollection<T>` em código moderno?

**Resposta Técnica**:
`BlockingCollection<T>` foi projetada na era do .NET Framework 4.0 antes da introdução do `async/await`. Seus métodos como `.Take()` **bloqueiam fisicamente a thread** até que um item esteja disponível. O **`System.Threading.Channels`** foi projetado especificamente para programação assíncrona moderna: o leitor faz `await reader.ReadAsync()` de forma não-bloqueante, liberando a thread para o ThreadPool enquanto a fila estiver vazia, além de suportar backpressure assíncrono nativo (`BoundedChannel`).

---

## 9. O que é devirtualização de métodos no JIT do .NET 10 e qual a relação com `sealed`?

**Resposta Técnica**:
Quando um método é virtual (ou faz parte de uma interface), a chamada precisa consultar a tabela de métodos virtuais (*vtable*) em tempo de execução para descobrir qual implementação invocar. Quando marcamos uma classe como **`sealed`**, o compilador JIT tem a garantia absoluta de que nenhuma classe derivada pode sobrescrever aquele método. Com isso, o JIT **devirtualiza a chamada**, transformando a invocação indireta em uma instrução `call` direta de CPU e permitindo o **Inlining** do método (copiando o corpo do método diretamente para o local da chamada), eliminando a sobrecarga da chamada de função.

---

## 10. Como você lida com exceções em métodos assíncronos que retornam `async void`?

**Resposta Técnica**:
> **A Regra de Ouro**: Nunca escreva `async void`, exceto em Event Handlers de UI legada!
Se uma exceção for lançada dentro de um método `async void`, **ela não pode ser capturada por um bloco `try/catch` externo**, pois não há nenhuma `Task` para conter a exceção. A exceção é disparada diretamente no `SynchronizationContext` ou ThreadPool, causando o encerramento abrupto e fatal de todo o processo da aplicação (*Crash do processo*). Métodos assíncronos que não retornam valor devem sempre retornar **`Task`** (ou `ValueTask`).

---

## 🔗 Conexões do Grafo (Obsidian)
- [Mecânica Interna do Async/Await](01-async-await-cancellation-token.md)
- [Gestão de Memória e IAsyncDisposable](02-memory-e-recursos.md)
- [Performance Extrema e Profiling](../15-performance/01-profiling-e-otimizacoes-dotnet.md)
- [SOLID e POO Moderno](../01-fundamentos-arquitetura/03-solid-e-oop-moderno.md)
- [Clean Architecture em Camadas](../01-fundamentos-arquitetura/01-clean-architecture.md)

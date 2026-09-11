import './style.css';
import { lessonSources } from './generated-content.js';

const chapters = [
  { id: '01', icon: '01', title: 'Fundamentos de software e arquitetura', subtitle: 'As decisões que sustentam sistemas vivos.', lessons: ['Clean Architecture em camadas modernas', 'Injeção de dependência e IoC', 'SOLID e POO moderno', 'Options, contratos e DTOs', 'Versionamento e ADRs', 'Monólito, modular e microsserviços'] },
  { id: '02', icon: '02', title: 'Domínio e DDD prático', subtitle: 'Modelagem que fala a língua do negócio.', lessons: ['Entidades e regras de domínio', 'Value Objects e imutabilidade', 'Agregados e invariantes', 'Domain Services e Events', 'DDD estratégico e tático'] },
  { id: '03', icon: '03', title: 'Dados e persistência', subtitle: 'Consistência, performance e memória.', lessons: ['EF Core 10 e SQL Server', 'Transações e concorrência', 'Performance e otimização de queries', 'Redis e HybridCache'] },
  { id: '04', icon: '04', title: 'APIs e HTTP', subtitle: 'Contratos previsíveis para o mundo real.', lessons: ['Fundamentos REST e HTTP', 'Minimal APIs vs Controllers', 'ProblemDetails e erros', 'Middlewares e filtros'] },
  { id: '05', icon: '05', title: 'Comunicação entre microsserviços', subtitle: 'Como sistemas distribuídos conversam.', lessons: ['Comunicação síncrona HTTP', 'Eventos de integração', 'Outbox e Inbox Patterns', 'Consistência eventual e idempotência'] },
  { id: '06', icon: '06', title: 'Resiliência', subtitle: 'Projetar para a falha parcial.', lessons: ['Retry, timeout e backoff', 'Circuit Breaker e fallback', 'Polly v8 na prática'] },
  { id: '07', icon: '07', title: 'Segurança', subtitle: 'Identidade, confiança e superfície de ataque.', lessons: ['JWT, Identity e políticas', 'Service-to-service e OWASP'] },
  { id: '08', icon: '08', title: 'Observabilidade', subtitle: 'Enxergar o que o sistema está fazendo.', lessons: ['Logs estruturados e correlation ID', 'OpenTelemetry, traces e métricas'] },
  { id: '09', icon: '09', title: 'Containerização', subtitle: 'Ambientes reproduzíveis de ponta a ponta.', lessons: ['Docker e Docker Compose'] },
  { id: '10', icon: '10', title: 'Escalabilidade', subtitle: 'Crescer sem perder o controle.', lessons: ['Escala horizontal e gargalos'] },
  { id: '11', icon: '11', title: 'CI/CD e DevOps', subtitle: 'Entrega contínua com qualidade.', lessons: ['Pipelines, quality gates e deploys'] },
  { id: '12', icon: '12', title: 'Testes', subtitle: 'Confiança da unidade ao ambiente real.', lessons: ['Pirâmide de testes', 'Testcontainers e integração'] },
  { id: '13', icon: '13', title: 'Mensageria e eventos', subtitle: 'RabbitMQ, sagas e fluxo assíncrono.', lessons: ['RabbitMQ avançado', 'Sagas: coreografia e orquestração'] },
  { id: '14', icon: '14', title: 'Gateway e BFF', subtitle: 'A borda que organiza as experiências.', lessons: ['YARP, gateway e BFF'] },
  { id: '15', icon: '15', title: 'Performance', subtitle: 'Medir primeiro. Otimizar depois.', lessons: ['Profiling e otimizações .NET'] },
  { id: '16', icon: '16', title: 'C# e .NET para entrevistas', subtitle: 'Clareza técnica para decisões difíceis.', lessons: ['Perguntas essenciais e trade-offs'] },
  { id: '17', icon: '17', title: 'Cloud', subtitle: 'Arquitetura preparada para a nuvem.', lessons: ['Serviços gerenciados e custos'] },
  { id: '18', icon: '18', title: 'Arquitetura distribuída', subtitle: 'As leis por trás da complexidade.', lessons: ['Consistência, particionamento e tempo'] },
  { id: '19', icon: '19', title: 'Decisões de arquitetura', subtitle: 'Registrar o porquê é parte do design.', lessons: ['ADRs e governança técnica'] },
  { id: '20', icon: '20', title: 'Evolução de legado', subtitle: 'Mudar sistemas sem parar o negócio.', lessons: ['Strangler Fig e modernização'] },
  { id: '21', icon: '21', title: 'IA para engenharia', subtitle: 'Contexto, qualidade e geração responsável.', lessons: ['IA como ferramenta de engenharia'] }
];

const featured = [
  { label: 'CAPÍTULO 01', title: 'A arquitetura é uma conversa', text: 'Um sistema sustentável começa quando suas fronteiras ficam claras. Antes de escolher tecnologia, aprenda a nomear responsabilidades.', color: 'sage' },
  { label: 'MOTOR UNIVERSAL', title: 'Da ideia ao microsserviço', text: 'Um pipeline em sete passos para transformar domínio, contratos e resiliência em software pronto para produção.', color: 'coral' }
];

const state = { current: 'home', selectedLesson: null, completed: new Set(JSON.parse(localStorage.getItem('obsidia-completed') || '[]')), query: '' };

const app = document.querySelector('#app');
const totalLessons = chapters.reduce((total, chapter) => total + chapter.lessons.length, 0);

function progress() { return Math.round((state.completed.size / totalLessons) * 100); }
function currentChapter() { return chapters.find((chapter) => chapter.id === state.current); }
function escapeHtml(value) { return value.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[char])); }

function lessonContent(chapter, lesson, index) {
  const focus = lesson.toLowerCase();
  const normalizedLesson = lesson.toLowerCase().replace(/[^a-z0-9]+/g, ' ');
  const source = lessonSources.find((item) => item.chapterId === chapter.id && item.file.startsWith(`${String(index + 1).padStart(2, '0')}-`)) || lessonSources.find((item) => item.chapterId === chapter.id && (item.title.toLowerCase().includes(normalizedLesson.slice(0, 18)) || normalizedLesson.includes(item.title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').slice(0, 18)))) || lessonSources.find((item) => item.chapterId === chapter.id);
  const concepts = {
    theory: `Nesta aula, você conecta ${lesson.toLowerCase()} ao desenho de um sistema real. A ideia não é decorar uma ferramenta: é entender qual problema a decisão resolve, qual custo introduz e como verificar se ela continua adequada quando o contexto muda.`,
    analogy: `Pense em uma cozinha profissional. Cada pessoa sabe sua estação, os pedidos têm um formato conhecido e existe uma fila para coordenar o trabalho. Quando todos fazem tudo, o restaurante trava; quando as fronteiras são claras, o serviço escala.`,
    objective: `Ao terminar, você será capaz de explicar ${lesson.toLowerCase()} em linguagem simples, reconhecer o trade-off principal e aplicar o padrão em um pequeno serviço .NET.`,
    exercise: `Escolha um fluxo do seu cotidiano, desenhe suas responsabilidades e implemente uma versão mínima. Depois, provoque uma mudança de requisito e observe qual parte deveria mudar.`,
    ai: `Atue como um arquiteto .NET sênior. Explique ${lesson} para alguém que já programa, apresente um exemplo pequeno, liste dois trade-offs e proponha três testes que possam falsificar a solução. Não invente requisitos: declare suas premissas.`,
  };
  if (focus.includes('clean architecture')) concepts.code = `public sealed class CreateOrderHandler(IOrderRepository orders)\n{\n    public async Task<Result> Handle(CreateOrder command, CancellationToken ct)\n    {\n        var order = Order.Create(command.CustomerId);\n        await orders.Add(order, ct);\n        return Result.Success(order.Id);\n    }\n}`;
  else if (focus.includes('injeção')) concepts.code = `builder.Services.AddScoped<IClock, SystemClock>();\n\npublic sealed class ExpirationPolicy(IClock clock)\n{\n    public bool HasExpired(DateTime expiresAt)\n        => clock.UtcNow >= expiresAt;\n}`;
  else if (focus.includes('solid')) concepts.code = `public interface IPriceCalculator\n{\n    Money Calculate(Cart cart);\n}\n\npublic sealed class Checkout(IPriceCalculator prices)\n{\n    public Money Total(Cart cart) => prices.Calculate(cart);\n}`;
  else if (focus.includes('value object') || focus.includes('imutabilidade')) concepts.code = `public readonly record struct Email(string Value)\n{\n    public static Email Create(string value)\n        => new(value.Trim().ToLowerInvariant());\n}`;
  else if (focus.includes('ef core') || focus.includes('sql server')) concepts.code = `public sealed class OrderConfiguration : IEntityTypeConfiguration<Order>\n{\n    public void Configure(EntityTypeBuilder<Order> builder)\n    {\n        builder.HasKey(order => order.Id);\n        builder.Property(order => order.RowVersion).IsRowVersion();\n    }\n}`;
  else if (focus.includes('http') || focus.includes('minimal api')) concepts.code = `app.MapPost("/api/v1/orders", async (CreateOrder request, ISender sender, CancellationToken ct)\n    => Results.Created($"/orders/{await sender.Send(request, ct)}", null));`;
  else if (focus.includes('problem')) concepts.code = `app.UseExceptionHandler(errorApp => errorApp.Run(async context =>\n{\n    context.Response.StatusCode = 500;\n    await Results.Problem("Falha inesperada", statusCode: 500)\n        .ExecuteAsync(context);\n}));`;
  else if (focus.includes('outbox') || focus.includes('eventos')) concepts.code = `await db.Outbox.AddAsync(new OutboxMessage(\n    messageId: command.Id,\n    type: "OrderCreated",\n    payload: JsonSerializer.Serialize(@event)), ct);\nawait db.SaveChangesAsync(ct);`;
  else if (focus.includes('retry') || focus.includes('polly') || focus.includes('circuit')) concepts.code = `var pipeline = new ResiliencePipelineBuilder()\n    .AddRetry(new RetryStrategyOptions { MaxRetryAttempts = 3 })\n    .AddTimeout(TimeSpan.FromSeconds(2))\n    .Build();`;
  else if (focus.includes('jwt') || focus.includes('identity')) concepts.code = `builder.Services.AddAuthentication().AddJwtBearer(options =>\n{\n    options.Authority = configuration["Auth:Authority"];\n    options.Audience = "orders-api";\n});`;
  else if (focus.includes('log') || focus.includes('tracing') || focus.includes('métrica')) concepts.code = `using var activity = ActivitySource.StartActivity("orders.create");\nlogger.LogInformation("Pedido {OrderId} criado", order.Id);\nactivity?.SetTag("order.id", order.Id);`;
  else if (focus.includes('docker')) concepts.code = `FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime\nWORKDIR /app\nCOPY ./publish .\nENTRYPOINT ["dotnet", "Orders.Api.dll"]`;
  else if (focus.includes('teste') || focus.includes('testcontainers')) concepts.code = `[Fact]\npublic async Task Deve_criar_pedido_valido()\n{\n    var response = await client.PostAsJsonAsync("/orders", request);\n    response.StatusCode.Should().Be(HttpStatusCode.Created);\n}`;
  else if (focus.includes('rabbit') || focus.includes('sagas')) concepts.code = `public record OrderPaid(Guid OrderId);\n\npublic sealed class PaymentConsumer : IConsumer<OrderPaid>\n{\n    public Task Consume(ConsumeContext<OrderPaid> context)\n        => payment.Process(context.Message.OrderId);\n}`;
  else if (focus.includes('yarp') || focus.includes('gateway')) concepts.code = `"ReverseProxy": {\n  "Routes": { "orders": { "ClusterId": "orders-cluster", "Match": { "Path": "/orders/{**catch-all}" } } }\n}`;
  else concepts.code = `public sealed record Decision(string Name, string Reason);\n\nvar decision = new Decision(\n    Name: "${lesson}",\n    Reason: "Escolhida por reduzir o risco dominante do contexto");`;
  if (source?.code) concepts.code = source.code;
  if (source?.summary) concepts.theory = `${concepts.theory} A documentação original aprofunda o tema: ${source.summary.slice(0, 650)}`;
  return { ...concepts, lesson, chapter, index, source, diagram: ['Contexto', 'Decisão', 'Código', 'Verificação'] };
}

function render() {
  const chapter = currentChapter();
  const filtered = chapters.filter((item) => `${item.title} ${item.subtitle} ${item.lessons.join(' ')}`.toLowerCase().includes(state.query.toLowerCase()));
  const selected = state.selectedLesson !== null && chapter ? lessonContent(chapter, chapter.lessons[state.selectedLesson], Number(state.selectedLesson)) : null;
  app.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar" id="sidebar">
        <div class="brand-lockup"><div class="brand-mark">O</div><div><strong>obsidia</strong><span>livro de arquitetura</span></div></div>
        <button class="mobile-close" data-action="close-menu" aria-label="Fechar menu">×</button>
        <div class="sidebar-label">Seu percurso</div>
        <div class="progress-card"><div class="progress-top"><span>Progresso do livro</span><strong>${progress()}%</strong></div><div class="progress-bar"><i style="width:${Math.max(progress(), 3)}%"></i></div><small>${state.completed.size} de ${totalLessons} aulas concluídas</small></div>
        <nav class="chapter-nav" aria-label="Capítulos">
          <button class="nav-home ${state.current === 'home' ? 'active' : ''}" data-nav="home"><span class="nav-number">⌂</span><span>Visão geral</span></button>
          <div class="sidebar-label chapters-label">Conteúdo</div>
          ${filtered.map((item) => `<button class="chapter-link ${state.current === item.id ? 'active' : ''}" data-nav="${item.id}"><span class="nav-number">${item.icon}</span><span>${escapeHtml(item.title)}</span><b>${item.lessons.length}</b></button>`).join('')}
        </nav>
        <div class="sidebar-footer"><span class="status-dot"></span><span>Modo leitura conectado</span><span class="footer-mark">.md</span></div>
      </aside>
      <main class="main-content">
        <header class="topbar"><button class="menu-button" data-action="open-menu" aria-label="Abrir menu">☰</button><div class="breadcrumbs"><span>obsidia</span><i>/</i><strong>${state.current === 'home' ? 'visão geral' : `capítulo ${state.current}`}</strong></div><div class="top-actions"><label class="search-box"><span>⌕</span><input id="search" value="${escapeHtml(state.query)}" placeholder="Buscar no livro" /></label><button class="icon-button" data-action="toggle-theme" title="Alternar contraste">◐</button><button class="avatar">AM</button></div></header>
        ${state.current === 'home' ? renderHome() : selected ? renderLesson(selected) : renderChapter(chapter)}
      </main>
    </div>
    <div class="toast" id="toast">Progresso salvo</div>`;
  document.title = 'Arquitetura .NET na Prática | Guia completo';
  const homeTitle = app.querySelector('.hero-copy h1');
  if (homeTitle) homeTitle.innerHTML = 'Arquitetura .NET<br><em>na prática.</em>';
  const homeLead = app.querySelector('.hero-lead');
  if (homeLead) homeLead.textContent = 'Aprenda Clean Architecture, DDD, microsserviços, APIs, Cloud e IA construindo sistemas reais.';
  const brandName = app.querySelector('.brand-lockup strong');
  if (brandName) brandName.textContent = 'arq.net';
  const brandSubtitle = app.querySelector('.brand-lockup span');
  if (brandSubtitle) brandSubtitle.textContent = 'arquitetura na prática';
  const artLabel = app.querySelector('.art-core small');
  if (artLabel) artLabel.innerHTML = 'ARQUITETURA .NET<br>NA PRÁTICA';
  bindEvents();
}

function renderHome() {
  return `<section class="home-view page-enter"><div class="hero-grid"><div class="hero-copy"><div class="eyebrow"><span></span> edição 01 · .NET 10</div><h1>O livro para<br><em>sistemas que duram.</em></h1><p class="hero-lead">Uma trilha completa de arquitetura distribuída, do primeiro agregado ao ecossistema observável.</p><button class="primary-button" data-nav="01">Começar a leitura <span>↗</span></button><div class="hero-meta"><span><strong>${chapters.length}</strong> partes</span><span><strong>${totalLessons}</strong> aulas</span><span><strong>∞</strong> conexões</span></div></div><div class="hero-art"><div class="art-orbit orbit-one"></div><div class="art-orbit orbit-two"></div><div class="art-core"><span>O</span><small>ARCHITECTURE<br>FIELD GUIDE</small></div><div class="art-label label-top">clean<br>thinking</div><div class="art-label label-bottom">build with<br>intention</div></div></div><div class="section-heading"><div><span class="eyebrow">PONTOS DE PARTIDA</span><h2>Escolha uma porta de entrada</h2></div><button class="text-button" data-nav="01">Ver todos os capítulos <span>→</span></button></div><div class="featured-grid">${featured.map((item) => `<article class="feature-card ${item.color}"><div class="feature-no">${item.label}<span>↗</span></div><h3>${item.title}</h3><p>${item.text}</p><button data-nav="${item.color === 'coral' ? '05' : '01'}">Ler capítulo <span>→</span></button></article>`).join('')}</div><div class="continue-row"><div class="continue-copy"><span class="eyebrow">CONTINUE DE ONDE PAROU</span><h2>${state.completed.size ? 'Sua próxima decisão arquitetural' : 'O mapa começa aqui'}</h2><p>${state.completed.size ? 'Você já criou ritmo. Retome sua próxima aula e mantenha a linha de raciocínio viva.' : 'Comece pelos fundamentos. Cada capítulo foi desenhado para preparar o seguinte.'}</p></div><button class="outline-button" data-nav="${state.completed.size ? '03' : '01'}">${state.completed.size ? 'Retomar leitura' : 'Abrir capítulo 01'} <span>↗</span></button></div></section>`;
}

function renderChapter(chapter) {
  const completedInChapter = chapter.lessons.filter((_, index) => state.completed.has(`${chapter.id}-${index}`)).length;
  return `<section class="chapter-view page-enter"><div class="chapter-header"><div class="chapter-index">${chapter.icon}</div><div><div class="eyebrow">CAPÍTULO ${chapter.id} · ${completedInChapter}/${chapter.lessons.length} AULAS</div><h1>${escapeHtml(chapter.title)}</h1><p>${escapeHtml(chapter.subtitle)}</p></div></div><div class="reading-layout"><article class="reading-paper"><div class="paper-meta"><span>PARTE ${chapter.id}</span><span>•</span><span>TRILHA COMPLETA</span></div><h2>Escolha uma aula para abrir o livro.</h2><p class="lead-paragraph">Cada tema combina fundamento, exemplo do cotidiano, código executável, diagrama mental, exercício e uma conversa guiada com IA.</p><div class="quote-block"><span>“</span><p>Aprender arquitetura é aprender a enxergar as decisões escondidas dentro do software.</p></div><h3>Roteiro deste capítulo</h3><div class="lesson-list">${chapter.lessons.map((lesson, index) => `<div class="lesson-item lesson-link" data-open-lesson="${index}"><span class="lesson-number">${String(index + 1).padStart(2, '0')}</span><span><strong>${escapeHtml(lesson)}</strong><small>${index === 0 ? 'aula essencial' : 'teoria + prática + IA'}</small></span><span class="lesson-arrow">↗</span></div>`).join('')}</div></article><aside class="chapter-aside"><div class="aside-card accent-card"><span class="eyebrow">IDEIA CENTRAL</span><h3>Nomeie o que muda.</h3><p>Quando as responsabilidades estão explícitas, o sistema consegue evoluir sem espalhar incerteza.</p></div><div class="aside-card"><span class="eyebrow">NESTA PARTE</span><div class="aside-stat"><strong>${chapter.lessons.length}</strong><span>aulas curtas<br>e conectadas</span></div><div class="mini-line"><i style="width:${Math.max((completedInChapter / chapter.lessons.length) * 100, 4)}%"></i></div></div><button class="next-chapter" data-nav="${String(Math.min(Number(chapter.id) + 1, 21)).padStart(2, '0')}">Próximo capítulo <span>→</span></button></aside></div></section>`;
}

function renderLesson(content) {
  const key = `${content.chapter.id}-${content.index}`;
  return `<section class="lesson-view page-enter"><button class="back-link" data-back="chapter">← voltar ao capítulo ${content.chapter.id}</button><div class="lesson-hero"><div class="lesson-kicker"><span>CAPÍTULO ${content.chapter.id}</span><i>•</i><span>AULA ${String(content.index + 1).padStart(2, '0')}</span></div><h1>${escapeHtml(content.lesson)}</h1><p>${content.objective}</p><button class="complete-button" data-complete="${key}">${state.completed.has(key) ? '✓ Aula concluída' : 'Marcar aula como concluída'}</button></div><div class="lesson-content-grid"><article class="lesson-article"><section class="content-section"><div class="section-tag">01 · FUNDAMENTO</div><h2>A ideia antes da ferramenta</h2><p>${content.theory}</p><div class="source-badge">Fonte: ${escapeHtml(content.source?.file || 'guia prático')} · ${content.source?.sourceWords || 0} palavras indexadas</div></section><section class="daily-example"><div class="section-tag">NO DIA A DIA</div><h3>Uma forma de enxergar</h3><p>${content.analogy}</p></section><section class="content-section"><div class="section-tag">02 · MÃO NA MASSA</div><h2>Exemplo em C#</h2><p>Comece pequeno: este recorte foi extraído e enriquecido a partir da documentação original.</p><pre><code>${escapeHtml(content.code)}</code></pre></section><section class="content-section"><div class="section-tag">03 · FLUXO MENTAL</div><div class="lesson-diagram">${content.diagram.map((item, index) => `<div class="diagram-node"><span>0${index + 1}</span>${item}</div>${index < content.diagram.length - 1 ? '<b class="diagram-arrow">→</b>' : ''}`).join('')}</div></section><section class="practice-card"><div class="section-tag">04 · PRÁTICA GUIADA</div><h2>Desafio de projeto</h2><p>${content.exercise}</p><div class="practice-steps"><span>1</span> escreva suas premissas <span>2</span> implemente o menor fluxo <span>3</span> meça o resultado</div></section><section class="ai-card"><div><div class="section-tag">05 · ESTUDE COM IA</div><h2>Prompt de investigação</h2></div><p>${content.ai}</p><button class="copy-prompt" data-copy="${escapeHtml(content.ai)}">Copiar prompt <span>⧉</span></button></section></article><aside class="lesson-aside"><div class="aside-card"><span class="eyebrow">VOCÊ ESTÁ AQUI</span><strong class="lesson-aside-title">${escapeHtml(content.chapter.title)}</strong><div class="lesson-progress-line"><i></i></div><small>Aula ${content.index + 1} de ${content.chapter.lessons.length}</small></div><div class="aside-card reading-note"><span class="eyebrow">NOTA DE LEITURA</span><p>Uma arquitetura boa não elimina escolhas. Ela torna as escolhas explícitas e reversíveis.</p></div></aside></div></section>`;
}

function bindEvents() {
  document.querySelectorAll('[data-nav]').forEach((element) => element.addEventListener('click', () => { state.current = element.dataset.nav; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }));
  document.querySelectorAll('[data-open-lesson]').forEach((element) => element.addEventListener('click', () => { state.selectedLesson = Number(element.dataset.openLesson); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }));
  document.querySelector('[data-back="chapter"]')?.addEventListener('click', () => { state.selectedLesson = null; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  document.querySelector('[data-complete]')?.addEventListener('click', (event) => { state.completed.add(event.currentTarget.dataset.complete); localStorage.setItem('obsidia-completed', JSON.stringify([...state.completed])); showToast(); render(); });
  document.querySelector('[data-copy]')?.addEventListener('click', async (event) => { await navigator.clipboard?.writeText(event.currentTarget.dataset.copy); event.currentTarget.innerHTML = 'Prompt copiado <span>✓</span>'; });
  document.querySelectorAll('[data-lesson]').forEach((input) => input.addEventListener('change', (event) => { const key = event.target.dataset.lesson; event.target.checked ? state.completed.add(key) : state.completed.delete(key); localStorage.setItem('obsidia-completed', JSON.stringify([...state.completed])); showToast(); render(); }));
  document.querySelector('#search')?.addEventListener('input', (event) => { state.query = event.target.value; if (state.current !== 'home' && state.query) state.current = 'home'; render(); document.querySelector('#search')?.focus(); });
  document.querySelector('[data-action="open-menu"]')?.addEventListener('click', () => document.querySelector('#sidebar').classList.add('open'));
  document.querySelector('[data-action="close-menu"]')?.addEventListener('click', () => document.querySelector('#sidebar').classList.remove('open'));
  document.querySelector('[data-action="toggle-theme"]')?.addEventListener('click', () => { document.body.classList.toggle('high-contrast'); });
}
function showToast() { const toast = document.querySelector('#toast'); toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1600); }
render();

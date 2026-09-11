---
title: "Dockerfiles Multi-Stage Otimizados e Docker Compose no .NET 10"
tags:
  - docker
  - containers
  - docker-compose
  - chiseled-images
  - security
  - dotnet10
chapter: 9
status: completed
---

# 🐳 Dockerfiles Multi-Stage Otimizados e Docker Compose no .NET 10

> "Subir uma imagem de 900 MB com o SDK do .NET inteiro instalado em produção é uma tragédia de segurança e performance. Um container de microsserviço profissional tem menos de 80 MB, roda como usuário não-root e não contém compiladores nem ferramentas de depuração expostas."

Containers são a unidade atômica de empacotamento, distribuição e execução de microsserviços modernos. Aqui aplicamos as melhores práticas de **Dockerfiles Multi-Stage**, imagens ultraleves (*Chiseled Containers*) e orquestração local com **Docker Compose**.

---

## 🏗️ Dockerfile Multi-Stage Profissional para .NET 10

O conceito de **Multi-Stage Build** divide a criação do container em estágios isolados: o SDK pesado é usado apenas para restaurar e compilar o código; a imagem final de produção herda apenas do runtime enxuto e seguro.

```mermaid
flowchart TD
    subgraph Stage1 ["Stage 1: Build & Publish (SDK ~800MB)"]
        SDK["mcr.microsoft.com/dotnet/sdk:10.0"]
        CopyCsproj["COPY *.csproj . (Cache de camadas)"]
        Restore["RUN dotnet restore"]
        CopySource["COPY . ."]
        Publish["RUN dotnet publish -c Release -o /app/publish"]
        
        SDK --> CopyCsproj --> Restore --> CopySource --> Publish
    end

    subgraph Stage2 ["Stage 2: Imagem Final de Produção (Chiseled ~75MB)"]
        Runtime["mcr.microsoft.com/dotnet/aspnet:10.0-noble-chiseled"]
        CopyBinaries["COPY --from=build /app/publish ."]
        NonRoot["USER $APP_UID (Usuário sem privilégios)"]
        Entry["ENTRYPOINT ['dotnet', 'Ordering.Api.dll']"]

        Runtime --> CopyBinaries --> NonRoot --> Entry
    end

    Publish -.->|Transfere apenas os binários compilados| CopyBinaries
```

### O Dockerfile de Produção:

```dockerfile
# ----------------------------------------------------------------------
# Estágio 1: Build e Publicação (Usa o SDK completo)
# ----------------------------------------------------------------------
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copia apenas arquivos de projeto para maximizar o cache de camadas do Docker
COPY ["src/Ordering.Domain/Ordering.Domain.csproj", "Ordering.Domain/"]
COPY ["src/Ordering.Application/Ordering.Application.csproj", "Ordering.Application/"]
COPY ["src/Ordering.Infrastructure/Ordering.Infrastructure.csproj", "Ordering.Infrastructure/"]
COPY ["src/Ordering.Api/Ordering.Api.csproj", "Ordering.Api/"]

# Restaura dependências NuGet (Camada cacheada se .csproj não mudou!)
RUN dotnet restore "Ordering.Api/Ordering.Api.csproj"

# Copia o restante do código fonte
COPY src/ .

# Compila e publica binários otimizados
WORKDIR "/src/Ordering.Api"
RUN dotnet publish "Ordering.Api.csproj" \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false

# ----------------------------------------------------------------------
# Estágio 2: Imagem Final de Execução (Chiseled Ubuntu / Zero Bloat)
# ----------------------------------------------------------------------
FROM mcr.microsoft.com/dotnet/aspnet:10.0-noble-chiseled AS final
WORKDIR /app

# Copia apenas os arquivos publicados do estágio anterior
COPY --from=build /app/publish .

# 🔒 Executa como usuário sem privilégios de root (Segurança Estrita)
USER $APP_UID

# Expõe as portas padrão do ASP.NET Core no .NET 10 (8080 HTTP)
EXPOSE 8080

ENTRYPOINT ["dotnet", "Ordering.Api.dll"]
```

---

## 🛡️ O que são Chiseled Images e por que usá-las?

As imagens **Chiseled da Microsoft (baseadas em Ubuntu)** são contêineres "talhados" que contêm **apenas** o runtime do .NET e suas dependências diretas de sistema:
- **Não possuem Bash, Sh, Curl, Wget ou Package Managers (apt)**.
- Se um invasor conseguir executar um Remote Code Execution (RCE) na sua API, ele não terá nenhum shell interativo disponível para baixar scripts maliciosos ou navegar no sistema de arquivos!
- Reduz o número de vulnerabilidades conhecidas (CVEs) para praticamente **zero**.

---

## 🐙 Docker Compose: Orquestrando o Ecossistema Completo

Para desenvolvimento local reproduzível, o `docker-compose.yml` sobe toda a infraestrutura com redes isoladas e volumes persistentes:

```yaml
version: '3.8'

networks:
  eshop-network:
    driver: bridge

volumes:
  sqlserver-data:
  rabbitmq-data:
  redis-data:

services:
  # 🗄️ Banco de Dados Relacional
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: eshop-sqlserver
    environment:
      - ACCEPT_EULA=Y
      - MSSQL_SA_PASSWORD=YourStrong@Pass123
    ports:
      - "1433:1433"
    volumes:
      - sqlserver-data:/var/opt/mssql
    networks:
      - eshop-network

  # 📨 Message Broker
  rabbitmq:
    image: rabbitmq:3-management-alpine
    container_name: eshop-rabbitmq
    ports:
      - "5672:5672"   # AMQP
      - "15672:15672" # Dashboard Web de Gestão
    volumes:
      - rabbitmq-data:/var/lib/rabbitmq
    networks:
      - eshop-network

  # ⚡ Cache Distribuído
  redis:
    image: redis:alpine
    container_name: eshop-redis
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - eshop-network

  # 👁️ Distributed Tracing (Jaeger)
  jaeger:
    image: jaegertracing/all-in-one:latest
    container_name: eshop-jaeger
    ports:
      - "16686:16686" # UI do Jaeger
      - "4317:4317"   # OTLP gRPC receiver
    networks:
      - eshop-network

  # 🛒 Microsserviço de Pedidos (.NET 10)
  ordering-api:
    build:
      context: .
      dockerfile: src/Ordering.Api/Dockerfile
    container_name: eshop-ordering-api
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - ConnectionStrings__SqlDefault=Server=sqlserver;Database=OrderingDb;User Id=sa;Password=YourStrong@Pass123;TrustServerCertificate=True;
      - ConnectionStrings__RabbitMq=amqp://guest:guest@rabbitmq:5672
      - ConnectionStrings__Redis=redis:6379
      - OTel__Endpoint=http://jaeger:4317
    ports:
      - "5001:8080"
    depends_on:
      - sqlserver
      - rabbitmq
      - redis
    networks:
      - eshop-network
```

---

## 🎙️ Perguntas de Entrevista Sênior

### 1. "Por que devemos copiar os arquivos `.csproj` antes do restante do código fonte no Dockerfile?"
**Resposta Esperada**: *Para aproveitar o mecanismo de cache de camadas do Docker. O `dotnet restore` é a etapa mais lenta do build, pois baixa pacotes da internet. As dependências NuGet mudam com muito menos frequência do que o código-fonte diário. Ao copiar primeiro os `.csproj` e rodar o restore, o Docker só reexecutará essa camada se alguma dependência for adicionada ou alterada. Se apenas uma linha de código C# mudar, o Docker usará o cache do restore e compilará o projeto em frações de segundo.*

### 2. "Quais os perigos de rodar contêineres Docker como usuário `root` padrão em produção?"
**Resposta Esperada**: *Se a aplicação tiver uma vulnerabilidade de segurança explorável (como injeção de comandos ou path traversal) e estiver rodando como root, o invasor herda privilégios totais dentro do container. Em caso de falha de isolamento de namespace do kernel do Linux (*container escape*), o atacante pode obter acesso com privilégios de root na máquina host inteira. Usar o usuário sem privilégios padrão (`USER $APP_UID`) limita drasticamente o raio de dano de qualquer invasão.*

---

## 🔗 Conexões do Grafo (Obsidian)
- [EF Core e SQL Server](../03-dados-persistencia/01-ef-core-e-sql-server.md)
- [Cache Distribuído com Redis](../03-dados-persistencia/04-cache-distribuido-redis-e-hybridcache.md)
- [RabbitMQ e Mensageria](../13-mensageria-eventos/01-rabbitmq-avancado.md)
- [OpenTelemetry e Jaeger](../08-observabilidade/02-opentelemetry-tracing-e-metricas.md)
- [Pipelines de CI/CD e Build](../11-cicd-devops/01-pipelines-ci-cd-e-deploy.md)

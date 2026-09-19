# 🚀 CI/CD Pipeline para Microsserviços Cloud Native

O objetivo do pipeline é garantir que nenhum código chegue à produção sem passar por: **Build $\rightarrow$ Testes Unitários $\rightarrow$ Testes de Integração $\rightarrow$ Scan de Segurança $\rightarrow$ Deploy**.

## 🏗️ Pipeline de Referência (GitHub Actions)

```yaml
name: Stock API Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    services:
      sqlserver:
        image: mcr.microsoft.com/mssql/server
      rabbitmq:
        image: rabbitmq:3-management

    steps:
      - uses: actions/checkout@v4
      - name: Setup .NET 10
        uses: actions/setup-dotnet@v4
        with: { dotnet-version: '10.0.x' }
      
      - name: Restore & Build
        run: dotnet build -c Release
      
      - name: Run Integration Tests (Testcontainers)
        run: dotnet test --no-build -c Release

  deploy:
    needs: build-and-test
    runs-on: ubuntu-latest
    steps:
      - name: Build & Push Docker Image
        run: |
          docker build -t myregistry.com/stock-api:${{ github.sha }} .
          docker push myregistry.com/stock-api:${{ github.sha }}
      
      - name: Deploy to Azure Container Apps / K8s
        run: |
          az containerapp update --name stock-api --image myregistry.com/stock-api:${{ github.sha }}
```

## 📈 Estratégias de Deploy
- **Blue/Green**: Sobe a versão nova (Green) ao lado da antiga (Blue). Se tudo estiver ok, vira a chave do tráfego.
- **Canary Release**: Direciona apenas 5% do tráfego para a nova versão. Se a taxa de erro não subir, expande para 100%.
- **Rolling Update**: Atualiza os containers um por um, garantindo zero downtime.

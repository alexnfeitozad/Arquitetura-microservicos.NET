# ⚙️ Estratégias de Migração de Dados em Produção

Usar `context.Database.EnsureCreated()` é proibido em produção porque ele não suporta a evolução do esquema (addColumn, renameColumn) sem deletar os dados.

## 🚀 O Padrão Migration Bundle

Em ambientes de Containers/Kubernetes, a melhor prática é o **Migration Bundle**. Ele empacota as migrações em um executável auto-contido.

### 1. Gerando o Bundle
```bash
dotnet ef migrations bundle --self-contained -r linux-x64
```

### 2. Executando no Pipeline (K8s Job)
Em vez de o app rodar a migração ao iniciar (o que pode travar o startup em escala), usamos um **Kubernetes Job** que roda *antes* do deploy da nova versão da API.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: stock-api-migration
spec:
  template:
    spec:
      containers:
      - name: migration
        image: myregistry.com/stock-api-migration:latest
        command: ["./bundle"]
      restartPolicy: OnFailure
```

## ⚠️ Regras de Ouro para Migrações
- **Never Breaking Changes**: Nunca remova uma coluna que a versão anterior do app ainda usa.
- **Two-Step Migration**: Para renomear uma coluna: 
    1. Crie a nova coluna $\rightarrow$ 2. Migre os dados $\rightarrow$ 3. Remova a antiga na próxima versão.
- **Idempotência**: As migrações devem ser capazes de rodar múltiplas vezes sem causar erros.

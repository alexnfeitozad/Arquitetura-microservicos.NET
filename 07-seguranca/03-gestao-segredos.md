# 🔑 Gestão de Segredos (Secrets Management)

Em produção, arquivos `appsettings.json` com senhas são vulnerabilidades críticas. O padrão enterprise é a **Injeção de Segredos em Tempo de Execução**.

## 🛡️ A Hierarquia de Segredos
1. **Local (Desenvolvimento)**: `dotnet user-secrets` (armazena fora da pasta do projeto).
2. **Produção (Cloud)**: Azure Key Vault, AWS Secrets Manager ou HashiCorp Vault.

## 🛠️ Implementação com Azure Key Vault (.NET 10)

### 1. Configuração do Provider
Em vez de ler do JSON, o .NET busca os valores diretamente no cofre da nuvem.

```csharp
if (builder.Environment.IsProduction())
{
    var keyVaultEndpoint = new Uri(builder.Configuration["AzureKeyVault:Endpoint"]);
    builder.Configuration.AddAzureKeyVault(keyVaultEndpoint, new DefaultAzureCredential());
}
```

### 2. Fluxo de Acesso Seguro (Managed Identity)
Para evitar ter que colocar a senha do Key Vault no código, usamos **Managed Identity (Identidade Gerenciada)**:
- O recurso (App Service/Kubernetes) recebe uma identidade na nuvem.
- O Key Vault libera o acesso apenas para aquela identidade específica.
- **Resultado**: Zero senhas no código ou no ambiente.

## 📋 Check-list de Produção
- [ ] Remover todas as senhas do `appsettings.json`.
- [ ] Configurar `DefaultAzureCredential` para autenticação transparente.
- [ ] Definir permissões de "Least Privilege" (o app só lê, não deleta segredos).

# 🐳 Capítulo 9: Containerização

Bem-vindo ao nono capítulo. Aqui transformamos nosso código em artefatos reproduzíveis, portáveis e seguros através do **Docker**, dominando a construção de imagens ultraleves para **.NET 10** e a orquestração completa do ecossistema local via **Docker Compose**.

## 📑 Aulas e Tópicos Deste Capítulo

1. **[Dockerfiles Multi-Stage Otimizados e Docker Compose no .NET 10](01-docker-e-docker-compose.md)**
   - O padrão Multi-Stage Build: isolando o SDK de compilação do runtime de execução.
   - Imagens Chiseled da Microsoft: segurança Zero-CVE e containers sem shell nem privilégios de root (`USER $APP_UID`).
   - Otimização radical de tamanho: de 900MB para menos de 80MB.
   - `docker-compose.yml` mestre: orquestrando Microsserviços .NET 10, SQL Server, Redis, RabbitMQ e Jaeger em uma rede privada.

---
⬅️ Voltar para o **[Capítulo 8: Observabilidade](../08-observabilidade/README.md)** | Avançar para o **[Capítulo 10: Escalabilidade](../10-escalabilidade/README.md)** ➡️

# Uninter - API Gestão de Eventos

API para integração da plataforma de gerenciamento de eventos com banco de dados MySQL.

## Pré-requisitos

- Docker e Docker Compose
- Node.js 22+
- npm

## Configuração de ambiente

1. Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

2. Preencha as variáveis obrigatórias:

- `SECRET`
- `ADMIN_FIXED_TOKEN`
- `DB_NAME`
- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_PORT`

Observação: no `docker-compose.yml`, o serviço da API já usa `DB_HOST=db` internamente.

## Subir ambiente com Docker Compose

Para subir API + MySQL:

```bash
docker compose up --build -d
```

Para verificar status dos containers:

```bash
docker compose ps
```

Para acompanhar logs:

```bash
docker compose logs -f api
docker compose logs -f db
```

Para derrubar o ambiente:

```bash
docker compose down
```

Para derrubar e remover volume do banco:

```bash
docker compose down -v
```

A API sobe na porta `3000` por padrão.

## Testes com Testcontainers

Este repositório usa Testcontainers para testes de integração com MySQL real em container.

### Requisitos para executar

- Docker daemon em execução (Testcontainers precisa criar containers durante os testes)

### Comandos

Rodar todos os testes:

```bash
npm test -- --run
```

Rodar somente a suíte de integração de criação de eventos:

```bash
npm test -- --run tests/integration/repositories/event-create.integration.test.ts
```

Durante a execução, o Testcontainers sobe e remove automaticamente o container MySQL usado nos testes.

## Scripts disponíveis

- `npm run dev` - sobe API em modo desenvolvimento
- `npm run compile` - compila TypeScript
- `npm run start` - executa build compilado
- `npm test` - executa suíte de testes com Vitest
- `npm run test:watch` - executa testes em watch mode

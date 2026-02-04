# Desafio Full Cycle - DDD: Order Repository e Testes

Implementacao do Order Repository seguindo os principios de Domain-Driven Design (DDD), com testes unitarios e de integração.

## Pre-requisitos

- [Docker](https://www.docker.com/) instalado

## Estrutura do Projeto

```
src/
  domain/
    entity/         # Entidades: Customer, Order, OrderItem, Product, Address
    repository/     # Interfaces dos repositorios
    service/        # Servicos de dominio (Order, Product)
  infrastructure/
    db/sequelize/   # Models do Sequelize (Customer, Order, OrderItem, Product)
    repository/     # Implementacoes dos repositorios (Customer, Order, Product)
```

## Como executar os testes

```bash
docker build -t desafio-fullcycle-ddd .
docker run --rm desafio-fullcycle-ddd
```

## Tecnologias

- TypeScript
- Jest (testes)
- Sequelize + SQLite (persistencia)
- SWC (compilacao)
- Docker

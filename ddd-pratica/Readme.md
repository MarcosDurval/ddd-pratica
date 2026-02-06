# Desafio Full Cycle - DDD: Domain-Driven Design na Pratica

Projeto com dois desafios de Domain-Driven Design (DDD) implementados em TypeScript.

---

## Desafio 1: Order Repository e Testes

Implementacao do Order Repository seguindo os principios de Domain-Driven Design (DDD), com testes unitarios e de integração.

---

## Desafio 2: Domain Events para o agregado de Customer

Implementacao de dois Eventos de Dominio para o agregado de Customer:

### Evento 1: CustomerCreated

Disparado quando um novo Customer e criado. Possui dois handlers:

- **EnviaConsoleLog1Handler** (`SendConsoleLogWhenCustomerIsCreatedHandler`): Exibe no console a mensagem `"Esse é o primeiro console.log do evento: CustomerCreated"`
- **EnviaConsoleLog2Handler** (`SendEmailCustomerIsCreated`): Exibe no console a mensagem `"Esse é o segundo console.log do evento: CustomerCreated"`

### Evento 2: CustomerChangeAddress

Disparado quando o endereco do Customer e trocado (metodo `changeAddress()`). Os dados do evento incluem o ID, Nome e endereco do cliente.

- **EnviaConsoleLogHandler** (`SendEmailWhenAddressChangeHandler`): Exibe no console a mensagem `"Endereço do cliente: {id}, {nome} alterado para: {endereco}"`

### Testes

Todos os eventos e handlers possuem testes que garantem:
- Registro correto dos handlers no EventDispatcher
- Notificacao dos handlers ao disparar o evento CustomerCreated
- Notificacao do handler ao disparar o evento CustomerChangeAddress

---

## Pre-requisitos

- [Docker](https://www.docker.com/) instalado

## Estrutura do Projeto

```
src/
  domain/
    @shared/
      event/
        customer/           # Eventos de dominio do Customer
          handler/          # Handlers dos eventos do Customer
        product/            # Eventos de dominio do Product
          handler/          # Handlers dos eventos do Product
      event-dispatcher.ts   # Implementacao do EventDispatcher
      event-dispatcher.interface.ts
      event-handler.interface.ts
      event.interface.ts
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

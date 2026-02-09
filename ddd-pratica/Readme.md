# DDD: Domain-Driven Design na Prática

Projeto de Domain-Driven Design (DDD) implementado em TypeScript, organizado por agregados (Customer, Product, Checkout) com Domain Events, Factories, Services e Repositories.

---

## Desafios Implementados

### 1. Order Repository

Implementação do Order Repository com operações CRUD completas, seguindo DDD com testes de integração utilizando Sequelize + SQLite.

### 2. Domain Events - Customer

Implementação de Eventos de Domínio para o agregado de Customer:

**CustomerCreatedEvent** — disparado quando um novo Customer é criado. Handlers:

- `SendConsoleLogWhenCustomerIsCreatedHandler`: Exibe `"Esse é o primeiro console.log do evento: CustomerCreated"`
- `SendEmailCustomerIsCreatedHandler`: Exibe `"Esse é o segundo console.log do evento: CustomerCreated"`

**CustomerAddressChangedEvent** — disparado quando o endereço é alterado via `changeAddress()`. Dados do evento: ID, Nome e Endereço.

- `SendEmailWhenAddressChangeHandler`: Exibe `"Endereço do cliente: {id}, {nome} alterado para: {endereco}"`

### Testes

Todos os eventos e handlers possuem testes que garantem:
- Registro e remoção de handlers no EventDispatcher
- Notificação dos handlers ao disparar CustomerCreatedEvent
- Notificação do handler ao disparar CustomerAddressChangedEvent

---

## Estrutura do Projeto

```
src/
├── domain/                              # Camada de Domínio
│   ├── @shared/                         # Recursos compartilhados
│   │   ├── event/
│   │   │   ├── event.interface.ts
│   │   │   ├── event-dispatcher.interface.ts
│   │   │   ├── event-dispatcher.ts
│   │   │   ├── event-dispatcher.spec.ts
│   │   │   └── event-handler.interface.ts
│   │   └── repository/
│   │       └── repository-interface.ts
│   │
│   ├── customer/                        # Agregado Customer
│   │   ├── entity/
│   │   │   ├── customer.ts
│   │   │   ├── customer.spec.ts
│   │   │   └── value-object/
│   │   │       └── address.ts
│   │   ├── event/
│   │   │   ├── customer-created.event.ts
│   │   │   ├── customer-created.event.spec.ts
│   │   │   ├── customer-address-changed.event.ts
│   │   │   ├── customer-address-changed.spec.ts
│   │   │   └── handler/
│   │   │       ├── send-console-log-when-customer-is-created.handler.ts
│   │   │       ├── send-email-customer-is-created.handler.ts
│   │   │       └── send-email-when-address-change.handler.ts
│   │   ├── factory/
│   │   │   ├── customer.ts
│   │   │   ├── customer.spec.ts
│   │   │   └── customer.interface.ts
│   │   └── repository/
│   │       └── customer.repository.interface.ts
│   │
│   ├── product/                         # Agregado Product
│   │   ├── entity/
│   │   │   ├── product.ts
│   │   │   ├── product.spec.ts
│   │   │   ├── product.interface.ts
│   │   │   └── productB.ts
│   │   ├── event/
│   │   │   ├── product-created.event.ts
│   │   │   └── handler/
│   │   │       └── send-email-when-product-is-created.handler.ts
│   │   ├── factory/
│   │   │   ├── product.ts
│   │   │   └── product.spec.ts
│   │   ├── service/
│   │   │   ├── product.ts
│   │   │   └── product.service.spec.ts
│   │   └── repository/
│   │       └── product-repository.interface.ts
│   │
│   └── checkout/                        # Agregado Order
│       ├── entity/
│       │   ├── order.ts
│       │   ├── order.spec.ts
│       │   ├── order_item.ts
│       │   └── order_item.spec.ts
│       ├── factory/
│       │   ├── order.ts
│       │   └── order.spec.ts
│       ├── service/
│       │   ├── order.ts
│       │   └── order.spec.ts
│       └── repository/
│           └── order.repository.interface.ts
│
└── infrastructure/                      # Camada de Infraestrutura
    ├── customer/
    │   └── repository/sequelize/
    │       ├── customer.model.ts
    │       ├── customer.repository.ts
    │       └── customer.repository.spec.ts
    ├── product/
    │   └── repository/sequelize/
    │       ├── product.model.ts
    │       ├── product.repository.ts
    │       └── product.repository.spec.ts
    └── order/
        └── repository/sequelize/
            ├── order.model.ts
            ├── order-item.model.ts
            ├── order.repository.ts
            └── order.repository.spec.ts
```

---

## Como executar

### Pré-requisitos

- [Docker](https://www.docker.com/) instalado

### Executar os testes

```bash
docker build -t desafio-fullcycle-ddd .
docker run --rm desafio-fullcycle-ddd
```

---

## Tecnologias

- **TypeScript** - Linguagem de programação
- **Jest** - Framework de testes
- **Sequelize** - ORM para persistência
- **SQLite** - Banco de dados em memória
- **SWC** - Compilador TypeScript
- **Docker** - Containerização

# Desafio Full Cycle - DDD: Domain-Driven Design na Prática

Projeto com dois desafios de Domain-Driven Design (DDD) implementados em TypeScript, organizados por agregados seguindo os princípios de DDD.

---

## 📋 Desafios

### Desafio 1: Order Repository e Testes

Implementação do Order Repository seguindo os princípios de Domain-Driven Design (DDD), com testes unitários e de integração utilizando Sequelize + SQLite.

### Desafio 2: Domain Events para o agregado de Customer

Implementação de dois Eventos de Domínio para o agregado de Customer:

#### Evento 1: CustomerCreated

Disparado quando um novo Customer é criado. Possui dois handlers:

- **SendConsoleLogWhenCustomerIsCreatedHandler**: Exibe `"Esse é o primeiro console.log do evento: CustomerCreated"`
- **SendEmailCustomerIsCreated**: Exibe `"Esse é o segundo console.log do evento: CustomerCreated"`

#### Evento 2: CustomerChangesAddress

Disparado quando o endereço do Customer é alterado através do método `changeAddress()`. Os dados do evento incluem ID, Nome e Endereço do cliente.

- **SendEmailWhenAddressChangeHandler**: Exibe `"Endereço do cliente: {id}, {nome} alterado para: {endereco}"`

#### Testes

Todos os eventos e handlers possuem testes que garantem:
- Registro correto dos handlers no EventDispatcher
- Notificação dos handlers ao disparar o evento CustomerCreated
- Notificação do handler ao disparar o evento CustomerChangesAddress

---

## 🏗️ Estrutura do Projeto

O projeto está organizado por agregados seguindo DDD:

```
src/
├── domain/                          # Camada de Domínio
│   ├── @shared/                     # Recursos compartilhados entre agregados
│   │   ├── event/                   # Sistema de eventos de domínio
│   │   │   ├── event-dispatcher.ts
│   │   │   ├── event-dispatcher.interface.ts
│   │   │   ├── event-handler.interface.ts
│   │   │   └── event.interface.ts
│   │   └── repository/              # Interface base de repositório
│   │       └── repository-interface.ts
│   │
│   ├── customer/                    # Agregado de Customer
│   │   ├── entity/                  # Entidades
│   │   │   ├── customer.ts
│   │   │   ├── customer.spec.ts
│   │   │   └── value-object/        # Value Objects
│   │   │       └── address.ts
│   │   ├── event/                   # Eventos de domínio
│   │   │   ├── customer-created.event.ts
│   │   │   ├── customer-changes-address.event.ts
│   │   │   ├── customer-event.spec.ts
│   │   │   └── handler/             # Event Handlers
│   │   │       ├── send-console-log-when-customer-is-created.handler.ts
│   │   │       ├── send-email-customer-is-created.handler.ts
│   │   │       └── send-email-when-address-change.handler.ts
│   │   ├── factory/                 # Factory Pattern
│   │   │   ├── customer.ts
│   │   │   └── customer.interface.ts
│   │   └── repository/              # Interface do repositório
│   │       └── customer.repository.interface.ts
│   │
│   ├── product/                     # Agregado de Product
│   │   ├── entity/                  # Entidades
│   │   │   ├── product.ts
│   │   │   ├── product.spec.ts
│   │   │   ├── product.interface.ts
│   │   │   └── productB.ts
│   │   ├── event/                   # Eventos de domínio
│   │   │   ├── product-created.event.ts
│   │   │   └── handler/
│   │   │       └── send-email-when-product-is-created.handler.ts
│   │   ├── factory/                 # Factory Pattern
│   │   │   ├── product.ts
│   │   │   └── product.spec.ts
│   │   ├── service/                 # Serviços de domínio
│   │   │   ├── product.ts
│   │   │   └── product.service.spec.ts
│   │   └── repository/              # Interface do repositório
│   │       └── product-repository.interface.ts
│   │
│   └── checkout/                    # Agregado de Order (Checkout)
│       ├── entity/                  # Entidades
│       │   ├── order.ts
│       │   ├── order.spec.ts
│       │   ├── order_item.ts
│       │   └── order_item.spec.ts
│       ├── factory/                 # Factory Pattern
│       │   ├── order.ts
│       │   └── order.spec.ts
│       ├── service/                 # Serviços de domínio
│       │   ├── order.ts
│       │   └── order.spec.ts
│       └── repository/              # Interface do repositório
│           └── order.repository.interface.ts
│
└── infrastructure/                  # Camada de Infraestrutura
    ├── customer/                    # Implementação de persistência
    │   └── repository/
    │       └── sequelize/
    │           ├── customer.model.ts
    │           ├── customer.repository.ts
    │           └── customer.repository.spec.ts
    ├── product/
    │   └── repository/
    │       └── sequelize/
    │           ├── product.model.ts
    │           ├── product.repository.ts
    │           └── product.repository.spec.ts
    └── order/
        └── repository/
            └── sequelize/
                ├── order.model.ts
                ├── order-item.model.ts
                ├── order.repository.ts
                └── order.repository.spec.ts
```

---

## 🚀 Como executar

### Pré-requisitos

- [Docker](https://www.docker.com/) instalado

### Executar os testes

```bash
docker build -t desafio-fullcycle-ddd .
docker run --rm desafio-fullcycle-ddd
```

---

## 🛠️ Tecnologias

- **TypeScript** - Linguagem de programação
- **Jest** - Framework de testes
- **Sequelize** - ORM para persistência
- **SQLite** - Banco de dados
- **SWC** - Compilador TypeScript
- **Docker** - Containerização

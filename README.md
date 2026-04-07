# 🥗 Projeto NutrIA 

Projeto **fullstack** desenvolvido para a disciplina de Desenvolvimento Web, integrando **Backend, Banco de Dados e Frontend**, com autenticação segura e **envio automático de e‑mail de confirmação** após a contratação de serviços.

O sistema simula a venda de serviços digitais **sem integração com meios de pagamento**, focando no fluxo completo de negócio, persistência de dados e boas práticas de arquitetura.

---

## Funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- Rotas protegidas
- Recuperação de senha 
- Redefinição de senha via token
- Listagem de serviços
- Contratação de serviços 
- Criação de pedidos
- Envio automático de e‑mail de confirmação
- Visualização dos pedidos do usuário

---

## Tecnologias Utilizadas

### Backend

| Tecnologia | Versão |
|----------|--------|
| Python | 3.11 |
| FastAPI | 0.135.2 |
| Uvicorn | 0.42.0 |
| SQLAlchemy | 2.0.48 |
| Pydantic | 2.12.5 |
| python-jose (JWT) | 3.5.0 |
| Passlib | 1.7.4 |
| bcrypt | 5.0.0 |
| psycopg | 3.1.19 |
| PostgreSQL | 15 |
| python-dotenv | 1.2.2 |
| SMTP | RFC 5321 |

### Frontend

| Tecnologia | Versão |
|----------|--------|
| React | 18.2.0 |
| React Router | 6.22.3 |
| Context API | Nativo |
| Vite | 5.1.4 |
| JavaScript | ES6+ |
| Node.js | 20.x |

---

## Endpoints da API

### Autenticação (`/auth`)
| Método | Rota | Descrição |
|:---:|---|---|
| POST | `/auth/register` | Registro de novo usuário |
| POST | `/auth/login` | Autenticação e geração de token JWT |
| POST | `/auth/forgot-password` | Solicitação de recuperação de senha |
| POST | `/auth/reset-password` | Redefinição de senha via token |

### Serviços (`/services`)
| Método | Rota | Descrição |
|:---:|---|---|
| GET | `/services` | Lista todos os serviços disponíveis |
| GET | `/services/{id}` | Detalhes de um serviço específico |

### Pedidos (`/orders`)
| Método | Rota | Descrição |
|:---:|---|---|
| POST | `/orders` | Criação de um novo pedido (Contratação) |
| GET | `/orders` | Lista os pedidos do usuário autenticado |

---

##  Estrutura do Banco de Dados

O banco de dados relacional (PostgreSQL) é composto pelas seguintes tabelas:

- `users`: Armazena dados cadastrais e hashes de senha.
- `services`: Catálogo de serviços oferecidos pela plataforma.
- `orders`: Cabeçalho dos pedidos realizados.
- `order_items`: Itens vinculados a cada pedido.
- `password_reset_tokens`: Gerenciamento de segurança para recuperação de conta.

---

## 📁 Estrutura do Projeto

```text
Web/
├── backend/
│   ├── app/
│   │   ├── routers/       # Rotas da API (FastAPI)
│   │   ├── auth.py        # Lógica de segurança/JWT
│   │   ├── db.py          # Conexão com banco de dados
│   │   ├── email.py       # Serviço de envio SMTP
│   │   ├── models.py      # Modelos SQLAlchemy
│   │   ├── schemas.py     # Schemas Pydantic
│   │   └── main.py        # Ponto de entrada da aplicação
│   ├── seed_services.py   # Script para popular o banco
│   └── requirements.txt   # Dependências Python
│
├── frontend/
│   ├── src/
│   │   ├── api/           # Integração com Axios/Fetch
│   │   ├── auth/          # Provedores de autenticação
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/         # Telas da aplicação (React)
│   │   ├── App.jsx        # Configuração de rotas
│   │   └── main.jsx       # Inicialização do React
│   └── package.json       # Dependências Node.js
│
└── README.md

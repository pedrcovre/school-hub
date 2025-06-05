# 🧠 SmartRequest - Sistema de Requisição e Aprovação de Recursos Internos

Este projeto avaliativo tem como objetivo o desenvolvimento de um sistema completo para **gerenciamento de solicitações internas**, voltado a empresas, universidades ou organizações. O sistema permite que colaboradores ou alunos solicitem recursos como materiais, acessos, verbas, férias ou equipamentos, com um fluxo claro de aprovação e acompanhamento.

---

## 🎯 Objetivo

Automatizar o processo de requisição e aprovação de recursos internos, promovendo:

- Rastreabilidade das solicitações
- Níveis de aprovação hierárquica
- Notificações em tempo real
- Transparência e controle para gestores

---

## 👤 Gestão de Usuários

- **Cadastro e login seguro** (`JWT + bcrypt`)
- Perfis com diferentes permissões:
  - 📝 **Solicitante**: Cria e acompanha requisições
  - ✅ **Aprovador**: Analisa, aprova ou devolve solicitações
  - 🛠 **Admin**: Gerencia usuários e visualiza relatórios

---

## 📄 Funcionalidades

### 🗂 Solicitações
- Criação de requisições com:
  - Título, descrição, tipo, prioridade, data limite
  - **Anexo opcional** (PDF ou imagem)
- Acompanhamento completo via histórico

### 🔄 Aprovações
- Aprovadores recebem requisições pendentes
- Podem:
  - ✅ Aprovar
  - ❌ Rejeitar
  - 🔁 Devolver com comentário
- Fluxo de status:

---

## 📊 Dashboard Administrativo

Painel completo com gráficos e indicadores:

- Requisições por status
- Tipos de solicitações
- Tempo médio de resposta
- Filtros e visualizações para análise de dados

---

## 🔔 Notificações

- Envio de **notificações em tempo real** via:
- WebSocket
- ou Polling leve
- Exemplo: `"Sua solicitação de verba foi aprovada!"`

---

## 🧱 Stack Técnica

| Camada         | Tecnologia                          |
|----------------|--------------------------------------|
| **Back-end**   | Node.js + Express + Sequelize/Prisma |
| **Front-end**  | React + Axios + TailwindCSS/Chakra UI|
| **Banco de Dados** | PostgreSQL ou MySQL             |
| **Autenticação**| JWT + bcrypt                        |

---

## ⚙️ Funcionalidades Extras

- 📁 Upload de arquivos com **Multer**
- 🔄 Comunicação em tempo real com **WebSocket**
- 🐳 Ambiente Docker para desenvolvimento local
- ☁️ Possibilidade de deploy via **Heroku**

---

## 🚀 Status do Projeto

✅ Em desenvolvimento  
📌 Projeto com fins **avaliativos** e educativos

---

## 🧑‍💻 Autor

- Matheus Kilpp  
- Pedro Covre  
- Bernardo Hamilton

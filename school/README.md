📚 Projeto Avaliativo — Sistema de Requisição e Aprovação de Recursos Internos (SmartRequest)
Este projeto tem como objetivo a criação de um sistema completo para gerenciamento de solicitações internas, aplicável em ambientes como empresas, universidades ou organizações. Ele foi desenvolvido com fins avaliativos, integrando conceitos práticos de desenvolvimento full-stack, autenticação, controle de acesso, banco de dados relacional e comunicação em tempo real.

🎯 Objetivo do Sistema
Facilitar a solicitação e o controle de recursos como:

Materiais

Acessos

Verbas

Férias

Equipamentos

Automatizar o processo de aprovação por níveis hierárquicos, com rastreabilidade e transparência.

👤 Gestão de Usuários
Cadastro e login com autenticação segura (JWT + bcrypt)

Perfis com diferentes níveis de permissão:

Solicitante: cria e acompanha requisições

Aprovador: analisa e aprova/rejeita

Admin: gerencia o sistema e visualiza dados analíticos

📝 Funcionalidades de Solicitação
Criação de requisições com:

Título

Descrição

Tipo

Prioridade

Data limite

Upload de anexos (PDF ou imagem)

Visualização de histórico completo de solicitações

✅ Processo de Aprovação
Aprovadores visualizam requisições pendentes

Ações disponíveis:

Aprovar

Rejeitar

Devolver com comentário para ajustes

Fluxo de status:

Pendente → Em análise → Aprovado / Rejeitado / Devolvido

📊 Painel Administrativo
Dashboard interativo com gráficos e indicadores:

Quantidade de requisições por status

Tipos de solicitações

Tempo médio de resposta

🔔 Notificações
Atualizações em tempo real via:

WebSocket

ou Polling leve

Exemplo de notificação: “Sua solicitação de verba foi aprovada!”

🧱 Tecnologias Utilizadas (Stack)
Back-end: Node.js + Express + Sequelize ou Prisma

Banco de Dados: PostgreSQL ou MySQL

Front-end: React + Axios + TailwindCSS ou Chakra UI

Autenticação: JWT + bcrypt

🛠️ Extras e Integrações
Upload de arquivos com Multer

Comunicação em tempo real com WebSocket

Docker para ambiente local

Deploy possível via Heroku

<div align="center" style="padding: 20px 0" >

# <img src="./FrontEnd/assets/Logo Supla.png" width="240px"> 
</div>

Supla é um projeto Full Stack desenvolvido como parte da avaliação da disciplina de **Desenvolvimento Web II**. Inspirado na plataforma **Sympla**, este sistema web simula um ambiente completo e profissional para gerenciamento e participação em eventos online.

**Por que "Supla"?** Além da sonoridade semelhante a "Sympla", o nome é uma homenagem divertida ao cantor brasileiro **Supla**, trazendo originalidade e estilo ao projeto.

## <img src="./FrontEnd/assets/logo1x1.png" width="25px"> Objetivo

Recriar as funcionalidades principais de uma plataforma de eventos, com foco na experiência do usuário e separação clara entre **usuários comuns** e **administradores**.

## <img src="./FrontEnd/assets/logo1x1.png" width="25px"> Topicos

- [Screenshots Do Projeto](#screenshots-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Executar o Projeto Localmente](#how)
- [Licença](#licença)
- [Contato](#contato)

<h2 id="screenshots-do-projeto">
  <img src="./FrontEnd/assets/logo1x1.png" width="25px"> Screenshots Do Projeto
</h2>

<img src="./FrontEnd/assets/bannerLogo.png" width="100%">

<h2 id="tecnologias-utilizadas">
  <img src="./FrontEnd/assets/logo1x1.png" width="25px"> Tecnologias Utilizadas
</h2>

- **BackEnd**

  [![My Skills](https://skillicons.dev/icons?i=nodejs,express,postgres)](https://skillicons.dev)

- **FrontEnd**

  [![My Skills](https://skillicons.dev/icons?i=react,vite,css)](https://skillicons.dev)

<h2 id="how">
  <img src="./FrontEnd/assets/logo1x1.png" width="25px"> Como Executar o Projeto Localmente
</h2>

**Pré-requisitos**

Antes de começar, você vai precisar ter instalado:

- **Node.js** *(v18 ou superior)*
- **PostgreSQL** *(v13 ou superior)*
- **Git**
- Um editor de código, como o **VSCode**

### 1. Clone o repositório

```bash
git clone https://github.com/Glauedson/Supla-Events.git
cd backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados
Crie um banco de dados chamado `nympla` no PostgreSQL:

```sql
CREATE DATABASE nympla;
```

Crie as tabelas executando os comandos dentro da pasta `DataBase` do projeto

### 4. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:


```ini
POSTGRES_URL="postgresql://<seuUser>:<suasenha>@localhost:5432/nympla"
SECRET_KEY="qualquer_senha"

EMAIL_SERVICE="gmail"
EMAIL_USER="seumail@gmail.com"
EMAIL_PASSWORD="sua senha de app gmail" 
```

`senha de app` É uma senha especial de 16 caracteres que o Google gera para você acessar sua conta a partir de apps que não suportam autenticação em duas etapas diretamente. Ela só pode ser criada se a verificação em duas etapas (2FA) estiver ativada na sua conta do Google.

### 5. Inicie o servidor

```bash
npm run dev
```

A API estará disponível em: `http://localhost:8080`

<h2 id="licença">
  <img src="./FrontEnd/assets/logo1x1.png" width="25px"> Licença
</h2>

Este projeto não possui uma licença definida. Sinta-se livre para utilizar e modificar o código conforme necessário, mas primeiro pergunte ao **Supla** se ele deixa.

<h2 id="contato">
  <img src="./FrontEnd/assets/logo1x1.png" width="25px"> Contato
</h2>

Para dúvidas ou sugestões, entre em contato:
- **Nome**: Glauedson Carlos Rodrigues
- **Email**: glauedson18s@gmail.com
- **Linkedin**: [Glauedson Carlos](https://www.linkedin.com/in/glauedson-carlos-89875b258/)
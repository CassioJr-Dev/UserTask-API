# API UserTask

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Status do Projeto

Conluído mas com possíveis melhorias no futuro

## Instalação

1. Clone o repositório: `git clone https://github.com/CassioJr08/authentication_API_and_to-do-list.git`
2. Instale as dependências: 
```bash
$ npm install
```
3. Configure as variáveis de ambiente, configure o docker file e docker compose se necessário.

4. Neste projeto foi usado o Mailtrap para para testar emails em um ambiente seguro sem enviá-los aos seus destinatários em ambiente somente de testes, mas use o configure o que achar melhor.

## Description

API de planejamento de tarefas do usuário
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Running the app

```bash
# watch mode
$ npm run start:dev
```
## Recursos Principais

- Criação, leitura, atualização e exclusão de tarefas
- Cadastro, autenticação e gerenciamento de usuários

## Tecnologias Utilizadas
- Node.js
- TypeScript
- NestJs
- PostgreSql
- JWT para autenticação
- Docker-Compose
- Nodemailer para envio de e-mail

## Endpoints da API
- `POST /tasks`: Criar tarefa do usuário
- `GET /tasks`: Obter todas as tarefas do usuário
- `GET /tasks/:id`: Obter uma tarefa específica do usuário
- `PATCH /tasks/:id`: Atualizar uma tarefa existente do usuário
- `DELETE /tasks/:id`: Excluir uma tarefa do usuário

- `POST /users`: Registrar um novo usuário e envia um email para usuario com o codigo de verificação
- `GET /users`: Buscar todos usuários do sistema
- `PATCH /users`: Atuazliar dados da conta do usuário
- `DELETE /users`: Deletar conta do usuário
- `POST /users/check-code`: Recebe o código de verificação e cria a conta do usuário
- `GET /users/:id`: Buscar um usuário especifico do sistema

- `POST /login`: Efetua o login do usuário

- `GET /documentation`: Documetação completa da API UserTask


## Stay in touch

- Author - [Cássio da Silva - Email](cassiojr0108@gmail.com)
- Linkedin - [Cássio da Silva](https://www.linkedin.com/in/c%C3%A1ssio-da-silva-254557285?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B9LCis3CTRxOMxGnD5MPdtg%3D%3D)
- GitHub - [CassioJr08](https://github.com/CassioJr08)


## Licença
Este projeto está licenciado sob a [Licença MIT](LICENSE).


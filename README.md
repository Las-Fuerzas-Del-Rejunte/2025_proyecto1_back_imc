## Este proyecto fue realizado por los siguientes integrantes:

| Nombre Completo               | Legajo | Email                          |
|------------------------------|--------|--------------------------------|
| Enria, Elian                 | 13235  | elian.enria1@gmail.com         |
| Falco, Gonzalo               | 14238  | gonzafalco@gmail.com           |
| Goti, Franco Nicolás         | 13936  | gotifranco@gmail.com           |
| Gregorutti, Matías           | 13150  | matiasgrego10@gmail.com        |
| Guridi, Ignacio Javier       | 13506  | nacho_g88@hotmail.com          |
| Host, Efraín                 | NN     | hostefrain@gmail.com           |
| Magnano, Nicolás Mauricio    | 14654  | nicomagnano12@gmail.com        |
| Piermarini, Matías Exequiel | 14242  | matiaspiermarini45@gmail.com   |

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
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
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests and integrations test
$ yarn run test -- --verbose src/module/imc/imc.service.spec.ts
$ yarn run test -- --verbose src/module/imc/imc.controller.spec.ts
```
```bash
# test coverage
$ yarn run test:cov
```

## Deployment

Deployment with Vercel

When you're ready to deploy your NestJS application to Vercel, you can take advantage of its serverless platform to run your API seamlessly in production. Vercel is especially convenient for quickly deploying Node.js apps like NestJS.

First, you need to install the Vercel CLI globally:

```bash
# Install the Vercel CLI globally
$ npm install -g vercel
```
Once installed, you can log in and initialize your project:
```bash
# Login into your Vercel account
$ vercel login
```
```bash
# Deploy the project (creates a preview deployment)
$ vercel
```
After verifying that everything works fine in the preview, you can deploy to 
production with:
```bash
# Deploy directly to production
$vercel --prod
```
## Resources
- For more details about configuration, check out the [Vercel documentation](https://vercel.com/docs/getting-started-with-vercel/projects-deployments).

## API Documentation (Swagger)

To view the API documentation, run the project locally and open http://localhost:3000/swagger once the server is up.


Note: Swagger UI is served from your local NestJS instance and is typically not exposed in Vercel production.

# 📄 Documentación Proyecto IMC – NestJS + Prisma + Supabase

API REST para calcular el Índice de Masa Corporal (IMC) construida con NestJS. Persistencia en Supabase (PostgreSQL) mediante Prisma ORM.

[![Documentacion Notion](https://img.shields.io/badge/Notion-222?&logo=notion&labelColor=000000)](https://www.notion.so/Documentaci-n-Proyecto-IMC-NestJS-Prisma-Supabase-26af37ded5398095bd6af5add928be60?source=copy_link)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

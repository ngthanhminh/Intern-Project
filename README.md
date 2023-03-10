<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
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

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# H?????ng d???n c??i ?????t

## Chu???n b???:

- Docker & Docker-compose
- Git
- node v16 tr??? l??n

### B?????c 1: Clone project

### B?????c 2: Copy file `.env.local` th??nh 1 file m???i t??n l?? `.env`

### B?????c 3: Ch???y c??u l??nh `docker-compose up`

### B?????c 4: M??? tr??nh duy???t, v??o http://localhost:3000/ ????? ki???m tra xem server ???? ho???t ?????ng ch??a

# K???t n???i Database:

S??? d???ng mysql workbench ho???c dbeaver (recommend) ????? k???t n???i ?????n DB.

Th??ng tin k???t n???i:

- Host: localhost
- Port: 3306
- Database: nestjs
- Username: ml-intern
- Password: password

# C??i ?????t node packages:

Khi c??i ?????t nh?? tr??n th?? trong folder c???a project ch??a c?? `node_modules` n??n khi m??? source s??? th???y l???i thi???u package, d??ng c??u l???nh:

```
npm install
```

????? c??i ?????t

# S??? d???ng typeorm CLI:

M???i c??u l???nh s??? ph???i th???c hi???n trong container c???a docker, ch??? kh??ng ???????c th???c hi???n tr???c ti???p, ????? v??o trong container, d??ng c??u l???nh:

```
docker-compose exec web sh
```

Khi mu???n g???i command c???a typeorm dung c??u l??nh:

```
npm run typeorm -- <c??u l???nh c???n th???c hi???n>
```

V?? d??? nh??: `npm run typeorm -- migration:run`

> Trong m???t s??? tr?????ng h???p th?? s??? kh??ng c???n `--` nh??ng th??i c??? cho v??o cho ch???c

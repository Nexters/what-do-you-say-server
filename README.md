# What do you say - Server

:memo: **인사말을 대필해주는 서비스**

<br>

## Main 모듈

- awilix
- express
- awilix-express
- typeorm

<br>

## Git Branch 전략

<br>

## 로컬에서 테스트 코드 실행 방법

```zsh
$ npm run test # or npm test
```

<br>

## 로컬에서 서버 실행 방법

1. ts-node를 사용해서 실행하는 경우

```zsh
$ npm install

$ cp .env.sample ./.env

# mysql container 실행
$ docker-compose -f docker-compose.yml up -d

# lint
$ npm run lint

# type-check
$ npm run type-check

# local에서 Server 실행
$ npm start
```

2. babel을 사용해서 빌드 후, 실행하는 경우

```zsh
$ npm install

$ cp .env.sample ./.env

# mysql container 실행
$ docker-compose -f docker-compose.yml up -d

# babel을 사용하여 js파일로 변환
$ npm run build

# dist에 있는 js파일 실행
$ npm run prod
```

<br>

## Project 디렉토리 구조

<br>

## CI / CD

- github actions를 활용해서 지속적 통합 및 배포할 예정

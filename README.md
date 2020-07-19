# What do you say - Server

#### :question: 뭐라하지? - 인사말을 대신 작성해주는 서비스

<br>

## :hammerandwrench: Main Modules

- `express : ^4.17.1`
- `awilix : ^4.2.6`
- `awilix-express : ^3.0.0`
- `mysql2 : ^2.1.0`
- `typeorm : ^0.2.25`
- `ts-jest : ^26.1.2`

<br>

## :octocat: Git Branch Strategy

1. 개발시 clone을 받아서 사용한. (fork :x:)
  
  - `git clone -b dev --single-branch https://github.com/Nexters/what-do-you-say-server.git`

2. 3개의 브랜치로 구성되어 있다. (`feature/issue-이슈번호` -> `dev` -> `master` 순으로 작업해야 함)

  - `master`
  - `dev`
  - `feature/issue-이슈 번호`
    
4. `feature/issue-이슈 번호` 브랜치가 `dev` 브랜치에 머지 되면, 반드시 삭제해야 한다.

5. Github Action에서 CI/CD 를 통과해야 Merge 할 수 있다.

<br>

## :gear: How to run test code locally

```zsh
# lint 체크 하고, type-check 후, 테스트 코드 실행하는 스크립트
$ npm run test # or npm test
```

<br>

## :gear: How to run the server locally

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

## :open_file_folder: Project Structure

```markdown
src
├── common
│   ├── config
│   ├── types
│   └── utils
├── controller
├── entity
├── infrastructure
│   ├── express
│   └── typeorm
├── repository
└── service
```

<br>

## :airplane: CI / CD

- github actions를 활용해서 지속적 통합 및 배포
- `feature/issue-xx` 브랜치에서 `dev`로 Pull Request를 보내면, CI가 동작되고 Merge가 되면, CI/CD를 통해 운영 리소스에 배포된다.
- `dev`에서 `master`로 Pull Request를 보내면, CI가 동작되고 Merge가 되면, CI/CD를 통해 운영 리소스에 배포된다.
- ``

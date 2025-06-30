# URL Shortener – Microsserviços com NestJS e Docker

Este projeto é uma aplicação de encurtamento de URLs construída com arquitetura de multiplos serviços utilizando o framework NestJS. Os serviços são organizados em três domínios principais:

- **Auth**: Autenticação e geração de tokens
- **Users**: Gerenciamento de usuários
- **URL Shortener**: Criação e redirecionamento de URLs encurtadas

A aplicação pode ser executada localmente com Node.js e Yarn, ou em ambiente isolado com Docker e Docker Compose.

---

## Clonando o repositório

Antes de qualquer coisa, é necessário ter o Git instalado para clonar o projeto.  
Você pode instalar o Git seguindo as instruções oficiais:

- [Instalar Git no Windows](https://git-scm.com/download/win)
- [Instalar Git no macOS](https://git-scm.com/download/mac)
- [Instalar Git no Linux](https://git-scm.com/download/linux)

Clone o repositório com:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

## 1. Executando localmente com Node.js, Yarn e NestJS

Este projeto pode ser executado localmente utilizando Node.js, Yarn e o NestJS CLI. Essa abordagem é ideal para desenvolvimento ativo, testes e depuração. **Não é um projeto preparado para produção, então use com cautela.**

### Requisitos

Para rodar o projeto localmente, você precisará ter as seguintes ferramentas instaladas:

- Node.js versão **>= 22.16.0**
- Yarn
- NestJS CLI
- Git

Recomenda-se o uso do NVM (Node Version Manager) para gerenciar múltiplas versões do Node.js no seu sistema.

### Instalação das ferramentas

Você pode instalar as ferramentas necessárias utilizando os links abaixo:

- [Instalar Node.js](https://nodejs.org/en/download)
- [Instalar Yarn](https://chore-update--yarnpkg.netlify.app/pt-BR/docs/install)
- [Instalar NestJS CLI](https://docs.nestjs.com/cli/overview)
- [Instalar NVM (Node Version Manager)](https://github.com/nvm-sh/nvm)

Com o NVM instalado, você pode instalar a versão correta do Node.js com os comandos:

```bash
nvm install lts
nvm use lts
```

Após clonar o repositório, instale todas as dependências e devDependencies com:

```bash
yarn install
```

### Configurando variáveis de ambiente

Antes de iniciar os serviços, é necessário configurar o arquivo `.env` na raiz do projeto. Um exemplo de configuração mínima é:

```conf
APP_NAME=
NODE_ENV=development

JWT_SECRET=salt
EXPIRES_IN=5m
BCRYPT_SALT=10

USERS_API=http://localhost:3001/users
URLS_API=http://localhost:3002/urls
AUTH_API=http://localhost:3003/auth

SQLITE_SYNCHRONIZE=true
```

Esse arquivo é essencial para que os serviços funcionem corretamente somente em ambiente **local**. Caso deseje, no repositório há um arquivo chamado `.env.local.example`. Este arquivo já vem com todas as configurações para execução rápida em ambiente local. Só é necessário renomear para `.env` que estará pronto.

### Executando os serviços

Para iniciar todos os microsserviços simultaneamente em modo de desenvolvimento, utilize:

```bash
yarn run start:dev
```

Esse comando executa os três serviços (users, auth e url_shortener) em paralelo com hot reload e [concurrently](https://github.com/open-cli-tools/concurrently).

Caso deseje iniciar apenas um serviço específico, utilize um dos comandos abaixo:

- App de Usuários

```bash
yarn start:dev:users
```

- App de Autenticação

```bash
yarn start:dev:auth
```

- App de Encurtamento de URLs

```bash
yarn start:dev:urls
```

Após esses passos, seu ambiente de desenvolvimento estará pronto para uso. Você poderá modificar o código, testar funcionalidades e desenvolver novas features com suporte completo a hot reload e ferramentas de depuração.

## 2. Executando com Docker e Docker Compose

Este projeto também pode ser executado em ambiente isolado utilizando Docker e Docker Compose. Essa abordagem é ideal para rodar a aplicação de forma padronizada, sem depender do ambiente local de desenvolvimento.

### Requisitos

Para utilizar essa abordagem, é necessário ter o Docker e o Docker Compose instalados no seu sistema. Abaixo estão os links oficiais para instalação em diferentes sistemas operacionais:

- **Windows**:
    - [Instalar Docker Desktop](https://docs.docker.com/desktop/install/windows-install/)

- **macOS**:
    - [Instalar Docker Desktop](https://docs.docker.com/desktop/install/mac-install/)

- **Ubuntu/Linux**:
    - [Instalar Docker Engine no Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
    - [Instalar Docker Compose no Linux](https://docs.docker.com/compose/install/linux/)

### Verificando a instalação

Após a instalação, abra o terminal e execute o seguinte comando para verificar se o Docker está instalado corretamente:

```bash
docker -v
docker compose --help
```

Se os comandos retornar a versão do Docker e a lista de ajuda do Docker Compose, a instalação foi concluída com sucesso.

### Executando os serviços com Docker Compose

Com o Docker instalado, você pode levantar todos os serviços da aplicação com o seguinte comando:

```bash
docker compose up -d
```

Esse comando faz o seguinte:

- Lê o arquivo `docker-compose.yaml` na raiz do projeto

- Constrói as imagens Docker de cada serviço (caso ainda não existam)

- Cria os containers correspondentes

- Inicia os serviços em segundo plano (modo _detached_)

Aguarde alguns segundos até que o processo de build e inicialização seja concluído.

### Verificando os serviços em execução

Para verificar se os serviços foram iniciados
corretamente, execute:

```bash
docker compose ps
```

Esse comando lista todos os containers em execução, suas portas expostas e o status atual de cada serviço.

## 3. Testando os Endpoints da Aplicação

Após levantar os serviços, você pode testar os endpoints expostos por cada um dos microsserviços: usuários, autenticação e encurtamento de URLs.

Algumas rotas exigem autenticação via token JWT. Para essas rotas, é necessário primeiro realizar o login e obter um token válido, que deve ser incluído no cabeçalho `Authorization` das requisições subsequentes.

### Exemplo de chamada para encurtar uma URL

A rota `/urls/shorten` permite criar uma URL encurtada a partir de uma URL completa. Abaixo estão exemplos de como fazer essa requisição usando `curl` e `wget`.

#### Usando `curl`

```bash
curl --request POST \
  --url http://localhost:3002/urls/shorten \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/11.2.0' \
  --data '{
    "fullUrl": "http://youtube.com"
}'
```

Usando `wget`

```bash
wget --quiet \
  --method POST \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/11.2.0' \
  --body-data '{\n  "fullUrl": "http://youtube.com"\n}' \
  --output-document \
  - http://localhost:3002/urls/shorten
```

### Endpoints protegidos com JWT

Alguns endpoints exigem autenticação. Para acessá-los:

1. Faça login através do serviço de autenticação (/auth/login) com suas credenciais.

2. Copie o token JWT retornado.

3. Inclua o token no cabeçalho das requisições protegidas:

```http
Authorization: Bearer <seu_token_aqui>
```

Certifique-se de substituir `<seu_token_aqui>` pelo token real obtido na resposta do login.

Com isso, você poderá testar todos os endpoints da aplicação, incluindo aqueles que exigem autenticação.

## 4. Fazendo chamadas através do Docker com NGINX como API Gateway

Após levantar os serviços com Docker utilizando o comando `docker compose up -d`, todas as requisições externas devem ser feitas através do NGINX, que atua como um API Gateway.

O NGINX é responsável por:

- Encaminhar as requisições para os microsserviços corretos
- Controlar o acesso às rotas públicas e privadas
- Aplicar limites de requisições por IP (rate limiting)
- Bloquear o acesso direto às APIs internas, permitindo apenas chamadas através do gateway

### Rotas disponíveis via NGINX

No modo Docker, apenas quatro rotas estão expostas publicamente através do NGINX. Todas elas estão configuradas no arquivo `nginx/default.conf` e são acessíveis pela porta definida no container (por padrão, porta 80).

As rotas disponíveis são:

- `POST /url/shorten`: cria uma URL encurtada
- `GET /r/(código)`: redireciona uma URL encurtada
- `POST /signup`: cria um novo usuário
- `POST /login`: autentica um usuário e retorna um token JWT

### Acessando as rotas

Com os serviços em execução, você pode fazer chamadas para essas rotas utilizando `curl`, `wget`, Postman ou qualquer outra ferramenta HTTP. Todas as chamadas devem ser feitas para `http://localhost` (ou o IP do host, se estiver em outro ambiente), utilizando os caminhos definidos acima.

Exemplo de chamada para encurtar uma URL:

```bash
curl --request POST \
  --url http://localhost/url/shorten \
  --header 'Content-Type: application/json' \
  --data '{
    "fullUrl": "http://youtube.com"
}'
```

## 5. Possíveis melhorias para o projeto

Este projeto pode ser expandido e aprimorado com diversas melhorias técnicas e operacionais. Abaixo estão algumas sugestões que podem ser implementadas para torná-lo mais robusto, escalável e observável.

### Implementar GitHub Actions

A integração de pipelines de CI/CD com GitHub Actions permitiria automatizar tarefas como testes, linting, build e deploy. Isso garantiria maior consistência no processo de desenvolvimento e ajudaria a detectar falhas antes da publicação de código.

### Métricas e observabilidade

Adicionar ferramentas de observabilidade é fundamental para entender o comportamento da aplicação em produção. Isso inclui:

- Logs estruturados com ferramentas como Winston ou Pino
- Métricas de desempenho com Prometheus e Grafana
- Rastreamento distribuído com OpenTelemetry ou Jaeger

Esses recursos ajudam a identificar gargalos, falhas e padrões de uso.

### Cache em memória para URLs mais acessadas

Uma melhoria de desempenho seria implementar um mecanismo de cache em memória (como Redis ou até mesmo um cache local com LRU) para armazenar as URLs mais clicadas. Isso reduziria o tempo de resposta para requisições frequentes e diminuiria a carga sobre o banco de dados.

### Substituir o banco de dados por uma tecnologia mais robusta

Atualmente, o projeto utiliza SQLite, que é adequado para desenvolvimento e testes locais. Para ambientes de produção, seria recomendável adotar um banco de dados mais robusto e escalável, como:

- MySQL
- MariaDB
- PostgreSQL
- MongoDB (caso deseje um modelo NoSQL)

Essas tecnologias oferecem maior desempenho, suporte a concorrência e recursos avançados de replicação e backup.

### Implementar um orquestrador como Kubernetes

Para ambientes de produção com múltiplas instâncias e necessidade de escalabilidade automática, a adoção de um orquestrador como o Kubernetes permitiria:

- Escalonamento automático de serviços com base em carga
- Balanceamento de carga entre réplicas
- Monitoramento e reinício automático de containers com falha
- Deploys controlados com estratégias como rolling updates

Essa abordagem tornaria o projeto mais resiliente e preparado para ambientes distribuídos em larga escala.

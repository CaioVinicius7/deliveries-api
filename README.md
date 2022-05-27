<h2 align="center"> 
	DELIVERIES API 
</h2>

## O que é a deliveries API?

Deliveries API é um sistema de entregas que busca facilitar o contato entre um cliente e um entregador quando existe a necessídade do cliente precisar
enviar algo até um local desejado.  

## Como funciona?

O cliente se cadastra e faz login no sistema, então ele pode cadastrar um entrega desejada, assim essa entrega fica em uma lista de entregas disponíveis
que os entregadores tem acesso, então um entregador pode aceitar a entrega e realizá-la.

## Quais são as funcionalidades desse sistema?

O sistema conta com as seguintes funcionalidades:
- Autenticação de cliente e entregador
- Cadastro de cliente e entregador
- Cadastro de entregas
- Listagem de entregas disponíveis
- Listagem de entregas de cliente e entregadores

Caso queira ver as funcionalidades por completo e de modo técnico acesse a documentação do projeto ([clique aqui](#docs) para ver como acessá-la).

## Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina: 
[Node](https://nodejs.org/en/download/), [Git](https://git-scm.com/downloads), [Docker](https://www.docker.com/get-started/) e [Insominia](https://insomnia.rest/download) ou [Postman](https://www.postman.com/downloads/).

## 🎲 Rodando a API

```bash
# Clone este repositório
$ git clone https://github.com/CaioVinicius7/deliveries-api.git

# Acesse a pasta do projeto no terminal/cmd
$ cd deliveries-api

# Acesse o projeto pelo vs code 
$ code .

# crie os arquivos .env seguindo o arqivo de exemplo

# Faça o build dos containers
$ docker-compose build

# Execute os containers
$ docker-compose up -d

# Rode as migrations
$ yarn prisma migrate deploy

# Rode o servidor
$ yarn dev


# O servidor ficara ativo na porta:3333 - acesse <http://localhost:3333>
```

<div id="docs"> </div>

## 📜 Acessando a documentação
Para ter acesso a documentação utilize a rota /api-docs após a inicialização da aplicação, como no exemplo abaixo ou [clique aqui](http://localhost:3333/api-docs/).
```bash
http://localhost:3333/api-docs/
```

## Autor
---

<a href="https://www.facebook.com/caio.pereira.94695">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/62827681?s=400&u=f0b18831e6690a901f956d637933b9ee2dca3104&v=4" width="100px;" alt=""/>
 <br>
 <h2><b>Caio Vinícius</b></h2></a>

<h4> Feito com muito carinho e dedicação :) </h4>

<br>

[![Linkedin Badge](https://img.shields.io/badge/-caio%20pereira-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/caio-pereira-87a761200) 
[![Gmail Badge](https://img.shields.io/badge/-caio1525pereira@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:caio1525pereira@gmail.com)](mailto:caio1525pereira@gmail.com)
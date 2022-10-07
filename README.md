# API processadora de XLSX

## Highlights:
- NodeJs
- Rabbitmq
- MongoDB
- Migrations (knex.js)
- Joi
- Tests(e2e)
- Docker

## Desafio
- Receberá uma planilha de alunos (segue em anexo) que deve ser
processada em background.
- Ter um endpoint que informe se a planilha foi processada com sucesso ou
não.
- Seja possível visualizar, editar e apagar os alunos (só é possível criar
novos alunos via planilha).

### Endpoints

#### /alunos
Path | Method | Description
---|---|---
/alunos | GET | Recuperar todos os alunos
/alunos/:id | GET | Recuperar um aluno pelo seu ID
/alunos/:id | PUT | Alterar os dados de um aluno
/alunos/:id | DELETE | Deletar um aluno

#### /file
Path | Method | Description
---|---|---
/file | POST | Trigger para inciar novo processamento
/file/process | GET | Recupera status do último processo da planilha
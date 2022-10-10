# API processadora de XLSX

## Highlights:
- NodeJs
- Rabbitmq
- MongoDB
- Tests(e2e)
- Docker
- Jest

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

#### /arquivos
Path | Method | Description
---|---|---
/arquivos/planilhas/alunos | POST | Envia um arquivo para o processamento
/planilhas/alunos/:id/status | GET | Recupera status de processamento de um planilha pelo seu id

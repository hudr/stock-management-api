# stock-management-api
## Comandos importantes
- Criar banco: yarn sequelize db:create
- Criar migration: yarn sequelize migration:create --name=create-users
- Rodar migration: yarn sequelize db:migrate
- Criar/Resetar tudo do sequelize: yarn sequelize:reset (precisa estar desconectado dos clients)

## Rodando os endpoints local
O projeto tem um arquivo do insomnia na pasta raiz, basta fazer o import e será possível debugar as requests na sua máquina
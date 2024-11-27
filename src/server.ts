import express, { urlencoded } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { mainRouter } from './routes/main'

// Arquivo responsável somente para as configurações de servidor.

const server = express()

server.use(helmet()) // Middleware de segurança que ajuda a proteger a aplicação
server.use(cors()) // Permite acesso da API de outra origens
server.use(urlencoded({ extended: true })) // Middleware do Express que faz o parsing de dados enviados em formulários no formato application/x-www-form-urlencoded. Com { extended: true }, ele usa a biblioteca qs, permitindo que você processe objetos aninhados e arrays.
server.use(express.json()) // Transforme em JSON as informações provindas do req.body

server.use(mainRouter) // Utiliza todas as rotas cinseridas no arquivo

server.listen(process.env.PORT || 3002, () => {
   console.log(`Server running in port ${process.env.PORT}`)
})
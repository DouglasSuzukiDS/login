import { RequestHandler } from "express"
import { createUser, findUser } from "../services/user"
import { createJWT } from "../utils/jwt"
import { compare } from 'bcrypt-ts'
import { signinSchema } from "../schemas/signinSchema"
import { signupSchema } from "../schemas/signupSchema"
import { SigninData } from "../types/SigninData"

export const signup: RequestHandler = async (req, res) => {
   const safeData = signupSchema.safeParse(req.body)
   // Verifica o dados recebidos
   if (!safeData.success) {
      res.status(400).json({ error: safeData.error.flatten().fieldErrors })
      return
   }

   try {
      // Tenta criar o user
      const user = await createUser(safeData.data)

      // Verifica se o user foi criado
      if (!user) res.status(400).json({ error: 'Não foi possível criar o usuário, tente mais tarde' })

      // Retorna os dados do usuário e o token de acesso
      res.status(201).json({ user })
   } catch (err) {
      console.error(err)
      res.status(404).json({ error: 'Login indisponível' })
      return
   }
}

export const signin: RequestHandler = async (req, res) => {
   const safeData = signinSchema.safeParse(req.body)

   // Faz a verificação dos dados do usuário
   if (!safeData.success) {
      res.status(400).json({ error: safeData.error.flatten().fieldErrors })
      return
   }

   // Verifica se o usuário existe
   const user = await findUser(safeData.data.login)

   if (!user) {
      res.status(404).json({ error: 'Login/Senha inválida' })
      return
   }

   // Faz a comparação da senha
   const verifyPassword = await compare(safeData.data.password, user.password)

   if (verifyPassword) {
      const userInfos: SigninData = {
         name: user.name,
         login: user.login,
         isAdmin: user.isAdmin
      }

      // Cria o JWT
      const token = createJWT(userInfos);

      // Retorna os dados do usuário e o token
      res.status(200).json({ token, user })
   } else {
      res.status(404).json({ error: 'Login/Senha inválida' })
   }

}

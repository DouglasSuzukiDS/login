import { RequestHandler } from "express"
import { createUser, deleteUser, findUser, findUserById, updateUser, userList } from "../services/user"
import { userSchema } from "../schemas/userSchema"
import { signupSchema } from "../schemas/signupSchema"

export const users: RequestHandler = async (req, res) => {
   const users = await userList()

   res.status(200).json({ users })
}

export const findUserLogin: RequestHandler = async (req, res) => {
   const { login } = req.body

   const user = await findUser(login)

   // if (!user) res.status(404).send({ message: 'Erro ao localizar usuário' })

   res.status(200).json({ user })
}

export const userById: RequestHandler = async (req, res) => {
   const { id } = req.params

   const user = await findUserById(parseInt(id))

   res.status(200).json({ user })
}

export const newUser: RequestHandler = async (req, res) => {
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

export const updateUserData: RequestHandler = async (req, res) => {
   const { id } = req.params

   const safeData = userSchema.safeParse(req.body)
   // Verifica o dados recebidos
   if (!safeData.success) {
      res.status(400).json({ error: safeData.error.flatten().fieldErrors })
      return
   }

   try {
      // Tenta fazer a edição do user
      const user = await updateUser(parseInt(id), safeData.data)

      // Verifica se o user foi editado
      if (!user) res.status(400).json({ error: 'Não foi possível fazer a edição do usuário, tente mais tarde.' })

      // Retorna os dados do usuário e o token de acesso
      res.status(200).json({ user })
   } catch (err) {
      console.error(err)
      res.status(404).json({ error: 'Não foi possível fazer a edição do usuário, tente mais tarde.' })
      return
   }
}

export const removeUser: RequestHandler = async (req, res) => {
   const { id } = req.params

   try {
      const user = await deleteUser(parseInt(id))

      res.status(200).json({ user })
   } catch (err) {
      console.error(err)
      res.status(404).json({ error: 'Usuário não encontrado' })
   }
}
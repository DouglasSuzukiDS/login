import { Prisma } from "@prisma/client"
import { prisma } from "../utils/prisma"
import { hash } from "bcrypt-ts"


export const userList = async () => {
   const users = await prisma.user.findMany()

   return users
}

export const findUser = async (login: string) => {
   const user = await prisma.user.findFirst({
      where: { login },
   })

   return user
}

export const findUserById = async (id: number) => {
   const user = await prisma.user.findFirst({
      where: { id },
   })

   return user
}

export const createUser = async (data: Prisma.UserCreateInput) => {
   // Verifica se o login já existe
   const userExists = await prisma.user.findFirst({ where: { login: data.login } })

   if (userExists) throw new Error("Login indisponível")

   // Cria o hash da senha
   const hashedPassword = await hash(data.password, 10)

   // Cria o usuário
   const newUser = await prisma.user.create({
      data: {
         ...data,
         password: hashedPassword,
      }
   })

   return newUser
}

export const updateUser = async (id: number, data: Prisma.UserUpdateInput) => {
   // Verifica se existe um usuario com o login
   const userExists = await prisma.user.findFirst({ where: { id } })

   if (!userExists) throw new Error("Usuário não encontrado")

   const updatedUser = await prisma.user.update({
      where: { id },
      data
   })

   return updatedUser
}

export const deleteUser = async (id: number) => {
   const userExists = await prisma.user.findFirst({ where: { id } })

   if (!userExists) throw new Error("Usuário não encontrado")

   await prisma.user.delete({ where: { id } })

   return "Usuário excluído com sucesso"
}
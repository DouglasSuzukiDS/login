import { Prisma } from "@prisma/client";

export const usersData: Prisma.UserCreateInput[] = [
   {
      name: 'root',
      login: 'root',
      password: 'root',
      isAdmin: true
   },

   {
      name: 'Nick',
      login: 'nick',
      password: 'nick',
      isAdmin: true
   }
]
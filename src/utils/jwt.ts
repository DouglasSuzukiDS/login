import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { findUser } from '../services/user'
import { SigninData } from '../types/SigninData'

export const createJWT = (data: SigninData) => {
   return jwt.sign({ data }, process.env.JWT_SECRET as string)
}

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
   const authHeader = req.headers['authorization']
   if (!authHeader) {
      res.status(401).json({ error: 'Acesso negado' })
      return
   }

   const token = authHeader.split(' ')[1]

   jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      async (error, decoded: any) => {
         if (error) return res.status(401).json({ error: 'Acesso negado' })

         const user = await findUser(decoded.login)

         if (!user) return res.status(401).json({ error: 'Acesso negado' })

         next()
      }
   )
}
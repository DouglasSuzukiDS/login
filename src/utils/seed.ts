import { Prisma } from '@prisma/client'
import { usersData } from '../data/usersData'
// import { productsData } from '../data/productsData'
import { createUser, findUser } from '../services/user'
import { hash } from 'bcrypt-ts'
import { signupSchema } from '../schemas/signupSchema'
import { RequestHandler } from 'express'
import { createJWT } from './jwt'
import { newUser } from '../controllers/user'
// import { createProduct } from '../services/product'
// import { createSale } from '../services/sale'
// import { salesData } from '../data/salesData'

// Criação de dados SEED
export const createUsers = async (data: Prisma.UserCreateInput[]) => {
   data.forEach(createUser)
   console.log(data)
}

export const createProducts = async (data: Prisma.ProductCreateInput[]) => {
   data.map(product => {
      //createProduct(product)
   })
}

export const creareSales = async (data: Prisma.SalesCreateInput[]) => {
   data.map(sale => {
      //createSale(sale)
   })
}

const userList: Prisma.UserCreateInput[] = [
   {
      name: "root",
      password: "root",
      login: "root",
      isAdmin: true
   },

   {
      name: "tonhao",
      password: "tonhao",
      login: "tonhao",
      isAdmin: true
   },
]

export const createFakeData = async () => {
   // Criação dos Usuarios base
   // createUsers(usersData)
   // Criação dos Produtos base
   // createProducts(productsData)

   //creareSales(salesData)

   userList.forEach(createUser)

   console.log(`Seeded`)
}

createFakeData()


/*// services.ts
type User = {
   name: string;
   password: string;
   login: string;
   isAdmin: boolean
};

interface UserRepository {
   userWithloginExists(login: string): Promise<boolean>;
   save(user: Partial<User>): Promise<User>;
}

type EncryptService = (text: string) => Promise<string>;


type Credentials = {
   login: string;
   password: string;
};

type SignUpService = (credentials: Credentials) => Promise<User>;

// Ignorar os declare const, é só para fingir que essas variáveis existem
// e que elas são desses types
declare const users: UserRepository;
declare const encrypt: EncryptService;

const signUp: SignUpService = async ({ login, password }) => {
   const userExists = await users.userWithloginExists(login);

   if (userExists) {
      throw new Error("login already exists");
   }

   const hash = await encrypt(password);
   const user = await users.save({ login, password: hash });

   return user;
};

// controller.ts
const signupController: RequestHandler = async (req, res) => {
   // validation logic...
   const safeData = signupSchema.safeParse(req.body)
   // Verifica o dados recebidos
   if (!safeData.success) {
      res.status(400).json({ error: safeData.error.flatten().fieldErrors })
      return
   }


   const user = await signUp(safeData.data);
   const token = await createJWT(user);

   res.status(201).json({ user, token });
};

// seed.ts
const users: Credentials[] = [];
users.forEach(signUp);*/
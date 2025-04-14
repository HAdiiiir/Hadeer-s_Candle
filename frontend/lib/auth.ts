import { prisma } from './prisma'
import { hash, compare } from 'bcryptjs'

export async function createUser(email: string, password: string) {
  const hashedPassword = await hash(password, 12)
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword
    },
    select: {
      id: true,
      email: true
    }
  })
}

export async function verifyLogin(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) return null

  const isValid = await compare(password, user.password)
  if (!isValid) return null

  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true
    }
  })
}
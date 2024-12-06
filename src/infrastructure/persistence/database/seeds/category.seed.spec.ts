import { CategorySeeds } from '@infrastructure/persistence/database/seeds'
import { PrismaClient } from '@prisma/client'

describe('[Persistence] Category Seeds', () => {
  let prisma: PrismaClient

  beforeEach(() => {
    prisma = new PrismaClient()
  })

  afterEach(async () => {
    await prisma.$disconnect()
  })

  it('should seed categories correctly', async () => {
    const createManySpy = jest
      .spyOn(prisma.category, 'createMany')
      .mockResolvedValue({ count: 3 })
    const seedFunction = CategorySeeds(prisma)
    await seedFunction()

    expect(createManySpy).toHaveBeenCalledWith({
      data: [
        {
          name: 'Lanche',
          description: 'Perfeito para matar a fome em qualquer momento do dia'
        },
        {
          name: 'Sobremesa',
          description:
            'Deliciosas sobremesas para fechar ou matar a vontade com chave de ouro'
        },
        {
          name: 'Acompanhamento',
          description: 'Aquilo que não pode faltar pedido, o parceiro perfeito'
        }
      ]
    })
  })
})

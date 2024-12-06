import { PrismaClient } from '@prisma/client'

export const CategorySeeds = (orm: PrismaClient) => async () => {
  await orm.category.createMany({
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
}

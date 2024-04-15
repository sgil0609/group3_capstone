const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: 'hashedpassword', 
    },
  });

  const category = await prisma.category.create({
    data: {
      name: 'Electronics',
    },
  });

  const product = await prisma.product.create({
    data: {
      name: 'Laptop',
      description: 'A high-performance laptop suitable for gaming and work.',
      price: 999.99,
      stock: 10,
      categories: {
        connect: { id: category.id },
      },
    },
  });

  console.log({ user, category, product });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

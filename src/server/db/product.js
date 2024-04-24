const prisma = require("./client");

async function getProductId() {
  const product = await prisma.product.findFirst();
  return product.id;
}

async function createProduct(name, description) {
  const product = await prisma.product.create({
    data: {
      name: name,
      description: description,
    },
  });
  return product;
}

async function deleteProduct(id) {
  const product = await prisma.product.delete({
    where: {
      id: id,
    },
  });
  return product;
}

module.exports = {
  getProductId,
  createProduct,
  deleteProduct,
};

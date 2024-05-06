const { PrismaClient } = require('@prisma/client');
const { link } = require('../api/product');
const prisma = new PrismaClient();

async function main() {

    const user1 = await prisma.user.create({
        data: {
            email: "jane.doe@example.com",
            password: "securepassword",
            first_name: "Jane",
            last_name: "Doe",
            user_addresses: {
                create: [{
                    address_line1: "123 Main St",
                    address_line2: "Apt 4",
                    city: "Metropolis",
                    postal_code: 12345,
                    country: "USA",
                    telephone: "123-456-7890"
                }]
            },
            user_payments: {
                create: [{
                    payment_type: "Credit Card",
                    provider: "Visa",
                    account_id: "1234567890123456"
                }]
            }
        }
    });

    // Create the second user with an order in progress
    const user2 = await prisma.user.create({
        data: {
            email: "john.smith@example.com",
            password: "anotherpassword",
            first_name: "John",
            last_name: "Smith",
            user_addresses: {
                create: [{
                    address_line1: "456 Elm St",
                    city: "Smallville",
                    postal_code: 67890,
                    country: "USA",
                    telephone: "987-654-3210"
                }]
            },
            user_payments: {
                create: [{
                    payment_type: "PayPal",
                    provider: "PayPal",
                    account_id: "9876543210123456"
                }]
            }
        }
    });

    const womenTops = await prisma.product_Category.create({
        data: {
            name: "Women Tops",
            description: "Womens Top clothing"
        }
    });

    const womenPants = await prisma.product_Category.create({
        data: {
            name: "Women Pants",
            description: "Women Pants"
        }
    });

    const womenShoes = await prisma.product_Category.create({
        data: {
            name: "Women Shoes",
            description: "Women Shoes"
        }
    });

    const menShirts = await prisma.product_Category.create({
        data: {
            name: "Men T-Shirts",
            description: "Men T-shirts"
        }
    });

    const menPants = await prisma.product_Category.create({
        data: {
            name: "Men Pants",
            description: "Men Pants"
        }
    });

    const menShoes = await prisma.product_Category.create({
        data: {
            name: "Men Shoes",
            description: "Men Shoes"
        }
    });


    const womenTopsProduct = await prisma.product.create({
        data: {
            name: "Dinosaur Tank Top",
            description: "Comfy Tank Top with dinosaur",
            stock: 10,
            price: 29.99,
            productCategoryId: womenTops.id,
            imageUrl:"https://media.kohlsimg.com/is/image/kohls/3591469?wid=805&hei=805&op_sharpen=1"
        }
    });

    const womenPantsProduct = await prisma.product.create({
        data: {
            name: "Bell Bottom Jeans",
            description: "70 style jeans",
            stock: 10,
            price: 29.99,
            productCategoryId: womenPants.id,
            imageUrl:"https://m.media-amazon.com/images/I/71jIWd7As8L._AC_SY879_.jpg" 
        }
    });

    const womenShoesProduct = await prisma.product.create({
        data: {
            name: "Ugg Boots",
            description: "Comfy UGG boots",
            stock: 10,
            price: 29.99,
            productCategoryId: womenShoes.id,
            imageUrl:"https://m.media-amazon.com/images/I/71IlZQJtV1L._AC_SY695_.jpg" 
        }
    });

    const menShirtProduct = await prisma.product.create({
        data: {
            name: "New York Yankees Retro",
            description: "1970 themed Yankee tshirt",
            stock: 10,
            price: 29.99,
            productCategoryId: menShirts.id,
            imageUrl:"https://www.pacsun.com/dw/image/v2/AAJE_PRD/on/demandware.static/-/Sites-pacsun_storefront_catalog/default/dw49de0f74/product_images/0097600540020NEW_00_010.jpg?sw=2000" 
        }
    });

    const menPantProduct = await prisma.product.create({
        data: {
            name: "Levi 501",
            description: "Comfy Levi Jeans",
            stock: 10,
            price: 29.99,
            productCategoryId: menPants.id,
            imageUrl:"https://m.media-amazon.com/images/I/8101SWb21VL._AC_SY879_.jpg" 
        }
    });

    const menShoeProduct = await prisma.product.create({
        data: {
            name: "Air Force Ones",
            description: "Air Force Ones",
            stock: 10,
            price: 29.99,
            productCategoryId: menShoes.id,
            imageUrl:"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/350e7f3a-979a-402b-9396-a8a998dd76ab/air-force-1-07-mens-shoes-jBrhbr.png" 
        }
    });

    // Create a full transaction order for user1
    const fullOrder = await prisma.order.create({
        data: {
            total: menShoeProduct.price,
            status: "Completed",
            userId: user1.id,
            order_items: {
                create: {
                    productId: menShoeProduct.id,
                    unit_price: menShoeProduct.price,
                    quantity: 1
                }
            },
            payment_details: {
                create: {
                    payment_type: "Credit Card",
                    provider: "Visa",
                    status: "Completed",
                    transactionId: "txn_complete_12345"
                }
            }
        }
    });

    // Create an order in progress for user2
    const inProgressOrder = await prisma.order.create({
        data: {
            total: menPantProduct.price * 2,  // Example of a different order size
            status: "In Progress",
            userId: user2.id,
            order_items: {
                create: {
                    productId: menPantProduct.id,
                    unit_price: menPantProduct.price,
                    quantity: 2  // Assuming a different quantity for demonstration
                }
            },
            payment_details: {
                create: {
                    payment_type: "Credit Card",
                    provider: "Visa",
                    status: "Pending",
                    transactionId: "txn_in_progress_67890"
                }
            }
        }
    });

    console.log("Seeded full and in-progress transactions successfully.");
}

main()
    .catch(e => {
        console.error('Error seeding data:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

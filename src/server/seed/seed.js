const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Create the first user
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

    // Common product category and product creation
    const category = await prisma.product_Category.create({
        data: {
            name: "Electronics",
            description: "High-tech gadgets"
        }
    });

    const product = await prisma.product.create({
        data: {
            name: "Smartphone",
            description: "Latest model smartphone with advanced features",
            stock: 100,
            price: 999.99,
            productCategoryId: category.id
        }
    });

    // Create a full transaction order for user1
    const fullOrder = await prisma.order.create({
        data: {
            total: product.price,
            status: "Completed",
            userId: user1.id,
            order_items: {
                create: {
                    productId: product.id,
                    unit_price: product.price,
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
            total: product.price * 2,  // Example of a different order size
            status: "In Progress",
            userId: user2.id,
            order_items: {
                create: {
                    productId: product.id,
                    unit_price: product.price,
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

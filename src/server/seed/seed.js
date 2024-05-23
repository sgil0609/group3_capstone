const { PrismaClient } = require('@prisma/client');
const { link } = require('../api/product');
const { Decimal } = require('@prisma/client/runtime/library');
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
            role: "admin",
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


       // Women's Tops

    await prisma.product.createMany({
        data:[
        {
            name: "Dinosaur Tank Top",
            description: "Comfy Tank Top with dinosaur",
            stock: 10,
            price: 29.99,
            productCategoryId: womenTops.id,
            imageUrl:"https://media.kohlsimg.com/is/image/kohls/3591469?wid=805&hei=805&op_sharpen=1"
        },
        {
            name: "Crochet-Style Button-Up Polo",
            description: "Easy-fitting short sleeve top in our soft sweater yarn fabric, featuring a classic polo collar, button-up front and crochet-style mesh stitching details throughout",
            stock: 15,
            price: 80.00,
            productCategoryId: womenTops.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_150-4282-0238-900_prod1.jpg?policy=product-extra-large"
        },
        {
            name: "Satin Effect Top with Back Bow",
            description: "Top with straight neckline and adjustable spaghetti straps. Open back with self bow",
            stock: 8,
            price: 39.99,
            productCategoryId: womenTops.id,
            imageUrl:"https://static.zara.net/assets/public/74cb/e3d0/7e094450871f/03242c35c6fb/03077303539-e1/03077303539-e1.jpg?ts=1711541700520&w=850"
        },
        {
            name: "Drama Puff Sleeve Sweatheart Top",
            description: "Flattering short-sleeve set top in our new elevated shine cotton fabric and cropped length, featuring corset-style seaming details along the bodice, on-trend drama puff sleeves and sweetheart neckline",
            stock: 5,
            price: 49.00,
            productCategoryId: womenTops.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_140-4128-0034-604_prod1.jpg?policy=product-large"
        },
        {
            name: "Satin Pleated Top",
            description: "Easy-fitting set top in a soft satin fabric and cropped length, with all-over pleating details, on-trend wrap detail, adjustable straps and v-neckline",
            stock: 10,
            price: 60.00,
            productCategoryId: womenTops.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_140-4198-0116-258_prod1.jpg?policy=product-large"
        },
        {
            name: "Ruffle Strap Eyelet Top",
            description: "Flattering set top in our soft cotton-blend fabric and cropped length, featuring corset-style seaming details along the bodice, on-trend ruffle straps, embroidered eyelet details and square neckline",
            stock: 22,
            price: 39.99,
            productCategoryId: womenTops.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_140-4149-0107-900_prod1.jpg?policy=product-large"
        },
        {
            name: "Cropped Lace Squareneck Top",
            description: "On-trend set top in our soft lace fabric and new ultra cropped length, featuring trendy scalloped hem, square neckline and adjustable straps",
            stock: 20,
            price: 35.00,
            productCategoryId: womenTops.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_140-4127-0114-100_prod2.jpg?policy=product-large"
        },
        {
            name: "Short-Sleeve McLaren Graphic Tee",
            description: "Slim-fitting short-sleeve tee in our softAF fabric and slightly slimmer fit, that hits above the hips, featuring McLaren graphic detail at chest and crew neckline",
            stock: 10,
            price: 25.00,
            productCategoryId: womenTops.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_157-3210-0007-178_prod1.jpg?policy=product-large"
        }
    ]
    });

    // Women's Pants

    await prisma.product.createMany({
        data: [ 
        {
            name: "Bell Bottom Jeans",
            description: "70 style jeans",
            stock: 10,
            price: 29.99,
            productCategoryId: womenPants.id,
            imageUrl:"https://m.media-amazon.com/images/I/71jIWd7As8L._AC_SY879_.jpg" 
        },
        {
            name: "High Rise Shorts",
            description: "High rise with a relaxed fit throughout the hip and thigh, and a 4 inch (10 cm) inseam",
            stock: 30,
            price: 60.00,
            productCategoryId: womenPants.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_149-4228-0094-281_prod1.jpg?policy=product-large" 
        },
        {
            name: "High-Rise Tight",
            description: "Your go-to training tight, made in our fast-drying fabric",
            stock: 10,
            price: 98.00,
            productCategoryId: womenPants.id,
            imageUrl:"https://images.lululemon.com/is/image/lululemon/LW5CQDS_065550_1?wid=1440&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72" 
        },
        {
            name: "Tailored Short",
            description: "Tailored Short features an ultra high rise, is tailored with figure-flattering",
            stock: 31,
            price: 59.99,
            productCategoryId: womenPants.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_149-4032-0025-410_prod1.jpg?policy=product-large" 
        },
        {
            name: "Wrap Mini Skort",
            description: "Ultra high rise mini skort in our classic menswear fabric, featuring a front wrap detail, a shorts lining underneath for comfort and a side zipper for a secure fit",
            stock: 15,
            price: 45.00,
            productCategoryId: womenPants.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_143-3301-0272-900_prod1.jpg?policy=product-large" 
        },
        {
            name: "Crochet-Style Maxi Skirt",
            description: "Flattering maxi skirt in our soft sweater yarn fabric, featuring crochet-style stitching details throughout, a fully elasticated waistband and an interior mini skirt lining with sheerness through the bottom",
            stock: 20,
            price: 75.00,
            productCategoryId: womenPants.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_143-4101-0058-178_prod1.jpg?policy=product-large" 
        },
        {
            name: "Sunday Short",
            description: "Max fleece fabric for a more relaxed and roomy feel, featuring an elasticated foldover waistband, interior drawcords and side pockets",
            stock: 10,
            price: 35.00,
            productCategoryId: womenPants.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_149-4205-0025-450_prod1.jpg?policy=product-large" 
        },
        {
            name: "Premium Linen Scallop-Hem Tailored Short",
            description: "Comfortable 3 inch (7 cm) tailored shorts in an ultra high rise and 100% linen fabric, featuring an elasticated waistband with a zipper, pockets and on-trend scallop hem",
            stock: 15,
            price: 60.00,
            productCategoryId: womenPants.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_149-4275-0028-630_prod1.jpg?policy=product-large" 
        }
    ]
    });

    // Women's Shoes

    await prisma.product.createMany({
        data:[
        {
            name: "Ugg Boots",
            description: "Comfy UGG boots",
            stock: 10,
            price: 29.99,
            productCategoryId: womenShoes.id,
            imageUrl:"https://m.media-amazon.com/images/I/71IlZQJtV1L._AC_SY695_.jpg" 
        },
        {
            name: "NMD R_1",
            description: "Remastered for an ultra-comfortable feel, they're made with a mesh upper that sits on BOOST cushioning",
            stock: 15,
            price: 130.00,
            productCategoryId: womenShoes.id,
            imageUrl:"https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c96bc41645d04c01905ceecba753b226_9366/NMD_R1_Shoes_Pink_IG8389_01_standard.jpg" 
        },
        {
            name: "Rhinestone Ankle Strap Toe Pumps",
            description: "Sparkly rhinestones adorn the wrapping adjustable ankle strap and topline, and form a dramatic bow detail on the toe box",
            stock: 2,
            price: 45.00,
            productCategoryId: womenShoes.id,
            imageUrl:"https://www.lulus.com/images/product/xlarge/8018281_1618936.jpg?w=560&hdpi=1" 
        },
        {
            name: "Bondi",
            description: "The Bondi takes a bold step forward this season reworked with softer, lighter foams and a brand-new extended heel geometry",
            stock: 20,
            price: 165.00,
            productCategoryId: womenShoes.id,
            imageUrl:"https://dms.deckers.com/hoka/image/upload/f_auto,q_auto,dpr_auto/b_rgb:f7f7f9/w_966/v1689038764/catalog/transparent/1127952-WWH_1.png?_s=RAABAB0" 
        },
        {
            name: "Straw Flat Slide Sandals",
            description: "Our new flat slide sandals with a breathable and stylish straw upper body and comfortable vegan leather sole",
            stock: 15,
            price: 34.99,
            productCategoryId: womenShoes.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_154-4002-0013-800_prod1.jpg?policy=product-large" 
        },
        {
            name: "Leather Flat Sandals",
            description: "Our fan-favorite everyday flat sandals in a soft vegan leather fabric, featuring gladiator-style strappy details with ankle support, elevated gold tips, faux wood sole and embossed logo detail",
            stock: 8,
            price: 24.99,
            productCategoryId: womenShoes.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_154-4004-0011-400_prod1.jpg?policy=product-large" 
        },
        {
            name: "Superstar Shoes",
            description: "Built for basketball, adopted by hip hop and skate, the classic leather Superstar changed the game the moment it stepped off the court",
            stock: 50,
            price: 99.99,
            productCategoryId: womenShoes.id,
            imageUrl:"https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ed0855435194229a525aad6009a0497_9366/Superstar_Shoes_White_EG4958_01_standard.jpg" 
        },
        {
            name: "Ultraboost 1.0",
            description: "BOOST cushioning is ultra-responsive underfoot, while the adidas PRIMEKNIT upper fits your foot like a sock, providing support, stretch and breathability exactly where you need it",
            stock: 21,
            price: 139.99,
            productCategoryId: womenShoes.id,
            imageUrl:"https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ddcbf13719e24d4694c914566f069140_9366/Ultraboost_1.0_Shoes_White_ID5949_01_standard.jpg" 
        }
    ]
    });

    // Men's Shirts

    await prisma.product.createMany({
        data: [
        {
            name: "New York Yankees Retro",
            description: "1970 themed Yankee tshirt",
            stock: 10,
            price: 29.99,
            productCategoryId: menShirts.id,
            imageUrl:"https://www.pacsun.com/dw/image/v2/AAJE_PRD/on/demandware.static/-/Sites-pacsun_storefront_catalog/default/dw49de0f74/product_images/0097600540020NEW_00_010.jpg?sw=2000" 
        },
        {
            name: "Striped Shirt",
            description: "Relaxed fit shirt made of cotton blend fabric",
            stock: 20,
            price: 49.99,
            productCategoryId: menShirts.id,
            imageUrl:"https://static.zara.net/assets/public/bf6d/6c0b/fd424ad49d12/38bcfd110028/01182401401-e1/01182401401-e1.jpg?ts=1706119029187&w=2720" 
        },
        {
            name: "Essentials T-Shirt",
            description: "Cotton T-shirt designed with tonal logo details",
            stock: 5,
            price: 45.00,
            productCategoryId: menShirts.id,
            imageUrl:"https://142344524.cdn6.editmysite.com/uploads/1/4/2/3/142344524/s159676499858804371_p4103_i2_w1080.jpeg" 
        },
        {
            name: "Trefoil Tee",
            description: "An embroidered Trefoil accents the soft cotton build, and the classic look lets you pair it with almost anything to maximize versatility",
            stock: 23,
            price: 30.00,
            productCategoryId: menShirts.id,
            imageUrl:"https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/4f15930d5cec49b480a6309f032b1d8e_9366/Trefoil_Essentials_Tee_Red_IR9686_01_laydown.jpg" 
        },
        {
            name: "Button Camp Collar Sweater Polo",
            description: "Comfortable short-sleeve sweater polo in our sweater-knit fabric and slightly boxy, cropped silhouette, featuring two-button placket, resort-style camp collar, elevated stitching details throughout and banded hem and cuffs",
            stock: 12,
            price: 60.00,
            productCategoryId: menShirts.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_120-4118-0210-120_prod1.jpg?policy=product-large" 
        },
        {
            name: "Aliens In Action",
            description: "Comfy 100% Cotton T-Shirt",
            stock: 20,
            price: 24.99,
            productCategoryId: menShirts.id,
            imageUrl:"https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/467870/item/goods_69_467870.jpg?width=400" 
        },
        {
            name: "Basic T-Shirt",
            description: "Cotton knit T-shirt. Round neck and short sleeves. Rib trim",
            stock: 60,
            price: 14.99,
            productCategoryId: menShirts.id,
            imageUrl:"https://static.zara.net/assets/public/df4b/85e9/c79249359268/71d3245e3edf/00693420251-e1/00693420251-e1.jpg?ts=1706093239501&w=563" 
        },
        {
            name: "Sun T-Shirt x Pepo",
            description: "Relaxed fit T-shirt. Round neck and short sleeves. Contrast graphic prints at front and back",
            stock: 15,
            price: 34.99,
            productCategoryId: menShirts.id,
            imageUrl:"https://static.zara.net/assets/public/8028/087e/21aa4286a8df/76d32d00a82e/00722426251-e1/00722426251-e1.jpg?ts=1710345440613&w=563" 
        },
        {
            name: "Polo Shirt",
            description: "Knit polo shirt in viscose blend fabric. Lapel collar with front button closure. Short sleeves",
            stock: 25,
            price: 45.99,
            productCategoryId: menShirts.id,
            imageUrl:"https://static.zara.net/assets/public/1d36/ff72/15a543688c88/252351721b05/00304417401-e1/00304417401-e1.jpg?ts=1705321551105&w=563" 
        },
        {
            name: "Star Wars Graphic Tee",
            description: "Classic short-sleeve tee with relaxed-fit silhouette",
            stock: 15,
            price: 40.99,
            productCategoryId: menShirts.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_123-4173-0166-903_prod1.jpg?policy=product-large" 
        },
        {
            name: "Camp Collar Summer Blend Shirt",
            description: "Comfortable short-sleeve button-up shirt in our new lightweight and breathable summer linen-blend fabric",
            stock: 20,
            price: 50.00,
            productCategoryId: menShirts.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_125-4012-0039-908_prod1.jpg?policy=product-large" 
        },
        {
            name: "Pride Crochet-Style Muscle Tank",
            description: "Easy-fitting muscle tank in our soft sweater-knit fabric, featuring on-trend crochet-style stitching details throughout, crew neckline and banded hem",
            stock: 5,
            price: 40.00,
            productCategoryId: menShirts.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_120-4084-0189-100_prod1.jpg?policy=product-large" 
        },
        {
            name: "Lemon Button-Up Shirt",
            description: "Classic short-sleeve button-up shirt in our Traveler performance fabric featuring two-way stretch with moisture-wicking and wrinkle-release capabilities",
            stock: 3,
            price: 42.00,
            productCategoryId: menShirts.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_125-4162-0069-178_prod1.jpg?policy=product-extra-large" 
        }
    ]
    });

    // Men's Pants
    
    await prisma.product.createMany({
        data: [ 
        {
            name: "Levi 501",
            description: "Comfy Levi Jeans",
            stock: 10,
            price: 29.99,
            productCategoryId: menPants.id,
            imageUrl:"https://m.media-amazon.com/images/I/8101SWb21VL._AC_SY879_.jpg" 
        },
        {
            name: "Run Short",
            description: "Breathable everyday running shorts",
            stock: 40,
            price: 35.00,
            productCategoryId: menPants.id,
            imageUrl:"https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7202ac1614f64b0d9e5fada800c7ce92_9366/Own_the_Run_Shorts_Black_H58593_01_laydown.jpg" 
        },
        {
            name: "Limitless Athletic Fit Jogger",
            description: "Relaxed fit joggers stays wrinkle free",
            stock: 10,
            price: 88.00,
            productCategoryId: menPants.id,
            imageUrl:"https://dks.scene7.com/is/image/GolfGalaxy/24KRMMLMTLSSJGGRTMPD_Warm_Stone?wid=2000&fmt=pjpeg" 
        },
        {
            name: "Pull-On Short",
            description: "Linen blend shorts",
            stock: 20,
            price: 60.00,
            productCategoryId: menPants.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_128-4081-0076-442_prod1.jpg?policy=product-extra-large" 
        },
        {
            name: "Athletic Slim Jean",
            description: "Our signature stretch fabric and a relaxed-fit silhouette, that's slim through the leg, with extra room through the hip and thigh and tapered toward the ankle with refined details for a more athletic build",
            stock: 20,
            price: 82.00,
            productCategoryId: menPants.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_131-4029-0023-977_prod1.jpg?policy=product-extra-large" 
        },
        {
            name: "Lightweight Loose Jean",
            description: "Our signature stretch fabric and a relaxed-fit silhouette, that's slim through the leg, with extra room through the hip and thigh and tapered toward the ankle with refined details for a more athletic build",
            stock: 20,
            price: 92.00,
            productCategoryId: menPants.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_131-4075-0091-281_prod1.jpg?policy=product-large" 
        },
        {
            name: "Utility Jogger",
            description: "Comfortable utility-style joggers in our signature All Day fabric with breathable and moisture-wicking properties",
            stock: 10,
            price: 54.99,
            productCategoryId: menPants.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_130-4029-0023-330_prod1.jpg?policy=product-large" 
        },
        {
            name: "Tailored Linen-Blend Pleated Suit Pants",
            description: "Our classic suit pants in our linen-blend fabric, featuring front pleat details, a fixed waist style waistband, functional fly closure and pockets throughout",
            stock: 4,
            price: 100.00,
            productCategoryId: menPants.id,
            imageUrl:"https://img.abercrombie.com/is/image/anf/KIC_130-4045-0041-412_prod1.jpg?policy=product-large" 
        },
    ]
    });

    // Men's Shoes

    await prisma.product.createMany({
        data: [
        {
            name: "Air Force Ones",
            description: "Air Force Ones",
            stock: 10,
            price: 29.99,
            productCategoryId: menShoes.id,
            imageUrl:"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/350e7f3a-979a-402b-9396-a8a998dd76ab/air-force-1-07-mens-shoes-jBrhbr.png" 
        },
        {
            name: "Boost 350 V2",
            description: "Boost features an upper composed of re-engineered Primeknit",
            stock: 2,
            price: 390.00,
            productCategoryId: menShoes.id,
            imageUrl:"https://preview.thenewsmarket.com/Previews/ADID/StillAssets/1920x1080/600894.jpg"
        },
        {
            name: "Victori One",
            description: "Must-have slides for everyday activities",
            stock: 50,
            price: 35.00,
            productCategoryId: menShoes.id,
            imageUrl:"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b8c72d07-d64e-47f3-88cf-17307963e5a7/victori-one-mens-slides-vrTGLL.png"
        },
        {
            name: "Air Jordan 3",
            description: "Equipped with visible Air cushioning and iconic elephant print overlays, to say the AJ3 is simply legendary",
            stock: 2,
            price: 250.00,
            productCategoryId: menShoes.id,
            imageUrl:"https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/75cd2cfb-00ed-4e70-80b1-7c48e3526f2b/air-jordan-3-x-j-balvin-rio-fn0344-001-release-date.jpg"
        },
        {
            name: "Dunk Low Retro",
            description: "This basketball icon channels '80s vibes with premium leather in the upper that looks good and breaks in even better",
            stock: 25,
            price: 115.00,
            productCategoryId: menShoes.id,
            imageUrl:"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/dunk-low-retro-mens-shoes-5FQWGR.png"
        },
        {
            name: "Metcon 9 AMP",
            description: "Metcon 9 improved on the 8 with a larger Hyperlift plate and added rubber rope wrap",
            stock: 7,
            price: 95.99,
            productCategoryId: menShoes.id,
            imageUrl:"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/bda53afe-119c-4cf1-aaa2-d761a4e89a78/metcon-9-amp-mens-workout-shoes-qFBS2f.png"
        },
        {
            name: "Free Run 18",
            description: "Free Run 18 has been updated to deliver an even more adaptive fit than before. Stretch material in the upper moves with your foot",
            stock: 40,
            price: 69.99,
            productCategoryId: menShoes.id,
            imageUrl:"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/cdc2dee5-5f2c-4705-bc7f-2f0f6ef1a336/free-run-2018-mens-road-running-shoes-4VTnGqeZ.png"
        },
    ]
    });

    // Create a full transaction order for user1
    // const fullOrder = await prisma.order.create({
    //     data: {
    //         total: menShoes.price,
    //         status: "Completed",
    //         userId: user1.id,
    //         order_items: {
    //             create: {
    //                 productId: menShoes.id,
    //                 unit_price: menShoes.price,
    //                 quantity: 1
    //             }
    //         },
    //         payment_details: {
    //             create: {
    //                 payment_type: "Credit Card",
    //                 provider: "Visa",
    //                 status: "Completed",
    //                 transactionId: "txn_complete_12345"
    //             }
    //         },
    //         total: Decimal
    //     }
    // });

    // Create an order in progress for user2
    // const inProgressOrder = await prisma.order.create({
    //     data: {
    //         total: menPants.price * 2,  // Example of a different order size
    //         status: "In Progress",
    //         userId: user2.id,
    //         order_items: {
    //             create: {
    //                 productId: menPants.id,
    //                 unit_price: menPants.price,
    //                 quantity: 2  // Assuming a different quantity for demonstration
    //             }
    //         },
    //         payment_details: {
    //             create: {
    //                 payment_type: "Credit Card",
    //                 provider: "Visa",
    //                 status: "Pending",
    //                 transactionId: "txn_in_progress_67890"
    //             }
    //         }
    //     }
    // });

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
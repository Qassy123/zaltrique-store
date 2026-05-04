import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "2pcs Type C Fast Charging Cable (3m)",
        description: "Braided USB to Type C cable - Silver 3m",
        price: 5.09,
        image: "/products/cable-silver-3m.jpg",
      },
      {
        name: "2pcs Type C Fast Charging Cable (2m)",
        description: "Braided USB to Type C cable - Silver 2m",
        price: 1.8,
        image: "/products/cable-silver-2m.jpg",
      },
      {
        name: "2pcs Type C Fast Charging Cable Black (3m)",
        description: "Braided USB to Type C cable - Black 3m",
        price: 2.4,
        image: "/products/cable-black-3m.jpg",
      },
      {
        name: "2pcs Type C Fast Charging Cable Black (2m)",
        description: "Braided USB to Type C cable - Black 2m",
        price: 1.8,
        image: "/products/cable-black-2m.jpg",
      },
      {
        name: "Bathroom Toilet Shelf Holder",
        description: "Wall-mounted toilet holder with shelf",
        price: 2.21,
        image: "/products/toilet-grey.jpg",
      },
      {
        name: "Bathroom Toilet Shelf Holder Black",
        description: "Wall-mounted toilet holder black",
        price: 2.74,
        image: "/products/toilet-black.jpg",
      },
      {
        name: "Microfiber Cleaning Cloths (10pcs)",
        description: "Multi-purpose cleaning cloth set",
        price: 1.69,
        image: "/products/cloths.jpg",
      },
      {
        name: "Lint Roller Set",
        description: "Hair removal roller + refill sheets",
        price: 2.86,
        image: "/products/lint.jpg",
      },
    ],
  });

  console.log("✅ Products seeded");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
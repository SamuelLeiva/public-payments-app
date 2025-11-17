import { PrismaClient, Prisma } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  console.log(`Start seeding ...`);

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: 'securepassword',
      role: 'ADMIN',
    },
  });

  console.log('Created admin user: ', adminUser);

  const regularUser = await prisma.user.create({
    data: {
      email: 'user@example.com',
      password: 'securepassword',
      role: 'USER',
    },
  });

  console.log('Created regular user: ', regularUser);

  const person = await prisma.person.create({
    data: {
      names: 'Jose Rodolfo',
      firstSurname: 'Lopez',
      secondSurname: 'Perez',
      age: 30,
      gender: 'MALE',
      birthDate: new Date('1993-01-15'),
      dni: '12345678',
      address: '123 Main St, Cityville',
      phone: '985655478',
      user: regularUser ? { connect: { id: regularUser.id } } : undefined,
    },
  });

  console.log('Created person: ', person);

  const services = await Promise.all([
    prisma.service.create({
      data: {
        name: 'Water Supply',
        description: 'Monthly water supply service',
      },
    }),
    prisma.service.create({
      data: {
        name: 'Electricity',
        description: 'Monthly electricity service',
      },
    }),
    prisma.service.create({
      data: {
        name: 'Pool Hour Rental',
        description: 'Daily pool hour rental service',
        price: 10.0,
      },
    }),
  ]);

  console.log('Created services: ', services);

  const payments = await Promise.all([
    prisma.payment.create({
      data: {
        amount: 30.0,
        method: 'CREDIT_CARD',
        date: new Date(),
        person: { connect: { id: person.id } },
        service: { connect: { id: services[0].id } },
      },
    }),
    prisma.payment.create({
      data: {
        amount: 50.0,
        method: 'CASH',
        date: new Date(),
        person: { connect: { id: person.id } },
        service: { connect: { id: services[1].id } },
      },
    }),
    prisma.payment.create({
      data: {
        amount: 10.0,
        method: 'DEBIT_CARD',
        date: new Date(),
        person: { connect: { id: person.id } },
        service: { connect: { id: services[2].id } },
      },
    }),
  ]);

  console.log('Created payments: ', payments);

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

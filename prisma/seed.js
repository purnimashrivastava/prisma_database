const { PrismaClient } = require('@prisma/client')
// const { adminRoles } = require('./data.js');
// const { roles } = require('./data.js');
const { adminRoles, roles } = require('./data.js');

const prisma = new PrismaClient();

async function main() {
    await prisma.roles.deleteMany();
    await prisma.adminRoles.deleteMany();
    await prisma.RorClassTypes.deleteMany();
    await prisma.roles.createMany({
        data: roles,
    });
    await prisma.adminRoles.createMany({
        data: adminRoles,
    });
    
    await prisma.RorClassTypes.createMany({
        data: RorClassTypes,
    });    
    await prisma.States.createMany({
        data: statesWithValidCountries,
    });   
    await prisma.Addresses.createMany({
        data: Addresses,
    });
    
}

main()
.then(async () => {
    await prisma.$disconnect();
    console.log('Data inserted successfully');
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
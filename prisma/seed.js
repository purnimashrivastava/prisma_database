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

    // Create states, ensuring each state references a valid country by name
    const statesWithValidCountries = States.map(state => ({
        ...state,
        Countries: { connect: { name: state.country } } // Connect to country by name
    }));
    
    await prisma.States.createMany({
        data: statesWithValidCountries,
    });
    
    // Assuming CountriesData is an array containing country data to be inserted or updated
    for (const Countries of Countries) {
        await prisma.Countries.upsert({
            where: { name: Countries.name },
            update: {}, // Optionally specify fields to update if the record exists
            create: Countries,
        });
    }
    
    // Create districts, ensuring each district references a valid state
    const districtsWithValidStates = Districts.map(district => ({
        ...district,
        state: { connect: { id: district.stateId } } // Assuming each district references a state by ID
    }));
    
    await prisma.Districts.createMany({
        data: districtsWithValidStates,
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
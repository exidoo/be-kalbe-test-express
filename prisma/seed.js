const { PrismaClient } = require('../generated/prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Pastikan Anda memiliki user_management terlebih dahulu
  // Gunakan findFirst untuk mencari user, jika tidak ada, buat yang baru
  let user1 = await prisma.user_management.findFirst({
    where: { username: 'admin' },
  });

  if (!user1) {
    user1 = await prisma.user_management.create({
      data: {
        username: 'admin',
        email: 'admin@mail.com',
        // Catatan: Gunakan bcryptjs untuk hashing password di aplikasi nyata
        password: 'password',
        full_name: 'Admin',
        role: 'ADMIN',
      },
    });
    console.log(`Created new user: ${user1.username}`);
  } else {
    console.log(`User already exists: ${user1.username}`);
  }

  // Menambahkan data m_ca_parameters
  // Cek apakah data sudah ada sebelum membuat
  const param1Check = await prisma.m_ca_parameters.findFirst({ where: { code: 'PARAM-001' } });
  if (!param1Check) {
    const param1 = await prisma.m_ca_parameters.create({
      data: {
        code: 'PARAM-001',
        description: 'pH value test',
        created_by_id: user1.id,
        created_on: new Date(),
        is_active: true,
      },
    });
    console.log(`Created parameter: ${param1.code}`);
  } else {
    console.log(`Parameter already exists: ${param1Check.code}`);
  }

  const param2Check = await prisma.m_ca_parameters.findFirst({ where: { code: 'PARAM-002' } });
  if (!param2Check) {
    const param2 = await prisma.m_ca_parameters.create({
      data: {
        code: 'PARAM-002',
        description: 'Hardness test',
        created_by_id: user1.id,
        created_on: new Date(),
        is_active: true,
      },
    });
    console.log(`Created parameter: ${param2.code}`);
  } else {
    console.log(`Parameter already exists: ${param2Check.code}`);
  }

  // Menambahkan data m_ca_methods
  const method1Check = await prisma.m_ca_methods.findFirst({ where: { code: 'METH-001' } });
  if (!method1Check) {
    const method1 = await prisma.m_ca_methods.create({
      data: {
        code: 'METH-001',
        description: 'Standard titration method',
        created_by_id: user1.id,
        created_on: new Date(),
        is_active: true,
      },
    });
    console.log(`Created method: ${method1.code}`);
  } else {
    console.log(`Method already exists: ${method1Check.code}`);
  }

  const method2Check = await prisma.m_ca_methods.findFirst({ where: { code: 'METH-002' } });
  if (!method2Check) {
    const method2 = await prisma.m_ca_methods.create({
      data: {
        code: 'METH-002',
        description: 'Spectrophotometry method',
        created_by_id: user1.id,
        created_on: new Date(),
        is_active: true,
      },
    });
    console.log(`Created method: ${method2.code}`);
  } else {
    console.log(`Method already exists: ${method2Check.code}`);
  }

  // Menambahkan data m_ca_sample_types
  const sampleType1Check = await prisma.m_ca_sample_types.findFirst({ where: { code: 'SAMPLE-001' } });
  if (!sampleType1Check) {
    const sampleType1 = await prisma.m_ca_sample_types.create({
      data: {
        code: 'SAMPLE-001',
        description: 'Drinking water',
        created_by_id: user1.id,
        created_on: new Date(),
        is_active: true,
      },
    });
    console.log(`Created sample type: ${sampleType1.code}`);
  } else {
    console.log(`Sample type already exists: ${sampleType1Check.code}`);
  }

  const sampleType2Check = await prisma.m_ca_sample_types.findFirst({ where: { code: 'SAMPLE-002' } });
  if (!sampleType2Check) {
    const sampleType2 = await prisma.m_ca_sample_types.create({
      data: {
        code: 'SAMPLE-002',
        description: 'Wastewater',
        created_by_id: user1.id,
        created_on: new Date(),
        is_active: true,
      },
    });
    console.log(`Created sample type: ${sampleType2.code}`);
  } else {
    console.log(`Sample type already exists: ${sampleType2Check.code}`);
  }

  // Menambahkan data m_ca_analyses
  // Untuk data analysis, kita perlu mengambil ID dari data yang sudah dibuat sebelumnya
  const param1Id = (await prisma.m_ca_parameters.findFirst({ where: { code: 'PARAM-001' } }))?.id;
  const param2Id = (await prisma.m_ca_parameters.findFirst({ where: { code: 'PARAM-002' } }))?.id;
  const method1Id = (await prisma.m_ca_methods.findFirst({ where: { code: 'METH-001' } }))?.id;
  const method2Id = (await prisma.m_ca_methods.findFirst({ where: { code: 'METH-002' } }))?.id;
  const sampleType1Id = (await prisma.m_ca_sample_types.findFirst({ where: { code: 'SAMPLE-001' } }))?.id;
  const sampleType2Id = (await prisma.m_ca_sample_types.findFirst({ where: { code: 'SAMPLE-002' } }))?.id;

  const analysis1Check = await prisma.m_ca_analyses.findFirst({ where: { code: 'ANAL-001' } });
  if (!analysis1Check) {
    const analysis1 = await prisma.m_ca_analyses.create({
      data: {
        code: 'ANAL-001',
        description: 'Drinking water pH analysis',
        lead_time: 2,
        parameter_id: param1Id,
        method_id: method1Id,
        sample_type_id: sampleType1Id,
        created_by_id: user1.id,
        created_on: new Date(),
        is_active: true,
      },
    });
    console.log(`Created analysis: ${analysis1.code}`);
  } else {
    console.log(`Analysis already exists: ${analysis1Check.code}`);
  }

  const analysis2Check = await prisma.m_ca_analyses.findFirst({ where: { code: 'ANAL-002' } });
  if (!analysis2Check) {
    const analysis2 = await prisma.m_ca_analyses.create({
      data: {
        code: 'ANAL-002',
        description: 'Wastewater hardness analysis',
        lead_time: 4,
        parameter_id: param2Id,
        method_id: method2Id,
        sample_type_id: sampleType2Id,
        created_by_id: user1.id,
        created_on: new Date(),
        is_active: true,
      },
    });
    console.log(`Created analysis: ${analysis2.code}`);
  } else {
    console.log(`Analysis already exists: ${analysis2Check.code}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { INITIAL_TEMPLATES } from '@framecraft/shared';

const prisma = new PrismaClient();

const STUDIO_USER = {
  email: 'meenastudio2411@gmail.com',
  password: 'Meena@2411',
  name: 'Meena Studio',
};

async function main() {
  console.log('Seeding studio sign-in account...');
  const passwordHash = await bcrypt.hash(STUDIO_USER.password, 10);
  await prisma.user.upsert({
    where: { email: STUDIO_USER.email.toLowerCase() },
    update: {
      name: STUDIO_USER.name,
      passwordHash,
      role: 'ADMIN',
    },
    create: {
      email: STUDIO_USER.email.toLowerCase(),
      name: STUDIO_USER.name,
      passwordHash,
      role: 'ADMIN',
    },
  });
  console.log(`Studio account ready: ${STUDIO_USER.email}`);

  console.log(`Seeding ${INITIAL_TEMPLATES.length} templates into database...`);

  // Remove any legacy templates that are not in the new curated set
  const newSlugs = INITIAL_TEMPLATES.map((t) => t.slug);
  const deleted = await prisma.template.deleteMany({
    where: {
      slug: { notIn: newSlugs },
    },
  });
  if (deleted.count > 0) {
    console.log(`Cleaned up ${deleted.count} obsolete templates.`);
  }

  for (const template of INITIAL_TEMPLATES) {
    await prisma.template.upsert({
      where: { slug: template.slug },
      update: {
        id: template.id,
        name: template.name,
        category: template.category,
        description: template.description,
        aspectRatio: template.aspectRatio,
        canvasWidth: template.canvasWidth,
        canvasHeight: template.canvasHeight,
        photoCount: template.photoCount,
        templateJson: template as any,
        version: template.version,
      },
      create: {
        id: template.id,
        slug: template.slug,
        name: template.name,
        category: template.category,
        description: template.description,
        aspectRatio: template.aspectRatio,
        canvasWidth: template.canvasWidth,
        canvasHeight: template.canvasHeight,
        photoCount: template.photoCount,
        templateJson: template as any,
        version: template.version,
      },
    });
  }

  console.log('Template seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import slugify from 'slugify';
import xss from 'xss';
import clientPromise from './mongodb';

export async function getMeals() {
  const client = await clientPromise;
  const db = client.db(); // default DB from URI
  const meals = await db.collection('meals').find({}).toArray();
  return meals;
}

export async function getMeal(slug) {
  const client = await clientPromise;
  const db = client.db();
  const meal = await db.collection('meals').findOne({ slug });
  return meal;
}

export async function saveMeal(meal) {
  const client = await clientPromise;
  const db = client.db();

  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  // Save image locally (simplest) or to S3/GridFS
  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;
  const buffer = await meal.image.arrayBuffer();

  const fs = require('fs');
  const path = require('path');
  const imagePath = path.join(process.cwd(), 'public', 'images', fileName);

  fs.writeFileSync(imagePath, Buffer.from(buffer));

  meal.image = fileName;

  await db.collection('meals').insertOne(meal);
}

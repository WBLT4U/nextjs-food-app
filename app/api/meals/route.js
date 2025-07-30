import clientPromise from '@/lib/db';

export async function POST(request) {
  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db('mealsDB');
    
    const result = await db.collection('meals').insertOne(data);

    return Response.json({ message: 'Meal created', id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Failed to create meal:', error);
    return Response.json({ message: 'Failed to create meal' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('mealsDB');
    const meals = await db.collection('meals').find().toArray();

    return Response.json(meals);
  } catch (error) {
    console.error('Failed to fetch meals:', error);
    return Response.json({ message: 'Failed to load meals' }, { status: 500 });
  }
}

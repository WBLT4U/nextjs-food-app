const sql = require('better-sqlite3');
const db = sql('meals.db');

const dummyMeals = [
  {
    title: 'Fufu',
    slug: 'Fufu',
    image: 'fufu.jpg',
    summary:
      'Traditionally, fufu refers to a staple Nigerian food made with cassava.',
    instructions: `
      1. boiled cassava is peeled.

      2. cut into small cubes before pounding.

      3. shaped into balls and served.
    `,
    creator: 'Taofiq Abdulsalam',
    creator_email: 'taofiqabdulsalam48@gmail.com',
  },
  {
    title: 'Amala & Ewedu',
    slug: 'Amala-Ewedu',
    image: 'amala-and-ewedu.jpg',
    summary:
      'Amala is typically made with dried yam.',
    instructions: `
      1. dried yam (amala isu) which gives it a brown color.

      2. Ewedu, jute leaves are mashed, often with a short broomstick called ijabe.

      3. Then cooked with ground African crayfish, bouillon powder, salt, and locust beans.
    `,
    creator: 'Taofiq Abdulsalam',
    creator_email: 'taofiqabdulsalam48@gmail.com',
  },
  {
    title: 'Banga Soup',
    slug: 'Banga-Soup',
    image: 'banga-soup.jpg',
    summary:
      'Its usually made with fresh palm fruit and a variety of meat.',
    instructions: `
      1. Its usually made with fresh palm fruit and a variety of meat, fish (mostly catfish).

      2. Seafood flavored with spices like beletete leaves (bush apple).

      3. oburunbebe stick (licorice), banga spice leaves, scotch bonnet peppers, and onions.

    `,
    creator: 'Taofiq Abdulsalam',
    creator_email: 'taofiqabdulsalam48@gmail.com',
  },
  {
    title: 'Beef Tacos',
    slug: 'beef-tacos',
    image: 'beef-tacos.jpg',
    summary:
      "Three soft tortillas filled with seasoned beef, fresh salsa, cheese, and sour cream.",
    instructions: `
      1. Three soft tortillas filled with seasoned beef, fresh salsa, cheese, and sour cream.

    `,
    creator: 'Taofiq Abdulsalam',
    creator_email: 'taofiqabdulsalam48@gmail.com',
  },
  {
    title: 'Egusi Soup',
    slug: 'egusi-soup',
    image: 'egusi-soup.jpg',
    summary:
      'Typically made with ground egusi, palm oil.',
    instructions: `
      1. with ground egusi, palm oil.

      2. onions, hot peppers, locust beans (iru).

      3. African crayfish, stockfish, some type of meat, fish, and leafy vegetables.

    `,
    creator: 'Taofiq Abdulsalam',
    creator_email: 'taofiqabdulsalam48@gmail.com',
  },
  {
    title: 'Eba',
    slug: 'eba',
    image: 'garri.jpg',
    summary:
      'Cassava tubers are peeled and crushed.',
    instructions: `
      1. peeled and crushed into a mash before being pressed.

      2. dried, and fried to produce a dry granular flour called garri.

      3. The garri is then mixed with boiling water to form a smooth stiff dough thats shaped into balls and consumed.
 `,
    creator: 'Taofiq Abdulsalam',
    creator_email: 'taofiqabdulsalam48@gmail.com',
  },
  {
    title: 'Ogbono Soup',
    slug: 'ogbono-soup',
    image: 'ogbono-soup.jpg',
    summary:
      'Made with different types of vegetables, meat, and fish cooked in a broth thickened with ground dry ogbono seeds (wild mango seeds)..',
    instructions: `
      1. Made with different types of vegetables, meat, and fish.
    
      2. cooked in a broth thickened with ground dry ogbono seeds (wild mango seeds).
    
    `,
    creator: 'Taofiq Abdulsalam',
    creator_email: 'taofiqabdulsalam48@gmail.com',
  },
];

db.prepare(`
   CREATE TABLE IF NOT EXISTS meals (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       slug TEXT NOT NULL UNIQUE,
       title TEXT NOT NULL,
       image TEXT NOT NULL,
       summary TEXT NOT NULL,
       instructions TEXT NOT NULL,
       creator TEXT NOT NULL,
       creator_email TEXT NOT NULL
    )
`).run();

async function initData() {
  const stmt = db.prepare(`
      INSERT INTO meals VALUES (
         null,
         @slug,
         @title,
         @image,
         @summary,
         @instructions,
         @creator,
         @creator_email
      )
   `);

  for (const meal of dummyMeals) {
    stmt.run(meal);
  }
}

initData();

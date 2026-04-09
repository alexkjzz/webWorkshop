const express = require("express");
const postgres = require("postgres");
const z = require("zod");

const app = express();
const port = 8000;
const sql = postgres({
  host: "127.0.0.1",
  db: "postgres",
  user: "admin",
  password: "password",
  port: 5434
});

app.use(express.json());

// Schemas
const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  about: z.string(),
  price: z.number().positive(),
});

const CreateProductSchema = ProductSchema.omit({ id: true });

app.post("/products", async (req, res) => {
  const result = await CreateProductSchema.safeParse(req.body);

  if (result.success) {
    const { name, about, price } = result.data;

    const product = await sql`
   INSERT INTO products (name, about, price)
   VALUES (${name}, ${about}, ${price})
   RETURNING *
   `;

    res.send(product[0]);
  } else {
    res.status(400).send(result);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on http://127.0.0.1:${port}`);
});

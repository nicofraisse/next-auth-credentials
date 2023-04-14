import nextConnect from "next-connect";
import { getSession } from "next-auth/client";
import { database } from "middleware/database";

const handler = nextConnect();

handler.use(database);

handler.post(async (req, res) => {
  const db = req.db;
  const session = await getSession({ req });

  const { insertedId } = await db.collection("restaurants").insertOne({
    name: req.body.name,
    website: req.body.website,
    priceRange: req.body.priceRange,
    succursales: req.body.succursales,
    categories: req.body.categories,
    createdAt: new Date(),
    approved: !!session.user.isAdmin,
    creator: session.user,
  });

  const data = await db.collection("restaurants").findOne({ _id: insertedId });
  res.status(200).json(data);
});

export default handler;

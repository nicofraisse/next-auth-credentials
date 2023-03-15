import { connectToDatabase } from "../../../../lib/db";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  const client = await connectToDatabase();
  const db = await client.db();

  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(req.query.id) });

  const restaurants = await db
    .collection("restaurants")
    .find({ _id: { $in: user.eatenlist?.map((id) => new ObjectId(id)) } })
    .toArray();

  const reviews = await db
    .collection("reviews")
    .find({
      userId: user._id,
      restaurantId: { $in: user.eatenlist?.map((id) => new ObjectId(id)) },
    })
    .toArray();

  const result = restaurants.map((restaurant) => {
    const userRestaurantReviews = reviews.filter(
      (review) => review.restaurantId.toString() === restaurant._id.toString()
    );
    return { ...restaurant, reviews: userRestaurantReviews };
  });

  res.status(200).json(result);
};

export default handler;

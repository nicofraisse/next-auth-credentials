import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../lib/db";

const handler = async (req, res) => {
  const client = await connectToDatabase();
  const db = await client.db();
  const session = await getSession({ req });

  let result;

  const { search, sort, order, limit, minReviewCount, noUnapproved } =
    req.query;

  const approvedMatch = noUnapproved
    ? {
        approved: true,
      }
    : undefined;

  const baseAggregaor = [
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "restaurantId",
        as: "reviews",
      },
    },
    {
      $addFields: {
        reviewCount: { $size: "$reviews" },
        avgRating: { $avg: "$reviews.finalRating" },
      },
    },
    {
      $match: {
        reviewCount: { $gte: minReviewCount ? Number(minReviewCount) : 0 },
        ...(approvedMatch && approvedMatch),
      },
    },
    {
      $limit: limit ? Number(limit) : Number.MAX_SAFE_INTEGER,
    },
    {
      $sort: {
        [sort]: Number(order) || 1,
      },
    },
  ];

  if (search) {
    result = await db
      .collection("restaurants")
      .aggregate([
        {
          $search: {
            autocomplete: {
              query: search,
              path: "name",
              fuzzy: {
                maxEdits: 1,
              },
            },
          },
        },
        ...baseAggregaor,
      ])
      .toArray();
  } else {
    result = await db
      .collection("restaurants")
      .aggregate(baseAggregaor)

      .toArray();
  }
  res.status(200).json(result);
};

export default handler;

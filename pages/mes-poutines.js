import React from "react";
import { getUrlQueryString } from "../lib/getUrlqueryString";
import { useGet } from "../lib/useAxios";
import { useCurrentUser } from "../lib/useCurrentUser";
import Spinner from "components/Spinner";
import Link from "next/link";
import { Image } from "../components/Image";
import {
  Image as ImageIcon,
  Link2,
  Link as LinkIcon,
  MapPin,
  MessageCircle,
  Plus,
} from "react-feather";
import { TagSection } from "../components/RestaurantCard";
import RatingPill from "../components/RatingPill";
import Color from "color";
import { ratingColors } from "../data/ratingColors";
import { round } from "lodash";
import { formatRating } from "../lib/formatRating";
import Button from "../components/Button";
import { formatDate } from "../lib/formatDate";
import { flatten } from "lodash";

const MesPoutines = () => {
  const { currentUser } = useCurrentUser();

  const { data: restaurants, loading: restaurantsLoading } = useGet(
    `/api/users/${currentUser?._id}/get-eatenlist`,
    {
      skip: !currentUser,
    }
  );

  return (
    <div className="p-5 max-w-sm mx-auto">
      <div className="flex flex-wrap justify-between items-start">
        <h1 className="text-2xl font-black mb-5 inline mt-3">
          Mes poutines mangées
        </h1>
      </div>
      <Link href={"/noter"} passHref>
        <div
          className="mt-0s w-[220px] inline-flex mr-1 justify-center items-center py-2 px-2 bg-gray-50 border-gray-100 border-2 rounded-full text-neutral-400 cursor-pointer select-none hover:text-neutral-500 hover:border-neutral-300 transition-colors duration-200
        "
        >
          <Plus className="mr-2" size={20} />
          Ajouter des poutines
        </div>
      </Link>
      <Link href={"/noter"} passHref>
        <div
          className="mt-0s w-[150px] inline-flex justify-center items-center py-2 px-2 bg-gray-50 border-gray-100 border-2 rounded-full text-neutral-400 cursor-pointer select-none hover:text-neutral-500 hover:border-neutral-300 transition-colors duration-200
        "
        >
          <LinkIcon className="mr-2" size={20} />
          Partager
        </div>
      </Link>
      <>
        {!restaurants ? (
          <Spinner />
        ) : (
          ["first", ...restaurants].map((r, i) => {
            if (r === "first") {
              return (
                <div
                  key={i}
                  className="flex justify-between text-stone-600 p-2"
                >
                  {/* <div>Classement</div>
                  <div>Poutine</div>
                  <div>Note</div> */}
                </div>
              );
            }
            return (
              <div key={r._id} className="pt-5 rounded mb-2 flex items-start">
                {/* <div className="bg-gray-100 rounded-sm h-12 w-12 sm:h-16 sm:w-16 mr-2 lg:mr-3 flex items-center justify-center ">
                  {r.mainPhotos?.length > 0 ? (
                    <Image
                      src={r.mainPhotos[0]}
                      alt={`${r.name}-photo`}
                      className="h-12 w-12 sm:h-16 sm:w-16 object-cover object-center rounded-sm"
                    />
                  ) : (
                    <ImageIcon
                      className="text-gray-300"
                      size={48}
                      alt="placeholder"
                    />
                  )}
                </div> */}
                <div className="text-5xl text-stone-300 mr-6 font-bold">
                  {i}
                </div>
                <div className="flex-grow relative">
                  <div className="flex justify-between">
                    <Link href={`/restaurants/${r._id}`} passHref>
                      <a rel="noopener noreferrer">
                        <div className="font-bold text-base lg:text-lg text-teal-600 hover:underline">
                          {r.name}
                        </div>
                      </a>
                    </Link>
                    <div className="h-[1px] bg-slate-200 mt-[14px] ml-4 mr-2 flex-grow"></div>
                    <div className="mb-2 ml-4">
                      {r.reviews.length > 0 ? (
                        <span
                          className="py-[0px] px-[12px] rounded text-xl text-white flex items-center"
                          style={{
                            backgroundColor: Color(ratingColors[round(7)])
                              .darken(0.4)
                              .desaturate(0.3),
                          }}
                        >
                          {formatRating(r.reviews[0].finalRating)}
                          <span className="text-white font-normal text-xs text-opacity-80 ml-[2px] -mb-[2px]">
                            /10
                          </span>
                        </span>
                      ) : (
                        <Link href={`/restaurants/${r._id}/noter`} passHref>
                          <Button
                            height="xs"
                            className="text-normal"
                            variant="light"
                          >
                            Noter
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                  {/* <TagSection
                    priceRange={r.priceRange}
                    categories={r.categories}
                    // succursales={r.succursales}
                    city={
                      r.succursales[0].address?.context?.find((el) =>
                        el.id?.includes("neighborhood")
                      )?.text
                    }
                    noAddress
                  /> */}

                  <p className="" style={{ lineHeight: 1.4 }}>
                    <MessageCircle
                      className="inline text-stone-500 mr-1"
                      size={18}
                    />
                    <span className="text-sm text-stone-500 inline">
                      {r.reviews.length > 0 &&
                      r.reviews.find((rev) => rev.comment) ? (
                        <>
                          {r.reviews.find((rev) => rev.comment).comment}
                          <span className="text-stone-400 text-xs">
                            {" "}
                            - le{" "}
                            {formatDate(
                              r.reviews.find((rev) => rev.comment).createdAt,
                              "dd/MM/yyyy"
                            )}
                          </span>
                        </>
                      ) : (
                        "Pas de commentaire"
                      )}
                    </span>
                  </p>
                  <div className="flex overflow-x-auto w-[548px] scrollbar-hide">
                    {flatten(r.reviews?.map((r) => r.photos))
                      .filter(Boolean)
                      .map((photo) => {
                        return (
                          <Image
                            key={photo}
                            src={photo}
                            alt="poutine-user-photo"
                            className="rounded mr-3 mt-3 max-h-[140px] max-w-[240px] object-cover"
                          />
                        );
                      })}
                    <div className="min-w-[50px]"></div>
                    {flatten(r.reviews?.map((r) => r.photos)).filter(Boolean)
                      .length > 0 && (
                      <div className="absolute h-[140px] bottom-0 right-[1px] w-[50px] bg-gradient-to-r from-transparent to-white"></div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </>
    </div>
  );
};

export default MesPoutines;

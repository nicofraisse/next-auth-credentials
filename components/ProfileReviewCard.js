import Link from "next/link";
import React, { useCallback, useState } from "react";
import { Edit3, X, User, ChevronLeft, ChevronRight } from "react-feather";
import Modal from "react-responsive-modal";
import { Image } from "./Image";
import RatingPill from "./RatingPill";
import { formatDate } from "lib/formatDate";

import { useCurrentUser } from "../lib/useCurrentUser";
import { useRouter } from "next/router";
import { useRateRestaurant } from "components/context/RateRestaurantProvider";
import axios from "axios";
import toast from "react-hot-toast";
import classNames from "classnames";
import { RatingSection } from "./ReviewCard";
import { ImageModal } from "./ImageModal";

const ProfileReviewCard = ({ review, isIndex, userName }) => {
  const [imgModalOpen, setImgModalOpen] = useState(false);
  const { currentUser } = useCurrentUser();
  const { reload } = useRouter();
  const { rateRestaurant } = useRateRestaurant();

  const handleEdit = (review) => {
    rateRestaurant(review.restaurants[0], review);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Êtes-vous sûr(e) de vouloir supprimer l'avis? Cette action est irréversible."
      )
    ) {
      await axios
        .delete(`/api/reviews/${id}/delete?userId=${review.user._id}`)
        .then(() => {
          toast.success("Supprimé!");
          reload(window.location.pathname);
        })
        .catch((e) => toast.error(e.message));
    }
  };

  if (!review.restaurants || review.restaurants.length === 0) return null;

  return (
    <>
      <div className="text-slate-400 block sm:flex justify-between items-center text-sm">
        <span>
          {isIndex ? (
            <>
              <div className="inline-block relative top-[22px] translate-y-[-15px] translate-x-[-6px]">
                {review.user.image ? (
                  <Image
                    alt="user-image"
                    src={review.user.image}
                    className="rounded-full h-6 w-6 object-cover object-center"
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-slate-300 flex items-center justify-center translate-y-[-2px]">
                    <User className="text-white" size={16} />
                  </div>
                )}
              </div>
              <Link href={`/users/${review.user._id}`} passHref>
                <span className="font-bold hover:text-slate-500 cursor-pointer">
                  {review?.user?.name}
                </span>
              </Link>{" "}
              a{" "}
            </>
          ) : (
            <>
              <Edit3 size={20} className="mr-2 inline -mt-1" />
              {currentUser && currentUser._id === review.userId
                ? "Tu as"
                : `${userName} a`}
              &nbsp;
            </>
          )}
          noté{" "}
          <Link href={`/restaurants/${review.restaurants[0]._id}`}>
            <a className="text-teal-500 font-bold hover:text-teal-600">
              {review.restaurants[0].name}
            </a>
          </Link>
        </span>
        <span className="text-slate-300 text-xs ml-1 font-normal relative sm:top-[4px]">
          <span className="inline sm:hidden">- </span>{" "}
          {formatDate(review.createdAt, "d MMMM yyyy", true)}
        </span>
      </div>
      <div className="text-slate-700 mb mt-2 mb-8 border border-slate-100 shadow rounded-md p-3 sm:p-4 bg-white">
        <RatingSection review={review} showDate={false} />
        {review.comment && (
          <p className="rounded-lg text-sm px-1 w-full text-slate-600">
            {review.comment}
          </p>
        )}
        {Array.isArray(review.photos) && review.photos?.length > 0 && (
          <div className="mt-3 flex flex-wrap">
            {review.photos?.map((photo, index) => {
              const isFirstImage = index === 0;
              const isEvenLength = review.photos.length % 2 === 0;

              const imageContainerClass = classNames(
                "border-2 border-white",
                "rounded-md",
                "cursor-pointer",
                "overflow-hidden",
                "relative",
                {
                  "w-full pb-[66.666%]": isFirstImage && !isEvenLength,
                  "w-1/2 pb-[66.666%]": !(isFirstImage && !isEvenLength),
                }
              );

              return (
                <div
                  key={photo}
                  className={imageContainerClass}
                  onClick={() => setImgModalOpen(index)}
                >
                  <Image
                    src={photo}
                    alt="poutine-user-photo"
                    className="object-cover object-center absolute top-0 left-0 w-full h-full"
                  />
                </div>
              );
            })}
          </div>
        )}
        {(review.userId === currentUser?._id || currentUser?.isAdmin) && (
          <div className="mt-3 flex space-x-4">
            <button
              className="text-sm text-slate-400 hover:text-slate-500"
              onClick={() => handleEdit(review)}
            >
              Modifier
            </button>
            <button
              className="text-sm text-slate-400 hover:text-slate-500"
              onClick={() => handleDelete(review._id)}
            >
              Supprimer
            </button>
          </div>
        )}
      </div>
      <ImageModal
        isOpen={imgModalOpen !== false}
        onClose={() => setImgModalOpen(false)}
        images={review.photos}
        user={review?.user?.name || "Inconnu"}
        restaurant={review.restaurants[0].name}
        initialIndex={imgModalOpen}
      />
    </>
  );
};

export default ProfileReviewCard;

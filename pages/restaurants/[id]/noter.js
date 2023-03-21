import React from "react";
import { useGet } from "lib/useAxios";
import { useRouter } from "next/router";
import Spinner from "components/Spinner";
import RestaurantCard from "components/RestaurantCard";
import { RateRestaurantNew } from "../../../components/forms/RateRestaurantNew";

const NoterRestaurant = () => {
  const { query, push } = useRouter();

  const { data: restaurant, loading } = useGet(`/api/restaurants/${query.id}`, {
    skip: !query.id,
  });

  if (loading || !restaurant) return <Spinner />;

  return (
    <div className="p-4 sm:p-10 max-w-xs">
      <div className="-ml-4 -mr-4 xs:w-auto xs:mr-0 xs:ml-0 -mt-3 xs:mt-0 border-b xs:border rounded mb-4">
        <RestaurantCard restaurant={restaurant} />
      </div>
      <h1 className="text-lg xs:text-xl font-black mb-2">
        <span>Qu&apos;avez-vous pensé(e) de leur poutine?</span>
      </h1>
      <RateRestaurantNew
        onSubmit={() => push(`/noter?fromRateSuccess=${query.id}`)}
        restaurantId={query.id}
      />
    </div>
  );
};

export default NoterRestaurant;

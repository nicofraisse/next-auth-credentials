import Link from "next/link";
import { useState } from "react";

import SelectRestaurant from "components/forms/SelectRestaurant";
import Input from "components/Input";

import { useCurrentUser } from "lib/useCurrentUser";
import { useGet } from "../lib/useAxios";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/router";
import { CheckCircle, X } from "react-feather";
import Button, { VariantColor } from "../components/Button";

const Noter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedValue] = useDebounce(searchQuery, 300);
  const { query } = useRouter();

  const { data: searchResults, loading: searchResultsLoading } = useGet(
    `/api/restaurants?search=${debouncedValue}&limit=10`
  );
  const { currentUser } = useCurrentUser();
  const { data: userReviews } = useGet(
    `/api/users/${currentUser?._id}/reviews`,
    {
      skip: !currentUser,
    }
  );

  return (
    <div className="max-w-md">
      <div className="p-4">
        {query.fromRateSuccess && (
          <div
            className="
              flex
              flex-col items-center justify-center
              mb-5 p-3 text-center border-2 rounded-lg bg-white shadow-md
            "
          >
            <div className="flex items-center mb-2">
              <CheckCircle className="text-green-400 mr-3 -mb-1" size={36} />
              <div className="font-bold text-xl">Avis publié!</div>
            </div>
            <div className="text-gray-400 px-3 text-sm">
              Merci d&apos;avoir noté cette poutine. Votre avis compte! Chaque
              note que vous donnez aide la communauté à trouver les meilleures
              poutine locales.
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded text-gray-700 text-sm mt-2 cursor-pointer">
              <Link href={`/restaurants/${query.fromRateSuccess}`}>
                Voir l&apos;avis
              </Link>
            </div>
          </div>
        )}
        <h1 className="text-xl font-black mb-2">
          Noter une {query.fromRateSuccess && "autre"} poutine
        </h1>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          className="font-bold text-sm"
          placeholder="Quelle poutine voulez-vous noter?"
          isSearch
          loading={searchResultsLoading}
        />
      </div>

      {searchResults?.length > 0 ? (
        <SelectRestaurant
          restaurants={searchResults}
          userRatedRestaurants={userReviews}
        />
      ) : (
        !searchResultsLoading &&
        debouncedValue === searchQuery && (
          <div className="text-sm p-5 text-gray-400">
            Aucun résultat pour &quot;{searchQuery}&quot;
          </div>
        )
      )}
      <div className="mb-20 shadow-md px-3 py-6 border rounded my-3 mx-3 flex items-center justify-between">
        <div>
          <div className="font-black text-lg mb-1 text-gray-900">
            Restaurant introuvable?
          </div>
          <div className="text-gray-500 text-sm font-light">
            Contribuez à la communauté en ajoutant une poutinerie.
          </div>
        </div>
        <Link passHref href={`/admin/create-restaurant`}>
          <Button variant={VariantColor.light} size="sm" height="sm">
            Ajouter un restaurant
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Noter;

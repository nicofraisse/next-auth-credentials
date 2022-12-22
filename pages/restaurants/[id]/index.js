import { useGet } from "lib/useAxios";
import { useRouter } from "next/router";
import Spinner from "components/Spinner";
import RestaurantReviews from "components/page-layouts/RestaurantReviews";
import RestaurantHeader from "components/RestaurantHeader";
import {
  Edit,
  ExternalLink,
  Info,
  MapPin,
  Phone,
  PhoneCall,
  Trash,
} from "react-feather";
import Map from "components/Map";
import { useEffect, useState } from "react";
import { formatAddress } from "lib/formatAddress";

import { ReviewOverview } from "../../../components/ReviewOverview";
import { RestaurantInfo } from "../../../components/RestaurantInfo";
import { ToggleSwitch } from "../../../components/controls/ToggleSwitch";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useCurrentUser } from "lib/useCurrentUser";

const Index = () => {
  const { query, reload, push } = useRouter();
  const { data: restaurant, loading } = useGet(`/api/restaurants/${query.id}`, {
    skip: !query.id,
  });
  const [showMap, setShowMap] = useState(false);
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    setShowMap(window?.innerWidth >= 640);

    window.addEventListener("resize", () => {
      if (window.innerWidth < 640) {
        setShowMap(false);
      } else {
        setShowMap(true);
      }
    });
  }, []);

  const handleApprove = async (id, approved) => {
    await axios
      .post(`/api/restaurants/${id}/approve`, { approved })
      .then(() => {
        reload(window.location.pathname);
      })
      .catch((e) => console.log("error", e.message));
  };

  const handleDelete = async ({ _id, name }) => {
    if (window.confirm(`Êtes-vous sûr(e) de vouloir supprimer "${name}?"`)) {
      await axios
        .delete(`/api/restaurants/${_id}/delete`)
        .then(() => {
          toast.success("Supprimé!");
          push("/admin/restaurants");
        })
        .catch((e) => toast.error(e.message));
    }
  };

  if (!restaurant || loading) return <Spinner />;
  return (
    <div className="bg-[#fafafa] min-h-screen-minus-navbar">
      <RestaurantHeader restaurant={restaurant} />
      <div className="p-4 xl:p-6 flex flex-col-reverse lg:flex-row">
        <div className="lg:basis-2/3 lg:max-w-2/3">
          {!restaurant.approved && (
            <div className="p-2 lg:p-5 sm:w-auto bg-yellow-50 shadow-md rounded-lg text-sm flex mb-4">
              <Info className="inline-block min-w-8 mt-1 mr-2" size={20} />
              <p className="flex-shrink">
                Ce restaurant est en cours de vérification par un membre de
                notre équipe. En attendant, vous pouvez écrire un avis sur leur
                poutine, il sera visible par le reste de la communauté aussitôt
                que le restaurant est approuvé!
              </p>
            </div>
          )}
          <RestaurantReviews restaurant={restaurant} />
        </div>
        {currentUser?.isAdmin && (
          <div className="lg:w-1/3 lg:sticky lg:top-4 lg:h-full lg:ml-4 xl:ml-6 block sm:flex flex-row-reverse items-center lg:block">
            <div className="bg-white shadow-md rounded-lg text-sm p-3 xl:p-5 mb-4 text-center text-gray-800 w-auto sm:w-1/2 lg:w-auto flex items-center justify-between">
              <div className="flex">
                <ToggleSwitch
                  onChange={() =>
                    handleApprove(restaurant._id, !restaurant.approved)
                  }
                  checked={restaurant.approved}
                />
                <span className="ml-2">Approved</span>
              </div>
              <div>
                <button
                  className="p-1 bg-gray-200 rounded shadow hover:bg-gray-100 mx-2"
                  onClick={() => push(`/restaurants/${restaurant._id}/edit`)}
                >
                  <Edit size={20} />
                </button>
                <button
                  className="p-1 bg-gray-200 rounded shadow hover:bg-gray-100 mx-2"
                  onClick={() => handleDelete(restaurant)}
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg text-sm p-3 xl:p-5 mb-4 text-center text-gray-800 w-auto sm:w-1/2 lg:w-auto">
              <ReviewOverview restaurant={restaurant} />
            </div>

            <div className="bg-white shadow-md rounded-lg text-xs xl:text-sm p-4 text-gray-800 w-auto sm:w-1/2 lg:w-auto sm:mr-4 lg:mr-0 mb-4 lg:mb-0">
              <RestaurantInfo
                showMap={showMap}
                setShowMap={setShowMap}
                restaurant={restaurant}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

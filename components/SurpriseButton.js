import { useRouter } from "next/router";
import Button from "./Button";
import Image from "next/image";

export const SurpriseButton = () => {
  const router = useRouter();

  const handleClick = async () => {
    const response = await fetch("/api/restaurants/surprise");
    const restaurant = await response.json();
    await router.push(`/restaurants/${restaurant.slug}`);
  };

  return (
    <Button
      variant="secondary"
      width="smd"
      height="smd"
      className="bg-white shadow-md flex items-center"
      onClick={handleClick}
      type="button"
    >
      <div className="dice-container">
        <Image alt="poutine-logo" src="/dice.png" width={40} height={40} />
      </div>
      Surprends-moi
    </Button>
  );
};

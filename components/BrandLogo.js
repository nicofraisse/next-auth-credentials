import Image from "next/image";

export const BrandLogo = () => {
  return (
    <div className="flex items-center -ml-4 transform scale-75">
      <Image
        alt="poutine-logo"
        src="/poutine.png"
        width={1.506 * 80}
        height={80}
      />
      <div className="text-2xl font-black mt-[-8px] ml-1">
        <div className="text-amber-600">POUTINE</div>
        <div className="mt-[-10px] text-orange-600">
          MANIA<span className="text-gray-300">.ca</span>
        </div>
      </div>
    </div>
  );
};

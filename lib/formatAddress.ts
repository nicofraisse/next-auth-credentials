export const formatAddress = (restaurant) => {
  return restaurant.succursales.length > 1
    ? `${restaurant.succursales.length} adresses au Québec`
    : restaurant.succursales[0].address.place_name;
};
export const formatCity = (restaurant) => {
  return restaurant.succursales.length > 1
    ? `${restaurant.succursales.length} adresses`
    : restaurant.succursales[0].address.context.find((c) =>
        c.id.includes("place")
      )?.text;
};
export const formatCountry = (restaurant) => {
  return restaurant.succursales.length > 1
    ? `${restaurant.succursales.length} adresses`
    : restaurant.succursales[0].address.context.find((c) =>
        c.id.includes("country")
      )?.text;
};

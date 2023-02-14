export const fetchVisaAccordingToCountry = (country) => ({
  method: "GET",
  url: `/visa/country/${country}`,
});

export const fetchVisaCountries = () => ({
  method: "GET",
  url: "/visa",
});

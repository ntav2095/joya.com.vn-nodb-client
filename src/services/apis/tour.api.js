export const fetchTours = (params = {}) => ({
  url: `/tour`,
  method: "GET",
  params: params,
});

export const fetchSingleTour = (tourId) => ({
  url: `/tour/${tourId}`,
  method: "GET",
});

export const bookTour = (data) => ({
  method: "POST",
  url: "/tour/booking",
  data,
});

export const callMe = (data) => ({
  method: "POST",
  url: "/tour/advisory",
  data,
});

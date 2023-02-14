export const fetchGuides = (params = {}) => ({
  url: `/article`,
  method: "GET",
  params,
});

export const fetchSingleArtile = (slug) => ({
  url: `/article/${slug}`,
  method: "GET",
});

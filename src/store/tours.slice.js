import axios from "../services/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTours as fetchToursApi } from "../services/apis";

const initialState = {
  tours: [],
  status: "idle", // idle | pending | succeeded | fail
  error: null,
};

export const fetchTours = createAsyncThunk(
  "tours/fetchTours",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(fetchToursApi());

      const tours = response.data.data;
      return tours.map((item) => ({
        ...item,
        is_vn_tour: item.destinations.every((dest) => dest.region),
        is_eu_tour: item.destinations.some(
          (dest) => dest.continent === "europe"
        ),
      }));
    } catch (error) {
      console.error(error);
      if (error.response?.data) {
        return rejectWithValue({
          message: error.response.data.message || "",
          httpCode: error.response.status,
        });
      } else {
        return rejectWithValue({
          message: error.message,
          httpCode: null,
        });
      }
    }
  }
);

const toursSlice = createSlice({
  name: "tours",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTours.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tours = action.payload;
      })
      .addCase(fetchTours.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const selectTours = (state) => state.tours.tours;

// hot tours
export const selectHotEuTours = (state) => {
  return state.tours.tours
    .filter((tour) => tour.hot && tour.is_eu_tour)
    .slice(0, 6);
};
export const selectHotVnTours = (state) =>
  state.tours.tours.filter((tour) => tour.hot && tour.is_vn_tour).slice(0, 6);

// tour châu âu
export const selectEuTours = (state) =>
  state.tours.tours.filter((tour) => tour.is_eu_tour);

// tour việt nam
export const selectVnTours = (state) =>
  state.tours.tours.filter((tour) => tour.is_vn_tour);

export const selectToursStatus = (state) => state.tours.status;
export const selectToursError = (state) => state.tours.error;
export const selectHomeSliderTours = (state) =>
  state.tours.tours.filter((tour) => tour.is_home_slider);

// tour banner
export const selectEuSliderTours = (state) =>
  state.tours.tours.filter((tour) => tour.is_europe_slider);

export const selectVnSliderTours = (state) =>
  state.tours.tours.filter((tour) => tour.is_domestic_slider);

export const selectToursStatistic = (state) => {
  const euTours = state.tours.tours.filter((tour) => tour.is_eu_tour);

  const vnTours = state.tours.tours.filter((tour) => {
    return tour.is_vn_tour;
  });

  let euCountries = Array.from(
    new Set(
      euTours
        .reduce((prev, cur) => [...prev, ...cur.destinations], [])
        .filter(
          (dest) =>
            (dest.country || dest.type === "country") &&
            dest.continent.slug === "chau-au"
        )
        .map((dest) => {
          if (dest.country)
            return {
              name: dest.country.name,
              slug: dest.country.slug,
            };

          if (dest.type === "country")
            return {
              name: dest.name,
              slug: dest.slug,
            };
        })
    )
  );

  let vnProvinces = vnTours
    .reduce((prev, cur) => [...prev, ...cur.destinations], [])
    .filter((dest) => dest.country.slug === "viet-nam")
    .map((dest) => {
      if ((dest.type === "city" && !dest.province) || dest.type === "province")
        return {
          name: dest.name,
          slug: dest.slug,
        };

      if (dest.province)
        return {
          name: dest.province.name,
          slug: dest.province.slug,
        };
    });

  vnProvinces = Array.from(
    new Set(vnProvinces.map((item) => JSON.stringify(item)))
  ).map((item) => JSON.parse(item));

  euCountries = Array.from(
    new Set(euCountries.map((item) => JSON.stringify(item)))
  ).map((item) => JSON.parse(item));

  const euToursCatalogue = euCountries.map((country) => {
    const toursCount = euTours.filter((tour) =>
      tour.destinations.some(
        (dest) =>
          dest.country?.name === country.name ||
          (dest.type === "country" && dest.name === country.name)
      )
    ).length;

    return { place: country, toursCount };
  });

  const matchesProvince = (tour, province) =>
    tour.destinations.some((dest) => {
      // xét 3 trường hợp
      // 1: type === province: {... type: province, name: Đồng Nai }
      // 2: type !== province: {... type: city, name: Biên Hòa, province: { type: province, name: Đồng Nai } }
      // 3: thành phố trực thuộc trung ương: type === city, province === null: { type: city, province: null, name: TP Đà Nẵng }
      return (
        dest.province?.name === province.name ||
        (dest.type === "province" && dest.name === province.name) ||
        (dest.type === "city" && !dest.province && dest.name === province.name)
      );
    });

  const vnToursCatalogue = vnProvinces.map((province) => {
    const toursCount = vnTours.filter((tour) =>
      matchesProvince(tour, province)
    ).length;

    return { place: province, toursCount };
  });

  return {
    eu: {
      totalCount: euTours.length,
      countByPlace: euToursCatalogue,
    },
    vn: {
      totalCount: vnTours.length,
      countByPlace: vnToursCatalogue,
    },
  };
};

export default toursSlice.reducer;

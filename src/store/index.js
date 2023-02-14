import { configureStore } from "@reduxjs/toolkit";

// reducers
import visaReducer from "./visa.slice";
import toursReducer from "./tours.slice";
import guidesReducer from "./guides.slice";
import companyReducer from "./company.slice";
import lazy from "./lazyloading.slice";

const store = configureStore({
  reducer: {
    visa: visaReducer,
    tours: toursReducer,
    guides: guidesReducer,
    lazy: lazy,
    company: companyReducer,
  },
});

export default store;

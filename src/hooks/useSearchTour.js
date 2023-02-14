import { useSelector } from "react-redux";
import {
  selectEuTours,
  selectTours,
  selectVnTours,
} from "../store/tours.slice";
import StringHandler from "../services/helpers/StringHandler";

function useSearchTour(searchTerm) {
  const tours = useSelector(selectTours);

  // *********** HANDLE SEARCH ************
  let str = searchTerm.toLowerCase().trim();
  const hasAccent = StringHandler.hasAccent(str);

  let results = tours;
  if (str) {
    if (hasAccent) {
      results = tours.filter((tour) => tour.name.toLowerCase().includes(str));
    } else {
      results = tours.filter((tour) =>
        StringHandler.removeAccents(tour.name).toLowerCase().includes(str)
      );
    }
  }

  return results;
}

export default useSearchTour;

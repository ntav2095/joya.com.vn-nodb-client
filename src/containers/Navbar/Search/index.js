import { magnifyingGlass as searchSVG } from "../../../assets/svgs";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import SearchResults from "./SearchResults";
import styles from "./Search.module.css";

function Search() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const searchRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    setSearchTerm("");
    setIsSearching(false);
  }, [location]);

  return (
    <div className={styles.searchbar} ref={searchRef}>
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsSearching(true)}
      />

      <div className={styles.spinner}>{searchSVG}</div>

      {isSearching && (
        <div className={styles.results}>
          <SearchResults
            inputRef={inputRef}
            onHide={() => setIsSearching(false)}
            searchTerm={searchTerm}
          />
        </div>
      )}
    </div>
  );
}

export default Search;

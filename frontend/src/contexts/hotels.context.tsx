import { createContext, useContext, useState } from "react";

type SearchContextType = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  saveSearchedValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number
  ) => void;
};

const SearchContext = createContext<SearchContextType | null>(null);

const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchValues, setSearchValues] = useState({
    destination: "",
    checkIn: new Date(),
    checkOut: new Date(),
    adultCount: 1,
    childCount: 0,
    hotelId: "",
  });

  const saveSearchedValues = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => {
    setSearchValues({
      destination: destination,
      checkOut: checkOut,
      checkIn: checkIn,
      adultCount: adultCount,
      childCount: childCount,
      hotelId: hotelId ? hotelId : "",
    });
  };

  const context: SearchContextType = {
    ...searchValues,
    saveSearchedValues,
  };

  return (
    <SearchContext.Provider value={context}>{children}</SearchContext.Provider>
  );
};

// eslint-disable-next-line
export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("Context Should be provided.");
  }
  return context;
};

export default SearchContextProvider;

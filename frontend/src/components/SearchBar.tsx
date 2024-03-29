import { type FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/hotels.context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const searchValues = useSearchContext();
  const navigate = useNavigate();

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const [searchItems, setSearchItems] = useState({
    destination: searchValues.destination,
    checkIn: searchValues.checkIn,
    checkOut: searchValues.checkOut,
    adultCount: searchValues.adultCount,
    childCount: searchValues.childCount,
  });

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    searchValues.saveSearchedValues(
      searchItems.destination,
      searchItems.checkIn,
      searchItems.checkOut,
      searchItems.adultCount,
      searchItems.childCount
    );

    navigate("/search");
  };

  const clearSearchInputsHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    searchValues.saveSearchedValues("", new Date(), maxDate, 1, 0);
    setSearchItems({
      destination: "",
      checkIn: new Date(),
      checkOut: maxDate,
      adultCount: 1,
      childCount: 0,
    });
  };

  return (
    <div className="w-full p-[2px] bg-[#9BABB8] shadow-lg">
      <form
        onSubmit={submitHandler}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1fr_1fr_140px_140px_1fr] items-center gap-[1px]"
      >
        <div className="flex items-center h-[65px] bg-white px-3 gap-3">
          <span>🌏</span>
          <input
            type="search"
            className="outline-none py-3 w-full"
            placeholder="Where are you going?"
            value={searchItems.destination}
            onChange={(event) =>
              setSearchItems((prevState) => ({
                ...prevState,
                destination: event.target.value,
              }))
            }
          />
        </div>
        <div className="flex items-center justify-between h-[65px] bg-white px-3 gap-3">
          <label htmlFor="adultCount" className="flex items-center md:gap-2">
            Adults:
            <input
              type="number"
              id="adultCount"
              max={20}
              min={1}
              className="outline-none w-full py-3"
              placeholder="Where are you going?"
              value={searchItems.adultCount}
              onChange={(event) =>
                setSearchItems((prevState) => ({
                  ...prevState,
                  adultCount: +event.target.value,
                }))
              }
            />
          </label>
          <label htmlFor="childCount" className="flex items-center md:gap-2">
            Children:
            <input
              type="number"
              id="childCount"
              max={20}
              min={0}
              className="outline-none w-full py-3"
              placeholder="Where are you going?"
              value={searchItems.childCount}
              onChange={(event) =>
                setSearchItems((prevState) => ({
                  ...prevState,
                  childCount: +event.target.value,
                }))
              }
            />
          </label>
        </div>

        <div className=" bg-white h-[65px] flex items-center">
          <DatePicker
            selected={searchItems.checkIn}
            onChange={(date) =>
              setSearchItems((prevState) => ({
                ...prevState,
                checkIn: date as Date,
              }))
            }
            selectsStart
            startDate={searchItems.checkIn}
            endDate={searchItems.checkOut}
            minDate={new Date()}
            maxDate={maxDate}
            placeholderText="Check In Date"
            className="w-full bg-white p-3 outline-none"
            wrapperClassName="w-full"
          />
        </div>

        <div className="bg-white h-[65px] flex items-center">
          <DatePicker
            selected={searchItems.checkOut}
            onChange={(date) =>
              setSearchItems((prevState) => ({
                ...prevState,
                checkOut: date as Date,
              }))
            }
            selectsStart
            startDate={searchItems.checkIn}
            endDate={searchItems.checkOut}
            minDate={new Date()}
            maxDate={maxDate}
            placeholderText="Check In Date"
            className="w-full bg-white p-3 outline-none"
            wrapperClassName="w-full"
          />
        </div>
        <div className="flex items-center gap-[2px] h-[65px] ">
          <Button
            className="w-[60%] bg-gray-900 text-white h-full px-4 py-2 font-normal hover:bg-gray-800 uppercase"
            type="submit"
          >
            Search
          </Button>
          <Button
            className="w-[40%] bg-red-600 text-white h-full px-4 py-2 font-normal hover:bg-red-500 uppercase"
            type="button"
            onClick={(e) => clearSearchInputsHandler(e)}
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

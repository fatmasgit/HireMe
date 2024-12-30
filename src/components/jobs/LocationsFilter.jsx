import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/slices/jobsSlice";
import { useTranslation } from "react-i18next";
import { clearSearchData, setJobsPerCompany, setFiltersFromOutside } from "../../redux/slices/jobsSlice"; // Adjust the import path if necessary


export default function LocationsFilter({ filter }) {

  const locationButtons = [
    { value: "Cairo", arabic: "القاهرة" },
    { value: "Giza", arabic: "الجيزة" },
    { value: "Alexandria", arabic: "الإسكندرية" },
    { value: "Ismailia", arabic: "الإسماعيلية" },
    { value: "Mansoura", arabic: "المنصورة" },
  ];



  const { t } = useTranslation();
  const [filterValue, setFilterValue] = useState("");
  const [showAll, setShowAll] = useState(false);

  const formData = useSelector((state) => state.jobs.formData); // Access the formData
  const city = useSelector((state) => state.jobs.filters.city);
  const jobsPerCompany = useSelector((state) => state.jobs.jobsPerCompany);
  const filtersFromOutside = useSelector((state) => state.jobs.filtersFromOutside);



  const dispatch = useDispatch();

  // making sure to set any other filters data to null & dispatching the current fillters
  const handleButtonClick = (value) => {

    if (formData) {
      dispatch(clearSearchData());
    }

    if (jobsPerCompany) {
      dispatch(setJobsPerCompany(null));
    }

    if (filtersFromOutside) {
      dispatch(setFiltersFromOutside(false));
    }


    const lowerCaseValue = value.toLowerCase();
    setFilterValue((prevValue) => {
      return prevValue.includes(lowerCaseValue)
        ? prevValue.filter((item) => item !== lowerCaseValue)
        : [...prevValue, lowerCaseValue];
    });
  };





  useEffect(() => {
    if (city === "") {
      setFilterValue([]);
    }
  }, [city, filterValue]);



  useEffect(() => {
    dispatch(setFilter({ name: "city", value: filterValue }));

  }, [filterValue, dispatch]);


  //clearing all fillters
  const clearFilter = () => {
    setFilterValue([]);
    dispatch(setFilter({ name: "city", value: [] }));
  };



  return (
    <div className="mx-auto flex h-fit flex-col items-center justify-center 
    gap-y-2 rounded-lg border-[1px] border-[#c0bcbc] bg-white py-3 
   xs:w-full md:w-[47%] lg:w-full">
      <p className="my-1 xs:text-sm  xl:text-base">
        <span className="font-PoppinsSemiBold  xl:text-base    mx-1   ltr:font-PoppinsMedium  rtl:font-TajawalMedium ">
          {/*  {filter} */} {t('Jobs By Location')}
        </span>

      </p>


      <button
        onClick={clearFilter}
        className="mx-auto w-[90%] rounded-md border-[1px] border-[#3B235D] 
           ltr:font-PoppinsMedium rtl:font-TajawalMedium   xs:h-[2.2rem] xl:h-[2.5rem]
            xs:text-sm xl:text-base bg-white text-[#3B235D] "
      >
        {t('clearFilters')}
      </button>


      {/* Show first three locations or all locations based on toggle */}
      {(showAll ? locationButtons : locationButtons.slice(0, 3)).map(
        (button) => (
          <button
            key={button.value}
            onClick={() => handleButtonClick(button.value)}
            className={`mx-auto w-[90%] rounded-md border-[1px] border-[#3B235D]
               ltr:font-PoppinsMedium
                rtl:font-TajawalMedium transition-all duration-300 xs:h-[2.2rem] 
                 xl:h-[2.5rem]  xs:text-sm  xl:text-base ${filterValue.includes(button.value.toLowerCase())
                ? "bg-[#3B235D] text-white"
                : "bg-white text-[#3B235D]"
              }`}
          >




            <span className="ltr:hidden    rtl:block" >{button.arabic}</span>
            <span className="rtl:hidden     ltr:block" > {button.value}</span>

          </button>
        ),
      )}

      {/* Toggle button for showing more or less */}
      <button
        onClick={() => setShowAll(!showAll)}
        className="mx-auto w-[90%] rounded-md border-[1px] border-[#3B235D] bg-white 
       ltr:font-PoppinsMedium  rtl:font-TajawalMedium  text-[#3B235D] xs:h-[2.2rem] xs:text-[0.9rem] xl:h-[2.5rem] xl:text-[1rem]"
      >
        {showAll ? t("showLess") : t("showMore")}
      </button>
    </div>
  );
}

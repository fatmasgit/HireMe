import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchData, setJobsPerCompany, setFiltersFromOutside } from "../../redux/slices/jobsSlice"; // Adjust the import path if necessary
import { setFilter } from "../../redux/slices/jobsSlice";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function SkillsFilter({ filter }) {
  const filterButtons = [
    { value: ".NET" },
    { value: "Python" },
    { value: "Android" },
    { value: "SQL" },
    { value: "JavaScript" },
    { value: "Flutter" },
  ];

  const [filterValue, setFilterValue] = useState([]);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const skill = useSelector((state) => state.jobs.filters.skill);
  const formData = useSelector((state) => state.jobs.formData);
  const jobsPerCompany = useSelector((state) => state.jobs.jobsPerCompany);
  const filtersFromOutside = useSelector((state) => state.jobs.filtersFromOutside);




  useEffect(() => {
    if (skill === "") {
      setFilterValue([]);
    }
  }, [skill]);



  //clear fillters on unmount
  useEffect(() => {
    return () => {
      dispatch(setFilter({ name: "skill", value: [] }));
      dispatch(setJobsPerCompany(null));
    };
  }, [dispatch]);



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
      const newFilterValue = prevValue.includes(lowerCaseValue)
        ? prevValue.filter((item) => item !== lowerCaseValue)
        : [...prevValue, lowerCaseValue];


      dispatch(setFilter({ name: "skill", value: newFilterValue }));
      return newFilterValue;
    });
  };


  //clearing all fillters
  const clearFilter = () => {
    setFilterValue([]);
    dispatch(setFilter({ name: "skill", value: [] }));
  };



  return (
    <div className="mx-auto flex h-fit flex-col items-center justify-center gap-y-2 rounded-lg border-[1px] border-[#c0bcbc] bg-white py-3 xs:w-full md:w-[47%] lg:w-full">
      <p className="my-1 xs:text-sm xl:text-base">
        <span className="ltr:font-PoppinsSemiBold rtl:font-TajawalMedium xl:text-base mx-1">
          {t("Jobs By Skill")}
        </span>

      </p>


      <button
        onClick={clearFilter}
        className="mx-auto w-[90%] rounded-md border-[1px] border-[#3B235D] 
       ltr:font-PoppinsMedium  rtl:font-TajawalMedium   xs:h-[2.2rem] xl:h-[2.5rem] xs:text-sm xl:text-base bg-white text-[#3B235D] "
      >
        {t('clearFilters')}
      </button>

      {filterButtons.map((button) => (
        <button
          key={button.value}
          onClick={() => handleButtonClick(button.value)}
          className={`mx-auto w-[90%] rounded-md border-[1px] border-[#3B235D]
             font-PoppinsMedium transition-all duration-300
            xs:h-[2.2rem] xl:h-[2.5rem] xs:text-sm xl:text-base ${filterValue.includes(button.value.toLowerCase())
              ? "bg-[#3B235D] text-white"
              : "bg-white text-[#3B235D]"
            }`}
        >
          {button.value}
        </button>
      ))}


    </div>
  );
}
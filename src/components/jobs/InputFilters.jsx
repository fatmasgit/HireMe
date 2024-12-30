import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter , clearSearchData ,setJobsPerCompany ,setFiltersFromOutside } from "../../redux/slices/jobsSlice";
import { useTranslation } from "react-i18next";



export default function InputFilters() {
  const dispatch = useDispatch();
   const { i18n } = useTranslation();

  const jobTypesValues = [
    { value: "Part Time", valueAr: "دوام جزئي" },
    { value: "Full Time", valueAr: "دوام كامل" },
  ];

  const workModeValues = [
    { value: "Hybrid" , valueAr: 'هجيني'  },
    { value: "Remote"  , valueAr: 'عن بُعد' },
    { value: "On Site" , valueAr: 'في الموقع' }, 
  ];



  const formData = useSelector((state) => state.jobs.formData); 
  const {   workMode , jobType } = useSelector((state) => state.jobs.filters);
  const jobsPerCompany=useSelector((state) => state.jobs.jobsPerCompany); 
  const  filtersFromOutside = useSelector((state) => state.jobs.filtersFromOutside);
  const [jobTypesValue, setjobTypesValue] = useState("");
  const [workModeValue, setworkModeValue] = useState("");


  
   // making sure to set any other filters data to null & dispatching the current fillters
   const handleClick = (value, type) => {

    if (formData) {
      dispatch(clearSearchData());
    }
    if (jobsPerCompany) {
      dispatch(setJobsPerCompany(null));
    }

    if (filtersFromOutside) {
      dispatch(setFiltersFromOutside(false));
    }


    if (type === "jobTypesValue") {
      setjobTypesValue((prev) => (prev === value.toLowerCase() ? "" : value.toLowerCase()));
    } else if (type === "workModeValue") {
      setworkModeValue((prev) => (prev === value.toLowerCase() ? "" : value.toLowerCase()));
    }
  };
 

  useEffect(() => {
      dispatch(setFilter({ name: "jobType", value: jobTypesValue }));
}, [jobTypesValue, dispatch]);


  useEffect(() => {
   dispatch(setFilter({ name: "workMode", value: workModeValue }));
}, [workModeValue, dispatch]);


useEffect(() => {
  if ( workMode ==='' && jobType ==='' &&  (workModeValue!=='' || jobTypesValue!=='' )) {
    setjobTypesValue('')  
    setworkModeValue('')
  }
}, [workMode, jobType ]);




  return (
    <div className="ms-1.5 flex w-full flex-col gap-y-4 bg-[#FAFAFA] py-3">
      {/* Job Types Section */}
      <div className="flex w-full justify-start gap-x-2 gap-y-2 xs:flex-wrap">
        
        {jobTypesValues.map((job, index) => (
          <button
            key={index}
            value={job.value}
            type="button"
            className={`rounded-md !border-[1px] !border-solid h-[2.2rem] px-3
               ltr:font-PoppinsMedium rtl:font-TajawalMedium xs:text-xs 
               lg:text-sm ${
              jobTypesValue === job.value.toLowerCase()
                ? "bg-[#3B235D] text-white border-[#3B235D]"
                : "bg-white text-[#3B235D] border-[#3B235D]"
            }`}
            onClick={() => handleClick(job.value, "jobTypesValue")}
          >
             { i18n.dir(i18n.language) =='rtl' ? job.valueAr : job.value}
          </button>
        ))}
  
  
  
   {workModeValues.map((mode, index) => (
          <button
            key={index}
            value={mode.value}
            type="button"
            className={`rounded-md !border-[1px] !border-solid h-[2.2rem] px-3
              ltr:font-PoppinsMedium rtl:font-TajawalMedium xs:text-xs lg:text-sm ${
              workModeValue === mode.value.toLowerCase()
                ? "bg-[#3B235D] text-white border-[#3B235D]"
                : "bg-white text-[#3B235D] border-[#3B235D]"
            }`}
            onClick={() => handleClick(mode.value, "workModeValue")}
          >
            { i18n.dir(i18n.language) =='rtl' ? mode.valueAr : mode.value}
          </button>
        ))}
      </div>
    </div>
  );
}

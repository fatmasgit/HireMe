import React, { useState } from 'react'
import SelectCity from "./SelectCity";
import SelectMajor from "./SelectMajor";
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { fetchJobsByCityAndCategory, resetFilters } from '../../redux/slices/jobsSlice'
import { useNavigate } from 'react-router-dom';


export default function HeaderForm() {
  const { t, i18n } = useTranslation();
  const direction = i18n.dir(i18n.language);
  const [selectedCity, setselectedCity] = useState("");
  const [selectedMajor, setselectedMajor] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchJobsByCityAndCategory({ city: selectedCity.value, category: selectedMajor.value }));
    dispatch(resetFilters())
    navigate("/Search")
  };


  return (
    <form className="flex flex-col  justify-center gap-y-[0.6rem] 
    xs:w-[65%]  sm:w-[40%]  md:w-[35%] lg:w-[28%] xl:w-[24%] 2xl:w-[22%]
   "        onSubmit={handleSubmit} >
      <input
        className="  outline-none placeholder:text-[#808184] 
      xs:h-[2.3rem]  sm:h-[2.5rem]  w-full rounded-md  px-3   xs:text-xs   sm:text-sm  
            rtl:font-TajawalMedium  ltr:font-PoppinsRegular"
        placeholder={t("What Are You Looking For ?")}
      />

      <SelectCity setselectedCity={setselectedCity} />
      <SelectMajor setselectedMajor={setselectedMajor} />
      <button type="submit" className="bg-[#3B235D]   w-full
     text-white xs:h-[2.2rem]  rounded-md  xs:text-sm    xs:tracking-[1px] 
     sm :text-base rtl:font-TajawalRegular  ltr:font-PoppinsRegular">
        {t("Search")}
      </button>
    </form>

  )
}

import React, { useEffect } from "react";
import HeroBackGround from "../components/HeroBackGround";
import { IoIosArrowForward } from "react-icons/io";
import JobsSection from "../components/jobs/jobsSection";
import LocationsFilter from "../components/jobs/LocationsFilter";
import SkillsFilter from "../components/jobs/SkillsFillter";
import TopRatedCarousel from "../components/jobs/TopRatedJobsCrousel";
import InputFilters from "../components/jobs/InputFilters";
import { fetchJobs } from '../redux/slices/jobsSlice'
import { useDispatch, useSelector } from "react-redux";



export default function RandomJobsPage() {
  const dispatch = useDispatch();

  const { filters} = useSelector((state) => state.jobs);
  const { data ,jobsPerCompany, status ,error } = useSelector((state) => state.jobs);



  useEffect(() => {
 
    dispatch(fetchJobs());
  }, [filters, dispatch]); 


  const displayData = jobsPerCompany || data;



  return (
    <div className="bg-[#FAFAFA]">
      <HeroBackGround>
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-3 leading-relaxed">
          <p className="font-PoppinsRegular text-white xs:text-base 
          sm:text-lg md:text-xl  lg:text-2xl  ">
            <span className="font-PoppinsMedium"> {displayData?.length}</span> Jobs For Developers
          </p>
          <p className="flex items-center font-PoppinsRegular text-base text-white ">
            {" "}
            Home <IoIosArrowForward className="mx-2 md:mx-3  rtl:rotate-180 " /> Jobs
          </p>
        </div>
      </HeroBackGround>

      {/* filters */}
      <div className="mx-auto bg-[#FAFAFA] pt-4 xs:w-[90%] lg:w-[85%] xl:w-[78%]">
        <InputFilters />
      </div>

      {/* jobs section */}
      

      <div className="w-full bg-[#FAFAFA]">
        {/* screens */}
        <div className="   mx-auto flex  flex-col  xs:w-[90%] lg:w-[85%]   lg:flex-row ">
          {/* job card */}
          <div className="bg-[#FAFAFA] w-full lg:w-[63%]">
            <JobsSection  data={displayData}   status={status}   error={error} />
          </div>

          {/*  filtters */}
          <div className="mx-auto flex flex-col gap-y-4 bg-[#FAFAFA] 
          xs:w-[85%]  lg:w-[33%]  sm:w-full   sm:flex-row  sm:flex-wrap  xs:pt-[3rem] 
           lg:flex-col lg:pt-0">
            <LocationsFilter filter="Jobs" />
            <SkillsFilter filter="Jobs" />
            <TopRatedCarousel filter="jobs" />
          </div>
        </div>
      </div>
    </div>
  );
}

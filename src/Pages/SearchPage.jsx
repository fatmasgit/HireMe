import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, clearSearchData } from "../redux/slices/jobsSlice";
import HeroSearch from "../components/Search/HeroSearch";
import JobsSection from "../components/jobs/jobsSection";
import InputFilters from "../components/jobs/InputFilters";
import SkillsFilter from "../components/jobs/SkillsFillter";
import LocationsFilter from "../components/jobs/LocationsFilter";
import TopRatedCarousel from "../components/jobs/TopRatedJobsCrousel";

export default function SearchPage() {
  const dispatch = useDispatch();
  const { filters, formData, data, status, error } = useSelector((state) => state.jobs);

  // UseEffect to fetch jobs if no formData is present
 useEffect(() => {
    if (!formData ) {
      dispatch(fetchJobs()); // Fetch jobs if no formData
    }
  }, [formData, dispatch  ,filters]);

  // Data to display
  const displayedData = formData ? formData : data; // Prioritize formData over filtered data

  return (
    <div className="w-full bg-[#FAFAFA]">
      <HeroSearch />

      {/* Filters */}
      <div className="mx-auto bg-[#FAFAFA] pt-4 xs:w-[90%] lg:w-[85%] xl:w-[78%]">
        <InputFilters />
      </div>

      {/* Jobs Section */}
      <div className="w-full bg-[#FAFAFA]">
        <div className="mx-auto flex xs:w-[90%] xs:flex-col lg:w-[85%] lg:flex-row xl:w-[78%]">
          {/* Job Cards */}
          <div className="bg-[#FAFAFA] xs:w-full lg:w-[63%]">
            <JobsSection data={displayedData} status={status} error={error} />
          </div>

          {/* Filters Section */}
          <div className="mx-auto flex flex-col gap-y-4 bg-[#FAFAFA] 
          xs:w-[85%]  lg:w-[33%]  sm:w-full   sm:flex-row  sm:flex-wrap  xs:pt-[3rem] 
           lg:flex-col lg:pt-0">
          <LocationsFilter filter="Jobs" /> 
            <SkillsFilter filter="Jobs" />
            <TopRatedCarousel filter="Jobs" />
          </div>
        </div>
      </div>
    </div>
  );
}

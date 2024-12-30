import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Company from "./companiesCarouselCard";
import { fetchCompanies, fetchCompanyJobs } from "../../redux/slices/companiesSlice"; // Adjust path accordingly
import { setJobsPerCompany } from "../../redux/slices/jobsSlice"; // Add this import
import { useNavigate } from "react-router-dom";

export default function CompaniesCarousel() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { companies, loadingCompanies, companiesError, companiesWithJobs } = useSelector(
    (state) => state.companies
  );

  // Fetch companies on component mount
  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  // Fetch jobs for each company when companies are loaded
  useEffect(() => {
    if (companies.length > 0) {
      companies.forEach((company) => {
        dispatch(fetchCompanyJobs(company.name));
      });
    }
  }, [dispatch, companies]);

  // Process companiesWithJobs to get top 4 companies
  const topCompanies = Object.entries(companiesWithJobs)
    .map(([name, jobs]) => ({ name, jobs, jobCount: jobs.length }))
    .sort((a, b) => b.jobCount - a.jobCount) // Sort by job count in descending order
    .slice(0, 4); // Get top 4 companies

  // Filter the companies array to include only top companies
  const filteredCompanies = companies.filter((company) =>
    topCompanies.some((topCompany) => topCompany.name === company.name)
  );

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    speed: 300,
    arrows: false,
    responsive: [
      { breakpoint: 700, settings: { slidesToShow: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 1536, settings: { slidesToShow: 3 } },
    ],
  };


  //open jobs related to the company in jobs page
  const handleCompanyClick = (companyName) => {
    const jobs = companiesWithJobs[companyName] || [];
    dispatch(setJobsPerCompany(jobs));
    navigate('/Jobs')

  };

  if (loadingCompanies) {
    return <p>{t("Loading")}</p>;
  }

  if (companiesError) {
    return <p>{t("Error fetching companies:")} {companiesError}</p>;
  }

  return (
    <div className="w-full bg-[#FAFAFA] py-[3rem] text-center">
      <p className="!mb-0 text-center font-PoppinsSemiBold text-base text-[#000000] md:text-lg">
        {t("TOP EMPLOYERS")}
      </p>
      <p className="mx-auto !mt-0 mb-4 max-w-[80%] font-PoppinsRegular text-sm text-[#000000] md:text-base">
        {t("Recommend top employers")}
      </p>

      <div className="slider-container mx-auto xs:w-[70%]  md:w-[75%]  ">
        <Slider {...settings}>
          {filteredCompanies.map((elm, i) => (
            <Company
              companyInfo={{
                ...elm,
                jobs: topCompanies.find((top) => top.name === elm.name)?.jobCount || 0,
              }}
              key={i}
              onClick={() => handleCompanyClick(elm.name)} 
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}

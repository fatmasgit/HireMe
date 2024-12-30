import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFilter ,setFiltersFromOutside } from "../../redux/slices/jobsSlice"; // Update the import path accordingly
import { useTranslation } from "react-i18next";

export default function Categories() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const  filtersFromOutside = useSelector((state) => state.jobs.filtersFromOutside);  


  const languages = [
    { language: "JavaScript", value: "javascript", src: "/assets/languages/js.png" },
    { language: "Flutter", value: "flutter", src: "/assets/languages/flluter.svg" },
    { language: "Android", value: "android", src: "/assets/languages/android.webp" },
    { language: ".NET", value: ".net", src: "/assets/languages/net.svg" },
    { language: "Python", value: "python", src: "/assets/languages/python.webp" },
    { language: "SQL", value: "sql", src: "/assets/languages/sql.svg" },
  ];

  const handleCategoryClick = (filterValue) => {
    // Directly dispatch the selected skill and navigate to "/jobs"
    dispatch(setFilter({ name: "skill", value: [filterValue] }));
    dispatch(  setFiltersFromOutside(true))
    navigate("/jobs");
    console.log(filterValue)
  };

  
  return (
    <div className="bg-[#FAFAFA] py-[2rem] text-center">
      <p className="!mb-0 font-PoppinsSemiBold text-base text-[#000000] md:text-lg">
        {t("Featured Skill Categories")}
      </p>
      <p className="mx-auto !mt-0 mb-4 max-w-[95%] font-PoppinsRegular text-sm text-[#000000] md:text-base">
        {t("Who are in extremely love with eco friendly system")}
      </p>

      {/* The img and text div */}
      <div className="mx-auto flex w-[80%] justify-center gap-x-5 gap-y-5 
      bg-[#FAFAFA] xs:flex-wrap  lg:flex-nowrap">
        {languages.map((elm, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-end bg-[#FAFAFA] xs:w-[25%]
             lg:w-[auto] cursor-pointer "
            onClick={() => handleCategoryClick(elm.value)} // Use `value` here to pass the skill directly
          >
            <img
              src={elm.src}
              className="object-contain xs:w-[6.5rem] md:w-[7.5rem] lg:w-[8.5rem]"
              alt={elm.language}
            />
            <p className="text-center font-PoppinsSemiBold text-base xs:mt-2 sm:mt-3">
              {elm.language}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

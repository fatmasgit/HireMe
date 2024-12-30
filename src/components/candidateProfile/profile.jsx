import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../Firebase/firebaseConfig";
import ProfileFormData from "./profileFormData";
import { fetchCandidateByUid, updateProfile } from "../../redux/slices/profileSlice";
import LangButton from "../nav/arEnButton"
import { Link } from "react-router-dom";


export default function Profile() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { candidate, loading, error } = useSelector((state) => state.candidateProfile);
  const cvUrl = candidate?.cvUrl
  const imageUrl = candidate?.imageUrl



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(fetchCandidateByUid());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);




  const handleSubmit = (values) => {
    const updatedValues = {
      ...values,
      cv: values.cv || cvUrl,
    }

    dispatch(updateProfile(updatedValues));
    console.log(updatedValues)
  };





  return (
    <div className="min-h-screen bg-[#FDFDFD] bg-cover py-5 bg-multiple">
      <div className="w-full flex  px-4 justify-between  items-start">
        <Link to="/" className="!no-underline">
          <img
            className="  w-[8rem] lg:w-[9rem] object-contain  mb-5"
            src="/assets/Logo/logo.png"
          />
        </Link>
        <LangButton />
      </div>

      <div className="mx-auto rounded-xl border-[1px] border-[#dcd9d9] bg-white px-3 py-4 shadow-md 
      xs:w-[80%] sm:w-[60%] md:w-[45%] lg:w-[35%] ">
        <p className="mb-2 text-center py-1 ltr:font-PoppinsSemiBold  rtl:font-TajawalBold text-lg text-[#444444]">
          {t("editProfile")}
        </p>


        <ProfileFormData onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

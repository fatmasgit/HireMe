import React, { useState, useEffect } from "react";
import profile from "./profile.svg"; 
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";


const ProfilePhotoUpload = ({ onChange, value, name }) => {
  const [profilePhoto, setProfilePhoto] = useState(value || null);
  const { candidate } = useSelector((state) => state.candidateProfile);
  const [profileUrl, setprofileUrl] = useState(candidate?.imageUrl);
  const { t } = useTranslation();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result); 
        onChange(name, file); 
      };
      reader.readAsDataURL(file);
    }
  };


  const handleRemoveImage = () => {
    setProfilePhoto(null); 
    onChange(name, null); 
    setprofileUrl(null)
    console.log(profileUrl)

  };

 
  useEffect(() => {
    if (!profilePhoto && profileUrl) {
      onChange(name, profileUrl); 
    }
  }, [profilePhoto, profileUrl]);

  // displaying the image: either profilePhoto, candidate imageUrl, or default profile
  const displayImage = profilePhoto || profileUrl || profile;

  return (
    <div className="mx-auto flex max-h-[9rem] w-[50%] flex-col items-center justify-end">
      <div className="relative">
        <img
          src={displayImage}
          alt="Profile"
          className="h-[7rem] w-[7rem] rounded-[50%] object-cover"
        />
        {(profilePhoto || profileUrl) && (
          <button
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 mt-2 mr-2  p-1 rounded-full shadow-md bg-[#3B235D]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-4 w-4 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      <label
        htmlFor="file"
        className="mt-1.5 h-[1.5rem] w-full cursor-pointer text-center 
        ltr:font-PoppinsMedium   rtl:font-TajawalMedium text-sm text-[#3B235D]"
      >
        {t("uploadImage")}

      </label>
      <input
        type="file"
        id="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfilePhotoUpload;

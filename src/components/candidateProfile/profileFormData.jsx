import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import Date from "../candidates/datePicker";
import YearsDate from "../candidates/yearsDatePicker";
import SelectDegreeField from "../candidates/degreeSelect"; 
import FileUpload from "../candidates/cv";
import ProfilePhotoUpload from "../candidates/imgReading"; 
import { BsExclamationCircle  } from "react-icons/bs"; 
import { useSelector } from "react-redux";


export default function ProfileFormData({ onSubmit }) {
  const { t } = useTranslation();
 const { candidate, loading, error } = useSelector(
    (state) => state.candidateProfile
  );

 
  if (!candidate) {
    return <div className="h-full text-center my-1">Loading...</div>;
  }



  const initialValues = {
    firstName: candidate?.firstName ,
    lastName: candidate?.lastName ,
    dateOfBirth: candidate?.dateOfBirth ,
    university: candidate?.university ,
    major: candidate?.major ,
    educationLevel: candidate?.educationLevel ,
    graduationYear: candidate?.graduationYear ,
    email: candidate?.email , 
    cv: candidate?.cvUrl ,
    profilePhoto: candidate?.imageUrl
  }

  const validationSchema = Yup.object({
 firstName: Yup.string()
    .matches(/^[A-Za-zأ-ي ]+$/, t("noNumbersAllowed")) 
    .min(3, t("firstNameMinLength"))
    .required(t("firstNameRequired")),
  lastName: Yup.string()
    .matches(/^[A-Za-zأ-ي ]+$/, t("noNumbersAllowed")) 
    .min(3, t("lastNameMinLength"))
    .required(t("lastNameRequired")),
    email: Yup.string()
      .email(t("invalidEmail"))
      .required(t("emailRequired")),
    dateOfBirth: Yup.string().required(t("dateOfBirthRequired")),
    university: Yup.string()
    .matches(/^[A-Za-zأ-ي ]+$/, t("noNumbersAllowed"))  
    .min(6, t("universityMinLength"))
    .required(t("universityRequired")),
  major: Yup.string()
    .matches(/^[A-Za-zأ-ي ]+$/, t("noNumbersAllowed"))  
    .min(6, t("majorMinLength"))
    .required(t("majorRequired")),
    educationLevel: Yup.string().required(t("educationLevelRequired")),
    graduationYear: Yup.string().required(t("graduationYearRequired")),
    cv: Yup.mixed().nullable(), 
  });




  const areValuesDifferent = (initialValues, currentValues) => {
    for (let key in initialValues) {
      if (initialValues[key] !== currentValues[key]) {
        return true;
      }
    }

    return false;
  };
  


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
     
    >
      {({ errors, touched, setFieldValue, dirty, values }) => {
   const valuesChanged = areValuesDifferent(initialValues, values);
   
        return(
          <Form className="flex h-auto flex-col gap-y-3">
          {/* Profile Photo Upload */}
          <ProfilePhotoUpload
            name="profilePhoto"
            value={values.profilePhoto}
            onChange={(name, file) => setFieldValue(name, file)}
          />

          {/* First and Last Name */}
          <div className="flex w-full justify-between">
            <div className="flex w-[48%] flex-col">
              <label
                htmlFor="first-name"
                className="ms-1 ltr:font-PoppinsRegular rtl:font-TajawalMedium text-[0.8rem] text-[#707070] flex items-center"
              >
                {t("firstName")}
                {errors.firstName && touched.firstName && (
                  <BsExclamationCircle size={16} className="text-red-500 mx-1 mb-1" />
                )}
              </label>
              <Field
                type="text"
                id="first-name"
                name="firstName"
                className="h-[2.2rem] rounded-lg border-[1px] px-2 font-PoppinsRegular text-[0.8rem] outline-none border-[#dcd9d9]"
              />
              {errors.firstName && touched.firstName && (
                <div className="text-red-500 text-xs">{errors.firstName}</div>
              )}
            </div>

            <div className="flex w-[48%] flex-col">
              <label
                htmlFor="last-name"
                className="ms-1 ltr:font-PoppinsRegular rtl:font-TajawalMedium text-[0.8rem] text-[#707070] flex items-center"
              >
                {t("lastName")}
                {errors.lastName && touched.lastName && (
                  <BsExclamationCircle size={16} className="text-red-500 mx-1 mb-1" />
                )}
              </label>
              <Field
                type="text"
                id="last-name"
                name="lastName"
                className="h-[2.2rem] rounded-lg border-[1px] px-2 font-PoppinsRegular text-[0.8rem] outline-none border-[#dcd9d9]"
              />
              {errors.lastName && touched.lastName && (
                <div className="text-red-500 text-xs">{errors.lastName}</div>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex w-full flex-col">
            <label
              htmlFor="email"
              className="ms-1 ltr:font-PoppinsRegular rtl:font-TajawalMedium text-[0.8rem] text-[#707070] flex items-center"
            >
              {t("email")}
              {errors.email && touched.email && (
                <BsExclamationCircle size={16} className="text-red-500 mx-1 mb-1" />
              )}
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="h-[2.2rem] rounded-lg border-[1px] px-2 font-PoppinsRegular text-[0.8rem] outline-none border-[#dcd9d9]"
            />
            {errors.email && touched.email && (
              <div className="text-red-500 text-xs">{errors.email}</div>
            )}
          </div>

          {/* Date of Birth */}
          <Date name="dateOfBirth" label={t("dateOfBirth")} />

          {/* Education Level and Graduation Year */}
          <div className="flex w-full justify-between gap-x-3">
            <SelectDegreeField
              label={t("educationLevel")}
              name="educationLevel"
            />
            <YearsDate label={t("graduationYear")} name="graduationYear" />
          </div>

          {/* University */}
          <div className="flex w-full flex-col">
            <label
              htmlFor="university"
              className="ms-1 ltr:font-PoppinsRegular rtl:font-TajawalMedium text-[0.8rem] text-[#707070] flex items-center"
            >
              {t("university")}
              {errors.university && touched.university && (
                <BsExclamationCircle size={16} className="text-red-500 mx-1 mb-1" />
              )}
            </label>
            <Field
              type="text"
              id="university"
              name="university"
              className="h-[2.2rem] rounded-lg border-[1px] px-2 font-PoppinsRegular text-[0.8rem] outline-none border-[#dcd9d9]"
            />
            {errors.university && touched.university && (
              <div className="text-red-500 text-xs">{errors.university}</div>
            )}
          </div>

          {/* Major */}
          <div className="flex w-full flex-col">
            <label
              htmlFor="major"
              className="ms-1 ltr:font-PoppinsRegular rtl:font-TajawalMedium text-[0.8rem] text-[#707070] flex items-center"
            >
              {t("major")}
              {errors.major && touched.major && (
                <BsExclamationCircle size={16} className="text-red-500 mx-1 mb-1" />
              )}
            </label>
            <Field
              type="text"
              id="major"
              name="major"
              className="h-[2.2rem] rounded-lg border-[1px] px-2 font-PoppinsRegular text-[0.8rem] outline-none border-[#dcd9d9]"
            />
            {errors.major && touched.major && (
              <div className="text-red-500 text-xs">{errors.major}</div>
            )}
          </div>



          {/* File Upload */}
          <FileUpload name="cv" onChange={setFieldValue} />

          <button
            type="submit"
            disabled={!valuesChanged}
            className="mt-1 h-[2.5rem] w-full rounded-lg bg-[#3B235D] ltr:font-PoppinsRegular rtl:font-TajawalMedium  text-[1rem] text-white"
          >
            {t("saveChanges")}
          </button>
        </Form>
        )
      }}
    </Formik>
  );
}

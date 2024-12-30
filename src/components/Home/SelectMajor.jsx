import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";

import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const majors = [
  { value: "frontend", name: "Frontend", arabicName: "الواجهة الأمامية" },
  { value: "backend", name: "Backend", arabicName: "الواجهة الخلفية" },
  { value: "mobile applications", name: "Mobile Applications", arabicName: "تطبيقات الجوال" },
  { value: "full stack", name: "Full stack", arabicName: "تطوير متكامل" },
  { value: "data base", name: "Data base", arabicName: "قواعد البيانات" },
  { value: "data science", name: "Data Science", arabicName: "علم البيانات" },
];


export default function SelectMajor({setselectedMajor}) {
  const { i18n } = useTranslation();
  const direction = i18n.dir(i18n.language);

  const [query, setQuery] = useState("");


  const filteredMajors =
    query === ""
      ? majors
      : majors.filter((major) => {
          return major.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="mx-auto w-full">
      <Combobox
        //defaultValue={selected}
        onChange={(value) => {
          if (value) {
            setselectedMajor(value);
          } else {
            setselectedMajor(''); // Handle cases where no value is selected
          }
        }}

        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
           className={clsx(
                      `w-full border-none py-1.5 px-3 text-sm/6 text-[#808184] 
                       placeholder:text-[#808184]  xs:h-[2.3rem]  sm:h-[2.5rem]  rounded-md xs:text-xs sm:text-sm  `,
                      "bg-[white] ltr:font-PoppinsRegular rtl:font-TajawalMedium focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                    )}
            displayValue={(major) =>
              direction === "rtl" ? major?.arabicName : major?.name
            }
            onChange={(event) => setQuery(event.target.value)}
            placeholder={direction === "rtl" ? "اختر التخصص" : "Select Major"}
          />
          <ComboboxButton
            className={`group absolute inset-y-0 ${direction === "rtl" ? "left-0" : "right-0"} px-2.5 text-[#808184]`}
          >
            <ChevronDownIcon className="size-4 fill-[#808184] group-data-[hover]:fill-[#3B235D] sm:size-5" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--input-width)] border border-white/5 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible xs:mt-1.5 xs:rounded-md",
            "!max-h-[15rem] !overflow-y-scroll",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
          )}
        >
          {filteredMajors.map((major ,i) => (
            <ComboboxOption
              dir={direction}
              key={i}
              value={major}
              className="group flex cursor-default select-none items-center gap-2 truncate rounded-lg px-3 py-1.5 font-PoppinsRegular data-[focus]:bg-[#d6c8ea] xs:h-[2.3rem]"
            >
              <CheckIcon className="size-4 scale-0 fill-[#3B235D] group-data-[focus]:scale-100" />
              <div className="text-[#808184] xs:text-xs sm:text-sm  ltr:font-PoppinsRegular rtl:font-TajawalMedium ">
                {direction === "rtl" ? major?.arabicName : major?.name}
              </div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}

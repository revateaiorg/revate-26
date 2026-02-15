import React, { useEffect } from "react";
import Select from "react-select";

const currencies = [
  { value: "₹", label: "₹" },
  { value: "$", label: "$" },
  { value: "€", label: "€" },
  { value: "£", label: "£" },
  { value: "د.إ", label: "د.إ" },
];

const CurrencySelector = ({ value, onChange }) => {
  useEffect(() => {
    if (!value) {
      onChange("INR"); // Set INR by default
    }
  }, [value, onChange]);

  const handleChange = (selectedOption) => {
    onChange(selectedOption?.value || "");
  };

  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: "fit-content",
      minWidth: "75px", // Optional: sets a decent min-width
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "rgba(255, 255, 255, 0.04)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "6px",
      minHeight: "56px",
      color: "white",
      boxShadow: "none",
      padding: "0", // REMOVE extra padding
      width: "fit-content",
      "&:hover": {
        borderColor: "rgba(255, 255, 255, 0.2)",
      },
      ...(state.isFocused && {
        borderColor: "rgba(255, 255, 255, 0.3)",
      }),
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 8px", // Small horizontal padding for spacing
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    input: (provided) => ({
      ...provided,
      color: "white",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "rgba(255, 255, 255, 0.6)",
      "&:hover": {
        color: "rgba(255, 255, 255, 0.8)",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "rgba(8, 8, 8, 0.95)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "6px",
      backdropFilter: "blur(12px)",
    }),
    menuList: (provided) => ({
      ...provided,
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-track": {
        background: "rgba(255, 255, 255, 0.05)",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "rgba(255, 255, 255, 0.2)",
        "&:hover": {
          background: "rgba(255, 255, 255, 0.3)",
        },
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
      color: "white",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
    }),
  };

  return (
    <>
      <Select
        options={currencies}
        onChange={handleChange}
        value={currencies.find((c) => c.value === value) || currencies[0]}
        styles={customStyles}
        isSearchable
      />
      <input type="hidden" name="currency" value={value || "INR"} />
    </>
  );
};

export default CurrencySelector;

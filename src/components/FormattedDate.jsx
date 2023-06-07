import React from "react";

const FormattedDate = ({ timestamp }) => {
  const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    const month = dateObj.toLocaleString("en-US", { month: "long" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${month} ${day}, ${year} ${formattedHours}:${formattedMinutes} ${amPm}`;
  };

  return <span>{formatDate(timestamp)}</span>;
};

export default FormattedDate;

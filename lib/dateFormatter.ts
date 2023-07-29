const dateFormatter = (dateTimeString: string | Date) => {
  const formattedDate = new Date(dateTimeString).toLocaleDateString("no", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formattedDate;
};

export default dateFormatter;

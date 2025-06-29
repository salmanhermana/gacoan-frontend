function formatISOToDayMonthYear(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-Es", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export const formatDateToLocale = (dateString: string) => {
  return new Date(dateString).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export default formatISOToDayMonthYear;

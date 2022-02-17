export const numberWithCommas = (x) => {
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const chartDays = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

export const yAxisDateFormat = (x) => {
  //3h 24h 7d 30d 3m 1y 3y 5y
  let result = "";

  switch (x) {
    case "3h":
    case "24h":
      result = "HH:mm A";
      break;
    case "7d":
    case "30d":
      result = "MMM DD";
      break;
    case "1y":
    case "3y":
    case "5y":
      result = "MMM YYYY";
      break;
    default:
      result = "";
  }

  return result;
};

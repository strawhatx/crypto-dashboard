import moment from "moment";

//Numbers

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//dates
export const getDatetimeWithInterval = (timestamp, interval) => {
  let format = yAxisDateFormat(interval);

  let milliseconds = timestamp * 1000;

  let dateLocale = new Date(milliseconds).toLocaleString();

  let datetime = moment(new Date(dateLocale)).format(format);

  return datetime;
};

export const getDatetime = (timestamp) => {
  let milliseconds = timestamp * 1000;

  let dateLocale = new Date(milliseconds).toLocaleString();

  let datetime = moment(new Date(dateLocale));

  return datetime;
};

//charts
export const chartIntervals = [
  "3h",
  "24h",
  "7d",
  "30d",
  "3m",
  "1y",
  "3y",
  "5y",
];

export const yAxisDateFormat = (x) => {
  //3h 24h 7d 30d 3m 1y 3y 5y
  let result = "";

  switch (x) {
    case "3h":
    case "24h":
      result = "H:mm A";
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

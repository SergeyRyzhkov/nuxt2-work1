export const phoneNumberMask = {
  mask: "+{7} (000) 000-00-00",
  definitions: {
    "#": /[0-7,9]/,
  },
  lazy: false,
  overwrite: true,
};

export const dateMask = {
  mask: Date,
  pattern: "d{.}`m{.}`Y",
  format(date) {
    if (!!date.getDate) {
      let day = date.getDate();
      let month = date.getMonth() + 1;
      const year = date.getFullYear();

      if (day < 10) day = "0" + day;
      if (month < 10) month = "0" + month;

      return [day, month, year].join(".");
    } else {
      return date;
    }
  },
  parse(str) {
    const yearMonthDay = str.split(".");
    const date = new Date(yearMonthDay[2], yearMonthDay[1] - 1, yearMonthDay[0]);
    return date;
  },
  lazy: false,
};

export const numberMask = {
  mask: Number, // enable number mask
  // other options are optional with defaults below
  scale: 2, // digits after point, 0 for integers
  signed: false, // disallow negative
  thousandsSeparator: " ", // any single char
  padFractionalZeros: false, // if true, then pads zeros at end to the length of scale
  normalizeZeros: true, // appends or removes zeros at ends
  radix: ",", // fractional delimiter
  mapToRadix: ["."], // symbols to process as radix
  // additional number interval options (e.g.)
  min: 0,
  // lazy: false,
  // overwrite: true,
};

export const inn = {
  mask: "############",
  definitions: {
    "#": /[0-9]/,
  },
};

export const passportSerias = {
  mask: "####",
  definitions: {
    "#": /[0-9]/,
  },
};

export const passportNumber = {
  mask: "######",
  definitions: {
    "#": /[0-9]/,
  },
};

export const passportSeriasAndNumber = {
  mask: "##########",
  definitions: {
    "#": /[0-9]/,
  },
};

export const validateBirthCertificate = (val) => {
  if (!val) {
    return false;
  }
  const test = val.match(/^(?<rome>M{0,3}(D?C{0,3}|C[DM])(L?X{0,3}|X[LC])(V?I{0,3}|I[VX]))([А-Я]{2})(\d{6})$/);
  return !!test && test.groups.rome !== "";
};

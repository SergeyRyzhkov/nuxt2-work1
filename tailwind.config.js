module.exports = {
  mode: "jit",
  purge: {
    content: [
      "./src/components/**/*.vue",
      "./src/layouts/**/*.vue",
      "./src/pages/**/*.vue",
      "./src/modules/**/*.vue",
      "./nuxt.config.ts",
    ],
    options: {
      safelist: [/deep/, /vfc*/],
      keyframes: true,
    },
  },

  theme: {
    fontSize: {
      12: ["12px", "18px"],
      14: ["14px", "18px"],
      17: ["17px", "20px"],
      18: ["18px", "27px"],
      20: ["20px", "30px"],
      22: ["22px", "33px"],
      24: ["24px", "36px"],
      28: ["28px", "32px"],
      32: ["32px", "42px"],
      34: ["34px", "42px"],
      36: ["36px", "48px"],
      42: ["42px", "44px"],
      43: ["43px", "45px"],
      46: ["46px", "50px"],
      48: ["48px", "50px"],
      60: ["60px", "50px"],
      62: ["62px", "70px"],
      78: ["78px", "84px"],
      89: ["89px", "94px"],
      100: ["100px", "105px"],
      124: ["124px", "130px"],
    },
    lineHeight: {
      14: "14px",
      20: "20px",
      24: "24px",
      30: "30px",
      48: "48px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },

    spacing: {
      0: "0px",
      2: "2px",
      4: "4px",
      5: "5px",
      6: "6px",
      8: "8px",
      9: "9px",
      10: "10px",
      11: "11px",
      12: "12px",
      13: "13px",
      14: "14px",
      15: "15px",
      16: "16px",
      18: "18px",
      19: "19px",
      20: "20px",
      21: "21px",
      22: "22px",
      23: "23px",
      24: "24px",
      25: "25px",
      26: "26px",
      27: "27px",
      28: "28px",
      30: "30px",
      32: "32px",
      33: "33px",
      34: "34px",
      35: "35px",
      36: "36px",
      37: "37px",
      38: "38px",
      40: "40px",
      42: "42px",
      43: "43px",
      44: "44px",
      45: "45px",
      46: "46px",
      48: "48px",
      50: "50px",
      52: "52px",
      55: "55px",
      56: "56px",
      58: "58px",
      60: "60px",
      62: "62px",
      64: "64px",
      67: "67px",
      68: "68px",
      70: "70px",
      74: "74px",
      76: "76px",
      80: "80px",
      82: "82px",
      86: "86px",
      90: "90px",
      100: "100px",
      110: "110px",
      116: "116px",
      120: "120px",
      122: "122px",
      127: "127px",
      130: "130px",
      140: "140px",
      150: "150px",
      160: "160px",
      166: "166px",
      170: "170px",
      177: "177px",
      180: "180px",
      185: "185px",
      190: "190px",
      200: "200px",
      216: "216px",
      220: "220px",
      226: "226px",
      230: "230px",
      247: "247px",
      286: "286px",
      270: "270px",
      280: "280px",
      240: "240px",
      300: "300px",
      400: "400px",
      500: "500px",
      540: "540px",
      600: "600px",
      700: "700px",
      800: "800px",
    },

    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "1rem",
        lg: "2rem",
        xl: "2rem",
        "2xl": "2rem",
      },
    },

    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        "text-gray": "var(--text-gray)",
        transparent: "transparent",
        current: "currentColor",
        nude: "#FFF7F5",
        "strong-nude": "#FCE8D9",
        dark: "#131313",
        "footer-color": "var(--footer-color)",
        "section-gray": "#F2F0F3",
        "gray-color": "#9D9D9D",
        green: "#4BC967",
      },
      fontFamily: {
        compact: ["Compact"],
      },
    },
  },
};

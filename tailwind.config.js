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
      safelist: [/deep/, /vue.*?$/, /v-.*?$/, /overlay-.*?$/, /scroll-.*?$/],
      keyframes: true,
    },
  },

  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1350px",
    },

    spacing: {
      0: "0px",
      2: "2px",
      4: "4px",
      6: "6px",
      8: "8px",
      10: "10px",
      12: "12px",
      14: "14px",
      16: "16px",
      18: "18px",
      20: "20px",
      22: "22px",
      24: "24px",
      26: "26px",
      28: "28px",
      30: "30px",
      32: "32px",
      34: "34px",
      36: "36px",
      38: "38px",
      40: "40px",
      42: "42px",
      44: "44px",
      46: "46px",
      48: "48px",
      50: "50px",
      60: "60px",
      70: "70px",
      80: "80px",
      100: "100px",
      120: "120px",
    },

    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        sm: "1rem",
        md: "1rem",
        lg: "2rem",
        xl: "2rem",
        "2xl": "2rem",
      },
    },

    extend: {
      colors: {
        primary: "#171717",
        secondary: "#ed791e",
        transparent: "transparent",
        current: "currentColor",
        nude: "#FFF7F4",
        footer: "#575555",
      },
    },
  },
};

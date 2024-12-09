angular
  .module("InterviewBotApp", [])
  .controller("InterviewController", function ($scope) {
    let model,
      mixer,
      clock = new THREE.Clock();
    const scene = new THREE.Scene();
    let speech;
    let blinkingInterval = null;
    // let url ="brunette.glb";
    let url = "final2.glb";
    // Viseme mapping (same as before
    const corresponding = {
      A: "viseme_PP",
      AE1: "viseme_AA",
      AY1: "viseme_AA",
      AH0: "viseme_I",
      AA1: "viseme_O",
      AY2: "viseme_AA",
      AO1: "viseme_O",
      AW1: "viseme_AA", 

      B: "viseme_kk",
      C: "viseme_I",

      D: "viseme_AA",
      DH: "viseme_TH",

      E: "viseme_O",
      EH1: "viseme_E", 
      EY1: "viseme_E", 
      EY2: "viseme_E",
      ER0: "viseme_RR",

      F: "viseme_U",
      G: "viseme_FF",

      H: "viseme_TH",
      HH: "viseme_TH",

      I: "viseme_ee", // Viseme for 'ee' (mouth wide)
      IH0: "viseme_I",
      IY1: "viseme_ee",
      IH1: "viseme_I",
      IH2: "viseme_I",

      J: "viseme_ch", // Viseme for 'ch' (tongue behind teeth)
      K: "viseme_kk", // Viseme for 'k' (closed lips)
      L: "viseme_L", // Viseme for 'l' (mouth slightly open)
      M: "viseme_M", // Viseme for 'm' (mouth closed)

      N: "viseme_N", // Viseme for 'n' (mouth open, tongue up)
      NG: "viseme_nn",

      O: "viseme_O", // Viseme for 'oh' (rounded lips)
      OW0: "viseme_O", 
      OW1: "viseme_O", 

      P: "viseme_PP", // Viseme for 'p' (lips pressed together)
      Q: "viseme_Q", // Viseme for 'qu' (mouth slightly open, tongue down)
      R: "viseme_R", // Viseme for 'r' (tongue curled)

      S: "viseme_S", // Viseme for 's' (teeth together)
      SH: "viseme_SS",

      T: "viseme_T", // Viseme for 't' (tongue behind teeth)

      U: "viseme_U", // Viseme for 'oo' (rounded lips)
      UW1: "viseme_U",

      V: "viseme_V", // Viseme for 'v' (teeth on lower lip)
      W: "viseme_W", // Viseme for 'w' (rounded lips)
      X: "viseme_X", // Viseme for 'x' (mouth closed, lips slightly apart)
      Y: "viseme_Y", // Viseme for 'y' (lips slightly spread)
      Z: "viseme_Z", // Viseme for 'z' (teeth together, lips spread)
    };

    // const lipsync = {
    //   mouthCues :  [
    //     {
    //       "start": 0,
    //       "end": 0.07,
    //       "value": "K"
    //     },
    //     {
    //       "start": 0.07,
    //       "end": 0.13,
    //       "value": "AE1"
    //     },
    //     {
    //       "start": 0.13,
    //       "end": 0.2,
    //       "value": "N"
    //     },
    //     {
    //       "start": 0.2,
    //       "end": 0.3,
    //       "value": "Y"
    //     },
    //     {
    //       "start": 0.3,
    //       "end": 0.4,
    //       "value": "UW1"
    //     },
    //     {
    //       "start": 0.4,
    //       "end": 0.48,
    //       "value": "D"
    //     },
    //     {
    //       "start": 0.48,
    //       "end": 0.55,
    //       "value": "IH0"
    //     },
    //     {
    //       "start": 0.55,
    //       "end": 0.63,
    //       "value": "S"
    //     },
    //     {
    //       "start": 0.63,
    //       "end": 0.7,
    //       "value": "K"
    //     },
    //     {
    //       "start": 0.7,
    //       "end": 0.78,
    //       "value": "R"
    //     },
    //     {
    //       "start": 0.78,
    //       "end": 0.85,
    //       "value": "AY1"
    //     },
    //     {
    //       "start": 0.85,
    //       "end": 0.93,
    //       "value": "B"
    //     },
    //     {
    //       "start": 0.93,
    //       "end": 1,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 1,
    //       "end": 1.08,
    //       "value": "S"
    //     },
    //     {
    //       "start": 1.08,
    //       "end": 1.15,
    //       "value": "IH0"
    //     },
    //     {
    //       "start": 1.15,
    //       "end": 1.23,
    //       "value": "N"
    //     },
    //     {
    //       "start": 1.23,
    //       "end": 1.3,
    //       "value": "EH1"
    //     },
    //     {
    //       "start": 1.3,
    //       "end": 1.38,
    //       "value": "R"
    //     },
    //     {
    //       "start": 1.38,
    //       "end": 1.45,
    //       "value": "IY0"
    //     },
    //     {
    //       "start": 1.45,
    //       "end": 1.53,
    //       "value": "OW0"
    //     },
    //     {
    //       "start": 1.53,
    //       "end": 1.64,
    //       "value": "W"
    //     },
    //     {
    //       "start": 1.64,
    //       "end": 1.76,
    //       "value": "EH1"
    //     },
    //     {
    //       "start": 1.76,
    //       "end": 1.87,
    //       "value": "R"
    //     },
    //     {
    //       "start": 1.87,
    //       "end": 1.97,
    //       "value": "Y"
    //     },
    //     {
    //       "start": 1.97,
    //       "end": 2.07,
    //       "value": "UW1"
    //     },
    //     {
    //       "start": 2.07,
    //       "end": 2.14,
    //       "value": "HH"
    //     },
    //     {
    //       "start": 2.14,
    //       "end": 2.2,
    //       "value": "AE1"
    //     },
    //     {
    //       "start": 2.2,
    //       "end": 2.27,
    //       "value": "D"
    //     },
    //     {
    //       "start": 2.27,
    //       "end": 2.33,
    //       "value": "T"
    //     },
    //     {
    //       "start": 2.33,
    //       "end": 2.4,
    //       "value": "UW1"
    //     },
    //     {
    //       "start": 2.4,
    //       "end": 2.48,
    //       "value": "AA1"
    //     },
    //     {
    //       "start": 2.48,
    //       "end": 2.55,
    //       "value": "P"
    //     },
    //     {
    //       "start": 2.55,
    //       "end": 2.63,
    //       "value": "T"
    //     },
    //     {
    //       "start": 2.63,
    //       "end": 2.7,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 2.7,
    //       "end": 2.78,
    //       "value": "M"
    //     },
    //     {
    //       "start": 2.78,
    //       "end": 2.85,
    //       "value": "AY2"
    //     },
    //     {
    //       "start": 2.85,
    //       "end": 2.93,
    //       "value": "Z"
    //     },
    //     {
    //       "start": 2.93,
    //       "end": 3,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 3,
    //       "end": 3.06,
    //       "value": "K"
    //     },
    //     {
    //       "start": 3.06,
    //       "end": 3.12,
    //       "value": "AA1"
    //     },
    //     {
    //       "start": 3.12,
    //       "end": 3.18,
    //       "value": "M"
    //     },
    //     {
    //       "start": 3.18,
    //       "end": 3.23,
    //       "value": "P"
    //     },
    //     {
    //       "start": 3.24,
    //       "end": 3.29,
    //       "value": "L"
    //     },
    //     {
    //       "start": 3.29,
    //       "end": 3.35,
    //       "value": "EH0"
    //     },
    //     {
    //       "start": 3.35,
    //       "end": 3.41,
    //       "value": "K"
    //     },
    //     {
    //       "start": 3.41,
    //       "end": 3.47,
    //       "value": "S"
    //     },
    //     {
    //       "start": 3.47,
    //       "end": 3.55,
    //       "value": "D"
    //     },
    //     {
    //       "start": 3.55,
    //       "end": 3.62,
    //       "value": "EY1"
    //     },
    //     {
    //       "start": 3.62,
    //       "end": 3.7,
    //       "value": "T"
    //     },
    //     {
    //       "start": 3.7,
    //       "end": 3.77,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 3.77,
    //       "end": 3.85,
    //       "value": "B"
    //     },
    //     {
    //       "start": 3.85,
    //       "end": 3.92,
    //       "value": "EY2"
    //     },
    //     {
    //       "start": 3.92,
    //       "end": 4,
    //       "value": "S"
    //     },
    //     {
    //       "start": 4,
    //       "end": 4.07,
    //       "value": "K"
    //     },
    //     {
    //       "start": 4.07,
    //       "end": 4.13,
    //       "value": "W"
    //     },
    //     {
    //       "start": 4.13,
    //       "end": 4.2,
    //       "value": "IY1"
    //     },
    //     {
    //       "start": 4.2,
    //       "end": 4.26,
    //       "value": "R"
    //     },
    //     {
    //       "start": 4.26,
    //       "end": 4.33,
    //       "value": "IY0"
    //     },
    //     {
    //       "start": 4.33,
    //       "end": 4.4,
    //       "value": "IH0"
    //     },
    //     {
    //       "start": 4.4,
    //       "end": 4.47,
    //       "value": "N"
    //     },
    //     {
    //       "start": 4.47,
    //       "end": 4.53,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 4.53,
    //       "end": 4.6,
    //       "value": "P"
    //     },
    //     {
    //       "start": 4.6,
    //       "end": 4.68,
    //       "value": "R"
    //     },
    //     {
    //       "start": 4.68,
    //       "end": 4.75,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 4.75,
    //       "end": 4.83,
    //       "value": "D"
    //     },
    //     {
    //       "start": 4.83,
    //       "end": 4.9,
    //       "value": "AH1"
    //     },
    //     {
    //       "start": 4.9,
    //       "end": 4.98,
    //       "value": "K"
    //     },
    //     {
    //       "start": 4.98,
    //       "end": 5.05,
    //       "value": "SH"
    //     },
    //     {
    //       "start": 5.05,
    //       "end": 5.13,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 5.13,
    //       "end": 5.2,
    //       "value": "N"
    //     },
    //     {
    //       "start": 6,
    //       "end": 6.12,
    //       "value": "P"
    //     },
    //     {
    //       "start": 6.12,
    //       "end": 6.24,
    //       "value": "L"
    //     },
    //     {
    //       "start": 6.24,
    //       "end": 6.36,
    //       "value": "IY1"
    //     },
    //     {
    //       "start": 6.36,
    //       "end": 6.48,
    //       "value": "Z"
    //     },
    //     {
    //       "start": 6.48,
    //       "end": 6.58,
    //       "value": "IH0"
    //     },
    //     {
    //       "start": 6.58,
    //       "end": 6.69,
    //       "value": "L"
    //     },
    //     {
    //       "start": 6.69,
    //       "end": 6.79,
    //       "value": "AE1"
    //     },
    //     {
    //       "start": 6.79,
    //       "end": 6.9,
    //       "value": "B"
    //     },
    //     {
    //       "start": 6.9,
    //       "end": 7,
    //       "value": "R"
    //     },
    //     {
    //       "start": 7,
    //       "end": 7.11,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 7.11,
    //       "end": 7.21,
    //       "value": "T"
    //     },
    //     {
    //       "start": 7.21,
    //       "end": 7.29,
    //       "value": "AA1"
    //     },
    //     {
    //       "start": 7.29,
    //       "end": 7.37,
    //       "value": "N"
    //     },
    //     {
    //       "start": 7.37,
    //       "end": 7.49,
    //       "value": "DH"
    //     },
    //     {
    //       "start": 7.49,
    //       "end": 7.61,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 7.61,
    //       "end": 7.69,
    //       "value": "S"
    //     },
    //     {
    //       "start": 7.69,
    //       "end": 7.77,
    //       "value": "T"
    //     },
    //     {
    //       "start": 7.77,
    //       "end": 7.86,
    //       "value": "EH1"
    //     },
    //     {
    //       "start": 7.86,
    //       "end": 7.94,
    //       "value": "P"
    //     },
    //     {
    //       "start": 7.94,
    //       "end": 8.02,
    //       "value": "S"
    //     },
    //     {
    //       "start": 8.02,
    //       "end": 8.14,
    //       "value": "Y"
    //     },
    //     {
    //       "start": 8.14,
    //       "end": 8.26,
    //       "value": "UW1"
    //     },
    //     {
    //       "start": 8.26,
    //       "end": 8.37,
    //       "value": "T"
    //     },
    //     {
    //       "start": 8.37,
    //       "end": 8.47,
    //       "value": "UH1"
    //     },
    //     {
    //       "start": 8.47,
    //       "end": 8.58,
    //       "value": "K"
    //     },
    //     {
    //       "start": 8.58,
    //       "end": 8.66,
    //       "value": "T"
    //     },
    //     {
    //       "start": 8.66,
    //       "end": 8.74,
    //       "value": "UW1"
    //     },
    //     {
    //       "start": 8.74,
    //       "end": 8.83,
    //       "value": "D"
    //     },
    //     {
    //       "start": 8.83,
    //       "end": 8.93,
    //       "value": "AY2"
    //     },
    //     {
    //       "start": 8.93,
    //       "end": 9.02,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 9.02,
    //       "end": 9.11,
    //       "value": "G"
    //     },
    //     {
    //       "start": 9.11,
    //       "end": 9.2,
    //       "value": "N"
    //     },
    //     {
    //       "start": 9.2,
    //       "end": 9.3,
    //       "value": "OW1"
    //     },
    //     {
    //       "start": 9.3,
    //       "end": 9.39,
    //       "value": "S"
    //     },
    //     {
    //       "start": 9.39,
    //       "end": 9.51,
    //       "value": "DH"
    //     },
    //     {
    //       "start": 9.51,
    //       "end": 9.63,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 9.63,
    //       "end": 9.73,
    //       "value": "P"
    //     },
    //     {
    //       "start": 9.73,
    //       "end": 9.83,
    //       "value": "ER0"
    //     },
    //     {
    //       "start": 9.83,
    //       "end": 9.93,
    //       "value": "F"
    //     },
    //     {
    //       "start": 9.93,
    //       "end": 10.03,
    //       "value": "AO1"
    //     },
    //     {
    //       "start": 10.03,
    //       "end": 10.12,
    //       "value": "R"
    //     },
    //     {
    //       "start": 10.12,
    //       "end": 10.22,
    //       "value": "M"
    //     },
    //     {
    //       "start": 10.22,
    //       "end": 10.32,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 10.32,
    //       "end": 10.42,
    //       "value": "N"
    //     },
    //     {
    //       "start": 10.42,
    //       "end": 10.52,
    //       "value": "S"
    //     },
    //     {
    //       "start": 11,
    //       "end": 11.11,
    //       "value": "DH"
    //     },
    //     {
    //       "start": 11.11,
    //       "end": 11.22,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 11.22,
    //       "end": 11.32,
    //       "value": "T"
    //     },
    //     {
    //       "start": 11.32,
    //       "end": 11.41,
    //       "value": "UW1"
    //     },
    //     {
    //       "start": 11.41,
    //       "end": 11.5,
    //       "value": "L"
    //     },
    //     {
    //       "start": 11.5,
    //       "end": 11.6,
    //       "value": "Z"
    //     },
    //     {
    //       "start": 11.6,
    //       "end": 11.71,
    //       "value": "Y"
    //     },
    //     {
    //       "start": 11.71,
    //       "end": 11.82,
    //       "value": "UW1"
    //     },
    //     {
    //       "start": 11.82,
    //       "end": 11.89,
    //       "value": "Y"
    //     },
    //     {
    //       "start": 11.89,
    //       "end": 11.97,
    //       "value": "UW1"
    //     },
    //     {
    //       "start": 11.97,
    //       "end": 12.04,
    //       "value": "Z"
    //     },
    //     {
    //       "start": 12.04,
    //       "end": 12.12,
    //       "value": "D"
    //     },
    //     {
    //       "start": 12.12,
    //       "end": 12.19,
    //       "value": "F"
    //     },
    //     {
    //       "start": 12.19,
    //       "end": 12.27,
    //       "value": "AO1"
    //     },
    //     {
    //       "start": 12.27,
    //       "end": 12.34,
    //       "value": "R"
    //     },
    //     {
    //       "start": 13.01,
    //       "end": 13.08,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 13.08,
    //       "end": 13.16,
    //       "value": "N"
    //     },
    //     {
    //       "start": 13.16,
    //       "end": 13.23,
    //       "value": "D"
    //     },
    //     {
    //       "start": 13.23,
    //       "end": 13.35,
    //       "value": "DH"
    //     },
    //     {
    //       "start": 13.35,
    //       "end": 13.46,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 13.46,
    //       "end": 13.54,
    //       "value": "AA0"
    //     },
    //     {
    //       "start": 13.54,
    //       "end": 13.62,
    //       "value": "P"
    //     },
    //     {
    //       "start": 13.62,
    //       "end": 13.7,
    //       "value": "T"
    //     },
    //     {
    //       "start": 13.7,
    //       "end": 13.78,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 13.78,
    //       "end": 13.86,
    //       "value": "M"
    //     },
    //     {
    //       "start": 13.86,
    //       "end": 13.95,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 13.95,
    //       "end": 14.03,
    //       "value": "Z"
    //     },
    //     {
    //       "start": 14.03,
    //       "end": 14.11,
    //       "value": "EY1"
    //     },
    //     {
    //       "start": 14.11,
    //       "end": 14.19,
    //       "value": "SH"
    //     },
    //     {
    //       "start": 14.19,
    //       "end": 14.27,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 14.27,
    //       "end": 14.35,
    //       "value": "N"
    //     },
    //     {
    //       "start": 14.35,
    //       "end": 14.46,
    //       "value": "T"
    //     },
    //     {
    //       "start": 14.46,
    //       "end": 14.56,
    //       "value": "EH0"
    //     },
    //     {
    //       "start": 14.56,
    //       "end": 14.67,
    //       "value": "K"
    //     },
    //     {
    //       "start": 14.67,
    //       "end": 14.78,
    //       "value": "N"
    //     },
    //     {
    //       "start": 14.78,
    //       "end": 14.89,
    //       "value": "IY1"
    //     },
    //     {
    //       "start": 14.89,
    //       "end": 14.99,
    //       "value": "K"
    //     },
    //     {
    //       "start": 14.99,
    //       "end": 15.1,
    //       "value": "S"
    //     },
    //     {
    //       "start": 15.1,
    //       "end": 15.21,
    //       "value": "Y"
    //     },
    //     {
    //       "start": 15.21,
    //       "end": 15.32,
    //       "value": "UW1"
    //     },
    //     {
    //       "start": 15.32,
    //       "end": 15.42,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 15.42,
    //       "end": 15.53,
    //       "value": "P"
    //     },
    //     {
    //       "start": 15.53,
    //       "end": 15.63,
    //       "value": "L"
    //     },
    //     {
    //       "start": 15.63,
    //       "end": 15.74,
    //       "value": "AY1"
    //     },
    //     {
    //       "start": 15.74,
    //       "end": 15.84,
    //       "value": "D"
    //     },
    //     {
    //       "start": 15.84,
    //       "end": 15.91,
    //       "value": "T"
    //     },
    //     {
    //       "start": 15.91,
    //       "end": 15.99,
    //       "value": "UW1"
    //     },
    //     {
    //       "start": 15.99,
    //       "end": 16.08,
    //       "value": "IH2"
    //     },
    //     {
    //       "start": 16.08,
    //       "end": 16.16,
    //       "value": "M"
    //     },
    //     {
    //       "start": 16.16,
    //       "end": 16.25,
    //       "value": "P"
    //     },
    //     {
    //       "start": 16.25,
    //       "end": 16.34,
    //       "value": "R"
    //     },
    //     {
    //       "start": 16.34,
    //       "end": 16.42,
    //       "value": "UW1"
    //     },
    //     {
    //       "start": 16.42,
    //       "end": 16.51,
    //       "value": "V"
    //     },
    //     {
    //       "start": 16.51,
    //       "end": 16.62,
    //       "value": "DH"
    //     },
    //     {
    //       "start": 16.62,
    //       "end": 16.73,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 17.26,
    //       "end": 17.35,
    //       "value": "IH0"
    //     },
    //     {
    //       "start": 17.35,
    //       "end": 17.45,
    //       "value": "F"
    //     },
    //     {
    //       "start": 17.45,
    //       "end": 17.54,
    //       "value": "IH1"
    //     },
    //     {
    //       "start": 17.54,
    //       "end": 17.63,
    //       "value": "SH"
    //     },
    //     {
    //       "start": 17.63,
    //       "end": 17.72,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 17.72,
    //       "end": 17.82,
    //       "value": "N"
    //     },
    //     {
    //       "start": 17.82,
    //       "end": 17.91,
    //       "value": "S"
    //     },
    //     {
    //       "start": 17.91,
    //       "end": 18,
    //       "value": "IY0"
    //     },
    //     {
    //       "start": 18,
    //       "end": 18.11,
    //       "value": "W"
    //     },
    //     {
    //       "start": 18.11,
    //       "end": 18.21,
    //       "value": "IH0"
    //     },
    //     {
    //       "start": 18.21,
    //       "end": 18.32,
    //       "value": "TH"
    //     },
    //     {
    //       "start": 18.32,
    //       "end": 18.42,
    //       "value": "AW1"
    //     },
    //     {
    //       "start": 18.42,
    //       "end": 18.53,
    //       "value": "T"
    //     },
    //     {
    //       "start": 18.53,
    //       "end": 18.61,
    //       "value": "K"
    //     },
    //     {
    //       "start": 18.61,
    //       "end": 18.7,
    //       "value": "AA1"
    //     },
    //     {
    //       "start": 18.7,
    //       "end": 18.78,
    //       "value": "M"
    //     },
    //     {
    //       "start": 18.78,
    //       "end": 18.86,
    //       "value": "P"
    //     },
    //     {
    //       "start": 18.86,
    //       "end": 18.95,
    //       "value": "R"
    //     },
    //     {
    //       "start": 18.95,
    //       "end": 19.03,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 19.03,
    //       "end": 19.12,
    //       "value": "M"
    //     },
    //     {
    //       "start": 19.12,
    //       "end": 19.2,
    //       "value": "AY2"
    //     },
    //     {
    //       "start": 19.2,
    //       "end": 19.28,
    //       "value": "Z"
    //     },
    //     {
    //       "start": 19.28,
    //       "end": 19.37,
    //       "value": "IH0"
    //     },
    //     {
    //       "start": 19.37,
    //       "end": 19.45,
    //       "value": "NG"
    //     },
    //     {
    //       "start": 19.45,
    //       "end": 19.53,
    //       "value": "D"
    //     },
    //     {
    //       "start": 19.53,
    //       "end": 19.61,
    //       "value": "EY1"
    //     },
    //     {
    //       "start": 19.61,
    //       "end": 19.68,
    //       "value": "T"
    //     },
    //     {
    //       "start": 19.68,
    //       "end": 19.76,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 19.76,
    //       "end": 19.84,
    //       "value": "IH2"
    //     },
    //     {
    //       "start": 19.84,
    //       "end": 19.91,
    //       "value": "N"
    //     },
    //     {
    //       "start": 19.91,
    //       "end": 19.99,
    //       "value": "T"
    //     },
    //     {
    //       "start": 19.99,
    //       "end": 20.06,
    //       "value": "EH1"
    //     },
    //     {
    //       "start": 20.06,
    //       "end": 20.14,
    //       "value": "G"
    //     },
    //     {
    //       "start": 20.14,
    //       "end": 20.21,
    //       "value": "R"
    //     },
    //     {
    //       "start": 20.21,
    //       "end": 20.29,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 20.29,
    //       "end": 20.36,
    //       "value": "T"
    //     },
    //     {
    //       "start": 20.36,
    //       "end": 20.44,
    //       "value": "IY0"
    //     },
    //     {
    //       "start": 20.44,
    //       "end": 20.52,
    //       "value": "AO1"
    //     },
    //     {
    //       "start": 20.52,
    //       "end": 20.6,
    //       "value": "R"
    //     },
    //     {
    //       "start": 20.6,
    //       "end": 20.71,
    //       "value": "K"
    //     },
    //     {
    //       "start": 20.71,
    //       "end": 20.81,
    //       "value": "AA1"
    //     },
    //     {
    //       "start": 20.81,
    //       "end": 20.92,
    //       "value": "Z"
    //     },
    //     {
    //       "start": 20.92,
    //       "end": 21.02,
    //       "value": "IH0"
    //     },
    //     {
    //       "start": 21.02,
    //       "end": 21.13,
    //       "value": "NG"
    //     }
    //   ]
    // }

    // Lip-sync cue structure (we can define this based on known phonemes in your TTS voice)
   
    // const lipsync = {
    //   mouthCues: [
    //     {
    //       start: 0,
    //       end: 0.02,
    //       value: "X",
    //     },
    //     {
    //       start: 0.02,
    //       end: 0.61,
    //       value: "B",
    //     },
    //     {
    //       start: 0.61,
    //       end: 0.68,
    //       value: "C",
    //     },
    //     {
    //       start: 0.68,
    //       end: 0.76,
    //       value: "A",
    //     },
    //     {
    //       start: 0.76,
    //       end: 0.96,
    //       value: "B",
    //     },
    //     {
    //       start: 0.96,
    //       end: 1.17,
    //       value: "C",
    //     },
    //     {
    //       start: 1.17,
    //       end: 1.31,
    //       value: "B",
    //     },
    //     {
    //       start: 1.31,
    //       end: 1.45,
    //       value: "E",
    //     },
    //     {
    //       start: 1.45,
    //       end: 1.52,
    //       value: "F",
    //     },
    //     {
    //       start: 1.52,
    //       end: 1.68,
    //       value: "B",
    //     },
    //     {
    //       start: 1.68,
    //       end: 1.79,
    //       value: "E",
    //     },
    //     {
    //       start: 1.79,
    //       end: 1.86,
    //       value: "F",
    //     },
    //     {
    //       start: 1.86,
    //       end: 2,
    //       value: "C",
    //     },
    //     {
    //       start: 2,
    //       end: 2.21,
    //       value: "F",
    //     },
    //     {
    //       start: 2.21,
    //       end: 2.28,
    //       value: "D",
    //     },
    //     {
    //       start: 2.28,
    //       end: 2.41,
    //       value: "A",
    //     },
    //     {
    //       start: 2.41,
    //       end: 2.54,
    //       value: "B",
    //     },
    //     {
    //       start: 2.54,
    //       end: 2.63,
    //       value: "A",
    //     },
    //     {
    //       start: 2.63,
    //       end: 2.7,
    //       value: "C",
    //     },
    //     {
    //       start: 2.7,
    //       end: 2.9,
    //       value: "B",
    //     },
    //     {
    //       start: 2.9,
    //       end: 2.97,
    //       value: "C",
    //     },
    //     {
    //       start: 2.97,
    //       end: 3.11,
    //       value: "D",
    //     },
    //     {
    //       start: 3.11,
    //       end: 3.18,
    //       value: "C",
    //     },
    //     {
    //       start: 3.18,
    //       end: 3.26,
    //       value: "A",
    //     },
    //     {
    //       start: 3.26,
    //       end: 3.4,
    //       value: "H",
    //     },
    //     {
    //       start: 3.4,
    //       end: 3.47,
    //       value: "C",
    //     },
    //     {
    //       start: 3.47,
    //       end: 3.61,
    //       value: "B",
    //     },
    //     {
    //       start: 3.61,
    //       end: 3.68,
    //       value: "C",
    //     },
    //     {
    //       start: 3.68,
    //       end: 3.75,
    //       value: "B",
    //     },
    //     {
    //       start: 3.75,
    //       end: 3.83,
    //       value: "A",
    //     },
    //     {
    //       start: 3.83,
    //       end: 3.92,
    //       value: "C",
    //     },
    //     {
    //       start: 3.92,
    //       end: 4.2,
    //       value: "B",
    //     },
    //     {
    //       start: 4.2,
    //       end: 4.27,
    //       value: "F",
    //     },
    //     {
    //       start: 4.27,
    //       end: 4.75,
    //       value: "B",
    //     },
    //     {
    //       start: 4.75,
    //       end: 4.88,
    //       value: "A",
    //     },
    //     {
    //       start: 4.88,
    //       end: 4.93,
    //       value: "B",
    //     },
    //     {
    //       start: 4.93,
    //       end: 5.04,
    //       value: "C",
    //     },
    //     {
    //       start: 5.04,
    //       end: 5.39,
    //       value: "B",
    //     },
    //     {
    //       start: 5.39,
    //       end: 5.46,
    //       value: "G",
    //     },
    //     {
    //       start: 5.46,
    //       end: 5.53,
    //       value: "C",
    //     },
    //     {
    //       start: 5.53,
    //       end: 5.67,
    //       value: "B",
    //     },
    //     {
    //       start: 5.67,
    //       end: 5.75,
    //       value: "A",
    //     },
    //     {
    //       start: 5.75,
    //       end: 5.84,
    //       value: "B",
    //     },
    //     {
    //       start: 5.84,
    //       end: 5.99,
    //       value: "X",
    //     },
    //     {
    //       start: 5.99,
    //       end: 6.1,
    //       value: "B",
    //     },
    //     {
    //       start: 6.1,
    //       end: 7.1,
    //       value: "X",
    //     },
    //     {
    //       start: 7.1,
    //       end: 7.22,
    //       value: "A",
    //     },
    //     {
    //       start: 7.22,
    //       end: 7.52,
    //       value: "B",
    //     },
    //     {
    //       start: 7.52,
    //       end: 7.59,
    //       value: "H",
    //     },
    //     {
    //       start: 7.59,
    //       end: 7.66,
    //       value: "C",
    //     },
    //     {
    //       start: 7.66,
    //       end: 7.74,
    //       value: "A",
    //     },
    //     {
    //       start: 7.74,
    //       end: 7.89,
    //       value: "E",
    //     },
    //     {
    //       start: 7.89,
    //       end: 7.96,
    //       value: "C",
    //     },
    //     {
    //       start: 7.96,
    //       end: 8.1,
    //       value: "D",
    //     },
    //     {
    //       start: 8.1,
    //       end: 8.17,
    //       value: "C",
    //     },
    //     {
    //       start: 8.17,
    //       end: 8.31,
    //       value: "B",
    //     },
    //     {
    //       start: 8.31,
    //       end: 8.45,
    //       value: "C",
    //     },
    //     {
    //       start: 8.45,
    //       end: 8.57,
    //       value: "A",
    //     },
    //     {
    //       start: 8.57,
    //       end: 9.12,
    //       value: "F",
    //     },
    //     {
    //       start: 9.12,
    //       end: 9.33,
    //       value: "B",
    //     },
    //     {
    //       start: 9.33,
    //       end: 9.54,
    //       value: "C",
    //     },
    //     {
    //       start: 9.54,
    //       end: 9.61,
    //       value: "B",
    //     },
    //     {
    //       start: 9.61,
    //       end: 9.68,
    //       value: "C",
    //     },
    //     {
    //       start: 9.68,
    //       end: 9.75,
    //       value: "B",
    //     },
    //     {
    //       start: 9.75,
    //       end: 9.82,
    //       value: "C",
    //     },
    //     {
    //       start: 9.82,
    //       end: 9.89,
    //       value: "E",
    //     },
    //     {
    //       start: 9.89,
    //       end: 10.1,
    //       value: "F",
    //     },
    //     {
    //       start: 10.1,
    //       end: 10.18,
    //       value: "A",
    //     },
    //     {
    //       start: 10.18,
    //       end: 10.31,
    //       value: "E",
    //     },
    //     {
    //       start: 10.31,
    //       end: 10.45,
    //       value: "G",
    //     },
    //     {
    //       start: 10.45,
    //       end: 10.52,
    //       value: "E",
    //     },
    //     {
    //       start: 10.52,
    //       end: 10.6,
    //       value: "A",
    //     },
    //     {
    //       start: 10.6,
    //       end: 10.85,
    //       value: "B",
    //     },
    //     {
    //       start: 10.85,
    //       end: 11.2,
    //       value: "F",
    //     },
    //     {
    //       start: 11.2,
    //       end: 11.69,
    //       value: "X",
    //     },
    //     {
    //       start: 11.69,
    //       end: 12.56,
    //       value: "F",
    //     },
    //     {
    //       start: 12.56,
    //       end: 12.63,
    //       value: "B",
    //     },
    //     {
    //       start: 12.63,
    //       end: 12.7,
    //       value: "G",
    //     },
    //     {
    //       start: 12.7,
    //       end: 12.77,
    //       value: "B",
    //     },
    //     {
    //       start: 12.77,
    //       end: 12.98,
    //       value: "C",
    //     },
    //     {
    //       start: 12.98,
    //       end: 13.05,
    //       value: "H",
    //     },
    //     {
    //       start: 13.05,
    //       end: 13.26,
    //       value: "B",
    //     },
    //     {
    //       start: 13.26,
    //       end: 13.33,
    //       value: "C",
    //     },
    //     {
    //       start: 13.33,
    //       end: 13.61,
    //       value: "B",
    //     },
    //     {
    //       start: 13.61,
    //       end: 14.08,
    //       value: "X",
    //     },
    //     {
    //       start: 14.08,
    //       end: 14.12,
    //       value: "C",
    //     },
    //     {
    //       start: 14.12,
    //       end: 14.3,
    //       value: "B",
    //     },
    //     {
    //       start: 14.3,
    //       end: 14.37,
    //       value: "D",
    //     },
    //     {
    //       start: 14.37,
    //       end: 14.46,
    //       value: "A",
    //     },
    //     {
    //       start: 14.46,
    //       end: 14.54,
    //       value: "B",
    //     },
    //     {
    //       start: 14.54,
    //       end: 14.62,
    //       value: "A",
    //     },
    //     {
    //       start: 14.62,
    //       end: 14.72,
    //       value: "C",
    //     },
    //     {
    //       start: 14.72,
    //       end: 14.79,
    //       value: "B",
    //     },
    //     {
    //       start: 14.79,
    //       end: 14.86,
    //       value: "C",
    //     },
    //     {
    //       start: 14.86,
    //       end: 15.14,
    //       value: "B",
    //     },
    //     {
    //       start: 15.14,
    //       end: 15.21,
    //       value: "C",
    //     },
    //     {
    //       start: 15.21,
    //       end: 15.56,
    //       value: "B",
    //     },
    //     {
    //       start: 15.56,
    //       end: 15.84,
    //       value: "F",
    //     },
    //     {
    //       start: 15.84,
    //       end: 16,
    //       value: "A",
    //     },
    //     {
    //       start: 16,
    //       end: 16.14,
    //       value: "H",
    //     },
    //     {
    //       start: 16.14,
    //       end: 16.21,
    //       value: "D",
    //     },
    //     {
    //       start: 16.21,
    //       end: 16.28,
    //       value: "B",
    //     },
    //     {
    //       start: 16.28,
    //       end: 16.49,
    //       value: "F",
    //     },
    //     {
    //       start: 16.49,
    //       end: 16.56,
    //       value: "B",
    //     },
    //     {
    //       start: 16.56,
    //       end: 16.64,
    //       value: "A",
    //     },
    //     {
    //       start: 16.64,
    //       end: 16.88,
    //       value: "F",
    //     },
    //     {
    //       start: 16.88,
    //       end: 16.95,
    //       value: "G",
    //     },
    //     {
    //       start: 16.95,
    //       end: 17.16,
    //       value: "B",
    //     },
    //     {
    //       start: 17.16,
    //       end: 17.23,
    //       value: "F",
    //     },
    //     {
    //       start: 17.23,
    //       end: 17.58,
    //       value: "B",
    //     },
    //     {
    //       start: 17.58,
    //       end: 17.65,
    //       value: "G",
    //     },
    //     {
    //       start: 17.65,
    //       end: 18.4,
    //       value: "B",
    //     },
    //     {
    //       start: 18.4,
    //       end: 18.45,
    //       value: "F",
    //     },
    //     {
    //       start: 18.45,
    //       end: 18.5,
    //       value: "B",
    //     },
    //     {
    //       start: 18.5,
    //       end: 18.57,
    //       value: "C",
    //     },
    //     {
    //       start: 18.57,
    //       end: 18.64,
    //       value: "B",
    //     },
    //     {
    //       start: 18.64,
    //       end: 18.78,
    //       value: "D",
    //     },
    //     {
    //       start: 18.78,
    //       end: 18.85,
    //       value: "C",
    //     },
    //     {
    //       start: 18.85,
    //       end: 18.93,
    //       value: "A",
    //     },
    //     {
    //       start: 18.93,
    //       end: 19.01,
    //       value: "B",
    //     },
    //     {
    //       start: 19.01,
    //       end: 19.09,
    //       value: "A",
    //     },
    //     {
    //       start: 19.09,
    //       end: 19.14,
    //       value: "C",
    //     },
    //     {
    //       start: 19.14,
    //       end: 19.4,
    //       value: "B",
    //     },
    //     {
    //       start: 19.4,
    //       end: 19.47,
    //       value: "C",
    //     },
    //     {
    //       start: 19.47,
    //       end: 19.54,
    //       value: "B",
    //     },
    //     {
    //       start: 19.54,
    //       end: 19.68,
    //       value: "C",
    //     },
    //     {
    //       start: 19.68,
    //       end: 19.75,
    //       value: "B",
    //     },
    //     {
    //       start: 19.75,
    //       end: 19.96,
    //       value: "C",
    //     },
    //     {
    //       start: 19.96,
    //       end: 20.53,
    //       value: "B",
    //     },
    //     {
    //       start: 20.53,
    //       end: 20.59,
    //       value: "E",
    //     },
    //     {
    //       start: 20.59,
    //       end: 20.84,
    //       value: "D",
    //     },
    //     {
    //       start: 20.84,
    //       end: 20.89,
    //       value: "C",
    //     },
    //     {
    //       start: 20.89,
    //       end: 21.07,
    //       value: "B",
    //     },
    //     {
    //       start: 21.07,
    //       end: 21.21,
    //       value: "C",
    //     },
    //     {
    //       start: 21.21,
    //       end: 21.28,
    //       value: "E",
    //     },
    //     {
    //       start: 21.28,
    //       end: 21.35,
    //       value: "B",
    //     },
    //     {
    //       start: 21.35,
    //       end: 21.49,
    //       value: "C",
    //     },
    //     {
    //       start: 21.49,
    //       end: 21.56,
    //       value: "B",
    //     },
    //     {
    //       start: 21.56,
    //       end: 21.66,
    //       value: "A",
    //     },
    //     {
    //       start: 21.66,
    //       end: 21.81,
    //       value: "B",
    //     },
    //     {
    //       start: 21.81,
    //       end: 21.84,
    //       value: "X",
    //     },
    //     {
    //       start: 21.84,
    //       end: null,
    //       value: "X",
    //     },
    //   ],
    // };

    // const lipsync = {
    //   mouthCues : [
    //     {
    //       "start": 0,
    //       "end": 0.07,
    //       "value": "K"
    //     },
    //     {
    //       "start": 0.07,
    //       "end": 0.13,
    //       "value": "AE1"
    //     },
    //     {
    //       "start": 0.13,
    //       "end": 0.2,
    //       "value": "N"
    //     },
    //     {
    //       "start": 0.2,
    //       "end": 0.3,
    //       "value": "Y"
    //     },
    //     {
    //       "start": 0.3,
    //       "end": 0.4,
    //       "value": "UW1"
    //     },
    //     {
    //       "start": 0.4,
    //       "end": 0.48,
    //       "value": "D"
    //     },
    //     {
    //       "start": 0.48,
    //       "end": 0.55,
    //       "value": "IH0"
    //     },
    //     {
    //       "start": 0.55,
    //       "end": 0.63,
    //       "value": "S"
    //     },
    //     {
    //       "start": 0.63,
    //       "end": 0.7,
    //       "value": "K"
    //     },
    //     {
    //       "start": 0.7,
    //       "end": 0.78,
    //       "value": "R"
    //     },
    //     {
    //       "start": 0.78,
    //       "end": 0.85,
    //       "value": "AY1"
    //     },
    //     {
    //       "start": 0.85,
    //       "end": 0.93,
    //       "value": "B"
    //     },
    //     {
    //       "start": 0.93,
    //       "end": 1,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 1,
    //       "end": 1.08,
    //       "value": "S"
    //     },
    //     {
    //       "start": 1.08,
    //       "end": 1.15,
    //       "value": "IH0"
    //     },
    //     {
    //       "start": 1.15,
    //       "end": 1.23,
    //       "value": "N"
    //     },
    //     {
    //       "start": 1.23,
    //       "end": 1.3,
    //       "value": "EH1"
    //     },
    //     {
    //       "start": 1.3,
    //       "end": 1.38,
    //       "value": "R"
    //     },
    //     {
    //       "start": 1.38,
    //       "end": 1.45,
    //       "value": "IY0"
    //     },
    //     {
    //       "start": 1.45,
    //       "end": 1.53,
    //       "value": "OW0"
    //     },
    //     {
    //       "start": 1.53,
    //       "end": 1.64,
    //       "value": "W"
    //     },
    //     {
    //       "start": 1.64,
    //       "end": 1.76,
    //       "value": "EH1"
    //     },
    //     {
    //       "start": 1.76,
    //       "end": 1.87,
    //       "value": "R"
    //     },
    //     {
    //       "start": 1.87,
    //       "end": 1.97,
    //       "value": "Y"
    //     },
    //     {
    //       "start": 1.97,
    //       "end": 2.07,
    //       "value": "UW1"
    //     },
    //     {
    //       "start": 2.07,
    //       "end": 2.14,
    //       "value": "HH"
    //     },
    //     {
    //       "start": 2.14,
    //       "end": 2.2,
    //       "value": "AE1"
    //     },
    //     {
    //       "start": 2.2,
    //       "end": 2.27,
    //       "value": "D"
    //     },
    //     {
    //       "start": 2.27,
    //       "end": 2.33,
    //       "value": "T"
    //     },
    //     {
    //       "start": 2.33,
    //       "end": 2.4,
    //       "value": "UW1"
    //     },
    //     {
    //       "start": 2.4,
    //       "end": 2.48,
    //       "value": "AA1"
    //     },
    //     {
    //       "start": 2.48,
    //       "end": 2.55,
    //       "value": "P"
    //     },
    //     {
    //       "start": 2.55,
    //       "end": 2.63,
    //       "value": "T"
    //     },
    //     {
    //       "start": 2.63,
    //       "end": 2.7,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 2.7,
    //       "end": 2.78,
    //       "value": "M"
    //     },
    //     {
    //       "start": 2.78,
    //       "end": 2.85,
    //       "value": "AY2"
    //     },
    //     {
    //       "start": 2.85,
    //       "end": 2.93,
    //       "value": "Z"
    //     },
    //     {
    //       "start": 2.93,
    //       "end": 3,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 3,
    //       "end": 3.06,
    //       "value": "K"
    //     },
    //     {
    //       "start": 3.06,
    //       "end": 3.12,
    //       "value": "AA1"
    //     },
    //     {
    //       "start": 3.12,
    //       "end": 3.18,
    //       "value": "M"
    //     },
    //     {
    //       "start": 3.18,
    //       "end": 3.23,
    //       "value": "P"
    //     },
    //     {
    //       "start": 3.24,
    //       "end": 3.29,
    //       "value": "L"
    //     },
    //     {
    //       "start": 3.29,
    //       "end": 3.35,
    //       "value": "EH0"
    //     },
    //     {
    //       "start": 3.35,
    //       "end": 3.41,
    //       "value": "K"
    //     },
    //     {
    //       "start": 3.41,
    //       "end": 3.47,
    //       "value": "S"
    //     },
    //     {
    //       "start": 3.47,
    //       "end": 3.55,
    //       "value": "D"
    //     },
    //     {
    //       "start": 3.55,
    //       "end": 3.62,
    //       "value": "EY1"
    //     },
    //     {
    //       "start": 3.62,
    //       "end": 3.7,
    //       "value": "T"
    //     },
    //     {
    //       "start": 3.7,
    //       "end": 3.77,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 3.77,
    //       "end": 3.85,
    //       "value": "B"
    //     },
    //     {
    //       "start": 3.85,
    //       "end": 3.92,
    //       "value": "EY2"
    //     },
    //     {
    //       "start": 3.92,
    //       "end": 4,
    //       "value": "S"
    //     },
    //     {
    //       "start": 4,
    //       "end": 4.07,
    //       "value": "K"
    //     },
    //     {
    //       "start": 4.07,
    //       "end": 4.13,
    //       "value": "W"
    //     },
    //     {
    //       "start": 4.13,
    //       "end": 4.2,
    //       "value": "IY1"
    //     },
    //     {
    //       "start": 4.2,
    //       "end": 4.26,
    //       "value": "R"
    //     },
    //     {
    //       "start": 4.26,
    //       "end": 4.33,
    //       "value": "IY0"
    //     },
    //     {
    //       "start": 4.33,
    //       "end": 4.4,
    //       "value": "IH0"
    //     },
    //     {
    //       "start": 4.4,
    //       "end": 4.47,
    //       "value": "N"
    //     },
    //     {
    //       "start": 4.47,
    //       "end": 4.53,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 4.53,
    //       "end": 4.6,
    //       "value": "P"
    //     },
    //     {
    //       "start": 4.6,
    //       "end": 4.68,
    //       "value": "R"
    //     },
    //     {
    //       "start": 4.68,
    //       "end": 4.75,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 4.75,
    //       "end": 4.83,
    //       "value": "D"
    //     },
    //     {
    //       "start": 4.83,
    //       "end": 4.9,
    //       "value": "AH1"
    //     },
    //     {
    //       "start": 4.9,
    //       "end": 4.98,
    //       "value": "K"
    //     },
    //     {
    //       "start": 4.98,
    //       "end": 5.05,
    //       "value": "SH"
    //     },
    //     {
    //       "start": 5.05,
    //       "end": 5.13,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 5.13,
    //       "end": 5.2,
    //       "value": "N"
    //     },
    //     {
    //       "start": 6,
    //       "end": 6.12,
    //       "value": "P"
    //     },
    //     {
    //       "start": 6.12,
    //       "end": 6.24,
    //       "value": "L"
    //     },
    //     {
    //       "start": 6.24,
    //       "end": 6.36,
    //       "value": "IY1"
    //     },
    //     {
    //       "start": 6.36,
    //       "end": 6.48,
    //       "value": "Z"
    //     },
    //     {
    //       "start": 6.48,
    //       "end": 6.58,
    //       "value": "IH0"
    //     },
    //     {
    //       "start": 6.58,
    //       "end": 6.69,
    //       "value": "L"
    //     },
    //     {
    //       "start": 6.69,
    //       "end": 6.79,
    //       "value": "AE1"
    //     },
    //     {
    //       "start": 6.79,
    //       "end": 6.9,
    //       "value": "B"
    //     },
    //     {
    //       "start": 6.9,
    //       "end": 7,
    //       "value": "R"
    //     },
    //     {
    //       "start": 7,
    //       "end": 7.11,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 7.11,
    //       "end": 7.21,
    //       "value": "T"
    //     },
    //     {
    //       "start": 7.21,
    //       "end": 7.29,
    //       "value": "AA1"
    //     },
    //     {
    //       "start": 7.29,
    //       "end": 7.37,
    //       "value": "N"
    //     },
    //     {
    //       "start": 7.37,
    //       "end": 7.49,
    //       "value": "DH"
    //     },
    //     {
    //       "start": 7.49,
    //       "end": 7.61,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 7.61,
    //       "end": 7.69,
    //       "value": "S"
    //     },
    //     {
    //       "start": 7.69,
    //       "end": 7.77,
    //       "value": "T"
    //     },
    //     {
    //       "start": 7.77,
    //       "end": 7.86,
    //       "value": "EH1"
    //     },
    //     {
    //       "start": 7.86,
    //       "end": 7.94,
    //       "value": "P"
    //     },
    //     {
    //       "start": 7.94,
    //       "end": 8.02,
    //       "value": "S"
    //     },
    //     {
    //       "start": 8.02,
    //       "end": 8.14,
    //       "value": "Y"
    //     },
    //     {
    //       "start": 8.14,
    //       "end": 8.26,
    //       "value": "UW1"
    //     },
    //     {
    //       "start": 8.26,
    //       "end": 8.37,
    //       "value": "T"
    //     },
    //     {
    //       "start": 8.37,
    //       "end": 8.47,
    //       "value": "UH1"
    //     },
    //     {
    //       "start": 8.47,
    //       "end": 8.58,
    //       "value": "K"
    //     },
    //     {
    //       "start": 8.58,
    //       "end": 8.66,
    //       "value": "T"
    //     },
    //     {
    //       "start": 8.66,
    //       "end": 8.74,
    //       "value": "UW1"
    //     },
    //     {
    //       "start": 8.74,
    //       "end": 8.83,
    //       "value": "D"
    //     },
    //     {
    //       "start": 8.83,
    //       "end": 8.93,
    //       "value": "AY2"
    //     },
    //     {
    //       "start": 8.93,
    //       "end": 9.02,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 9.02,
    //       "end": 9.11,
    //       "value": "G"
    //     },
    //     {
    //       "start": 9.11,
    //       "end": 9.2,
    //       "value": "N"
    //     },
    //     {
    //       "start": 9.2,
    //       "end": 9.3,
    //       "value": "OW1"
    //     },
    //     {
    //       "start": 9.3,
    //       "end": 9.39,
    //       "value": "S"
    //     },
    //     {
    //       "start": 9.39,
    //       "end": 9.51,
    //       "value": "DH"
    //     },
    //     {
    //       "start": 9.51,
    //       "end": 9.63,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 9.63,
    //       "end": 9.73,
    //       "value": "P"
    //     },
    //     {
    //       "start": 9.73,
    //       "end": 9.83,
    //       "value": "ER0"
    //     },
    //     {
    //       "start": 9.83,
    //       "end": 9.93,
    //       "value": "F"
    //     },
    //     {
    //       "start": 9.93,
    //       "end": 10.03,
    //       "value": "AO1"
    //     },
    //     {
    //       "start": 10.03,
    //       "end": 10.12,
    //       "value": "R"
    //     },
    //     {
    //       "start": 10.12,
    //       "end": 10.22,
    //       "value": "M"
    //     },
    //     {
    //       "start": 10.22,
    //       "end": 10.32,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 10.32,
    //       "end": 10.42,
    //       "value": "N"
    //     },
    //     {
    //       "start": 10.42,
    //       "end": 10.52,
    //       "value": "S"
    //     },
    //     {
    //       "start": 11,
    //       "end": 11.11,
    //       "value": "DH"
    //     },
    //     {
    //       "start": 11.11,
    //       "end": 11.22,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 11.22,
    //       "end": 11.32,
    //       "value": "T"
    //     },
    //     {
    //       "start": 11.32,
    //       "end": 11.41,
    //       "value": "UW1"
    //     },
    //     {
    //       "start": 11.41,
    //       "end": 11.5,
    //       "value": "L"
    //     },
    //     {
    //       "start": 11.5,
    //       "end": 11.6,
    //       "value": "Z"
    //     },
    //     {
    //       "start": 11.6,
    //       "end": 11.71,
    //       "value": "Y"
    //     },
    //     {
    //       "start": 11.71,
    //       "end": 11.82,
    //       "value": "UW1"
    //     },
    //     {
    //       "start": 11.82,
    //       "end": 11.89,
    //       "value": "Y"
    //     },
    //     {
    //       "start": 11.89,
    //       "end": 11.97,
    //       "value": "UW1"
    //     },
    //     {
    //       "start": 11.97,
    //       "end": 12.04,
    //       "value": "Z"
    //     },
    //     {
    //       "start": 12.04,
    //       "end": 12.12,
    //       "value": "D"
    //     },
    //     {
    //       "start": 12.12,
    //       "end": 12.19,
    //       "value": "F"
    //     },
    //     {
    //       "start": 12.19,
    //       "end": 12.27,
    //       "value": "AO1"
    //     },
    //     {
    //       "start": 12.27,
    //       "end": 12.34,
    //       "value": "R"
    //     },
    //     {
    //       "start": 13.01,
    //       "end": 13.08,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 13.08,
    //       "end": 13.16,
    //       "value": "N"
    //     },
    //     {
    //       "start": 13.16,
    //       "end": 13.23,
    //       "value": "D"
    //     },
    //     {
    //       "start": 13.23,
    //       "end": 13.35,
    //       "value": "DH"
    //     },
    //     {
    //       "start": 13.35,
    //       "end": 13.46,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 13.46,
    //       "end": 13.54,
    //       "value": "AA0"
    //     },
    //     {
    //       "start": 13.54,
    //       "end": 13.62,
    //       "value": "P"
    //     },
    //     {
    //       "start": 13.62,
    //       "end": 13.7,
    //       "value": "T"
    //     },
    //     {
    //       "start": 13.7,
    //       "end": 13.78,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 13.78,
    //       "end": 13.86,
    //       "value": "M"
    //     },
    //     {
    //       "start": 13.86,
    //       "end": 13.95,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 13.95,
    //       "end": 14.03,
    //       "value": "Z"
    //     },
    //     {
    //       "start": 14.03,
    //       "end": 14.11,
    //       "value": "EY1"
    //     },
    //     {
    //       "start": 14.11,
    //       "end": 14.19,
    //       "value": "SH"
    //     },
    //     {
    //       "start": 14.19,
    //       "end": 14.27,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 14.27,
    //       "end": 14.35,
    //       "value": "N"
    //     },
    //     {
    //       "start": 14.35,
    //       "end": 14.46,
    //       "value": "T"
    //     },
    //     {
    //       "start": 14.46,
    //       "end": 14.56,
    //       "value": "EH0"
    //     },
    //     {
    //       "start": 14.56,
    //       "end": 14.67,
    //       "value": "K"
    //     },
    //     {
    //       "start": 14.67,
    //       "end": 14.78,
    //       "value": "N"
    //     },
    //     {
    //       "start": 14.78,
    //       "end": 14.89,
    //       "value": "IY1"
    //     },
    //     {
    //       "start": 14.89,
    //       "end": 14.99,
    //       "value": "K"
    //     },
    //     {
    //       "start": 14.99,
    //       "end": 15.1,
    //       "value": "S"
    //     },
    //     {
    //       "start": 15.1,
    //       "end": 15.21,
    //       "value": "Y"
    //     },
    //     {
    //       "start": 15.21,
    //       "end": 15.32,
    //       "value": "UW1"
    //     },
    //     {
    //       "start": 15.32,
    //       "end": 15.42,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 15.42,
    //       "end": 15.53,
    //       "value": "P"
    //     },
    //     {
    //       "start": 15.53,
    //       "end": 15.63,
    //       "value": "L"
    //     },
    //     {
    //       "start": 15.63,
    //       "end": 15.74,
    //       "value": "AY1"
    //     },
    //     {
    //       "start": 15.74,
    //       "end": 15.84,
    //       "value": "D"
    //     },
    //     {
    //       "start": 15.84,
    //       "end": 15.91,
    //       "value": "T"
    //     },
    //     {
    //       "start": 15.91,
    //       "end": 15.99,
    //       "value": "UW1"
    //     },
    //     {
    //       "start": 15.99,
    //       "end": 16.08,
    //       "value": "IH2"
    //     },
    //     {
    //       "start": 16.08,
    //       "end": 16.16,
    //       "value": "M"
    //     },
    //     {
    //       "start": 16.16,
    //       "end": 16.25,
    //       "value": "P"
    //     },
    //     {
    //       "start": 16.25,
    //       "end": 16.34,
    //       "value": "R"
    //     },
    //     {
    //       "start": 16.34,
    //       "end": 16.42,
    //       "value": "UW1"
    //     },
    //     {
    //       "start": 16.42,
    //       "end": 16.51,
    //       "value": "V"
    //     },
    //     {
    //       "start": 16.51,
    //       "end": 16.62,
    //       "value": "DH"
    //     },
    //     {
    //       "start": 16.62,
    //       "end": 16.73,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 17.26,
    //       "end": 17.35,
    //       "value": "IH0"
    //     },
    //     {
    //       "start": 17.35,
    //       "end": 17.45,
    //       "value": "F"
    //     },
    //     {
    //       "start": 17.45,
    //       "end": 17.54,
    //       "value": "IH1"
    //     },
    //     {
    //       "start": 17.54,
    //       "end": 17.63,
    //       "value": "SH"
    //     },
    //     {
    //       "start": 17.63,
    //       "end": 17.72,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 17.72,
    //       "end": 17.82,
    //       "value": "N"
    //     },
    //     {
    //       "start": 17.82,
    //       "end": 17.91,
    //       "value": "S"
    //     },
    //     {
    //       "start": 17.91,
    //       "end": 18,
    //       "value": "IY0"
    //     },
    //     {
    //       "start": 18,
    //       "end": 18.11,
    //       "value": "W"
    //     },
    //     {
    //       "start": 18.11,
    //       "end": 18.21,
    //       "value": "IH0"
    //     },
    //     {
    //       "start": 18.21,
    //       "end": 18.32,
    //       "value": "TH"
    //     },
    //     {
    //       "start": 18.32,
    //       "end": 18.42,
    //       "value": "AW1"
    //     },
    //     {
    //       "start": 18.42,
    //       "end": 18.53,
    //       "value": "T"
    //     },
    //     {
    //       "start": 18.53,
    //       "end": 18.61,
    //       "value": "K"
    //     },
    //     {
    //       "start": 18.61,
    //       "end": 18.7,
    //       "value": "AA1"
    //     },
    //     {
    //       "start": 18.7,
    //       "end": 18.78,
    //       "value": "M"
    //     },
    //     {
    //       "start": 18.78,
    //       "end": 18.86,
    //       "value": "P"
    //     },
    //     {
    //       "start": 18.86,
    //       "end": 18.95,
    //       "value": "R"
    //     },
    //     {
    //       "start": 18.95,
    //       "end": 19.03,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 19.03,
    //       "end": 19.12,
    //       "value": "M"
    //     },
    //     {
    //       "start": 19.12,
    //       "end": 19.2,
    //       "value": "AY2"
    //     },
    //     {
    //       "start": 19.2,
    //       "end": 19.28,
    //       "value": "Z"
    //     },
    //     {
    //       "start": 19.28,
    //       "end": 19.37,
    //       "value": "IH0"
    //     },
    //     {
    //       "start": 19.37,
    //       "end": 19.45,
    //       "value": "NG"
    //     },
    //     {
    //       "start": 19.45,
    //       "end": 19.53,
    //       "value": "D"
    //     },
    //     {
    //       "start": 19.53,
    //       "end": 19.61,
    //       "value": "EY1"
    //     },
    //     {
    //       "start": 19.61,
    //       "end": 19.68,
    //       "value": "T"
    //     },
    //     {
    //       "start": 19.68,
    //       "end": 19.76,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 19.76,
    //       "end": 19.84,
    //       "value": "IH2"
    //     },
    //     {
    //       "start": 19.84,
    //       "end": 19.91,
    //       "value": "N"
    //     },
    //     {
    //       "start": 19.91,
    //       "end": 19.99,
    //       "value": "T"
    //     },
    //     {
    //       "start": 19.99,
    //       "end": 20.06,
    //       "value": "EH1"
    //     },
    //     {
    //       "start": 20.06,
    //       "end": 20.14,
    //       "value": "G"
    //     },
    //     {
    //       "start": 20.14,
    //       "end": 20.21,
    //       "value": "R"
    //     },
    //     {
    //       "start": 20.21,
    //       "end": 20.29,
    //       "value": "AH0"
    //     },
    //     {
    //       "start": 20.29,
    //       "end": 20.36,
    //       "value": "T"
    //     },
    //     {
    //       "start": 20.36,
    //       "end": 20.44,
    //       "value": "IY0"
    //     },
    //     {
    //       "start": 20.44,
    //       "end": 20.52,
    //       "value": "AO1"
    //     },
    //     {
    //       "start": 20.52,
    //       "end": 20.6,
    //       "value": "R"
    //     },
    //     {
    //       "start": 20.6,
    //       "end": 20.71,
    //       "value": "K"
    //     },
    //     {
    //       "start": 20.71,
    //       "end": 20.81,
    //       "value": "AA1"
    //     },
    //     {
    //       "start": 20.81,
    //       "end": 20.92,
    //       "value": "Z"
    //     },
    //     {
    //       "start": 20.92,
    //       "end": 21.02,
    //       "value": "IH0"
    //     },
    //     {
    //       "start": 21.02,
    //       "end": 21.13,
    //       "value": "NG"
    //     }
    //   ]
    // }

    // const lipsync = {
    //   mouthCues : [
    //   {
    //     "start": 0,
    //     "end": 0.07,
    //     "value": "K"
    //   },
    //   {
    //     "start": 0.07,
    //     "end": 0.13,
    //     "value": "AE1"
    //   },
    //   {
    //     "start": 0.13,
    //     "end": 0.2,
    //     "value": "N"
    //   },
    //   {
    //     "start": 0.2,
    //     "end": 0.3,
    //     "value": "Y"
    //   },
    //   {
    //     "start": 0.3,
    //     "end": 0.4,
    //     "value": "UW1"
    //   },
    //   {
    //     "start": 0.4,
    //     "end": 0.48,
    //     "value": "D"
    //   },
    //   {
    //     "start": 0.48,
    //     "end": 0.55,
    //     "value": "IH0"
    //   },
    //   {
    //     "start": 0.55,
    //     "end": 0.63,
    //     "value": "S"
    //   },
    //   {
    //     "start": 0.63,
    //     "end": 0.7,
    //     "value": "K"
    //   },
    //   {
    //     "start": 0.7,
    //     "end": 0.78,
    //     "value": "R"
    //   },
    //   {
    //     "start": 0.78,
    //     "end": 0.85,
    //     "value": "AY1"
    //   },
    //   {
    //     "start": 0.85,
    //     "end": 0.93,
    //     "value": "B"
    //   },
    //   {
    //     "start": 0.93,
    //     "end": 1,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 1,
    //     "end": 1.08,
    //     "value": "S"
    //   },
    //   {
    //     "start": 1.08,
    //     "end": 1.15,
    //     "value": "IH0"
    //   },
    //   {
    //     "start": 1.15,
    //     "end": 1.23,
    //     "value": "N"
    //   },
    //   {
    //     "start": 1.23,
    //     "end": 1.3,
    //     "value": "EH1"
    //   },
    //   {
    //     "start": 1.3,
    //     "end": 1.38,
    //     "value": "R"
    //   },
    //   {
    //     "start": 1.38,
    //     "end": 1.45,
    //     "value": "IY0"
    //   },
    //   {
    //     "start": 1.45,
    //     "end": 1.53,
    //     "value": "OW0"
    //   },
    //   {
    //     "start": 1.53,
    //     "end": 1.64,
    //     "value": "W"
    //   },
    //   {
    //     "start": 1.64,
    //     "end": 1.76,
    //     "value": "EH1"
    //   },
    //   {
    //     "start": 1.76,
    //     "end": 1.87,
    //     "value": "R"
    //   },
    //   {
    //     "start": 1.87,
    //     "end": 1.97,
    //     "value": "Y"
    //   },
    //   {
    //     "start": 1.97,
    //     "end": 2.07,
    //     "value": "UW1"
    //   },
    //   {
    //     "start": 2.07,
    //     "end": 2.14,
    //     "value": "HH"
    //   },
    //   {
    //     "start": 2.14,
    //     "end": 2.2,
    //     "value": "AE1"
    //   },
    //   {
    //     "start": 2.2,
    //     "end": 2.27,
    //     "value": "D"
    //   },
    //   {
    //     "start": 2.27,
    //     "end": 2.33,
    //     "value": "T"
    //   },
    //   {
    //     "start": 2.33,
    //     "end": 2.4,
    //     "value": "UW1"
    //   },
    //   {
    //     "start": 2.4,
    //     "end": 2.48,
    //     "value": "AA1"
    //   },
    //   {
    //     "start": 2.48,
    //     "end": 2.55,
    //     "value": "P"
    //   },
    //   {
    //     "start": 2.55,
    //     "end": 2.63,
    //     "value": "T"
    //   },
    //   {
    //     "start": 2.63,
    //     "end": 2.7,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 2.7,
    //     "end": 2.78,
    //     "value": "M"
    //   },
    //   {
    //     "start": 2.78,
    //     "end": 2.85,
    //     "value": "AY2"
    //   },
    //   {
    //     "start": 2.85,
    //     "end": 2.93,
    //     "value": "Z"
    //   },
    //   {
    //     "start": 2.93,
    //     "end": 3,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 3,
    //     "end": 3.06,
    //     "value": "K"
    //   },
    //   {
    //     "start": 3.06,
    //     "end": 3.12,
    //     "value": "AA1"
    //   },
    //   {
    //     "start": 3.12,
    //     "end": 3.18,
    //     "value": "M"
    //   },
    //   {
    //     "start": 3.18,
    //     "end": 3.23,
    //     "value": "P"
    //   },
    //   {
    //     "start": 3.23,
    //     "end": 3.29,
    //     "value": "L"
    //   },
    //   {
    //     "start": 3.29,
    //     "end": 3.35,
    //     "value": "EH0"
    //   },
    //   {
    //     "start": 3.35,
    //     "end": 3.41,
    //     "value": "K"
    //   },
    //   {
    //     "start": 3.41,
    //     "end": 3.47,
    //     "value": "S"
    //   },
    //   {
    //     "start": 3.47,
    //     "end": 3.55,
    //     "value": "D"
    //   },
    //   {
    //     "start": 3.55,
    //     "end": 3.62,
    //     "value": "EY1"
    //   },
    //   {
    //     "start": 3.62,
    //     "end": 3.7,
    //     "value": "T"
    //   },
    //   {
    //     "start": 3.7,
    //     "end": 3.77,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 3.77,
    //     "end": 3.85,
    //     "value": "B"
    //   },
    //   {
    //     "start": 3.85,
    //     "end": 3.92,
    //     "value": "EY2"
    //   },
    //   {
    //     "start": 3.92,
    //     "end": 4,
    //     "value": "S"
    //   },
    //   {
    //     "start": 4,
    //     "end": 4.07,
    //     "value": "K"
    //   },
    //   {
    //     "start": 4.07,
    //     "end": 4.13,
    //     "value": "W"
    //   },
    //   {
    //     "start": 4.13,
    //     "end": 4.2,
    //     "value": "IY1"
    //   },
    //   {
    //     "start": 4.2,
    //     "end": 4.26,
    //     "value": "R"
    //   },
    //   {
    //     "start": 4.26,
    //     "end": 4.33,
    //     "value": "IY0"
    //   },
    //   {
    //     "start": 4.33,
    //     "end": 4.4,
    //     "value": "IH0"
    //   },
    //   {
    //     "start": 4.4,
    //     "end": 4.47,
    //     "value": "N"
    //   },
    //   {
    //     "start": 4.47,
    //     "end": 4.53,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 4.53,
    //     "end": 4.6,
    //     "value": "P"
    //   },
    //   {
    //     "start": 4.6,
    //     "end": 4.68,
    //     "value": "R"
    //   },
    //   {
    //     "start": 4.68,
    //     "end": 4.75,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 4.75,
    //     "end": 4.83,
    //     "value": "D"
    //   },
    //   {
    //     "start": 4.83,
    //     "end": 4.9,
    //     "value": "AH1"
    //   },
    //   {
    //     "start": 4.9,
    //     "end": 4.98,
    //     "value": "K"
    //   },
    //   {
    //     "start": 4.98,
    //     "end": 5.05,
    //     "value": "SH"
    //   },
    //   {
    //     "start": 5.05,
    //     "end": 5.13,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 5.13,
    //     "end": 5.2,
    //     "value": "N"
    //   },
    //   {
    //     "start": 6,
    //     "end": 6.12,
    //     "value": "P"
    //   },
    //   {
    //     "start": 6.12,
    //     "end": 6.24,
    //     "value": "L"
    //   },
    //   {
    //     "start": 6.24,
    //     "end": 6.36,
    //     "value": "IY1"
    //   },
    //   {
    //     "start": 6.36,
    //     "end": 6.48,
    //     "value": "Z"
    //   },
    //   {
    //     "start": 6.48,
    //     "end": 6.58,
    //     "value": "IH0"
    //   },
    //   {
    //     "start": 6.58,
    //     "end": 6.69,
    //     "value": "L"
    //   },
    //   {
    //     "start": 6.69,
    //     "end": 6.79,
    //     "value": "AE1"
    //   },
    //   {
    //     "start": 6.79,
    //     "end": 6.9,
    //     "value": "B"
    //   },
    //   {
    //     "start": 6.9,
    //     "end": 7,
    //     "value": "R"
    //   },
    //   {
    //     "start": 7,
    //     "end": 7.11,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 7.11,
    //     "end": 7.21,
    //     "value": "T"
    //   },
    //   {
    //     "start": 7.21,
    //     "end": 7.29,
    //     "value": "AA1"
    //   },
    //   {
    //     "start": 7.29,
    //     "end": 7.37,
    //     "value": "N"
    //   },
    //   {
    //     "start": 7.37,
    //     "end": 7.49,
    //     "value": "DH"
    //   },
    //   {
    //     "start": 7.49,
    //     "end": 7.61,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 7.61,
    //     "end": 7.69,
    //     "value": "S"
    //   },
    //   {
    //     "start": 7.69,
    //     "end": 7.77,
    //     "value": "T"
    //   },
    //   {
    //     "start": 7.77,
    //     "end": 7.86,
    //     "value": "EH1"
    //   },
    //   {
    //     "start": 7.86,
    //     "end": 7.94,
    //     "value": "P"
    //   },
    //   {
    //     "start": 7.94,
    //     "end": 8.02,
    //     "value": "S"
    //   },
    //   {
    //     "start": 8.02,
    //     "end": 8.14,
    //     "value": "Y"
    //   },
    //   {
    //     "start": 8.14,
    //     "end": 8.26,
    //     "value": "UW1"
    //   },
    //   {
    //     "start": 8.26,
    //     "end": 8.37,
    //     "value": "T"
    //   },
    //   {
    //     "start": 8.37,
    //     "end": 8.47,
    //     "value": "UH1"
    //   },
    //   {
    //     "start": 8.47,
    //     "end": 8.58,
    //     "value": "K"
    //   },
    //   {
    //     "start": 8.58,
    //     "end": 8.66,
    //     "value": "T"
    //   },
    //   {
    //     "start": 8.66,
    //     "end": 8.74,
    //     "value": "UW1"
    //   },
    //   {
    //     "start": 8.74,
    //     "end": 8.83,
    //     "value": "D"
    //   },
    //   {
    //     "start": 8.83,
    //     "end": 8.93,
    //     "value": "AY2"
    //   },
    //   {
    //     "start": 8.93,
    //     "end": 9.02,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 9.02,
    //     "end": 9.11,
    //     "value": "G"
    //   },
    //   {
    //     "start": 9.11,
    //     "end": 9.2,
    //     "value": "N"
    //   },
    //   {
    //     "start": 9.2,
    //     "end": 9.3,
    //     "value": "OW1"
    //   },
    //   {
    //     "start": 9.3,
    //     "end": 9.39,
    //     "value": "S"
    //   },
    //   {
    //     "start": 9.39,
    //     "end": 9.51,
    //     "value": "DH"
    //   },
    //   {
    //     "start": 9.51,
    //     "end": 9.63,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 9.63,
    //     "end": 9.73,
    //     "value": "P"
    //   },
    //   {
    //     "start": 9.73,
    //     "end": 9.83,
    //     "value": "ER0"
    //   },
    //   {
    //     "start": 9.83,
    //     "end": 9.93,
    //     "value": "F"
    //   },
    //   {
    //     "start": 9.93,
    //     "end": 10.03,
    //     "value": "AO1"
    //   },
    //   {
    //     "start": 10.03,
    //     "end": 10.12,
    //     "value": "R"
    //   },
    //   {
    //     "start": 10.12,
    //     "end": 10.22,
    //     "value": "M"
    //   },
    //   {
    //     "start": 10.22,
    //     "end": 10.32,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 10.32,
    //     "end": 10.42,
    //     "value": "N"
    //   },
    //   {
    //     "start": 10.42,
    //     "end": 10.52,
    //     "value": "S"
    //   },
    //   {
    //     "start": 11,
    //     "end": 11.11,
    //     "value": "DH"
    //   },
    //   {
    //     "start": 11.11,
    //     "end": 11.22,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 11.22,
    //     "end": 11.32,
    //     "value": "T"
    //   },
    //   {
    //     "start": 11.32,
    //     "end": 11.41,
    //     "value": "UW1"
    //   },
    //   {
    //     "start": 11.41,
    //     "end": 11.5,
    //     "value": "L"
    //   },
    //   {
    //     "start": 11.5,
    //     "end": 11.6,
    //     "value": "Z"
    //   },
    //   {
    //     "start": 11.6,
    //     "end": 11.71,
    //     "value": "Y"
    //   },
    //   {
    //     "start": 11.71,
    //     "end": 11.82,
    //     "value": "UW1"
    //   },
    //   {
    //     "start": 11.82,
    //     "end": 11.89,
    //     "value": "Y"
    //   },
    //   {
    //     "start": 11.89,
    //     "end": 11.97,
    //     "value": "UW1"
    //   },
    //   {
    //     "start": 11.97,
    //     "end": 12.04,
    //     "value": "Z"
    //   },
    //   {
    //     "start": 12.04,
    //     "end": 12.12,
    //     "value": "D"
    //   },
    //   {
    //     "start": 12.12,
    //     "end": 12.19,
    //     "value": "F"
    //   },
    //   {
    //     "start": 12.19,
    //     "end": 12.27,
    //     "value": "AO1"
    //   },
    //   {
    //     "start": 12.27,
    //     "end": 12.34,
    //     "value": "R"
    //   },
    //   {
    //     "start": 13.01,
    //     "end": 13.08,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 13.08,
    //     "end": 13.16,
    //     "value": "N"
    //   },
    //   {
    //     "start": 13.16,
    //     "end": 13.23,
    //     "value": "D"
    //   },
    //   {
    //     "start": 13.23,
    //     "end": 13.35,
    //     "value": "DH"
    //   },
    //   {
    //     "start": 13.35,
    //     "end": 13.46,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 13.46,
    //     "end": 13.54,
    //     "value": "AA0"
    //   },
    //   {
    //     "start": 13.54,
    //     "end": 13.62,
    //     "value": "P"
    //   },
    //   {
    //     "start": 13.62,
    //     "end": 13.7,
    //     "value": "T"
    //   },
    //   {
    //     "start": 13.7,
    //     "end": 13.78,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 13.78,
    //     "end": 13.86,
    //     "value": "M"
    //   },
    //   {
    //     "start": 13.86,
    //     "end": 13.95,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 13.95,
    //     "end": 14.03,
    //     "value": "Z"
    //   },
    //   {
    //     "start": 14.03,
    //     "end": 14.11,
    //     "value": "EY1"
    //   },
    //   {
    //     "start": 14.11,
    //     "end": 14.19,
    //     "value": "SH"
    //   },
    //   {
    //     "start": 14.19,
    //     "end": 14.27,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 14.27,
    //     "end": 14.35,
    //     "value": "N"
    //   },
    //   {
    //     "start": 14.35,
    //     "end": 14.46,
    //     "value": "T"
    //   },
    //   {
    //     "start": 14.46,
    //     "end": 14.56,
    //     "value": "EH0"
    //   },
    //   {
    //     "start": 14.56,
    //     "end": 14.67,
    //     "value": "K"
    //   },
    //   {
    //     "start": 14.67,
    //     "end": 14.78,
    //     "value": "N"
    //   },
    //   {
    //     "start": 14.78,
    //     "end": 14.89,
    //     "value": "IY1"
    //   },
    //   {
    //     "start": 14.89,
    //     "end": 14.99,
    //     "value": "K"
    //   },
    //   {
    //     "start": 14.99,
    //     "end": 15.1,
    //     "value": "S"
    //   },
    //   {
    //     "start": 15.1,
    //     "end": 15.21,
    //     "value": "Y"
    //   },
    //   {
    //     "start": 15.21,
    //     "end": 15.32,
    //     "value": "UW1"
    //   },
    //   {
    //     "start": 15.32,
    //     "end": 15.42,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 15.42,
    //     "end": 15.53,
    //     "value": "P"
    //   },
    //   {
    //     "start": 15.53,
    //     "end": 15.63,
    //     "value": "L"
    //   },
    //   {
    //     "start": 15.63,
    //     "end": 15.74,
    //     "value": "AY1"
    //   },
    //   {
    //     "start": 15.74,
    //     "end": 15.84,
    //     "value": "D"
    //   },
    //   {
    //     "start": 15.84,
    //     "end": 15.91,
    //     "value": "T"
    //   },
    //   {
    //     "start": 15.91,
    //     "end": 15.99,
    //     "value": "UW1"
    //   },
    //   {
    //     "start": 15.99,
    //     "end": 16.08,
    //     "value": "IH2"
    //   },
    //   {
    //     "start": 16.08,
    //     "end": 16.16,
    //     "value": "M"
    //   },
    //   {
    //     "start": 16.16,
    //     "end": 16.25,
    //     "value": "P"
    //   },
    //   {
    //     "start": 16.25,
    //     "end": 16.34,
    //     "value": "R"
    //   },
    //   {
    //     "start": 16.34,
    //     "end": 16.42,
    //     "value": "UW1"
    //   },
    //   {
    //     "start": 16.42,
    //     "end": 16.51,
    //     "value": "V"
    //   },
    //   {
    //     "start": 16.51,
    //     "end": 16.62,
    //     "value": "DH"
    //   },
    //   {
    //     "start": 16.62,
    //     "end": 16.73,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 17.26,
    //     "end": 17.35,
    //     "value": "IH0"
    //   },
    //   {
    //     "start": 17.35,
    //     "end": 17.45,
    //     "value": "F"
    //   },
    //   {
    //     "start": 17.45,
    //     "end": 17.54,
    //     "value": "IH1"
    //   },
    //   {
    //     "start": 17.54,
    //     "end": 17.63,
    //     "value": "SH"
    //   },
    //   {
    //     "start": 17.63,
    //     "end": 17.72,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 17.72,
    //     "end": 17.82,
    //     "value": "N"
    //   },
    //   {
    //     "start": 17.82,
    //     "end": 17.91,
    //     "value": "S"
    //   },
    //   {
    //     "start": 17.91,
    //     "end": 18,
    //     "value": "IY0"
    //   },
    //   {
    //     "start": 18,
    //     "end": 18.11,
    //     "value": "W"
    //   },
    //   {
    //     "start": 18.11,
    //     "end": 18.21,
    //     "value": "IH0"
    //   },
    //   {
    //     "start": 18.21,
    //     "end": 18.32,
    //     "value": "TH"
    //   },
    //   {
    //     "start": 18.32,
    //     "end": 18.42,
    //     "value": "AW1"
    //   },
    //   {
    //     "start": 18.42,
    //     "end": 18.53,
    //     "value": "T"
    //   },
    //   {
    //     "start": 18.53,
    //     "end": 18.61,
    //     "value": "K"
    //   },
    //   {
    //     "start": 18.61,
    //     "end": 18.7,
    //     "value": "AA1"
    //   },
    //   {
    //     "start": 18.7,
    //     "end": 18.78,
    //     "value": "M"
    //   },
    //   {
    //     "start": 18.78,
    //     "end": 18.86,
    //     "value": "P"
    //   },
    //   {
    //     "start": 18.86,
    //     "end": 18.95,
    //     "value": "R"
    //   },
    //   {
    //     "start": 18.95,
    //     "end": 19.03,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 19.03,
    //     "end": 19.12,
    //     "value": "M"
    //   },
    //   {
    //     "start": 19.12,
    //     "end": 19.2,
    //     "value": "AY2"
    //   },
    //   {
    //     "start": 19.2,
    //     "end": 19.28,
    //     "value": "Z"
    //   },
    //   {
    //     "start": 19.28,
    //     "end": 19.37,
    //     "value": "IH0"
    //   },
    //   {
    //     "start": 19.37,
    //     "end": 19.45,
    //     "value": "NG"
    //   },
    //   {
    //     "start": 19.45,
    //     "end": 19.53,
    //     "value": "D"
    //   },
    //   {
    //     "start": 19.53,
    //     "end": 19.61,
    //     "value": "EY1"
    //   },
    //   {
    //     "start": 19.61,
    //     "end": 19.68,
    //     "value": "T"
    //   },
    //   {
    //     "start": 19.68,
    //     "end": 19.76,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 19.76,
    //     "end": 19.84,
    //     "value": "IH2"
    //   },
    //   {
    //     "start": 19.84,
    //     "end": 19.91,
    //     "value": "N"
    //   },
    //   {
    //     "start": 19.91,
    //     "end": 19.99,
    //     "value": "T"
    //   },
    //   {
    //     "start": 19.99,
    //     "end": 20.06,
    //     "value": "EH1"
    //   },
    //   {
    //     "start": 20.06,
    //     "end": 20.14,
    //     "value": "G"
    //   },
    //   {
    //     "start": 20.14,
    //     "end": 20.21,
    //     "value": "R"
    //   },
    //   {
    //     "start": 20.21,
    //     "end": 20.29,
    //     "value": "AH0"
    //   },
    //   {
    //     "start": 20.29,
    //     "end": 20.36,
    //     "value": "T"
    //   },
    //   {
    //     "start": 20.36,
    //     "end": 20.44,
    //     "value": "IY0"
    //   },
    //   {
    //     "start": 20.44,
    //     "end": 20.52,
    //     "value": "AO1"
    //   },
    //   {
    //     "start": 20.52,
    //     "end": 20.6,
    //     "value": "R"
    //   },
    //   {
    //     "start": 20.6,
    //     "end": 20.71,
    //     "value": "K"
    //   },
    //   {
    //     "start": 20.71,
    //     "end": 20.81,
    //     "value": "AA1"
    //   },
    //   {
    //     "start": 20.81,
    //     "end": 20.92,
    //     "value": "Z"
    //   },
    //   {
    //     "start": 20.92,
    //     "end": 21.02,
    //     "value": "IH0"
    //   },
    //   {
    //     "start": 21.02,
    //     "end": 21.13,
    //     "value": "NG"
    //   }
    // ]
    // }

    const lipsync = {
      mouthCues : [
        {
          "start": 0,
          "end": 0.07,
          "value": "K"
        },
        {
          "start": 0.07,
          "end": 0.13,
          "value": "AE1"
        },
        {
          "start": 0.13,
          "end": 0.2,
          "value": "N"
        },
        {
          "start": 0.2,
          "end": 0.3,
          "value": "Y"
        },
        {
          "start": 0.3,
          "end": 0.4,
          "value": "UW1"
        },
        {
          "start": 0.4,
          "end": 0.48,
          "value": "D"
        },
        {
          "start": 0.48,
          "end": 0.55,
          "value": "IH0"
        },
        {
          "start": 0.55,
          "end": 0.63,
          "value": "S"
        },
        {
          "start": 0.63,
          "end": 0.7,
          "value": "K"
        },
        {
          "start": 0.7,
          "end": 0.78,
          "value": "R"
        },
        {
          "start": 0.78,
          "end": 0.86,
          "value": "AY1"
        },
        {
          "start": 0.86,
          "end": 0.93,
          "value": "B"
        },
        {
          "start": 0.93,
          "end": 1,
          "value": "AH0"
        },
        {
          "start": 1,
          "end": 1.08,
          "value": "S"
        },
        {
          "start": 1.08,
          "end": 1.15,
          "value": "IH0"
        },
        {
          "start": 1.15,
          "end": 1.23,
          "value": "N"
        },
        {
          "start": 1.23,
          "end": 1.3,
          "value": "EH1"
        },
        {
          "start": 1.3,
          "end": 1.38,
          "value": "R"
        },
        {
          "start": 1.38,
          "end": 1.46,
          "value": "IY0"
        },
        {
          "start": 1.46,
          "end": 1.53,
          "value": "OW0"
        },
        {
          "start": 1.53,
          "end": 1.64,
          "value": "W"
        },
        {
          "start": 1.64,
          "end": 1.76,
          "value": "EH1"
        },
        {
          "start": 1.76,
          "end": 1.87,
          "value": "R"
        },
        {
          "start": 1.87,
          "end": 1.97,
          "value": "Y"
        },
        {
          "start": 1.97,
          "end": 2.07,
          "value": "UW1"
        },
        {
          "start": 2.07,
          "end": 2.13,
          "value": "HH"
        },
        {
          "start": 2.13,
          "end": 2.2,
          "value": "AE1"
        },
        {
          "start": 2.2,
          "end": 2.27,
          "value": "D"
        },
        {
          "start": 2.27,
          "end": 2.33,
          "value": "T"
        },
        {
          "start": 2.33,
          "end": 2.4,
          "value": "UW1"
        },
        {
          "start": 2.4,
          "end": 2.48,
          "value": "AA1"
        },
        {
          "start": 2.48,
          "end": 2.55,
          "value": "P"
        },
        {
          "start": 2.55,
          "end": 2.63,
          "value": "T"
        },
        {
          "start": 2.63,
          "end": 2.7,
          "value": "AH0"
        },
        {
          "start": 2.7,
          "end": 2.78,
          "value": "M"
        },
        {
          "start": 2.78,
          "end": 2.86,
          "value": "AY2"
        },
        {
          "start": 2.86,
          "end": 2.93,
          "value": "Z"
        },
        {
          "start": 2.93,
          "end": 3,
          "value": "AH0"
        },
        {
          "start": 3,
          "end": 3.06,
          "value": "K"
        },
        {
          "start": 3.06,
          "end": 3.12,
          "value": "AA1"
        },
        {
          "start": 3.12,
          "end": 3.18,
          "value": "M"
        },
        {
          "start": 3.18,
          "end": 3.23,
          "value": "P"
        },
        {
          "start": 3.23,
          "end": 3.29,
          "value": "L"
        },
        {
          "start": 3.29,
          "end": 3.35,
          "value": "EH0"
        },
        {
          "start": 3.35,
          "end": 3.41,
          "value": "K"
        },
        {
          "start": 3.41,
          "end": 3.47,
          "value": "S"
        },
        {
          "start": 3.47,
          "end": 3.54,
          "value": "D"
        },
        {
          "start": 3.54,
          "end": 3.62,
          "value": "EY1"
        },
        {
          "start": 3.62,
          "end": 3.7,
          "value": "T"
        },
        {
          "start": 3.7,
          "end": 3.77,
          "value": "AH0"
        },
        {
          "start": 3.77,
          "end": 3.85,
          "value": "B"
        },
        {
          "start": 3.85,
          "end": 3.92,
          "value": "EY2"
        },
        {
          "start": 3.92,
          "end": 4,
          "value": "S"
        },
        {
          "start": 4,
          "end": 4.07,
          "value": "K"
        },
        {
          "start": 4.07,
          "end": 4.13,
          "value": "W"
        },
        {
          "start": 4.13,
          "end": 4.2,
          "value": "IY1"
        },
        {
          "start": 4.2,
          "end": 4.27,
          "value": "R"
        },
        {
          "start": 4.27,
          "end": 4.33,
          "value": "IY0"
        },
        {
          "start": 4.33,
          "end": 4.4,
          "value": "IH0"
        },
        {
          "start": 4.4,
          "end": 4.47,
          "value": "N"
        },
        {
          "start": 4.47,
          "end": 4.53,
          "value": "AH0"
        },
        {
          "start": 4.53,
          "end": 4.61,
          "value": "P"
        },
        {
          "start": 4.61,
          "end": 4.68,
          "value": "R"
        },
        {
          "start": 4.68,
          "end": 4.76,
          "value": "AH0"
        },
        {
          "start": 4.76,
          "end": 4.83,
          "value": "D"
        },
        {
          "start": 4.83,
          "end": 4.9,
          "value": "AH1"
        },
        {
          "start": 4.9,
          "end": 4.98,
          "value": "K"
        },
        {
          "start": 4.98,
          "end": 5.05,
          "value": "SH"
        },
        {
          "start": 5.05,
          "end": 5.13,
          "value": "AH0"
        },
        {
          "start": 5.13,
          "end": 5.2,
          "value": "N"
        },
        {
          "start": 0,
          "end": 0.07,
          "value": "K"
        },
        {
          "start": 0.07,
          "end": 0.13,
          "value": "AE1"
        },
        {
          "start": 0.13,
          "end": 0.2,
          "value": "N"
        },
        {
          "start": 0.2,
          "end": 0.3,
          "value": "Y"
        },
        {
          "start": 0.3,
          "end": 0.4,
          "value": "UW1"
        },
        {
          "start": 0.4,
          "end": 0.48,
          "value": "D"
        },
        {
          "start": 0.48,
          "end": 0.55,
          "value": "IH0"
        },
        {
          "start": 0.55,
          "end": 0.63,
          "value": "S"
        },
        {
          "start": 0.63,
          "end": 0.7,
          "value": "K"
        },
        {
          "start": 0.7,
          "end": 0.78,
          "value": "R"
        },
        {
          "start": 0.78,
          "end": 0.85,
          "value": "AY1"
        },
        {
          "start": 0.85,
          "end": 0.93,
          "value": "B"
        },
        {
          "start": 0.93,
          "end": 1,
          "value": "AH0"
        },
        {
          "start": 1,
          "end": 1.08,
          "value": "S"
        },
        {
          "start": 1.08,
          "end": 1.15,
          "value": "IH0"
        },
        {
          "start": 1.15,
          "end": 1.23,
          "value": "N"
        },
        {
          "start": 1.23,
          "end": 1.3,
          "value": "EH1"
        },
        {
          "start": 1.3,
          "end": 1.38,
          "value": "R"
        },
        {
          "start": 1.38,
          "end": 1.45,
          "value": "IY0"
        },
        {
          "start": 1.45,
          "end": 1.53,
          "value": "OW0"
        },
        {
          "start": 1.53,
          "end": 1.64,
          "value": "W"
        },
        {
          "start": 1.64,
          "end": 1.76,
          "value": "EH1"
        },
        {
          "start": 1.76,
          "end": 1.87,
          "value": "R"
        },
        {
          "start": 1.87,
          "end": 1.97,
          "value": "Y"
        },
        {
          "start": 1.97,
          "end": 2.07,
          "value": "UW1"
        },
        {
          "start": 2.07,
          "end": 2.14,
          "value": "HH"
        },
        {
          "start": 2.14,
          "end": 2.2,
          "value": "AE1"
        },
        {
          "start": 2.2,
          "end": 2.27,
          "value": "D"
        },
        {
          "start": 2.27,
          "end": 2.33,
          "value": "T"
        },
        {
          "start": 2.33,
          "end": 2.4,
          "value": "UW1"
        },
        {
          "start": 2.4,
          "end": 2.48,
          "value": "AA1"
        },
        {
          "start": 2.48,
          "end": 2.55,
          "value": "P"
        },
        {
          "start": 2.55,
          "end": 2.63,
          "value": "T"
        },
        {
          "start": 2.63,
          "end": 2.7,
          "value": "AH0"
        },
        {
          "start": 2.7,
          "end": 2.78,
          "value": "M"
        },
        {
          "start": 2.78,
          "end": 2.85,
          "value": "AY2"
        },
        {
          "start": 2.85,
          "end": 2.93,
          "value": "Z"
        },
        {
          "start": 2.93,
          "end": 3,
          "value": "AH0"
        },
        {
          "start": 3,
          "end": 3.06,
          "value": "K"
        },
        {
          "start": 3.06,
          "end": 3.12,
          "value": "AA1"
        },
        {
          "start": 3.12,
          "end": 3.18,
          "value": "M"
        },
        {
          "start": 3.18,
          "end": 3.23,
          "value": "P"
        },
        {
          "start": 3.23,
          "end": 3.29,
          "value": "L"
        },
        {
          "start": 3.29,
          "end": 3.35,
          "value": "EH0"
        },
        {
          "start": 3.35,
          "end": 3.41,
          "value": "K"
        },
        {
          "start": 3.41,
          "end": 3.47,
          "value": "S"
        },
        {
          "start": 3.47,
          "end": 3.55,
          "value": "D"
        },
        {
          "start": 3.55,
          "end": 3.62,
          "value": "EY1"
        },
        {
          "start": 3.62,
          "end": 3.7,
          "value": "T"
        },
        {
          "start": 3.7,
          "end": 3.77,
          "value": "AH0"
        },
        {
          "start": 3.77,
          "end": 3.85,
          "value": "B"
        },
        {
          "start": 3.85,
          "end": 3.92,
          "value": "EY2"
        },
        {
          "start": 3.92,
          "end": 4,
          "value": "S"
        },
        {
          "start": 4,
          "end": 4.07,
          "value": "K"
        },
        {
          "start": 4.07,
          "end": 4.13,
          "value": "W"
        },
        {
          "start": 4.13,
          "end": 4.2,
          "value": "IY1"
        },
        {
          "start": 4.2,
          "end": 4.26,
          "value": "R"
        },
        {
          "start": 4.26,
          "end": 4.33,
          "value": "IY0"
        },
        {
          "start": 4.33,
          "end": 4.4,
          "value": "IH0"
        },
        {
          "start": 4.4,
          "end": 4.47,
          "value": "N"
        },
        {
          "start": 4.47,
          "end": 4.53,
          "value": "AH0"
        },
        {
          "start": 4.53,
          "end": 4.6,
          "value": "P"
        },
        {
          "start": 4.6,
          "end": 4.68,
          "value": "R"
        },
        {
          "start": 4.68,
          "end": 4.75,
          "value": "AH0"
        },
        {
          "start": 4.75,
          "end": 4.83,
          "value": "D"
        },
        {
          "start": 4.83,
          "end": 4.9,
          "value": "AH1"
        },
        {
          "start": 4.9,
          "end": 4.98,
          "value": "K"
        },
        {
          "start": 4.98,
          "end": 5.05,
          "value": "SH"
        },
        {
          "start": 5.05,
          "end": 5.13,
          "value": "AH0"
        },
        {
          "start": 5.13,
          "end": 5.2,
          "value": "N"
        },
        {
          "start": 6,
          "end": 6.12,
          "value": "P"
        },
        {
          "start": 6.12,
          "end": 6.24,
          "value": "L"
        },
        {
          "start": 6.24,
          "end": 6.36,
          "value": "IY1"
        },
        {
          "start": 6.36,
          "end": 6.48,
          "value": "Z"
        },
        {
          "start": 6.48,
          "end": 6.59,
          "value": "IH0"
        },
        {
          "start": 6.59,
          "end": 6.69,
          "value": "L"
        },
        {
          "start": 6.69,
          "end": 6.79,
          "value": "AE1"
        },
        {
          "start": 6.79,
          "end": 6.9,
          "value": "B"
        },
        {
          "start": 6.9,
          "end": 7,
          "value": "R"
        },
        {
          "start": 7,
          "end": 7.11,
          "value": "AH0"
        },
        {
          "start": 7.11,
          "end": 7.21,
          "value": "T"
        },
        {
          "start": 7.21,
          "end": 7.29,
          "value": "AA1"
        },
        {
          "start": 7.29,
          "end": 7.37,
          "value": "N"
        },
        {
          "start": 7.37,
          "end": 7.49,
          "value": "DH"
        },
        {
          "start": 7.49,
          "end": 7.61,
          "value": "AH0"
        },
        {
          "start": 7.61,
          "end": 7.69,
          "value": "S"
        },
        {
          "start": 7.69,
          "end": 7.77,
          "value": "T"
        },
        {
          "start": 7.77,
          "end": 7.85,
          "value": "EH1"
        },
        {
          "start": 7.85,
          "end": 7.94,
          "value": "P"
        },
        {
          "start": 7.94,
          "end": 8.02,
          "value": "S"
        },
        {
          "start": 8.02,
          "end": 8.14,
          "value": "Y"
        },
        {
          "start": 8.14,
          "end": 8.26,
          "value": "UW1"
        },
        {
          "start": 8.26,
          "end": 8.37,
          "value": "T"
        },
        {
          "start": 8.37,
          "end": 8.47,
          "value": "UH1"
        },
        {
          "start": 8.47,
          "end": 8.58,
          "value": "K"
        },
        {
          "start": 8.58,
          "end": 8.66,
          "value": "T"
        },
        {
          "start": 8.66,
          "end": 8.74,
          "value": "UW1"
        },
        {
          "start": 8.74,
          "end": 8.83,
          "value": "D"
        },
        {
          "start": 8.83,
          "end": 8.93,
          "value": "AY2"
        },
        {
          "start": 8.93,
          "end": 9.02,
          "value": "AH0"
        },
        {
          "start": 9.02,
          "end": 9.11,
          "value": "G"
        },
        {
          "start": 9.11,
          "end": 9.2,
          "value": "N"
        },
        {
          "start": 9.2,
          "end": 9.29,
          "value": "OW1"
        },
        {
          "start": 9.29,
          "end": 9.39,
          "value": "S"
        },
        {
          "start": 9.39,
          "end": 9.51,
          "value": "DH"
        },
        {
          "start": 9.51,
          "end": 9.63,
          "value": "AH0"
        },
        {
          "start": 9.63,
          "end": 9.73,
          "value": "P"
        },
        {
          "start": 9.73,
          "end": 9.83,
          "value": "ER0"
        },
        {
          "start": 9.83,
          "end": 9.92,
          "value": "F"
        },
        {
          "start": 9.92,
          "end": 10.02,
          "value": "AO1"
        },
        {
          "start": 10.02,
          "end": 10.12,
          "value": "R"
        },
        {
          "start": 10.12,
          "end": 10.22,
          "value": "M"
        },
        {
          "start": 10.22,
          "end": 10.32,
          "value": "AH0"
        },
        {
          "start": 10.32,
          "end": 10.42,
          "value": "N"
        },
        {
          "start": 10.42,
          "end": 10.52,
          "value": "S"
        },
        {
          "start": 6,
          "end": 6.12,
          "value": "P"
        },
        {
          "start": 6.12,
          "end": 6.24,
          "value": "L"
        },
        {
          "start": 6.24,
          "end": 6.36,
          "value": "IY1"
        },
        {
          "start": 6.36,
          "end": 6.48,
          "value": "Z"
        },
        {
          "start": 6.48,
          "end": 6.58,
          "value": "IH0"
        },
        {
          "start": 6.58,
          "end": 6.69,
          "value": "L"
        },
        {
          "start": 6.69,
          "end": 6.79,
          "value": "AE1"
        },
        {
          "start": 6.79,
          "end": 6.9,
          "value": "B"
        },
        {
          "start": 6.9,
          "end": 7,
          "value": "R"
        },
        {
          "start": 7,
          "end": 7.11,
          "value": "AH0"
        },
        {
          "start": 7.11,
          "end": 7.21,
          "value": "T"
        },
        {
          "start": 7.21,
          "end": 7.29,
          "value": "AA1"
        },
        {
          "start": 7.29,
          "end": 7.37,
          "value": "N"
        },
        {
          "start": 7.37,
          "end": 7.49,
          "value": "DH"
        },
        {
          "start": 7.49,
          "end": 7.61,
          "value": "AH0"
        },
        {
          "start": 7.61,
          "end": 7.69,
          "value": "S"
        },
        {
          "start": 7.69,
          "end": 7.77,
          "value": "T"
        },
        {
          "start": 7.77,
          "end": 7.86,
          "value": "EH1"
        },
        {
          "start": 7.86,
          "end": 7.94,
          "value": "P"
        },
        {
          "start": 7.94,
          "end": 8.02,
          "value": "S"
        },
        {
          "start": 8.02,
          "end": 8.14,
          "value": "Y"
        },
        {
          "start": 8.14,
          "end": 8.26,
          "value": "UW1"
        },
        {
          "start": 8.26,
          "end": 8.37,
          "value": "T"
        },
        {
          "start": 8.37,
          "end": 8.47,
          "value": "UH1"
        },
        {
          "start": 8.47,
          "end": 8.58,
          "value": "K"
        },
        {
          "start": 8.58,
          "end": 8.66,
          "value": "T"
        },
        {
          "start": 8.66,
          "end": 8.74,
          "value": "UW1"
        },
        {
          "start": 8.74,
          "end": 8.83,
          "value": "D"
        },
        {
          "start": 8.83,
          "end": 8.93,
          "value": "AY2"
        },
        {
          "start": 8.93,
          "end": 9.02,
          "value": "AH0"
        },
        {
          "start": 9.02,
          "end": 9.11,
          "value": "G"
        },
        {
          "start": 9.11,
          "end": 9.2,
          "value": "N"
        },
        {
          "start": 9.2,
          "end": 9.3,
          "value": "OW1"
        },
        {
          "start": 9.3,
          "end": 9.39,
          "value": "S"
        },
        {
          "start": 9.39,
          "end": 9.51,
          "value": "DH"
        },
        {
          "start": 9.51,
          "end": 9.63,
          "value": "AH0"
        },
        {
          "start": 9.63,
          "end": 9.73,
          "value": "P"
        },
        {
          "start": 9.73,
          "end": 9.83,
          "value": "ER0"
        },
        {
          "start": 9.83,
          "end": 9.93,
          "value": "F"
        },
        {
          "start": 9.93,
          "end": 10.03,
          "value": "AO1"
        },
        {
          "start": 10.03,
          "end": 10.12,
          "value": "R"
        },
        {
          "start": 10.12,
          "end": 10.22,
          "value": "M"
        },
        {
          "start": 10.22,
          "end": 10.32,
          "value": "AH0"
        },
        {
          "start": 10.32,
          "end": 10.42,
          "value": "N"
        },
        {
          "start": 10.42,
          "end": 10.52,
          "value": "S"
        },
        {
          "start": 11,
          "end": 11.11,
          "value": "DH"
        },
        {
          "start": 11.11,
          "end": 11.22,
          "value": "AH0"
        },
        {
          "start": 11.22,
          "end": 11.32,
          "value": "T"
        },
        {
          "start": 11.32,
          "end": 11.41,
          "value": "UW1"
        },
        {
          "start": 11.41,
          "end": 11.5,
          "value": "L"
        },
        {
          "start": 11.5,
          "end": 11.6,
          "value": "Z"
        },
        {
          "start": 11.6,
          "end": 11.71,
          "value": "Y"
        },
        {
          "start": 11.71,
          "end": 11.82,
          "value": "UW1"
        },
        {
          "start": 11.82,
          "end": 11.89,
          "value": "Y"
        },
        {
          "start": 11.89,
          "end": 11.97,
          "value": "UW1"
        },
        {
          "start": 11.97,
          "end": 12.04,
          "value": "Z"
        },
        {
          "start": 12.04,
          "end": 12.12,
          "value": "D"
        },
        {
          "start": 12.12,
          "end": 12.19,
          "value": "F"
        },
        {
          "start": 12.19,
          "end": 12.27,
          "value": "AO1"
        },
        {
          "start": 12.27,
          "end": 12.34,
          "value": "R"
        },
        {
          "start": 13.01,
          "end": 13.09,
          "value": "AH0"
        },
        {
          "start": 13.09,
          "end": 13.16,
          "value": "N"
        },
        {
          "start": 13.16,
          "end": 13.23,
          "value": "D"
        },
        {
          "start": 13.23,
          "end": 13.35,
          "value": "DH"
        },
        {
          "start": 13.35,
          "end": 13.46,
          "value": "AH0"
        },
        {
          "start": 13.46,
          "end": 13.54,
          "value": "AA0"
        },
        {
          "start": 13.54,
          "end": 13.62,
          "value": "P"
        },
        {
          "start": 13.62,
          "end": 13.7,
          "value": "T"
        },
        {
          "start": 13.7,
          "end": 13.78,
          "value": "AH0"
        },
        {
          "start": 13.78,
          "end": 13.86,
          "value": "M"
        },
        {
          "start": 13.86,
          "end": 13.94,
          "value": "AH0"
        },
        {
          "start": 13.94,
          "end": 14.03,
          "value": "Z"
        },
        {
          "start": 14.03,
          "end": 14.11,
          "value": "EY1"
        },
        {
          "start": 14.11,
          "end": 14.19,
          "value": "SH"
        },
        {
          "start": 14.19,
          "end": 14.27,
          "value": "AH0"
        },
        {
          "start": 14.27,
          "end": 14.35,
          "value": "N"
        },
        {
          "start": 14.35,
          "end": 14.46,
          "value": "T"
        },
        {
          "start": 14.46,
          "end": 14.56,
          "value": "EH0"
        },
        {
          "start": 14.56,
          "end": 14.67,
          "value": "K"
        },
        {
          "start": 14.67,
          "end": 14.78,
          "value": "N"
        },
        {
          "start": 14.78,
          "end": 14.88,
          "value": "IY1"
        },
        {
          "start": 14.88,
          "end": 14.99,
          "value": "K"
        },
        {
          "start": 14.99,
          "end": 15.1,
          "value": "S"
        },
        {
          "start": 15.1,
          "end": 15.21,
          "value": "Y"
        },
        {
          "start": 15.21,
          "end": 15.32,
          "value": "UW1"
        },
        {
          "start": 15.32,
          "end": 15.42,
          "value": "AH0"
        },
        {
          "start": 15.42,
          "end": 15.53,
          "value": "P"
        },
        {
          "start": 15.53,
          "end": 15.63,
          "value": "L"
        },
        {
          "start": 15.63,
          "end": 15.74,
          "value": "AY1"
        },
        {
          "start": 15.74,
          "end": 15.84,
          "value": "D"
        },
        {
          "start": 15.84,
          "end": 15.91,
          "value": "T"
        },
        {
          "start": 15.91,
          "end": 15.99,
          "value": "UW1"
        },
        {
          "start": 15.99,
          "end": 16.08,
          "value": "IH2"
        },
        {
          "start": 16.08,
          "end": 16.16,
          "value": "M"
        },
        {
          "start": 16.16,
          "end": 16.25,
          "value": "P"
        },
        {
          "start": 16.25,
          "end": 16.34,
          "value": "R"
        },
        {
          "start": 16.34,
          "end": 16.42,
          "value": "UW1"
        },
        {
          "start": 16.42,
          "end": 16.51,
          "value": "V"
        },
        {
          "start": 16.51,
          "end": 16.62,
          "value": "DH"
        },
        {
          "start": 16.62,
          "end": 16.73,
          "value": "AH0"
        },
        {
          "start": 17.26,
          "end": 17.35,
          "value": "IH0"
        },
        {
          "start": 17.35,
          "end": 17.44,
          "value": "F"
        },
        {
          "start": 17.44,
          "end": 17.53,
          "value": "IH1"
        },
        {
          "start": 17.53,
          "end": 17.63,
          "value": "SH"
        },
        {
          "start": 17.63,
          "end": 17.72,
          "value": "AH0"
        },
        {
          "start": 17.72,
          "end": 17.81,
          "value": "N"
        },
        {
          "start": 17.81,
          "end": 17.91,
          "value": "S"
        },
        {
          "start": 17.91,
          "end": 18,
          "value": "IY0"
        },
        {
          "start": 11,
          "end": 11.11,
          "value": "DH"
        },
        {
          "start": 11.11,
          "end": 11.22,
          "value": "AH0"
        },
        {
          "start": 11.22,
          "end": 11.32,
          "value": "T"
        },
        {
          "start": 11.32,
          "end": 11.41,
          "value": "UW1"
        },
        {
          "start": 11.41,
          "end": 11.5,
          "value": "L"
        },
        {
          "start": 11.5,
          "end": 11.6,
          "value": "Z"
        },
        {
          "start": 11.6,
          "end": 11.71,
          "value": "Y"
        },
        {
          "start": 11.71,
          "end": 11.82,
          "value": "UW1"
        },
        {
          "start": 11.82,
          "end": 11.89,
          "value": "Y"
        },
        {
          "start": 11.89,
          "end": 11.97,
          "value": "UW1"
        },
        {
          "start": 11.97,
          "end": 12.04,
          "value": "Z"
        },
        {
          "start": 12.04,
          "end": 12.12,
          "value": "D"
        },
        {
          "start": 12.12,
          "end": 12.19,
          "value": "F"
        },
        {
          "start": 12.19,
          "end": 12.27,
          "value": "AO1"
        },
        {
          "start": 12.27,
          "end": 12.34,
          "value": "R"
        },
        {
          "start": 13.01,
          "end": 13.08,
          "value": "AH0"
        },
        {
          "start": 13.08,
          "end": 13.16,
          "value": "N"
        },
        {
          "start": 13.16,
          "end": 13.23,
          "value": "D"
        },
        {
          "start": 13.23,
          "end": 13.35,
          "value": "DH"
        },
        {
          "start": 13.35,
          "end": 13.46,
          "value": "AH0"
        },
        {
          "start": 13.46,
          "end": 13.54,
          "value": "AA0"
        },
        {
          "start": 13.54,
          "end": 13.62,
          "value": "P"
        },
        {
          "start": 13.62,
          "end": 13.7,
          "value": "T"
        },
        {
          "start": 13.7,
          "end": 13.78,
          "value": "AH0"
        },
        {
          "start": 13.78,
          "end": 13.86,
          "value": "M"
        },
        {
          "start": 13.86,
          "end": 13.95,
          "value": "AH0"
        },
        {
          "start": 13.95,
          "end": 14.03,
          "value": "Z"
        },
        {
          "start": 14.03,
          "end": 14.11,
          "value": "EY1"
        },
        {
          "start": 14.11,
          "end": 14.19,
          "value": "SH"
        },
        {
          "start": 14.19,
          "end": 14.27,
          "value": "AH0"
        },
        {
          "start": 14.27,
          "end": 14.35,
          "value": "N"
        },
        {
          "start": 14.35,
          "end": 14.46,
          "value": "T"
        },
        {
          "start": 14.46,
          "end": 14.56,
          "value": "EH0"
        },
        {
          "start": 14.56,
          "end": 14.67,
          "value": "K"
        },
        {
          "start": 14.67,
          "end": 14.78,
          "value": "N"
        },
        {
          "start": 14.78,
          "end": 14.89,
          "value": "IY1"
        },
        {
          "start": 14.89,
          "end": 14.99,
          "value": "K"
        },
        {
          "start": 14.99,
          "end": 15.1,
          "value": "S"
        },
        {
          "start": 15.1,
          "end": 15.21,
          "value": "Y"
        },
        {
          "start": 15.21,
          "end": 15.32,
          "value": "UW1"
        },
        {
          "start": 15.32,
          "end": 15.42,
          "value": "AH0"
        },
        {
          "start": 15.42,
          "end": 15.53,
          "value": "P"
        },
        {
          "start": 15.53,
          "end": 15.63,
          "value": "L"
        },
        {
          "start": 15.63,
          "end": 15.74,
          "value": "AY1"
        },
        {
          "start": 15.74,
          "end": 15.84,
          "value": "D"
        },
        {
          "start": 15.84,
          "end": 15.91,
          "value": "T"
        },
        {
          "start": 15.91,
          "end": 15.99,
          "value": "UW1"
        },
        {
          "start": 15.99,
          "end": 16.08,
          "value": "IH2"
        },
        {
          "start": 16.08,
          "end": 16.16,
          "value": "M"
        },
        {
          "start": 16.16,
          "end": 16.25,
          "value": "P"
        },
        {
          "start": 16.25,
          "end": 16.34,
          "value": "R"
        },
        {
          "start": 16.34,
          "end": 16.42,
          "value": "UW1"
        },
        {
          "start": 16.42,
          "end": 16.51,
          "value": "V"
        },
        {
          "start": 16.51,
          "end": 16.62,
          "value": "DH"
        },
        {
          "start": 16.62,
          "end": 16.73,
          "value": "AH0"
        },
        {
          "start": 17.26,
          "end": 17.35,
          "value": "IH0"
        },
        {
          "start": 17.35,
          "end": 17.45,
          "value": "F"
        },
        {
          "start": 17.45,
          "end": 17.54,
          "value": "IH1"
        },
        {
          "start": 17.54,
          "end": 17.63,
          "value": "SH"
        },
        {
          "start": 17.63,
          "end": 17.72,
          "value": "AH0"
        },
        {
          "start": 17.72,
          "end": 17.82,
          "value": "N"
        },
        {
          "start": 17.82,
          "end": 17.91,
          "value": "S"
        },
        {
          "start": 17.91,
          "end": 18,
          "value": "IY0"
        },
        {
          "start": 18,
          "end": 18.11,
          "value": "W"
        },
        {
          "start": 18.11,
          "end": 18.21,
          "value": "IH0"
        },
        {
          "start": 18.21,
          "end": 18.32,
          "value": "TH"
        },
        {
          "start": 18.32,
          "end": 18.43,
          "value": "AW1"
        },
        {
          "start": 18.43,
          "end": 18.53,
          "value": "T"
        },
        {
          "start": 18.53,
          "end": 18.62,
          "value": "K"
        },
        {
          "start": 18.62,
          "end": 18.7,
          "value": "AA1"
        },
        {
          "start": 18.7,
          "end": 18.78,
          "value": "M"
        },
        {
          "start": 18.78,
          "end": 18.87,
          "value": "P"
        },
        {
          "start": 18.87,
          "end": 18.95,
          "value": "R"
        },
        {
          "start": 18.95,
          "end": 19.03,
          "value": "AH0"
        },
        {
          "start": 19.03,
          "end": 19.12,
          "value": "M"
        },
        {
          "start": 19.12,
          "end": 19.2,
          "value": "AY2"
        },
        {
          "start": 19.2,
          "end": 19.28,
          "value": "Z"
        },
        {
          "start": 19.28,
          "end": 19.37,
          "value": "IH0"
        },
        {
          "start": 19.37,
          "end": 19.45,
          "value": "NG"
        },
        {
          "start": 19.45,
          "end": 19.53,
          "value": "D"
        },
        {
          "start": 19.53,
          "end": 19.6,
          "value": "EY1"
        },
        {
          "start": 19.6,
          "end": 19.68,
          "value": "T"
        },
        {
          "start": 19.68,
          "end": 19.76,
          "value": "AH0"
        },
        {
          "start": 19.76,
          "end": 19.83,
          "value": "IH2"
        },
        {
          "start": 19.83,
          "end": 19.91,
          "value": "N"
        },
        {
          "start": 19.91,
          "end": 19.99,
          "value": "T"
        },
        {
          "start": 19.99,
          "end": 20.06,
          "value": "EH1"
        },
        {
          "start": 20.06,
          "end": 20.14,
          "value": "G"
        },
        {
          "start": 20.14,
          "end": 20.22,
          "value": "R"
        },
        {
          "start": 20.22,
          "end": 20.29,
          "value": "AH0"
        },
        {
          "start": 20.29,
          "end": 20.37,
          "value": "T"
        },
        {
          "start": 20.37,
          "end": 20.44,
          "value": "IY0"
        },
        {
          "start": 20.44,
          "end": 20.52,
          "value": "AO1"
        },
        {
          "start": 20.52,
          "end": 20.6,
          "value": "R"
        },
        {
          "start": 20.6,
          "end": 20.7,
          "value": "K"
        },
        {
          "start": 20.7,
          "end": 20.81,
          "value": "AA1"
        },
        {
          "start": 20.81,
          "end": 20.92,
          "value": "Z"
        },
        {
          "start": 20.92,
          "end": 21.03,
          "value": "IH0"
        },
        {
          "start": 21.03,
          "end": 21.13,
          "value": "NG"
        },
        {
          "start": 18,
          "end": 18.11,
          "value": "W"
        },
        {
          "start": 18.11,
          "end": 18.21,
          "value": "IH0"
        },
        {
          "start": 18.21,
          "end": 18.32,
          "value": "TH"
        },
        {
          "start": 18.32,
          "end": 18.42,
          "value": "AW1"
        },
        {
          "start": 18.42,
          "end": 18.53,
          "value": "T"
        },
        {
          "start": 18.53,
          "end": 18.61,
          "value": "K"
        },
        {
          "start": 18.61,
          "end": 18.7,
          "value": "AA1"
        },
        {
          "start": 18.7,
          "end": 18.78,
          "value": "M"
        },
        {
          "start": 18.78,
          "end": 18.86,
          "value": "P"
        },
        {
          "start": 18.86,
          "end": 18.95,
          "value": "R"
        },
        {
          "start": 18.95,
          "end": 19.03,
          "value": "AH0"
        },
        {
          "start": 19.03,
          "end": 19.12,
          "value": "M"
        },
        {
          "start": 19.12,
          "end": 19.2,
          "value": "AY2"
        },
        {
          "start": 19.2,
          "end": 19.28,
          "value": "Z"
        },
        {
          "start": 19.28,
          "end": 19.37,
          "value": "IH0"
        },
        {
          "start": 19.37,
          "end": 19.45,
          "value": "NG"
        },
        {
          "start": 19.45,
          "end": 19.53,
          "value": "D"
        },
        {
          "start": 19.53,
          "end": 19.61,
          "value": "EY1"
        },
        {
          "start": 19.61,
          "end": 19.68,
          "value": "T"
        },
        {
          "start": 19.68,
          "end": 19.76,
          "value": "AH0"
        },
        {
          "start": 19.76,
          "end": 19.84,
          "value": "IH2"
        },
        {
          "start": 19.84,
          "end": 19.91,
          "value": "N"
        },
        {
          "start": 19.91,
          "end": 19.99,
          "value": "T"
        },
        {
          "start": 19.99,
          "end": 20.06,
          "value": "EH1"
        },
        {
          "start": 20.06,
          "end": 20.14,
          "value": "G"
        },
        {
          "start": 20.14,
          "end": 20.21,
          "value": "R"
        },
        {
          "start": 20.21,
          "end": 20.29,
          "value": "AH0"
        },
        {
          "start": 20.29,
          "end": 20.36,
          "value": "T"
        },
        {
          "start": 20.36,
          "end": 20.44,
          "value": "IY0"
        },
        {
          "start": 20.44,
          "end": 20.52,
          "value": "AO1"
        },
        {
          "start": 20.52,
          "end": 20.6,
          "value": "R"
        },
        {
          "start": 20.6,
          "end": 20.71,
          "value": "K"
        },
        {
          "start": 20.71,
          "end": 20.81,
          "value": "AA1"
        },
        {
          "start": 20.81,
          "end": 20.92,
          "value": "Z"
        },
        {
          "start": 20.92,
          "end": 21.02,
          "value": "IH0"
        },
        {
          "start": 21.02,
          "end": 21.13,
          "value": "NG"
        }
      ]
    }

    console.log("Controller initialized");

    // Three.js Scene Initialization
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("3d-avatar").appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    loader.load(
      "bg2.jpg",
      (texture) => {
        console.log("Background texture loaded successfully.");
        scene.background = texture;
      },
      undefined,
      (error) => {
        console.error("Error loading background texture:", error);
      }
    );

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10).normalize();
    scene.add(ambientLight, directionalLight);

    // GLB Model Loading
    const gltfLoader = new THREE.GLTFLoader();
    launchAvatar(url);

    function launchAvatar(url) {
      gltfLoader.load(
        url,
        (gltf) => {
          console.log("GLB model loaded.");
          model = gltf.scene;
          scene.add(model);
          model.position.set(0, -2.35, 0);
          model.scale.set(1.5, 1.5, 1.5);
          camera.position.set(0, 0, 1);

          mixer = new THREE.AnimationMixer(model);

          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.play();
          });

          animate();
          setupBlinking();
        },
        undefined,
        (error) => {
          console.error("Error loading GLB model:", error.message || error);
        }
      );
    }

    function updateLipSync(currentTime) {
      if (!model) {
        console.warn("Model not initialized yet.");
        return;
      }

      const head = model.getObjectByName("Wolf3D_Head");
      const teeth = model.getObjectByName("Wolf3D_Teeth");

      if (!head || !teeth) {
        console.warn("Head or Teeth object not found in model.");
        return;
      }

      const morphTargetSmoothing = 0.19;

      Object.values(corresponding).forEach((viseme) => {
        if (head.morphTargetDictionary[viseme] !== undefined) {
          const index = head.morphTargetDictionary[viseme];
          head.morphTargetInfluences[index] = THREE.MathUtils.lerp(
            head.morphTargetInfluences[index],
            0,
            morphTargetSmoothing
          );
          teeth.morphTargetInfluences[index] = THREE.MathUtils.lerp(
            teeth.morphTargetInfluences[index],
            0,
            morphTargetSmoothing
          );
        }
      });

      lipsync.mouthCues.forEach((cue) => {
        if (currentTime >= cue.start && currentTime <= cue.end) {
          const target = corresponding[cue.value];
          if (head.morphTargetDictionary[target] !== undefined) {
            const index = head.morphTargetDictionary[target];
            head.morphTargetInfluences[index] = THREE.MathUtils.lerp(
              head.morphTargetInfluences[index],
              1,
              morphTargetSmoothing
            );
            teeth.morphTargetInfluences[index] = THREE.MathUtils.lerp(
              teeth.morphTargetInfluences[index],
              1,
              morphTargetSmoothing
            );
          }
        }
      });
    }

    function resetLipSync() {
      if (!model) {
        console.warn("Model not initialized yet.");
        return;
      }

      const head = model.getObjectByName("Wolf3D_Head");
      const teeth = model.getObjectByName("Wolf3D_Teeth");

      if (!head || !teeth) {
        console.warn("Head or Teeth object not found in model.");
        return;
      }

      Object.values(corresponding).forEach((viseme) => {
        if (head.morphTargetDictionary[viseme] !== undefined) {
          head.morphTargetInfluences[head.morphTargetDictionary[viseme]] = 0;
          teeth.morphTargetInfluences[teeth.morphTargetDictionary[viseme]] = 0;
        }
      });
    }

    // function for model to look like a human

    function setupBlinking() {
      if (blinkingInterval !== null) return; // Don't start a new interval if one is already running

      blinkingInterval = setInterval(() => {
        const head = model.getObjectByName("Wolf3D_Head");
        if (!head) return;

        const morphTargets = head.morphTargetDictionary;
        const influences = head.morphTargetInfluences;

        // Check if both blink morph targets exist
        if (
          morphTargets["eyeBlinkLeft"] !== undefined &&
          morphTargets["eyeBlinkRight"] !== undefined
        ) {
          const blinkLeftIndex = morphTargets["eyeBlinkLeft"];
          const blinkRightIndex = morphTargets["eyeBlinkRight"];

          // Set both eyes to blink
          influences[blinkLeftIndex] = 1;
          influences[blinkRightIndex] = 1;

          // Reset both eyes after blinking
          setTimeout(() => {
            influences[blinkLeftIndex] = 0;
            influences[blinkRightIndex] = 0;
          }, 200); // Duration of the blink
        }
      }, THREE.MathUtils.randInt(1000, 5000)); // Random interval for natural blinking
    }
    // Optionally clear the blinking interval when done (e.g., if model is removed from scene)
    function clearBlinking() {
      if (blinkingInterval !== null) {
        clearInterval(blinkingInterval);
        blinkingInterval = null;
      }
    }

    $scope.speakQuestion = function () {
      const audioFile = "audio2.wav"; // Path to your audio file

      const audio = new Audio(audioFile);
      console.log("Playing audio:", audioFile);

      // This will keep track of the animation frame loop
      let animationFrameId;

      audio.onplay = function () {
        console.log("Audio playback started.");
        const startTime = audio.currentTime; // Track the start time of the audio

        function update() {
          const currentTime = audio.currentTime - startTime; // Calculate elapsed time since start

          // Call the lip-sync update function
          updateLipSync(currentTime);

          // If the audio is still playing, request the next frame
          if (!audio.paused && !audio.ended) {
            animationFrameId = requestAnimationFrame(update); // Recursive call to update next frame
          }
        }

        update(); // Start the update loop when audio starts playing
      };

      audio.onended = function () {
        console.log("Audio playback ended.");
        cancelAnimationFrame(animationFrameId); // Stop the animation loop
        resetLipSync();
      };

      audio.onerror = function (event) {
        console.error("Audio playback error:", event);
        cancelAnimationFrame(animationFrameId); // Stop the animation loop
        resetLipSync();
      };

      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
        resetLipSync();
      });
    };

    $scope.nextQuestion = function () {
      console.log("Next question triggered.");

      $scope.speakQuestion(); // Play the audio file for the next question
    };

    $scope.changeAvatar = function (url) {
      // Remove the existing avatar from the scene if it exists
      if (model) {
        console.log("model changed");
        clearBlinking();
        scene.remove(model);
        model = null; // Clear the reference to the old avatar
      }
      clearBlinking();
      launchAvatar(url);
    };

    function animate() {
      requestAnimationFrame(animate);
      if (mixer) mixer.update(clock.getDelta());
      renderer.render(scene, camera);
    }

    $scope.$on("$destroy", function () {
      console.log("Cleaning up resources.");
      if (speech) {
        window.speechSynthesis.cancel();
      }
      resetLipSync();
      clearBlinking();
      renderer.dispose();
    });
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  });

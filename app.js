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

    const lipsync = {
        mouthCues: [
            {
                "start": 0.006,
                "end": 0.061,
                "value": "K"
            },
            {
                "start": 0.061,
                "end": 0.102,
                "value": "A"
            },
            {
                "start": 0.102,
                "end": 0.16,
                "value": "T"
            },
            {
                "start": 0.16,
                "end": 0.221,
                "value": "I"
            },
            {
                "start": 0.221,
                "end": 0.265,
                "value": "U"
            },
            {
                "start": 0.265,
                "end": 0.329,
                "value": "T"
            },
            {
                "start": 0.329,
                "end": 0.378,
                "value": "I"
            },
            {
                "start": 0.378,
                "end": 0.465,
                "value": "S"
            },
            {
                "start": 0.465,
                "end": 0.52,
                "value": "K"
            },
            {
                "start": 0.52,
                "end": 0.588,
                "value": "R"
            },
            {
                "start": 0.588,
                "end": 0.671,
                "value": "A"
            },
            {
                "start": 0.671,
                "end": 0.723,
                "value": "P"
            },
            {
                "start": 0.723,
                "end": 0.772,
                "value": "@"
            },
            {
                "start": 0.772,
                "end": 0.896,
                "value": "S"
            },
            {
                "start": 0.896,
                "end": 0.938,
                "value": "I"
            },
            {
                "start": 0.938,
                "end": 1.008,
                "value": "T"
            },
            {
                "start": 1.008,
                "end": 1.066,
                "value": "E"
            },
            {
                "start": 1.066,
                "end": 1.189,
                "value": "R"
            },
            {
                "start": 1.189,
                "end": 1.262,
                "value": "I"
            },
            {
                "start": 1.262,
                "end": 1.359,
                "value": "O"
            },
            {
                "start": 1.359,
                "end": 1.472,
                "value": "U"
            },
            {
                "start": 1.472,
                "end": 1.522,
                "value": "E"
            },
            {
                "start": 1.522,
                "end": 1.588,
                "value": "R"
            },
            {
                "start": 1.588,
                "end": 1.673,
                "value": "I"
            },
            {
                "start": 1.673,
                "end": 1.746,
                "value": "U"
            },
            {
                "start": 1.746,
                "end": 1.828,
                "value": "K"
            },
            {
                "start": 1.828,
                "end": 1.9,
                "value": "A"
            },
            {
                "start": 1.9,
                "end": 1.936,
                "value": "T"
            },
            {
                "start": 1.936,
                "end": 1.973,
                "value": "T"
            },
            {
                "start": 1.973,
                "end": 2.052,
                "value": "U"
            },
            {
                "start": 2.052,
                "end": 2.18,
                "value": "A"
            },
            {
                "start": 2.18,
                "end": 2.241,
                "value": "P"
            },
            {
                "start": 2.241,
                "end": 2.302,
                "value": "T"
            },
            {
                "start": 2.302,
                "end": 2.333,
                "value": "@"
            },
            {
                "start": 2.333,
                "end": 2.4,
                "value": "P"
            },
            {
                "start": 2.4,
                "end": 2.529,
                "value": "A"
            },
            {
                "start": 2.529,
                "end": 2.604,
                "value": "S"
            },
            {
                "start": 2.604,
                "end": 2.636,
                "value": "@"
            },
            {
                "start": 2.636,
                "end": 2.725,
                "value": "K"
            },
            {
                "start": 2.725,
                "end": 2.771,
                "value": "@"
            },
            {
                "start": 2.771,
                "end": 2.815,
                "value": "P"
            },
            {
                "start": 2.815,
                "end": 2.893,
                "value": "P"
            },
            {
                "start": 2.893,
                "end": 2.945,
                "value": "T"
            },
            {
                "start": 2.945,
                "end": 2.994,
                "value": "E"
            },
            {
                "start": 2.994,
                "end": 3.063,
                "value": "K"
            },
            {
                "start": 3.063,
                "end": 3.152,
                "value": "S"
            },
            {
                "start": 3.152,
                "end": 3.214,
                "value": "T"
            },
            {
                "start": 3.214,
                "end": 3.341,
                "value": "E"
            },
            {
                "start": 3.341,
                "end": 3.377,
                "value": "T"
            },
            {
                "start": 3.377,
                "end": 3.434,
                "value": "@"
            },
            {
                "start": 3.434,
                "end": 3.494,
                "value": "P"
            },
            {
                "start": 3.494,
                "end": 3.611,
                "value": "E"
            },
            {
                "start": 3.611,
                "end": 3.708,
                "value": "S"
            },
            {
                "start": 3.708,
                "end": 3.823,
                "value": "K"
            },
            {
                "start": 3.823,
                "end": 3.873,
                "value": "U"
            },
            {
                "start": 3.873,
                "end": 3.91,
                "value": "I"
            },
            {
                "start": 3.91,
                "end": 3.984,
                "value": "R"
            },
            {
                "start": 3.984,
                "end": 4.087,
                "value": "I"
            },
            {
                "start": 4.087,
                "end": 4.125,
                "value": "I"
            },
            {
                "start": 4.125,
                "end": 4.173,
                "value": "T"
            },
            {
                "start": 4.173,
                "end": 4.214,
                "value": "@"
            },
            {
                "start": 4.214,
                "end": 4.319,
                "value": "P"
            },
            {
                "start": 4.319,
                "end": 4.359,
                "value": "R"
            },
            {
                "start": 4.359,
                "end": 4.397,
                "value": "@"
            },
            {
                "start": 4.397,
                "end": 4.445,
                "value": "T"
            },
            {
                "start": 4.445,
                "end": 4.547,
                "value": "E"
            },
            {
                "start": 4.547,
                "end": 4.607,
                "value": "K"
            },
            {
                "start": 4.607,
                "end": 4.698,
                "value": "S"
            },
            {
                "start": 4.698,
                "end": 4.776,
                "value": "T"
            },
            {
                "start": 4.776,
                "end": 4.828,
                "value": "I"
            },
            {
                "start": 4.828,
                "end": 4.893,
                "value": "T"
            },
            {
                "start": 4.893,
                "end": 4.943,
                "value": "F"
            },
            {
                "start": 4.943,
                "end": 5.06,
                "value": "A"
            },
            {
                "start": 5.06,
                "end": 5.137,
                "value": "R"
            },
            {
                "start": 5.137,
                "end": 5.179,
                "value": "@"
            },
            {
                "start": 5.179,
                "end": 5.218,
                "value": "T"
            },
            {
                "start": 5.218,
                "end": 5.275,
                "value": "P"
            },
            {
                "start": 5.275,
                "end": 5.316,
                "value": "@"
            },
            {
                "start": 5.316,
                "end": 5.388,
                "value": "T"
            },
            {
                "start": 5.388,
                "end": 5.489,
                "value": "T"
            },
            {
                "start": 5.489,
                "end": 5.883,
                "value": "SIL"
            },
            {
                "start": 5.883,
                "end": 5.919,
                "value": "P"
            },
            {
                "start": 5.919,
                "end": 5.969,
                "value": "T"
            },
            {
                "start": 5.969,
                "end": 6.068,
                "value": "I"
            },
            {
                "start": 6.068,
                "end": 6.155,
                "value": "S"
            },
            {
                "start": 6.155,
                "end": 6.189,
                "value": "I"
            },
            {
                "start": 6.189,
                "end": 6.285,
                "value": "T"
            },
            {
                "start": 6.285,
                "end": 6.37,
                "value": "A"
            },
            {
                "start": 6.37,
                "end": 6.434,
                "value": "P"
            },
            {
                "start": 6.434,
                "end": 6.564,
                "value": "E"
            },
            {
                "start": 6.564,
                "end": 6.676,
                "value": "E"
            },
            {
                "start": 6.676,
                "end": 6.738,
                "value": "T"
            },
            {
                "start": 6.738,
                "end": 6.803,
                "value": "A"
            },
            {
                "start": 6.803,
                "end": 6.846,
                "value": "T"
            },
            {
                "start": 6.846,
                "end": 6.876,
                "value": "T"
            },
            {
                "start": 6.876,
                "end": 6.917,
                "value": "@"
            },
            {
                "start": 6.917,
                "end": 7.027,
                "value": "S"
            },
            {
                "start": 7.027,
                "end": 7.08,
                "value": "T"
            },
            {
                "start": 7.08,
                "end": 7.158,
                "value": "E"
            },
            {
                "start": 7.158,
                "end": 7.207,
                "value": "P"
            },
            {
                "start": 7.207,
                "end": 7.283,
                "value": "S"
            },
            {
                "start": 7.283,
                "end": 7.335,
                "value": "I"
            },
            {
                "start": 7.335,
                "end": 7.384,
                "value": "U"
            },
            {
                "start": 7.384,
                "end": 7.479,
                "value": "T"
            },
            {
                "start": 7.479,
                "end": 7.534,
                "value": "U"
            },
            {
                "start": 7.534,
                "end": 7.597,
                "value": "K"
            },
            {
                "start": 7.597,
                "end": 7.644,
                "value": "T"
            },
            {
                "start": 7.644,
                "end": 7.688,
                "value": "U"
            },
            {
                "start": 7.688,
                "end": 7.743,
                "value": "T"
            },
            {
                "start": 7.743,
                "end": 7.863,
                "value": "A"
            },
            {
                "start": 7.863,
                "end": 7.897,
                "value": "@"
            },
            {
                "start": 7.897,
                "end": 7.966,
                "value": "K"
            },
            {
                "start": 7.966,
                "end": 8.054,
                "value": "T"
            },
            {
                "start": 8.054,
                "end": 8.156,
                "value": "O"
            },
            {
                "start": 8.156,
                "end": 8.229,
                "value": "S"
            },
            {
                "start": 8.229,
                "end": 8.276,
                "value": "T"
            },
            {
                "start": 8.276,
                "end": 8.319,
                "value": "@"
            },
            {
                "start": 8.319,
                "end": 8.403,
                "value": "P"
            },
            {
                "start": 8.403,
                "end": 8.465,
                "value": "E"
            },
            {
                "start": 8.465,
                "end": 8.574,
                "value": "F"
            },
            {
                "start": 8.574,
                "end": 8.643,
                "value": "O"
            },
            {
                "start": 8.643,
                "end": 8.685,
                "value": "R"
            },
            {
                "start": 8.685,
                "end": 8.752,
                "value": "P"
            },
            {
                "start": 8.752,
                "end": 8.8,
                "value": "@"
            },
            {
                "start": 8.8,
                "end": 8.869,
                "value": "T"
            },
            {
                "start": 8.869,
                "end": 8.973,
                "value": "S"
            },
            {
                "start": 8.973,
                "end": 9.048,
                "value": "I"
            },
            {
                "start": 9.048,
                "end": 9.176,
                "value": "S"
            },
            {
                "start": 9.176,
                "end": 9.378,
                "value": "U"
            },
            {
                "start": 9.378,
                "end": 9.771,
                "value": "SIL"
            },
            {
                "start": 9.771,
                "end": 9.821,
                "value": "T"
            },
            {
                "start": 9.821,
                "end": 9.86,
                "value": "@"
            },
            {
                "start": 9.86,
                "end": 9.989,
                "value": "T"
            },
            {
                "start": 9.989,
                "end": 10.126,
                "value": "U"
            },
            {
                "start": 10.126,
                "end": 10.241,
                "value": "T"
            },
            {
                "start": 10.241,
                "end": 10.329,
                "value": "S"
            },
            {
                "start": 10.329,
                "end": 10.392,
                "value": "I"
            },
            {
                "start": 10.392,
                "end": 10.438,
                "value": "U"
            },
            {
                "start": 10.438,
                "end": 10.54,
                "value": "I"
            },
            {
                "start": 10.54,
                "end": 10.631,
                "value": "U"
            },
            {
                "start": 10.631,
                "end": 10.695,
                "value": "S"
            },
            {
                "start": 10.695,
                "end": 10.738,
                "value": "T"
            },
            {
                "start": 10.738,
                "end": 10.8,
                "value": "F"
            },
            {
                "start": 10.8,
                "end": 10.852,
                "value": "O"
            },
            {
                "start": 10.852,
                "end": 10.911,
                "value": "R"
            },
            {
                "start": 10.911,
                "end": 10.951,
                "value": "@"
            },
            {
                "start": 10.951,
                "end": 11.023,
                "value": "T"
            },
            {
                "start": 11.023,
                "end": 11.127,
                "value": "A"
            },
            {
                "start": 11.127,
                "end": 11.235,
                "value": "T"
            },
            {
                "start": 11.235,
                "end": 11.27,
                "value": "@"
            },
            {
                "start": 11.27,
                "end": 11.395,
                "value": "S"
            },
            {
                "start": 11.395,
                "end": 11.51,
                "value": "I"
            },
            {
                "start": 11.51,
                "end": 11.687,
                "value": "S"
            },
            {
                "start": 11.687,
                "end": 11.881,
                "value": "SIL"
            },
            {
                "start": 11.881,
                "end": 11.927,
                "value": "A"
            },
            {
                "start": 11.927,
                "end": 11.956,
                "value": "T"
            },
            {
                "start": 11.956,
                "end": 11.986,
                "value": "T"
            },
            {
                "start": 11.986,
                "end": 12.016,
                "value": "T"
            },
            {
                "start": 12.016,
                "end": 12.104,
                "value": "I"
            },
            {
                "start": 12.104,
                "end": 12.255,
                "value": "A"
            },
            {
                "start": 12.255,
                "end": 12.321,
                "value": "P"
            },
            {
                "start": 12.321,
                "end": 12.365,
                "value": "T"
            },
            {
                "start": 12.365,
                "end": 12.394,
                "value": "@"
            },
            {
                "start": 12.394,
                "end": 12.453,
                "value": "P"
            },
            {
                "start": 12.453,
                "end": 12.502,
                "value": "@"
            },
            {
                "start": 12.502,
                "end": 12.592,
                "value": "S"
            },
            {
                "start": 12.592,
                "end": 12.704,
                "value": "E"
            },
            {
                "start": 12.704,
                "end": 12.822,
                "value": "S"
            },
            {
                "start": 12.822,
                "end": 12.892,
                "value": "T"
            },
            {
                "start": 12.892,
                "end": 12.968,
                "value": "T"
            },
            {
                "start": 12.968,
                "end": 13.045,
                "value": "E"
            },
            {
                "start": 13.045,
                "end": 13.114,
                "value": "K"
            },
            {
                "start": 13.114,
                "end": 13.18,
                "value": "T"
            },
            {
                "start": 13.18,
                "end": 13.298,
                "value": "I"
            },
            {
                "start": 13.298,
                "end": 13.36,
                "value": "K"
            },
            {
                "start": 13.36,
                "end": 13.444,
                "value": "S"
            },
            {
                "start": 13.444,
                "end": 13.516,
                "value": "I"
            },
            {
                "start": 13.516,
                "end": 13.599,
                "value": "U"
            },
            {
                "start": 13.599,
                "end": 13.644,
                "value": "@"
            },
            {
                "start": 13.644,
                "end": 13.766,
                "value": "P"
            },
            {
                "start": 13.766,
                "end": 13.825,
                "value": "T"
            },
            {
                "start": 13.825,
                "end": 13.957,
                "value": "A"
            },
            {
                "start": 13.957,
                "end": 13.997,
                "value": "T"
            },
            {
                "start": 13.997,
                "end": 14.037,
                "value": "T"
            },
            {
                "start": 14.037,
                "end": 14.109,
                "value": "U"
            },
            {
                "start": 14.109,
                "end": 14.15,
                "value": "I"
            },
            {
                "start": 14.15,
                "end": 14.216,
                "value": "P"
            },
            {
                "start": 14.216,
                "end": 14.312,
                "value": "P"
            },
            {
                "start": 14.312,
                "end": 14.356,
                "value": "R"
            },
            {
                "start": 14.356,
                "end": 14.417,
                "value": "U"
            },
            {
                "start": 14.417,
                "end": 14.481,
                "value": "F"
            },
            {
                "start": 14.481,
                "end": 14.517,
                "value": "T"
            },
            {
                "start": 14.517,
                "end": 14.554,
                "value": "@"
            },
            {
                "start": 14.554,
                "end": 14.692,
                "value": "K"
            },
            {
                "start": 14.692,
                "end": 14.737,
                "value": "U"
            },
            {
                "start": 14.737,
                "end": 14.816,
                "value": "I"
            },
            {
                "start": 14.816,
                "end": 14.906,
                "value": "R"
            },
            {
                "start": 14.906,
                "end": 14.964,
                "value": "I"
            },
            {
                "start": 14.964,
                "end": 15.053,
                "value": "S"
            },
            {
                "start": 15.053,
                "end": 15.098,
                "value": "I"
            },
            {
                "start": 15.098,
                "end": 15.193,
                "value": "F"
            },
            {
                "start": 15.193,
                "end": 15.255,
                "value": "I"
            },
            {
                "start": 15.255,
                "end": 15.37,
                "value": "S"
            },
            {
                "start": 15.37,
                "end": 15.463,
                "value": "T"
            },
            {
                "start": 15.463,
                "end": 15.57,
                "value": "S"
            },
            {
                "start": 15.57,
                "end": 15.63,
                "value": "I"
            },
            {
                "start": 15.63,
                "end": 15.697,
                "value": "U"
            },
            {
                "start": 15.697,
                "end": 15.741,
                "value": "I"
            },
            {
                "start": 15.741,
                "end": 15.807,
                "value": "T"
            },
            {
                "start": 15.807,
                "end": 15.944,
                "value": "A"
            },
            {
                "start": 15.944,
                "end": 15.99,
                "value": "T"
            },
            {
                "start": 15.99,
                "end": 16.103,
                "value": "K"
            },
            {
                "start": 16.103,
                "end": 16.177,
                "value": "A"
            },
            {
                "start": 16.177,
                "end": 16.202,
                "value": "P"
            },
            {
                "start": 16.202,
                "end": 16.274,
                "value": "P"
            },
            {
                "start": 16.274,
                "end": 16.315,
                "value": "R"
            },
            {
                "start": 16.315,
                "end": 16.343,
                "value": "@"
            },
            {
                "start": 16.343,
                "end": 16.427,
                "value": "P"
            },
            {
                "start": 16.427,
                "end": 16.549,
                "value": "A"
            },
            {
                "start": 16.549,
                "end": 16.622,
                "value": "S"
            },
            {
                "start": 16.622,
                "end": 16.663,
                "value": "I"
            },
            {
                "start": 16.663,
                "end": 16.74,
                "value": "K"
            },
            {
                "start": 16.74,
                "end": 16.803,
                "value": "T"
            },
            {
                "start": 16.803,
                "end": 16.924,
                "value": "E"
            },
            {
                "start": 16.924,
                "end": 16.965,
                "value": "T"
            },
            {
                "start": 16.965,
                "end": 16.994,
                "value": "@"
            },
            {
                "start": 16.994,
                "end": 17.05,
                "value": "I"
            },
            {
                "start": 17.05,
                "end": 17.105,
                "value": "T"
            },
            {
                "start": 17.105,
                "end": 17.2,
                "value": "T"
            },
            {
                "start": 17.2,
                "end": 17.302,
                "value": "E"
            },
            {
                "start": 17.302,
                "end": 17.38,
                "value": "K"
            },
            {
                "start": 17.38,
                "end": 17.435,
                "value": "R"
            },
            {
                "start": 17.435,
                "end": 17.475,
                "value": "@"
            },
            {
                "start": 17.475,
                "end": 17.509,
                "value": "T"
            },
            {
                "start": 17.509,
                "end": 17.576,
                "value": "I"
            },
            {
                "start": 17.576,
                "end": 17.679,
                "value": "O"
            },
            {
                "start": 17.679,
                "end": 17.725,
                "value": "R"
            },
            {
                "start": 17.725,
                "end": 17.844,
                "value": "K"
            },
            {
                "start": 17.844,
                "end": 17.946,
                "value": "O"
            },
            {
                "start": 17.946,
                "end": 18.032,
                "value": "S"
            },
            {
                "start": 18.032,
                "end": 18.078,
                "value": "I"
            },
            {
                "start": 18.078,
                "end": 18.167,
                "value": "K"
            },
            {
                "start": 18.167,
                "end": 18.229,
                "value": "T"
            },
            {
                "start": 18.229,
                "end": 18.421,
                "value": "A"
            },
            {
                "start": 18.421,
                "end": 18.464,
                "value": "T"
            },
            {
                "start": 18.464,
                "end": 18.569,
                "value": "T"
            },
            {
                "start": 18.569,
                "end": 18.746,
                "value": "A"
            },
            {
                "start": 18.746,
                "end": 18.875,
                "value": "P"
            },
            {
                "start": 18.875,
                "end": 18.925,
                "value": "SIL"
            }
        ]
    }


    // const lipsync = {
    //   mouthCues : [
    //     {
    //         "start": 0,
    //         "end": 0.02,
    //         "value": "X"
    //     },
    //     {
    //         "start": 0.02,
    //         "end": 0.61,
    //         "value": "B"
    //     },
    //     {
    //         "start": 0.61,
    //         "end": 0.68,
    //         "value": "C"
    //     },
    //     {
    //         "start": 0.68,
    //         "end": 0.76,
    //         "value": "A"
    //     },
    //     {
    //         "start": 0.76,
    //         "end": 0.96,
    //         "value": "B"
    //     },
    //     {
    //         "start": 0.96,
    //         "end": 1.17,
    //         "value": "C"
    //     },
    //     {
    //         "start": 1.17,
    //         "end": 1.31,
    //         "value": "B"
    //     },
    //     {
    //         "start": 1.31,
    //         "end": 1.45,
    //         "value": "E"
    //     },
    //     {
    //         "start": 1.45,
    //         "end": 1.52,
    //         "value": "F"
    //     },
    //     {
    //         "start": 1.52,
    //         "end": 1.68,
    //         "value": "B"
    //     },
    //     {
    //         "start": 1.68,
    //         "end": 1.79,
    //         "value": "E"
    //     },
    //     {
    //         "start": 1.79,
    //         "end": 1.86,
    //         "value": "F"
    //     },
    //     {
    //         "start": 1.86,
    //         "end": 2,
    //         "value": "C"
    //     },
    //     {
    //         "start": 2,
    //         "end": 2.21,
    //         "value": "F"
    //     },
    //     {
    //         "start": 2.21,
    //         "end": 2.28,
    //         "value": "D"
    //     },
    //     {
    //         "start": 2.28,
    //         "end": 2.41,
    //         "value": "A"
    //     },
    //     {
    //         "start": 2.41,
    //         "end": 2.54,
    //         "value": "B"
    //     },
    //     {
    //         "start": 2.54,
    //         "end": 2.63,
    //         "value": "A"
    //     },
    //     {
    //         "start": 2.63,
    //         "end": 2.7,
    //         "value": "C"
    //     },
    //     {
    //         "start": 2.7,
    //         "end": 2.9,
    //         "value": "B"
    //     },
    //     {
    //         "start": 2.9,
    //         "end": 2.97,
    //         "value": "C"
    //     },
    //     {
    //         "start": 2.97,
    //         "end": 3.11,
    //         "value": "D"
    //     },
    //     {
    //         "start": 3.11,
    //         "end": 3.18,
    //         "value": "C"
    //     },
    //     {
    //         "start": 3.18,
    //         "end": 3.26,
    //         "value": "A"
    //     },
    //     {
    //         "start": 3.26,
    //         "end": 3.4,
    //         "value": "H"
    //     },
    //     {
    //         "start": 3.4,
    //         "end": 3.47,
    //         "value": "C"
    //     },
    //     {
    //         "start": 3.47,
    //         "end": 3.61,
    //         "value": "B"
    //     },
    //     {
    //         "start": 3.61,
    //         "end": 3.68,
    //         "value": "C"
    //     },
    //     {
    //         "start": 3.68,
    //         "end": 3.75,
    //         "value": "B"
    //     },
    //     {
    //         "start": 3.75,
    //         "end": 3.83,
    //         "value": "A"
    //     },
    //     {
    //         "start": 3.83,
    //         "end": 3.92,
    //         "value": "C"
    //     },
    //     {
    //         "start": 3.92,
    //         "end": 4.2,
    //         "value": "B"
    //     },
    //     {
    //         "start": 4.2,
    //         "end": 4.27,
    //         "value": "F"
    //     },
    //     {
    //         "start": 4.27,
    //         "end": 4.75,
    //         "value": "B"
    //     },
    //     {
    //         "start": 4.75,
    //         "end": 4.88,
    //         "value": "A"
    //     },
    //     {
    //         "start": 4.88,
    //         "end": 4.93,
    //         "value": "B"
    //     },
    //     {
    //         "start": 4.93,
    //         "end": 5.04,
    //         "value": "C"
    //     },
    //     {
    //         "start": 5.04,
    //         "end": 5.39,
    //         "value": "B"
    //     },
    //     {
    //         "start": 5.39,
    //         "end": 5.46,
    //         "value": "G"
    //     },
    //     {
    //         "start": 5.46,
    //         "end": 5.53,
    //         "value": "C"
    //     },
    //     {
    //         "start": 5.53,
    //         "end": 5.67,
    //         "value": "B"
    //     },
    //     {
    //         "start": 5.67,
    //         "end": 5.75,
    //         "value": "A"
    //     },
    //     {
    //         "start": 5.75,
    //         "end": 5.84,
    //         "value": "B"
    //     },
    //     {
    //         "start": 5.84,
    //         "end": 5.99,
    //         "value": "X"
    //     },
    //     {
    //         "start": 5.99,
    //         "end": 6.1,
    //         "value": "B"
    //     },
    //     {
    //         "start": 6.1,
    //         "end": 7.1,
    //         "value": "X"
    //     },
    //     {
    //         "start": 7.1,
    //         "end": 7.22,
    //         "value": "A"
    //     },
    //     {
    //         "start": 7.22,
    //         "end": 7.52,
    //         "value": "B"
    //     },
    //     {
    //         "start": 7.52,
    //         "end": 7.59,
    //         "value": "H"
    //     },
    //     {
    //         "start": 7.59,
    //         "end": 7.66,
    //         "value": "C"
    //     },
    //     {
    //         "start": 7.66,
    //         "end": 7.74,
    //         "value": "A"
    //     },
    //     {
    //         "start": 7.74,
    //         "end": 7.89,
    //         "value": "E"
    //     },
    //     {
    //         "start": 7.89,
    //         "end": 7.96,
    //         "value": "C"
    //     },
    //     {
    //         "start": 7.96,
    //         "end": 8.1,
    //         "value": "D"
    //     },
    //     {
    //         "start": 8.1,
    //         "end": 8.17,
    //         "value": "C"
    //     },
    //     {
    //         "start": 8.17,
    //         "end": 8.31,
    //         "value": "B"
    //     },
    //     {
    //         "start": 8.31,
    //         "end": 8.45,
    //         "value": "C"
    //     },
    //     {
    //         "start": 8.45,
    //         "end": 8.57,
    //         "value": "A"
    //     },
    //     {
    //         "start": 8.57,
    //         "end": 9.12,
    //         "value": "F"
    //     },
    //     {
    //         "start": 9.12,
    //         "end": 9.33,
    //         "value": "B"
    //     },
    //     {
    //         "start": 9.33,
    //         "end": 9.54,
    //         "value": "C"
    //     },
    //     {
    //         "start": 9.54,
    //         "end": 9.61,
    //         "value": "B"
    //     },
    //     {
    //         "start": 9.61,
    //         "end": 9.68,
    //         "value": "C"
    //     },
    //     {
    //         "start": 9.68,
    //         "end": 9.75,
    //         "value": "B"
    //     },
    //     {
    //         "start": 9.75,
    //         "end": 9.82,
    //         "value": "C"
    //     },
    //     {
    //         "start": 9.82,
    //         "end": 9.89,
    //         "value": "E"
    //     },
    //     {
    //         "start": 9.89,
    //         "end": 10.1,
    //         "value": "F"
    //     },
    //     {
    //         "start": 10.1,
    //         "end": 10.18,
    //         "value": "A"
    //     },
    //     {
    //         "start": 10.18,
    //         "end": 10.31,
    //         "value": "E"
    //     },
    //     {
    //         "start": 10.31,
    //         "end": 10.45,
    //         "value": "G"
    //     },
    //     {
    //         "start": 10.45,
    //         "end": 10.52,
    //         "value": "E"
    //     },
    //     {
    //         "start": 10.52,
    //         "end": 10.6,
    //         "value": "A"
    //     },
    //     {
    //         "start": 10.6,
    //         "end": 10.85,
    //         "value": "B"
    //     },
    //     {
    //         "start": 10.85,
    //         "end": 11.2,
    //         "value": "F"
    //     },
    //     {
    //         "start": 11.2,
    //         "end": 11.69,
    //         "value": "X"
    //     },
    //     {
    //         "start": 11.69,
    //         "end": 12.56,
    //         "value": "F"
    //     },
    //     {
    //         "start": 12.56,
    //         "end": 12.63,
    //         "value": "B"
    //     },
    //     {
    //         "start": 12.63,
    //         "end": 12.7,
    //         "value": "G"
    //     },
    //     {
    //         "start": 12.7,
    //         "end": 12.77,
    //         "value": "B"
    //     },
    //     {
    //         "start": 12.77,
    //         "end": 12.98,
    //         "value": "C"
    //     },
    //     {
    //         "start": 12.98,
    //         "end": 13.05,
    //         "value": "H"
    //     },
    //     {
    //         "start": 13.05,
    //         "end": 13.26,
    //         "value": "B"
    //     },
    //     {
    //         "start": 13.26,
    //         "end": 13.33,
    //         "value": "C"
    //     },
    //     {
    //         "start": 13.33,
    //         "end": 13.61,
    //         "value": "B"
    //     },
    //     {
    //         "start": 13.61,
    //         "end": 14.08,
    //         "value": "X"
    //     },
    //     {
    //         "start": 14.08,
    //         "end": 14.12,
    //         "value": "C"
    //     },
    //     {
    //         "start": 14.12,
    //         "end": 14.3,
    //         "value": "B"
    //     },
    //     {
    //         "start": 14.3,
    //         "end": 14.37,
    //         "value": "D"
    //     },
    //     {
    //         "start": 14.37,
    //         "end": 14.46,
    //         "value": "A"
    //     },
    //     {
    //         "start": 14.46,
    //         "end": 14.54,
    //         "value": "B"
    //     },
    //     {
    //         "start": 14.54,
    //         "end": 14.62,
    //         "value": "A"
    //     },
    //     {
    //         "start": 14.62,
    //         "end": 14.72,
    //         "value": "C"
    //     },
    //     {
    //         "start": 14.72,
    //         "end": 14.79,
    //         "value": "B"
    //     },
    //     {
    //         "start": 14.79,
    //         "end": 14.86,
    //         "value": "C"
    //     },
    //     {
    //         "start": 14.86,
    //         "end": 15.14,
    //         "value": "B"
    //     },
    //     {
    //         "start": 15.14,
    //         "end": 15.21,
    //         "value": "C"
    //     },
    //     {
    //         "start": 15.21,
    //         "end": 15.56,
    //         "value": "B"
    //     },
    //     {
    //         "start": 15.56,
    //         "end": 15.84,
    //         "value": "F"
    //     },
    //     {
    //         "start": 15.84,
    //         "end": 16,
    //         "value": "A"
    //     },
    //     {
    //         "start": 16,
    //         "end": 16.14,
    //         "value": "H"
    //     },
    //     {
    //         "start": 16.14,
    //         "end": 16.21,
    //         "value": "D"
    //     },
    //     {
    //         "start": 16.21,
    //         "end": 16.28,
    //         "value": "B"
    //     },
    //     {
    //         "start": 16.28,
    //         "end": 16.49,
    //         "value": "F"
    //     },
    //     {
    //         "start": 16.49,
    //         "end": 16.56,
    //         "value": "B"
    //     },
    //     {
    //         "start": 16.56,
    //         "end": 16.64,
    //         "value": "A"
    //     },
    //     {
    //         "start": 16.64,
    //         "end": 16.88,
    //         "value": "F"
    //     },
    //     {
    //         "start": 16.88,
    //         "end": 16.95,
    //         "value": "G"
    //     },
    //     {
    //         "start": 16.95,
    //         "end": 17.16,
    //         "value": "B"
    //     },
    //     {
    //         "start": 17.16,
    //         "end": 17.23,
    //         "value": "F"
    //     },
    //     {
    //         "start": 17.23,
    //         "end": 17.58,
    //         "value": "B"
    //     },
    //     {
    //         "start": 17.58,
    //         "end": 17.65,
    //         "value": "G"
    //     },
    //     {
    //         "start": 17.65,
    //         "end": 18.4,
    //         "value": "B"
    //     },
    //     {
    //         "start": 18.4,
    //         "end": 18.45,
    //         "value": "F"
    //     },
    //     {
    //         "start": 18.45,
    //         "end": 18.5,
    //         "value": "B"
    //     },
    //     {
    //         "start": 18.5,
    //         "end": 18.57,
    //         "value": "C"
    //     },
    //     {
    //         "start": 18.57,
    //         "end": 18.64,
    //         "value": "B"
    //     },
    //     {
    //         "start": 18.64,
    //         "end": 18.78,
    //         "value": "D"
    //     },
    //     {
    //         "start": 18.78,
    //         "end": 18.85,
    //         "value": "C"
    //     },
    //     {
    //         "start": 18.85,
    //         "end": 18.93,
    //         "value": "A"
    //     },
    //     {
    //         "start": 18.93,
    //         "end": 19.01,
    //         "value": "B"
    //     },
    //     {
    //         "start": 19.01,
    //         "end": 19.09,
    //         "value": "A"
    //     },
    //     {
    //         "start": 19.09,
    //         "end": 19.14,
    //         "value": "C"
    //     },
    //     {
    //         "start": 19.14,
    //         "end": 19.4,
    //         "value": "B"
    //     },
    //     {
    //         "start": 19.4,
    //         "end": 19.47,
    //         "value": "C"
    //     },
    //     {
    //         "start": 19.47,
    //         "end": 19.54,
    //         "value": "B"
    //     },
    //     {
    //         "start": 19.54,
    //         "end": 19.68,
    //         "value": "C"
    //     },
    //     {
    //         "start": 19.68,
    //         "end": 19.75,
    //         "value": "B"
    //     },
    //     {
    //         "start": 19.75,
    //         "end": 19.96,
    //         "value": "C"
    //     },
    //     {
    //         "start": 19.96,
    //         "end": 20.53,
    //         "value": "B"
    //     },
    //     {
    //         "start": 20.53,
    //         "end": 20.59,
    //         "value": "E"
    //     },
    //     {
    //         "start": 20.59,
    //         "end": 20.84,
    //         "value": "D"
    //     },
    //     {
    //         "start": 20.84,
    //         "end": 20.89,
    //         "value": "C"
    //     },
    //     {
    //         "start": 20.89,
    //         "end": 21.07,
    //         "value": "B"
    //     },
    //     {
    //         "start": 21.07,
    //         "end": 21.21,
    //         "value": "C"
    //     },
    //     {
    //         "start": 21.21,
    //         "end": 21.28,
    //         "value": "E"
    //     },
    //     {
    //         "start": 21.28,
    //         "end": 21.35,
    //         "value": "B"
    //     },
    //     {
    //         "start": 21.35,
    //         "end": 21.49,
    //         "value": "C"
    //     },
    //     {
    //         "start": 21.49,
    //         "end": 21.56,
    //         "value": "B"
    //     },
    //     {
    //         "start": 21.56,
    //         "end": 21.66,
    //         "value": "A"
    //     },
    //     {
    //         "start": 21.66,
    //         "end": 21.81,
    //         "value": "B"
    //     },
    //     {
    //         "start": 21.81,
    //         "end": 21.84,
    //         "value": "X"
    //     },
    //     {
    //         "start": 21.84,
    //         "end": null,
    //         "value": "X"
    //     }
    // ]
    // }




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

    //   const morphTargetSmoothing = 0.19;

    const morphTargetSmoothing = 0.2;
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
    //   const audioFile = "audio2.wav"; // Path to your audio file

    const audioFile = "output.ogg";
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

const corresponding = {

    A: "viseme_PP", // Open jaw, wide mouth
    a: "viseme_PP",

    // B/b
    B: "viseme_kk", // Lips pressed together
    b: "viseme_PP",

    // C/c
    C: "viseme_I", // Teeth close together
    c: "viseme_I",

    // D/d
    D: "viseme_T", // Tongue touches the alveolar ridge
    d: "viseme_T",

    // E/e
    E: "viseme_ee", // Wide mouth, lips spread
    e: "viseme_ee",

    // F/f
    F: "viseme_UU", // Teeth on lower lip
    f: "viseme_UU",

    // G/g
    G: "viseme_FF", // Back of tongue against velum
    g: "viseme_FF",

    // H/h
    H: "viseme_TH", // Open mouth, gentle airflow
    h: "viseme_TH",

    // I/i
    I: "viseme_ee", // Wide mouth, lips spread
    i: "viseme_ee",

    // J/j
    J: "viseme_ch", // Tongue touches the roof of the mouth
    j: "viseme_ch",

    // K/k
    K: "viseme_kk", // Back of tongue against velum
    k: "viseme_kk",

    // L/l
    L: "viseme_L", // Tongue touches the roof of the mouth
    l: "viseme_L",

    // M/m
    M: "viseme_PP", // Lips pressed together
    m: "viseme_PP",

    // N/n
    N: "viseme_T", // Tongue touches the alveolar ridge
    n: "viseme_T",

    // O/o
    O: "viseme_OO", // Rounded lips
    o: "viseme_OO",

    // P/p
    P: "viseme_PP", // Lips pressed together
    p: "viseme_PP",

    // Q/q
    Q: "viseme_PP", // Similar to P, lips pressed together
    q: "viseme_PP",

    // R/r
    R: "viseme_RR", // Tongue curled slightly back
    r: "viseme_RR",

    // S/s
    S: "viseme_S", // Teeth together, airflow through
    s: "viseme_S",

    // T/t
    T: "viseme_T", // Tongue touches the alveolar ridge
    t: "viseme_T",

    // U/u
    U: "viseme_OO", // Rounded lips
    u: "viseme_OO",

    // V/v
    V: "viseme_FF", // Teeth on lower lip
    v: "viseme_FF",

    // W/w
    W: "viseme_U", // Rounded lips
    w: "viseme_U",

    // X/x
    X: "viseme_K", // Back of tongue against velum
    x: "viseme_K",

    // Y/y
    Y: "viseme_ee", // Wide mouth, lips spread
    y: "viseme_ee",

    // Z/z
    Z: "viseme_S", // Teeth together, airflow through
    z: "viseme_S",
    p: "viseme_PP", // Voiceless bilabial plosive
    b: "viseme_PP", // Voiced bilabial plosive
    m: "viseme_M", // Bilabial nasal
    a : "viseme_AA",
    f: "viseme_U", // Voiceless labiodental fricative
    v: "viseme_V", // Voiced labiodental fricative
  
    t: "viseme_T", // Voiceless alveolar plosive
    d: "viseme_T", // Voiced alveolar plosive
    s: "viseme_S", // Voiceless alveolar fricative
    z: "viseme_S", // Voiced alveolar fricative
    th: "viseme_TH", // Voiceless dental fricative
    dh: "viseme_TH", // Voiced dental fricative
    n: "viseme_N", // Alveolar nasal
    l: "viseme_L", // Alveolar lateral approximant
  
    k: "viseme_kk", // Voiceless velar plosive
    g: "viseme_kk", // Voiced velar plosive
    ng: "viseme_nn", // Velar nasal
  
    ch: "viseme_ch", // Voiceless postalveolar affricate
    j: "viseme_ch", // Voiced postalveolar affricate
    sh: "viseme_SS", // Voiceless postalveolar fricative
    zh: "viseme_SS", // Voiced postalveolar fricative
  
    aw: "viseme_AA", // Rounded back vowel
    oy: "viseme_AA", // Rounded back vowel
    er: "viseme_R", // Mid central r-colored vowel
    ah: "viseme_AA", // Open central vowel
    uh: "viseme_U", // Near-close back rounded vowel
  
    aa: "viseme_AA", // Open back unrounded vowel
    ae: "viseme_AA", // Near-open front unrounded vowel
    ao: "viseme_AA", // Open-mid back rounded vowel
    ay: "viseme_AA", // Diphthong
    eh: "viseme_E", // Open-mid front unrounded vowel
    ey: "viseme_E", // Diphthong
    ih: "viseme_I", // Near-close front unrounded vowel
    iy: "viseme_ee", // Close front unrounded vowel
    ow: "viseme_O", // Rounded mid-back vowel
    uw: "viseme_U", // Rounded back vowel

    d͡ʒ : "viseme_ch", // Voiced postalveolar affricate
    t͡ʃ: "viseme_ch",
    ʃ : "viseme_sh",
    ʒ : "viseme_sh",
    ð : "viseme_TH",
    Θ : "viseme_TH",
    ŋ : "viseme_k",
    ɹ : "viseme_R",
    aɪ: "viseme_aa",
    aʊ: "viseme_aa",
    ɔɪ: "viseme_aa",
    eɪ: "viseme_ee",
    oʊ: "viseme_oo",
    ə: "viseme_aw",
    ɚ : "viseme_R",
    æ: "viseme_aa",
    ɑ : "viseme_aa",
    ɛ : "viseme_ee",
    ɪ : "viseme_ee",
    ʌ : "viseme_aw",


    ð: "viseme_TH", // Voiced dental fricative
    ŋ: "viseme_nn", // Velar nasal
    ɹ: "viseme_R", // Alveolar approximant
    ʃ: "viseme_SS", // Voiceless postalveolar fricative
    t͡ʃ: "viseme_ch", // Voiceless postalveolar affricate
    Θ: "viseme_TH", // Voiceless dental fricative
    w: "viseme_W", // Labial-velar approximant
    ʒ: "viseme_SS", // Voiced postalveolar fricativ
  };




    // Viseme mapping (same as before
    const corresponding2 = {
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
angular
  .module("InterviewBotApp", [])
  .controller("InterviewController", function ($scope) {
    $scope.questions = [
      "Welcome to this Interview. Please click next to proceed.",
      "How do you handle criticism?",
      "How do you prioritize tasks when you're juggling multiple responsibilities?",
      "What motivates you to do your best work?",
      "Where do you see yourself in five years?",
      "Can you describe a time when you overcame a challenge at work?",
      "What would you consider your biggest achievement?",
      "What is your greatest strength?",
      "What do you enjoy most about working in this industry?",
      "Why should we hire you for this role?",
      "Tell me about a time when you worked on a team project. How did you contribute?",
      "What skills do you feel you need to improve?",
      "How do you handle stressful situations?",
      "Describe a situation where you had to learn something new quickly. How did you manage it?",
      "What is your preferred working style?",
      "How do you stay organized and manage your time?",
      "Have you ever had to deal with a difficult colleague or customer? How did you handle the situation?",
      "What do you think are the most important qualities of a good leader?",
      "How do you ensure you continue to grow and develop in your career?",
      "Tell me about a time when you had to make a tough decision at work.",
      "What are your salary expectations?",
      "What would you do in the first 90 days if you were hired for this position?",
    ];

    $scope.currentQuestionIndex = 0;
    $scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];

    // Viseme mapping (same as before)
    const corresponding = {
      A: "viseme_PP",
      B: "viseme_kk",
      C: "viseme_I",
      D: "viseme_AA",
      E: "viseme_O",
      F: "viseme_U",
      G: "viseme_FF",
      H: "viseme_TH",
      I: "viseme_ee", // Viseme for 'ee' (mouth wide)
      J: "viseme_ch", // Viseme for 'ch' (tongue behind teeth)
      K: "viseme_kk", // Viseme for 'k' (closed lips)
      L: "viseme_L", // Viseme for 'l' (mouth slightly open)
      M: "viseme_M", // Viseme for 'm' (mouth closed)
      N: "viseme_N", // Viseme for 'n' (mouth open, tongue up)
      O: "viseme_O", // Viseme for 'oh' (rounded lips)
      P: "viseme_PP", // Viseme for 'p' (lips pressed together)
      Q: "viseme_Q", // Viseme for 'qu' (mouth slightly open, tongue down)
      R: "viseme_R", // Viseme for 'r' (tongue curled)
      S: "viseme_S", // Viseme for 's' (teeth together)
      T: "viseme_T", // Viseme for 't' (tongue behind teeth)
      U: "viseme_U", // Viseme for 'oo' (rounded lips)
      V: "viseme_V", // Viseme for 'v' (teeth on lower lip)
      W: "viseme_W", // Viseme for 'w' (rounded lips)
      X: "viseme_X", // Viseme for 'x' (mouth closed, lips slightly apart)
      Y: "viseme_Y", // Viseme for 'y' (lips slightly spread)
      Z: "viseme_Z", // Viseme for 'z' (teeth together, lips spread)
    };

    // Lip-sync cue structure (we can define this based on known phonemes in your TTS voice)
    const lipsync = {
      mouthCues: [
        { start: 0.0, end: 0.5, value: "A" }, // Open mouth (e.g., "ah")
        { start: 0.6, end: 1.0, value: "B" }, // Closed lips (e.g., "b")
        { start: 1.1, end: 1.5, value: "C" }, // Rounded lips (e.g., "oo")
        { start: 1.6, end: 2.0, value: "D" }, // Open mouth, tongue up (e.g., "d")
        { start: 2.1, end: 2.5, value: "E" }, // Lips spread (e.g., "ee")
        { start: 2.6, end: 3.0, value: "F" }, // Teeth together (e.g., "f")
        { start: 3.1, end: 3.5, value: "G" }, // Mouth open, tongue down (e.g., "g")
        { start: 3.6, end: 4.0, value: "H" }, // Teeth together, tongue up (e.g., "h")
        { start: 4.1, end: 4.5, value: "I" }, // Wide mouth (e.g., "ee")
        { start: 4.6, end: 5.0, value: "J" }, // Tongue behind teeth (e.g., "ch")
        { start: 5.1, end: 5.5, value: "K" }, // Closed lips (e.g., "k")
        { start: 5.6, end: 6.0, value: "L" }, // Mouth slightly open (e.g., "l")
        { start: 6.1, end: 6.5, value: "M" }, // Lips together (e.g., "m")
        { start: 6.6, end: 7.0, value: "N" }, // Mouth slightly open, tongue up (e.g., "n")
        { start: 7.1, end: 7.5, value: "O" }, // Rounded lips (e.g., "oh")
        { start: 7.6, end: 8.0, value: "P" }, // Lips pressed together (e.g., "p")
        { start: 8.1, end: 8.5, value: "Q" }, // Mouth slightly open, tongue down (e.g., "qu")
        { start: 8.6, end: 9.0, value: "R" }, // Mouth slightly open, tongue curled (e.g., "r")
        { start: 9.1, end: 9.5, value: "S" }, // Teeth together (e.g., "s")
        { start: 9.6, end: 10.0, value: "T" }, // Tongue behind teeth (e.g., "t")
        { start: 10.1, end: 10.5, value: "U" }, // Lips rounded (e.g., "oo")
        { start: 10.6, end: 11.0, value: "V" }, // Teeth on lower lip (e.g., "v")
        { start: 11.1, end: 11.5, value: "W" }, // Rounded lips (e.g., "w")
        { start: 11.6, end: 12.0, value: "X" }, // Lips slightly apart (e.g., "x")
        { start: 12.1, end: 12.5, value: "Y" }, // Lips slightly spread (e.g., "y")
        { start: 12.6, end: 13.0, value: "Z" }, // Teeth together, lips spread (e.g., "z")

        // Additional phoneme cues for more detailed lip sync
        { start: 13.1, end: 13.5, value: "AA" }, // Open mouth for vowel sounds like "ah"
        { start: 13.6, end: 14.0, value: "BB" }, // Closed lips for "b"
        { start: 14.1, end: 14.5, value: "CC" }, // Lips rounded for "oo"
        { start: 14.6, end: 15.0, value: "DD" }, // Tongue high in mouth for "d"
        // You can continue adding cues for other phonemes or mouth movements
      ],
    };

    let model,
      mixer,
      clock = new THREE.Clock();
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("3d-avatar").appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10).normalize();
    scene.add(ambientLight, directionalLight);

    // Load GLB model
    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load(
      "646d9dcdc8a5f5bddbfac913.glb",
      function (gltf) {
        model = gltf.scene;
        scene.add(model);
        model.position.set(0, -2.5, 0);
        model.scale.set(1.5, 1.5, 1.5);
        camera.position.set(0, 0, 1);

        // Initialize animations
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => {
          const action = mixer.clipAction(clip);
          action.play();
        });

        animate();
      },
      undefined,
      function (error) {
        console.error("Error loading GLB model:", error);
      }
    );

    function updateLipSync(currentTime) {
      if (!model) return;

      const head = model.getObjectByName("Wolf3D_Head");
      const teeth = model.getObjectByName("Wolf3D_Teeth");

      if (!head || !teeth) return;

      const morphTargetSmoothing = 0.18; // Adjust smoothing factor (lower = slower transitions)

      // Gradually reset all visemes
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

      // Activate the current viseme based on the time range
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

    // Reset all morph targets immediately
    function resetLipSync() {
      const head = model.getObjectByName("Wolf3D_Head");
      const teeth = model.getObjectByName("Wolf3D_Teeth");

      if (head && teeth) {
        Object.values(corresponding).forEach((viseme) => {
          if (head.morphTargetDictionary[viseme] !== undefined) {
            head.morphTargetInfluences[head.morphTargetDictionary[viseme]] = 0;
            teeth.morphTargetInfluences[
              teeth.morphTargetDictionary[viseme]
            ] = 0;
          }
        });
      }
    }

    $scope.speakQuestion = function (question) {
      const speech = new SpeechSynthesisUtterance(question);

      // Start speaking
      window.speechSynthesis.speak(speech);

      // Track speech progress for lip-sync updates
      let updateInterval;
      speech.onstart = function () {
        const startTime = Date.now();

        updateInterval = setInterval(() => {
          const currentTime = (Date.now() - startTime) / 1000;
          updateLipSync(currentTime);
        }, 16); // Update at ~60 FPS
      };

      // Reset lip sync immediately when speech ends
      speech.onend = function () {
        clearInterval(updateInterval); // Stop updates
        resetLipSync(); // Immediately reset morph targets
      };

      // Handle cancellation or interruption
      speech.onerror = function () {
        clearInterval(updateInterval); // Stop updates
        resetLipSync(); // Immediately reset morph targets
      };
    };

    $scope.nextQuestion = function speak() {
      $scope.currentQuestionIndex =
        ($scope.currentQuestionIndex + 1) % $scope.questions.length;
      $scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];
      $scope.speakQuestion($scope.currentQuestion);
    };
    // Render loop
    function animate() {
      requestAnimationFrame(animate);
      if (mixer) mixer.update(clock.getDelta());
      renderer.render(scene, camera);
    }
    $scope.$on("$destroy", function () {
      if (updateInterval) {
        $interval.cancel(updateInterval);
      }
      if (speech) {
        window.speechSynthesis.cancel();
      }
      resetLipSync();
    });
  });

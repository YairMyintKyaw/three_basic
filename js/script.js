window.addEventListener("DOMContentLoaded", init);
function init() {
  // create renderer
  const canvasElement = document.querySelector("#myCanvas");
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvasElement,
  });

  // size specification
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // create scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87b8c0);
  // create ambient light source
  const ambientLight = new THREE.AmbientLight(0xffffff, 2);
  scene.add(ambientLight);

  // create parallel light source
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(0, 3, 6); //Specify the x,y,z position
  scene.add(directionalLight);

  // create camera
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 0, 1500);

  // create camera controller
  const controls = new THREE.OrbitControls(camera, canvasElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;

  // Load 3D model
  const loader = new THREE.GLTFLoader();
  let model = null;
  loader.load(
    //Specify the path of the 3D model file
    "/assets/doraemon.glb",
    function (glb) {
      model = glb.scene;
      model.name = "model_castle";
      model.scale.set(400.0, 400.0, 400.0);
      model.position.set(0, -400, 0);
      scene.add(glb.scene);
    },
    function (error) {
      console.log(error);
    }
  );

  // real-time rendering
  tick();
  function tick() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}

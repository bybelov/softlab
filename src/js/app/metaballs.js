import * as THREE from 'three';
import * as dat from 'dat.gui';

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var container;
var camera, scene, renderer;
var controls;
var light, pointLight, ambientLight;
var meta, metaMat, resolution, numBlobs;
var time = 0;
var clock = new THREE.Clock();

var metaController = {

  //Metaball simulation
  speed: .2,
  numBlobs: 9,
  resolution: 50,
  isolation: 50,

  //Metaball material
  metaColor: "#ff1db0",
  metaSpec: "#ffffff",
  metaShine: 180,

  // Material color
  // hue: 0.5,
  // saturation: 0.35,
  // lightness: 0.6,

  //Point light color
  lhue: 0.5,
  lsaturation: 0.35,
  llightness: 0.6,

  //Directional light orientation
  lx: -0.2,
  ly: 0.15,
  lz: 0.675,

}

window.onload = function () {
  init();
}

function init() {

  container = document.getElementById('container');

  // CAMERA
  camera = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000);
  camera.position.set(0, 0, 300);

  // SCENE
  scene = new THREE.Scene();

  // LIGHTS
  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0.5, 0.5, 1);
  scene.add(light);

  pointLight = new THREE.PointLight( 0xff3300 );
  pointLight.position.set( 0, 0, 100 );
  scene.add( pointLight );

  ambientLight = new THREE.AmbientLight(0x080808);
  scene.add(ambientLight);

  // METABALLS
  resolution = 28;
  numBlobs = 10;

  metaMat = new THREE.MeshPhongMaterial({
    color: 0x000000,
    specular: 0x888888,
    shininess: 250
  });
  meta = new THREE.MarchingCubes(50, metaMat, true, true);
  meta.position.set(100, -40, 0);
  meta.scale.set(100, 100, 100);
  scene.add(meta);

  // RENDERER

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setClearColor(0xffffff, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  container.appendChild(renderer.domElement);

  renderer.gammaInput = true;
  renderer.gammaOutput = true;

  // CONTROLS
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;

  animate();

  // EVENTS
  window.addEventListener('resize', onWindowResize, false);

  //setup GUI
  setupGui();

}

//

function onWindowResize(event) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// this controls content of marching cubes voxel field

function updateCubes(object, time, numblobs) {

  object.reset();

  // fill the field with some metaballs

  var i, ballx, bally, ballz, subtract, strength;

  subtract = 12;
  strength = 1.2 / ((Math.sqrt(numblobs) - 1) / 4 + 1);

  for (i = 0; i < numblobs; i++) {

    ballx = Math.sin(i + 1.26 * time * (1.03 + 0.5 * Math.cos(0.21 * i))) * 0.27 + 0.5;
    bally = Math.abs(Math.cos(i + 1.12 * time * Math.cos(1.22 + 0.1424 * i))) * 0.27 + 0.5;
    ballz = Math.cos(i + 1.32 * time * 0.1 * Math.sin((0.92 + 0.53 * i))) * 0.27 + 0.5;

    object.addBall(ballx, bally, ballz, strength, subtract);

  }

}

// ANIMATE
function animate() {
  requestAnimationFrame(animate);
  render();
}

// RENDER
function render() {

  var delta = clock.getDelta();

  time += delta * metaController.speed * 0.5;

  // controls.update(delta);

  // Metaball simulation GUI
  if (metaController.resolution !== resolution) {
    resolution = metaController.resolution;
    meta.init(Math.floor(resolution));
  }

  if (metaController.isolation !== meta.isolation) {
    meta.isolation = metaController.isolation;
  }

  //Metaball Material GUI
  metaMat.color = new THREE.Color(metaController.metaColor);
  metaMat.specular = new THREE.Color(metaController.metaSpec);

  if (metaMat.shininess !== metaController.metaShine) {
    metaMat.shininess = metaController.metaShine;
  }

  // meta.material.color.setHSL( metaController.hue, metaController.saturation, metaController.lightness );

  // lights
  light.position.set( metaController.lx, metaController.ly, metaController.lz );
  light.position.normalize();

  pointLight.color.setHSL( metaController.lhue, metaController.lsaturation, metaController.llightness );

  updateCubes(meta, time, metaController.numBlobs);

  renderer.clear();
  renderer.render(scene, camera);

}

// SETUP GUI
function setupGui() {

  var gui = new dat.GUI();

  var h = gui.addFolder("Metaballs");
      h.add(metaController, "speed", 0.0, 10.0);
      h.add(metaController, "numBlobs", 0, 20);
      h.add(metaController, "resolution", 50, 100);
      h.add(metaController, "isolation", 50, 450);

  var h = gui.addFolder("Meta Material");
      h.addColor(metaController, "metaColor");
      h.addColor(metaController, "metaSpec");
      h.add(metaController, "metaShine", 0, 250);

  // material (color)
  // var m_h, m_s, m_l;
  // var h = gui.addFolder( "Material color" );
  //     m_h = h.add( metaController, "hue", 0.0, 1.0, 0.025 );
	// 		m_s = h.add( metaController, "saturation", 0.0, 1.0, 0.025 );
	// 		m_l = h.add( metaController, "lightness", 0.0, 1.0, 0.025 );

  // light (point)
  var h = gui.addFolder( "Point light color" );
      h.add( metaController, "lhue", 0.0, 1.0, 0.025 ).name( "hue" );
      h.add( metaController, "lsaturation", 0.0, 1.0, 0.025 ).name( "saturation" );
      h.add( metaController, "llightness", 0.0, 1.0, 0.025 ).name( "lightness" );

  // light (directional)
  var h = gui.addFolder( "Directional light orientation" );
      h.add( metaController, "lx", - 1.0, 1.0, 0.025 ).name( "x" );
      h.add( metaController, "ly", - 1.0, 1.0, 0.025 ).name( "y" );
      h.add( metaController, "lz", - 1.0, 1.0, 0.025 ).name( "z" );

}

import * as THREE from 'three/build/three.module';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes';
import anime from 'animejs';

var container, stats;
var camera, scene, renderer;
var materials, current_material;
var light, pointLight, ambientLight;
var effect, resolution;
var effectController;

var time = 0;
var clock = new THREE.Clock();
var mouse = new THREE.Vector2();

window.onload = function () {
  init();
  animate();
}

function init() {

  container = document.getElementById( 'container' );

  // CAMERA
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set( - 500, 500, 1500 );

  // SCENE
  scene = new THREE.Scene();

  // LIGHTS
  light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 0.5, 0.5, 1 );
  scene.add( light );

  pointLight = new THREE.PointLight( 0xff3300 );
  pointLight.position.set( 0, 0, 100 );
  scene.add( pointLight );

  ambientLight = new THREE.AmbientLight( 0x080808 );
  scene.add( ambientLight );

  // MATERIALS
  materials = generateMaterials();
  current_material = "plastic";

  // MARCHING CUBES
  resolution = 28;

  effect = new MarchingCubes( resolution, materials[ current_material ].m, true, true );
  effect.position.set( 700, 0, 0 );
  effect.scale.set( 700, 700, 700 );

  effect.enableUvs = false;
  effect.enableColors = false;

  scene.add( effect );

  // RENDERER
  renderer = new THREE.WebGLRenderer({
    alpha: true
  });
  renderer.gammaOutput = true;
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  container.appendChild( renderer.domElement );

  // CONTROLS
  var controls = new OrbitControls( camera, renderer.domElement );

  // STATS
  stats = new Stats();
  container.appendChild( stats.dom );

  // GUI
  setupGui();

  // EVENTS
  window.addEventListener( 'resize', onWindowResize, false );
  window.addEventListener('mousemove', onMouseMove.bind(this), false);
  // window.addEventListener('touchmove', onTouchMove.bind(this), false);

}

function onWindowResize() {

  if (window.matchMedia("(orientation: portrait)").matches) {
    camera.position.x = 1;
  }else{
    camera.position.x = - 500;
  }

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function generateMaterials() {
  var materials = {
    "plastic": {
      m: new THREE.MeshPhongMaterial( { color: 0xff00e5, specular: 0x090909, shininess: 60 } ),
      h: 0.85, s: 1, l: 0.5
    }
  };
  return materials;
}

//

function setupGui() {

  var createHandler = function ( id ) {

    return function () {

      var mat_old = materials[ current_material ];
      mat_old.h = m_h.getValue();
      mat_old.s = m_s.getValue();
      mat_old.l = m_l.getValue();

      current_material = id;

      var mat = materials[ id ];
      effect.material = mat.m;

      m_h.setValue( mat.h );
      m_s.setValue( mat.s );
      m_l.setValue( mat.l );

      effect.enableUvs = false;
      effect.enableColors = false;

    };

  };

  effectController = {

    material: "plastic",

    speed: 1.0,
    numBlobs: 8,
    resolution: 60,
    isolation: 40,

    hue: 0.85,
    saturation: 1,
    lightness: 0.5,

    lhue: 0.8,
    lsaturation: 0.0,
    llightness: 0.4,

    lx: -0.5,
    ly: 0.65,
    lz: 0.0,

    dummy: function () {}

  };


  function guiPanel(){
    var h, m_h, m_s, m_l;

    var gui = new GUI();
  
    // material (type)
    h = gui.addFolder( "Materials" );
    for ( var m in materials ) {
      effectController[ m ] = createHandler( m );
      h.add( effectController, m ).name( m );
    }
  
    // material (color)
    h = gui.addFolder( "Material color" );
  
    m_h = h.add( effectController, "hue", 0.0, 1.0, 0.025 );
    m_s = h.add( effectController, "saturation", 0.0, 1.0, 0.025 );
    m_l = h.add( effectController, "lightness", 0.0, 1.0, 0.025 );
  
    // light (point)
    h = gui.addFolder( "Point light color" );
  
    h.add( effectController, "lhue", 0.0, 1.0, 0.025 ).name( "hue" );
    h.add( effectController, "lsaturation", 0.0, 1.0, 0.025 ).name( "saturation" );
    h.add( effectController, "llightness", 0.0, 1.0, 0.025 ).name( "lightness" );
  
    // light (directional)
    h = gui.addFolder( "Directional light orientation" );
  
    h.add( effectController, "lx", - 1.0, 1.0, 0.025 ).name( "x" );
    h.add( effectController, "ly", - 1.0, 1.0, 0.025 ).name( "y" );
    h.add( effectController, "lz", - 1.0, 1.0, 0.025 ).name( "z" );
  
    // simulation
    h = gui.addFolder( "Simulation" );
  
    h.add( effectController, "speed", 0.1, 8.0, 0.05 );
    h.add( effectController, "numBlobs", 1, 50, 1 );
    h.add( effectController, "resolution", 14, 100, 1 );
    h.add( effectController, "isolation", 10, 300, 1 );
  
  }

  guiPanel();

}


function updateColorHue(mx){

  let x;
  if (mx <= 0) {
    x = mx * 80 + 340;
  } else {
    x = 340 - mx * 80;
  }

  // console.log(obj.mouse);
  

  // let hueFrom = Math.abs((x - 10) / 360);
  let hueTo = Math.abs(x / 360).toFixed(2);

  var obj = {
    hue: hueTo
  }

  let animate = anime({
    targets: obj,
    hue: 1,
    duration: 300,
    easing: 'easeInOutSine',
    update: function() {
      obj.hue = obj.hue;
    }
  });

  // console.log(obj.hue);
  
  return obj.hue;

}


// this controls content of marching cubes voxel field

function updateCubes( object, time, numblobs, mx, my ) {
  object.reset();

  // let animate = anime({
  //   targets: mx,
  //   // hue: hueFrom.toFixed(2),
  //   duration: 1000,
  //   easing: 'linear',
  // });

  // console.log(animate);
  


  // fill the field with some metaballs
  var i, ballx, bally, ballz, subtract, strength;
  subtract = 12;
  strength = 1.2 / ( ( Math.sqrt( numblobs ) - 1 ) / 4 + 1 );

  for ( i = 0; i < numblobs; i ++ ) {

    ballx = Math.sin(i + 1.26 * time / 1.5 * (1.03 + 0.5 * Math.sin(0.21 * i))) * (Math.cos(mx) - .1) * 0.3 + 0.5;
    bally = Math.sin(Math.sin(i + 3.52 * time / 1.5 * Math.sin(1.22 + 0.1424 * i))) * (Math.cos(my) - 0.2) * 0.43 + 0.5;
    ballz = Math.cos(i + 1.32 * time * 0.1 * Math.sin((0.92 + 0.53 * i))) * 0.27 + 0.5;
    object.material.color.setHSL(
      updateColorHue(mx),
      1.0,
      0.5
    );
    object.addBall( ballx, bally, ballz, strength, subtract);
  }

}


function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// function onTouchMove(event) {
//   if (event.touches.length === 1) {
//     event.preventDefault();
//     mouse.x = event.touches[0].pageX - window.innerWidth / 2;
//     mouse.y = event.touches[0].pageY - window.innerHeight / 2;
//   }
// }

//

function animate() {

  requestAnimationFrame( animate );

  render();
  stats.update();

}

function render() {

  var delta = clock.getDelta();

  time += delta * effectController.speed * 0.5;

  // marching cubes

  if ( effectController.resolution !== resolution ) {
    resolution = effectController.resolution;
    effect.init( Math.floor( resolution ) );
  }

  if ( effectController.isolation !== effect.isolation ) {
    effect.isolation = effectController.isolation;
  }

  updateCubes(
    effect,
    time,
    effectController.numBlobs,
    mouse.x/1.2,
    mouse.y/1.2
  );

  // materials


    // console.log(updateColorHue(mouse.x));
    

  // effect.material.color.setHSL(
  //   effectController.hue,
  //   effectController.saturation,
  //   effectController.lightness
  // );

  // console.log(colorChanger(mouse.x));
  

  // lights

  light.position.set(
    effectController.lx,
    effectController.ly,
    effectController.lz
  );
  light.position.normalize();

  pointLight.position.x = mouse.x * 3;
  pointLight.position.y = mouse.y * 3;

  pointLight.color.setHSL(
    effectController.lhue,
    effectController.lsaturation,
    effectController.llightness
  );

  // render
  renderer.render( scene, camera );

}
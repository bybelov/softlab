import * as THREE from 'three/build/three.module';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes';


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
  window.addEventListener('touchmove', onTouchMove.bind(this), false);

}

//

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function generateMaterials() {
  var materials = {
    "plastic": {
      m: new THREE.MeshPhongMaterial( { color: 0xff00e5, specular: 0x090909, shininess: 160 } ),
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
    resolution: 70,
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


function colorChanger(mx) {
  let hue;
  let saturate = 100;
  let lightness = 70;

  if (mx <= 0) {
    hue = mx * 90 + 330;
  } else {
    hue = 330 - mx * 90;
  }

  let nHue = Math.abs(Math.round(hue));

  // let newColor = String("hsl(" + (Math.abs(Math.round(hue))) + "," + saturate + "%" + "," + lightness + "%" + ")");

  // var color = new THREE.Color(newColor);
  // console.log(color);
  
  return nHue;


  // console.log(object);
  // object.material.color = color;

  // object = new THREE.MeshPhongMaterial( { color: newColor, specular: 0x090909, shininess: 160 } );

  // object.material = new THREE.MeshPhongMaterial({
  //   color: newColor
  // });
}


// this controls content of marching cubes voxel field

function updateCubes( object, time, numblobs, mx, my ) {


  object.reset();

  // fill the field with some metaballs
  var i, ballx, bally, ballz, subtract, strength;
  subtract = 12;
  strength = 1.2 / ( ( Math.sqrt( numblobs ) - 1 ) / 4 + 1 );

  for ( i = 0; i < numblobs; i ++ ) {

    ballx = Math.sin( i + 1.26 * time * ( 1.03 + 0.5 * Math.cos( 0.21 * i ) ) ) * 0.27 + 0.5;
    bally = Math.abs( Math.cos( i + 1.12 * time * Math.cos( 1.22 + 0.1424 * i ) ) ) * 0.77; // dip into the floor
    ballz = Math.cos( i + 1.32 * time * 0.1 * Math.sin( ( 0.92 + 0.53 * i ) ) ) * 0.27 + 0.5;
    // colorChanger(mx, object);
    // effect.material.color.setHSL();
    object.addBall( ballx, bally, ballz, strength, subtract);
  }

}


function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onTouchMove(event) {
  if (event.touches.length === 1) {
    event.preventDefault();
    mouse.x = event.touches[0].pageX - window.innerWidth / 2;
    mouse.y = event.touches[0].pageY - window.innerHeight / 2;
  }
}

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

  effect.material.color.setHSL(
    effectController.hue,
    effectController.saturation,
    effectController.lightness
  );

  console.log(colorChanger(mouse.x));
  

  // lights

  light.position.set(
    effectController.lx,
    effectController.ly,
    effectController.lz
  );
  light.position.normalize();

  pointLight.color.setHSL(
    effectController.lhue,
    effectController.lsaturation,
    effectController.llightness
  );

  // render
  renderer.render( scene, camera );

}


// export default class Metaballs {
//   constructor(selector){

//     this.scene = new THREE.Scene();
//     this.renderer = new THREE.WebGLRenderer({
//       alpha: true
//     });

//     this.width = window.innerWidth;
//     this.height = window.innerWidth;

//     // this.renderer.gammaOutput = true;
//     // this.renderer.setClearColor(0xffffff, 0);
//     this.renderer.setPixelRatio(window.devicePixelRatio);
//     this.renderer.setSize(this.width, this.height);
//     this.renderer.shadowMap.enabled = true;
//     this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//     this.container = document.getElementById(selector);
//     (this.container ? this.container.appendChild(this.renderer.domElement) : false );

//     this.camera = new THREE.PerspectiveCamera(
//       45,
//       window.innerWidth / window.innerHeight,
//       0.01,
//       3000
//     );
//     this.camera.position.set( 0, 0, 100);

//     this.controls = new OrbitControls( this.camera, this.renderer.domElement );
//     this.controls.update();

//     this.time = 0;
//     this.clock = new THREE.Clock();
//     // this.paused = false;
//     this.settings();
//     this.setupResize();
//     this.resize();
    
//     this.addObjects();
//     this.animate();


//   }

//   settings(){

//     var createHandler = function ( id ) {
//       return function () {
//         var mat_old = materials[ this.currentMaterial ];
//         mat_old.h = m_h.getValue();
//         mat_old.s = m_s.getValue();
//         mat_old.l = m_l.getValue();
//         this.currentMaterial = id;
//         var mat = materials[ id ];
//         this.balls.material = mat.m;
//         m_h.setValue( mat.h );
//         m_s.setValue( mat.s );
//         m_l.setValue( mat.l );
//         this.balls.enableUvs = ( this.currentMaterial === "textured" ) ? true : false;
//         this.balls.enableColors = ( this.currentMaterial === "colors" || this.currentMaterial === "multiColors" ) ? true : false;
//       };
//     };

//     this.settings = {
//       time: 0,
//       timeSpeed: 1,
//       numBlobs: 8,
//       resolution: 70,
//       isolation: 140,

//       //Metaball material
//       ballColor : "#ff00e5",
//       ballSpecular : "#090909",
//       ballShiness : 160,

//       ballPositionX : 1,
//       ballPositionY : 0,
//       ballPositionZ : 0,

//       hue: 0.0,
//       saturation: 0.8,
//       lightness: 0.1,
//       // lhue: 0.04,
//       // lsaturation: 1.0,
//       // llightness: 0.5,
//       // lx: 0.5,
//       // ly: 0.5,
//       // lz: 1.0,
//     }
//     var h, m_h, m_s, m_l;

//     this.gui = new GUI();
//     this.gui.add(this.settings, 'timeSpeed', 0, 1, 0.001);
//     this.gui.add(this.settings, 'numBlobs', 1, 15, 1);
//     this.gui.add(this.settings, 'resolution', 10, 100, 10);
//     this.gui.add(this.settings, 'isolation', 10, 200, 10);

//     this.gui.add(this.settings, 'ballPositionX', -10, 10, 1);
//     this.gui.add(this.settings, 'ballPositionY', -10, 10, 1);
//     this.gui.add(this.settings, 'ballPositionZ', -10, 10, 1);

//     h = this.gui.addFolder( "Materials" );
//     for ( var m in materials ) {
//       this.settings[ m ] = createHandler( m );
//       h.add( this.settings, m ).name( m );
//     }

//   }

//   setupResize(){
//     window.addEventListener('resize', this.resize.bind(this));
//   }

//   resize(){
//     this.renderer.setSize(this.width, this.height);
//     this.camera.aspect = this.width / this.height;
//     this.camera.updateProjectionMatrix();
//   }

//   render() {
//     this.renderer.render(this.scene, this.camera);
//   }

//   generateMaterials(){
//     let materials = {
//       'plastic': {
//         m: new THREE.MeshPhongMaterial({ 
//           color: this.settings.ballColor,
//           specular: this.settings.ballSpecular,
//           shininess: this.settings.ballShiness
//         }),
//         h: 0.6,
//         s: 0.8,
//         l: 0.1
//       }
//     }
//     return materials;
//   }

  
// 		// this controls content of marching cubes voxel field
//   updateCubes( object, time, numblobs) {

//     object.reset();
//     // fill the field with some metaballs
//     let i, ballx, bally, ballz, subtract, strength;
//     let rainbow = [
//       new THREE.Color( 0xff0000 ),
//       new THREE.Color( 0xff7f00 ),
//       new THREE.Color( 0xffff00 ),
//       new THREE.Color( 0x00ff00 ),
//       new THREE.Color( 0x0000ff ),
//       new THREE.Color( 0x4b0082 ),
//       new THREE.Color( 0x9400d3 )
//     ];
//     subtract = 12;
//     strength = 1.2 / ( ( Math.sqrt( numblobs ) - 1 ) / 4 + 1 );
//     for ( i = 0; i < numblobs; i ++ ) {
//       ballx = Math.sin( i + 1.26 * time * ( 1.03 + 0.5 * Math.cos( 0.21 * i ) ) ) * 0.27 + 0.5;
//       bally = Math.abs( Math.cos( i + 1.12 * time * Math.cos( 1.22 + 0.1424 * i ) ) ) * 0.77; // dip into the floor
//       ballz = Math.cos( i + 1.32 * time * 0.1 * Math.sin( ( 0.92 + 0.53 * i ) ) ) * 0.27 + 0.5;
//       object.addBall( ballx, bally, ballz, strength, subtract );
//     }
    
//     // if ( floor ) object.addPlaneY( 2, 12 );
//     // if ( wallz ) object.addPlaneZ( 2, 12 );
//     // if ( wallx ) object.addPlaneX( 2, 12 );
//   }

//   addObjects(){

//     this.axesHelper = new THREE.AxesHelper( 10 );
//     this.scene.add( this.axesHelper );

//     // LIGHTS
//     this.light = new THREE.DirectionalLight( 0xffffff, 1 );
//     this.light.position.set( 0.5, 0.5, 1 );
//     this.scene.add( this.light );

//     this.helper = new THREE.DirectionalLightHelper( this.light, 5 );
//     this.scene.add( this.helper );

//     this.pointLight = new THREE.PointLight( 0xff3300 );
//     this.pointLight.position.set( 0, 0, 100 );
//     this.scene.add( this.pointLight );

//     this.sphereSize = 1;
//     this.pointLightHelper = new THREE.PointLightHelper( this.pointLight, this.sphereSize );
//     this.scene.add( this.pointLightHelper );

//     this.ambientLight = new THREE.AmbientLight( 0x404040, 1 );
//     this.scene.add( this.ambientLight );



//     let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
//     let sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xf44336 });
//     let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
//         sphere.castShadow = true;
//         sphere.position.x = this.settings.ballPositionX;
//         sphere.position.y = this.settings.ballPositionY;
//         sphere.position.z = this.settings.ballPositionZ;
//         this.scene.add(sphere);


//     // this.material = new THREE.MeshPhongMaterial({
//     //   color: '#ff00e5',
//     //   specular: '#090909',
//     //   shininess: 160
//     // });
//     // this.geometry = new THREE.PlaneGeometry(1,1,1,1);
//     // this.points = new THREE.Mesh(this.geometry, this.material);
//     // this.scene.add(this.points);

//     // let resolution = 28;
//     let materials = this.generateMaterials();
//     this.currentMaterial = 'plastic';

//     this.balls = new MarchingCubes(
//       this.settings.resolution,
//       materials[ this.currentMaterial ].m,
//       true,
//       true
//     );
    
//     this.balls.position.set( 
//       this.settings.ballPositionX,
//       this.settings.ballPositionY,
//       this.settings.ballPositionZ
//     );

//     // this.balls.scale.set( 2, 2, 2 );
//     // this.balls.enableUvs = false;
//     // this.balls.enableColors = false;
//     this.scene.add( this.balls );


//   }

//   // stop(){
//   //   this.paused = true;
//   // }

//   // play(){
//   //   this.paused = false;
//   //   this.render();
//   // }

//   animate(){

//     // if(this.paused) return;

//     let resolution;
//     let delta = this.clock.getDelta();
//     this.time += delta * this.settings.timespeed * 0.5;

//     // marching cubes
    
//     if ( this.settings.resolution !== resolution ) {
//       resolution = this.settings.resolution;
//       this.balls.init( Math.floor( resolution ) );
//     }
//     if ( this.settings.isolation !== this.balls.isolation ) {
//       this.balls.isolation = this.settings.isolation;
//     }

//     this.balls.init(Math.floor(this.settings.resolution));

//     this.updateCubes( 
//       this.balls,
//       this.time,
//       this.settings.numBlobs
//     );

//     // material
//     this.balls.material.color.setHSL( 
//       this.settings.hue,
//       this.settings.saturation,
//       this.settings.lightness
//     );

//     this.light.position.set( 0.04, 1.0, 0.5);
//     this.light.position.normalize();

//     this.pointLight.color.setHSL( 0.04, 1.0, 0.5 );
    

//     this.renderer.clear();
//     requestAnimationFrame(this.animate.bind(this));
//     this.render();

//   }

// }

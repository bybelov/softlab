import * as THREE from 'three';
import * as dat from 'dat.gui';

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var container;
var mouseX = 0, mouseY = 0;
var camera, scene, renderer;
var light, pointLight, ambientLight;
var meta, metaMat, resolution, numBlobs;
var time = 0;
// объект отслеживания времени
var clock = new THREE.Clock();

// SETTINGS DEFAULT
var metaController = new function(){
  // Axes
  this.axes = false;

  //Metaball simulation
	this.speed = 1;
	this.numBlobs = 8;
	this.resolution = 70;
  this.isolation = 140;
  this.positionX = 100;
  this.positionY = 0;
  this.positionZ = 0;

  //Metaball material
  this.metaColor = "#ff00e5";
  this.metaSpec = "#6e6cff";
  this.metaShine = 5;

  // Camera position
  this.cameraPositionX = 45;
  this.cameraPositionY = 45;
  this.cameraPositionZ = 300;

  // Lights
  // Ambient Color light
  this.ambientColor = "#080808";

  // SpotLight
  this.spotColor = "#ffffff";
  this.spotPositionX = -40;
  this.spotPositionY = 120;
  this.spotPositionZ = 10;
  this.spotVisible = true;
  this.spotHelperVisible = false;

  //Point light color
  this.pointVisible = true;
  this.pointPositionX = 0;
  this.pointPositionY = 0;
  this.pointPositionZ = 100;
  this.lhue = 1;
  this.lsaturation =  0.9;
  this.llightness = 0.55;

  //Directional light orientation
  this.lx = 0.77;
  this.ly = 0.55;
  this.lz = 0.32;
}

window.onload = function () {
  init();
}


function init() {

  container = document.getElementById('container');

  // SCENE
  scene = new THREE.Scene();


  // CAMERA
  camera = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, 0.1, 1000);
  camera.position.set( metaController.cameraPositionX, metaController.cameraPositionY, metaController.cameraPositionZ);
	camera.lookAt(scene.position);

  // LIGHTS

  // Глобальный свет
  ambientLight = new THREE.AmbientLight(metaController.ambientColor);
  scene.add(ambientLight);

	// Источник света (прожектор)
	var spotLight = new THREE.SpotLight(metaController.spotColor);
	// Расскажем какие источники света могут добавлять тени
			spotLight.castShadow = true;
			spotLight.position.set( metaController.spotPositionX, metaController.spotPositionY, metaController.spotPositionZ);
			// Добавим четкости тяням, которые возникают от этого источника света
			spotLight.shadow.mapSize.width = 4096;
      spotLight.shadow.mapSize.height = 4096;
      spotLight.visible = metaController.spotVisible;
      scene.add(spotLight);
  // HELPER для прожектора
  var spotLightHelper = new THREE.SpotLightHelper( spotLight );
      spotLightHelper.visible = metaController.spotHelperVisible;
      scene.add( spotLightHelper );

  // Солнечный свет, бесконечный
  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0.5, 0.5, 1);
  scene.add(light);

  // Точечный свет 
  pointLight = new THREE.PointLight( 0xff3300 );
  pointLight.position.set( metaController.pointPositionX, metaController.pointPositionY, metaController.pointPositionZ );
  pointLight.visible = metaController.pointVisible;
  scene.add( pointLight );



  // METABALLS
  // Материал для шариков
  metaMat = new THREE.MeshPhongMaterial({
              color: 0x000000,
              specular: 0x888888,
              shininess: metaController.metaShine
            });
  meta = new THREE.MarchingCubes(50, metaMat, true, true);
  meta.position.set(metaController.positionX, metaController.positionY, metaController.positionZ);
  meta.scale.set(100, 100, 100);
  // Шарики могут отбрасывать тени
  meta.castShadow = true;
  scene.add(meta);


  // RENDERER

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setClearColor(0xffffff, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  // Скажим рендереру, что мы хотим использовать тени на сцене
	renderer.shadowMap.enabled = true;
	// Добавим мягкости теням
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // добавим канвас рендерер в наш контейнер #container
  container.appendChild(renderer.domElement);

  renderer.gammaInput = true;
  renderer.gammaOutput = true;

  var axes = new THREE.AxesHelper( 200, 200, 200 );
      axes.visible = metaController.axes;
  scene.add(axes);

  // CONTROLS
  // var controls = new THREE.OrbitControls(camera, renderer.domElement);
  // controls.autoRotate = true;

  animate();

  // EVENTS
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );
  //
  window.addEventListener('resize', onWindowResize, false);

  //SETUP GUI
  var gui = new dat.GUI({name: 'Настройки меташариков'});

  var h = gui.addFolder("Показать оси XYZ");
      h.add(metaController, "axes").onChange(function (e) {
        axes.visible = e;
      });

  var h = gui.addFolder("Шарики");
      h.add(metaController, "speed", 0.0, 10.0);
      h.add(metaController, "numBlobs", 0, 40);
      h.add(metaController, "resolution", 50, 100);
      h.add(metaController, "isolation", 50, 450);
      h.add(metaController, "positionX", -200, 200);
      h.add(metaController, "positionY", -200, 200);
      h.add(metaController, "positionZ", -999, 999);
      //
      h = gui.addFolder("Материал шариков");
      h.addColor(metaController, "metaColor");
      h.addColor(metaController, "metaSpec");
      h.add(metaController, "metaShine", 0, 250);
      //
      // h = gui.addFolder("Камера");
      // h.add(metaController, "cameraPositionX", -999, 999);
      // h.add(metaController, "cameraPositionY", -999, 999);
      // h.add(metaController, "cameraPositionZ", -999, 999);
      //
      h = gui.addFolder("Глобальный свет");
      h.addColor(metaController, 'ambientColor').onChange(function (e) {
        ambientLight.color = new THREE.Color(e);
      });
      //
      h = gui.addFolder("Прожектор");
      h.add(metaController, "spotVisible").onChange(function (e) {
        spotLight.visible = e;
      });
      h.add(metaController, "spotHelperVisible").onChange(function (e) {
        spotLightHelper.visible = e;
      });
      h.add(metaController, 'spotPositionX', -999, 999).onChange(function (e) {
        spotLight.position.x = e
      });
      h.add(metaController, 'spotPositionY', -999, 999).onChange(function (e) {
        spotLight.position.y = e
      });
      h.add(metaController, 'spotPositionZ', -999, 999).onChange(function (e) {
        spotLight.position.z = e
      });
      h.addColor(metaController, 'spotColor').onChange(function (e) {
        spotLight.color = new THREE.Color(e);
      });

      //
      h = gui.addFolder( "Точечный свет" );
      h.add(metaController, "pointVisible").onChange(function (e) {
        pointLight.visible = e;
      });
      h.add(metaController, 'pointPositionX', -999, 999).onChange(function (e) {
        pointLight.position.x = e
      });
      h.add(metaController, 'pointPositionY', -999, 999).onChange(function (e) {
        pointLight.position.y = e
      });
      h.add(metaController, 'pointPositionZ', -999, 999).onChange(function (e) {
        pointLight.position.z = e
      });
      h.add( metaController, "lhue", 0.0, 1.0, 0.025 ).name( "hue" );
      h.add( metaController, "lsaturation", 0.0, 1.0, 0.025 ).name( "saturation" );
      h.add( metaController, "llightness", 0.0, 1.0, 0.025 ).name( "lightness" );

      //
      h = gui.addFolder( "Прямой свет (солнечный)" );
      h.add( metaController, "lx", - 1.0, 1.0, 0.025 ).name( "x" );
      h.add( metaController, "ly", - 1.0, 1.0, 0.025 ).name( "y" );
      h.add( metaController, "lz", - 1.0, 1.0, 0.025 ).name( "z" );
}

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

  // изменение в секундах Текущее минус oldTime (обычно равно около 0.015 )
  var delta = clock.getDelta(); 

  time += delta * metaController.speed * 0.5;

  camera.position.x += ( mouseX - camera.position.x ) * 0.001;
  camera.position.y += ( - mouseY - camera.position.y ) * 0.001;
  camera.position.z += ( - mouseY - camera.position.z ) * 0.0001;
  camera.lookAt( scene.position );

  // Camera rotation
  // camera.position.x = metaController.cameraPositionX;
  // camera.position.y = metaController.cameraPositionY;
  // camera.position.z = metaController.cameraPositionZ;

  // Metaball simulation GUI
  resolution = metaController.resolution;
  meta.init(Math.floor(resolution));
  
  // position metaballs
  meta.position.set(metaController.positionX, metaController.positionY, metaController.positionZ);

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

function onDocumentMouseMove( event ) {
  mouseX = event.clientX - window.innerWidth/2;
  mouseY = event.clientY - window.innerHeight/2;
}

function onDocumentTouchStart( event ) {
  if ( event.touches.length === 1 ) {
    event.preventDefault();
    mouseX = event.touches[ 0 ].pageX - window.innerWidth/2;
    mouseY = event.touches[ 0 ].pageY - window.innerHeight/2;
  }
}

function onDocumentTouchMove( event ) {
  if ( event.touches.length === 1 ) {
    event.preventDefault();
    mouseX = event.touches[ 0 ].pageX - window.innerWidth/2;
    mouseY = event.touches[ 0 ].pageY - window.innerHeight/2;
  }
}
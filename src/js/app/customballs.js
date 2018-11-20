import * as THREE from 'three';
import * as dat from 'dat.gui';

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var container;
var camera, scene, renderer;
var light, ambientLight;
var mesh;
var warpVector;
var time = 0;

// объект отслеживания времени
var clock = new THREE.Clock();

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

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
  this.cameraPositionX = 0;
  this.cameraPositionY = 0;
  this.cameraPositionZ = 1000;

  // Lights
  // Ambient Color light
  this.ambientColor = "#080808";
  this.ambientIntensity = 1;

  // SpotLight
  this.spotColor = "#ffffff";
  this.spotPositionX = -40;
  this.spotPositionY = 120;
  this.spotPositionZ = 10;
  this.spotRotationX = 0;
  this.spotRotationY = 0;
  this.spotRotationZ = 0;
  this.spotVisible = true;
  this.spotHelperVisible = false;

  //Point light color
  this.pointVisible = true;
  this.pointIntensity = 1;
  this.pointDistance = 0;
  this.pointPositionX = 0;
  this.pointPositionY = 0;
  this.pointPositionZ = 100;
  this.lhue = 1;
  this.lsaturation =  0.9;
  this.llightness = 0.55;

  //Directional light orientation
  this.dLightVisible = true;
  this.dLightIntensity = 1;
  this.dLightX = 0.77;
  this.dLightY = 0.55;
  this.dLightZ = 0.32;
}

window.onload = function () {
  init();
}



function init() {

  container = document.getElementById('container');

  // SCENE
  scene = new THREE.Scene();


  // CAMERA
  camera = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 3000);
  camera.position.set( metaController.cameraPositionX, metaController.cameraPositionY, metaController.cameraPositionZ);
	camera.lookAt(scene.position);

  // LIGHTS
  // Глобальный свет
  ambientLight = new THREE.AmbientLight(metaController.ambientColor, metaController.ambientIntensity);
  scene.add(ambientLight);

  // Солнечный свет, бесконечный
  light = new THREE.DirectionalLight(0xffffff, metaController.dLightIntensity);
  light.position.set(metaController.dLightX, metaController.dLightY, metaController.dLightZ);
  scene.add(light);









  var geometry = new THREE.SphereGeometry( 300, 50, 50 );
  var material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0xffffff,
      shininess: 30,
      flatShading: THREE.FlatShading,
      // wireframe: true,
  });

  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  warpVector = new THREE.Vector3(0, 200, 0);

  scene.add(mesh);























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

  
  animate();
  window.addEventListener('resize', onWindowResize, false);

  //SETUP GUI
  var gui = new dat.GUI({name: 'Настройки меташариков'});

  var h = gui.addFolder("Глобальный свет");
      h.add(metaController, 'ambientIntensity', 0, 4, 0.1).name("интенсивность").onChange  (function (e) {
          ambientLight.intensity = e
        });
      h.addColor(metaController, 'ambientColor').name("цвет").onChange(function (e) {
        ambientLight.color = new THREE.Color(e);
      });

      h = gui.addFolder( "Прямой свет (солнечный)" );
      h.add(metaController, "dLightVisible").name("вкл/выкл").onChange(function (e) {
        light.visible = e;
      });
      h.add(metaController, 'dLightIntensity', 1, 100, 1).name("интенсивностьgit ").onChange(function (e) {
        light.intensity = e
      });
      h.add( metaController, "dLightX", - 1.0, 1.0, 0.025 ).name( "x" );
      h.add( metaController, "dLightY", - 1.0, 1.0, 0.025 ).name( "y" );
      h.add( metaController, "dLightZ", - 1.0, 1.0, 0.025 ).name( "z" );

}

function onWindowResize(event) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// ANIMATE
function animate() {
  requestAnimationFrame(animate);
  render();
}

function balls(mesh, time){

  const vertices = mesh.geometry.vertices;

  var size = 100;
  var speed = 1;
  var radius = 300;

  for (let i = 0; i < vertices.length; i++) {
      var v = vertices[i];
      var dist = v.distanceTo(warpVector);
      var radian = (0.8 + 0.2 * Math.sin(dist / -size + (time / speed))) * radius;
      v.normalize().multiplyScalar(radian);

  }

  var warpSine = (Math.sin(time / (speed * 8))) * (radius * 2);
  warpVector.y = warpSine;
  warpVector.x = warpSine;
  warpVector.z = warpSine;

  mesh.geometry.computeVertexNormals();
  mesh.geometry.computeFaceNormals();
  mesh.geometry.verticesNeedUpdate = true;
  mesh.geometry.elementsNeedUpdate = true;
  mesh.geometry.normalsNeedUpdate = true;



}

// RENDER
function render() {

  var delta = clock.getDelta(); 
  // time += delta * metaController.speed * 0.5;

  time += 0.1;

  balls(mesh, time);





  // lights
  light.position.set( metaController.dLightX, metaController.dLightY, metaController.dLightZ );
  light.position.normalize();

  renderer.clear();
  renderer.render(scene, camera);

}
import * as THREE from 'three/build/three.module';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes';
import Balls from './marchingcubes'

export default class MetaBalls {

  constructor(selector){
    this.container = document.getElementById(selector);

  }

  setup() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.stats = new Stats();
    this.time = 0;
    this.clock = new THREE.Clock();
    this.mouse = new THREE.Vector2();
    this.numblobs = 8;
    this.metaBalls = new Balls();

    // this.raycaster = new THREE.Raycaster();

  }

  addControls(){
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
  }

  addStats(){
    this.container.appendChild( this.stats.dom );
  }

  updateStats(){
   this.stats.update();
  }
  
  addGui(){

  }

  createScene() {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.set(-500, 500, 1500);
    if (window.matchMedia("(orientation: portrait)").matches) {
      this.camera.position.x = 1;
    }else{
      this.camera.position.x = - 500;
    }
    this.scene.add(this.camera);
  }

  addDirectionalLight(){
    const light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0.5, 0.5, 1 );
    this.scene.add( light );
  }

  addPointLight(){
    const light = new THREE.PointLight( 0xff3300 );
    light.position.set( 0, 0, 100 );
    this.scene.add( light );
  }

  addAmbientLight() {
    const light = new THREE.AmbientLight(0x080808);
    this.scene.add(light);
  }

  addBalls(){
    this.scene.add(this.metaBalls.balls);
  }

  draw() {
    let delta = this.clock.getDelta();
    this.time += delta * 1 * 0.5;

    this.metaBalls.updateMarchingCubes(this.time, this.numblobs, this.mouse.x, this.mouse.y)

    // console.log(this.addBalls());
    
  }

  init() {
    this.setup();
    this.createScene();
    this.createCamera();

    this.addControls(); // helper - orbit controls
    this.addStats(); // helper - add statistics
    this.addGui(); // helper - add GUI panel

    this.addDirectionalLight();
    this.addPointLight();
    this.addAmbientLight();

    this.addBalls();

    this.animate();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onResize() {

    if (window.matchMedia("(orientation: portrait)").matches) {
      this.camera.position.x = 1;
    }else{
      this.camera.position.x = - 500;
    }

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  animate() {
    this.draw();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));
    this.updateStats();
  }
}
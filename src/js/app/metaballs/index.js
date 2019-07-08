import * as THREE from 'three/build/three.module';
import Stats from 'three/examples/jsm/libs/stats.module.js';
// import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
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
    this.speed = 1;
    this.clock = new THREE.Clock();
    this.mouse = new THREE.Vector2();
    this.pointLight = new THREE.PointLight( 0xff3300, 0.8);
    this.numblobs = 8;
    this.metaBalls = new Balls();
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
    this.camera.position.set(0, 0, 2000);
    if (window.matchMedia("(orientation: portrait)").matches) {
      this.camera.position.x = 700;
    }else{
      this.camera.position.x = 0;
    }
    this.scene.add(this.camera);
  }

  addDirectionalLight(){
    const light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( -0.9, 0.85, 0.85 );
    this.scene.add( light );
  }

  addPointLight(color, position){
    const light = this.pointLight;
    light.color.setHSL( color.hue, color.saturation, color.lightness);
    light.position.set( position.x, position.y, position.z );
    this.scene.add( light );
  }

  addAmbientLight() {
    const light = new THREE.AmbientLight(0x080808);
    this.scene.add(light);
  }

  addBalls(){
    this.scene.add(this.metaBalls.balls);
  }

  init() {

    if(this.container){
      this.setup();
      this.createScene();
      this.createCamera();
  
      // this.addControls(); // helper - orbit controls
      this.addStats(); // helper - add statistics
      // this.addGui(); // helper - add GUI panel
  
      this.addDirectionalLight();

      if (!window.matchMedia("(orientation: portrait)").matches) {
        this.addPointLight({ hue: 0.8, saturation: 0.0, lightness: 0.4 },{ x: 0, y: 0, z: 0 });
      }

      this.addAmbientLight();
  
      this.addBalls();
  
      this.animate();
  
      window.addEventListener('resize', this.onResize.bind(this));
      window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    }
  }

  onResize() {

    if (window.matchMedia("(orientation: portrait)").matches) {
      this.camera.position.x = 700;
    }else{
      this.camera.position.x = 0;
    }

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  onMouseMove(event){
    event.preventDefault();
    this.mouse.x = (event.clientX / this.width) * 2 - 1;
    this.mouse.y = -(event.clientY / this.height) * 2 + 1;
  }

  draw() {
    let delta = this.clock.getDelta();
    this.time += delta * this.speed * 0.5;

    this.metaBalls.updateMarchingCubes(this.time, this.numblobs, this.mouse.x, this.mouse.y);
    
    this.pointLight.position.x = this.mouse.x * 700;
    this.pointLight.position.y = this.mouse.y * 700;
    this.pointLight.position.z = this.mouse.x * 1000;

  }

  animate() {
    this.draw();
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.animate.bind(this));
    this.updateStats();
  }
}
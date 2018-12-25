import * as THREE from 'three';
//let OrbitControls = require('three-orbit-controls')(THREE);

export default class Metaballs {
  constructor(selector) {

    this.metaController = {

      axes : false,
      //Metaball simulation
      speed : 1,
      numBlobs : 8,
      resolution : 70,
      isolation : 140,
      positionX : 1,
      positionY : 0,
      positionZ : 0,
  
      //Metaball material
      metaColor : "#ff00e5",
      metaSpec : "#090909",
      metaShine : 160,
  
      // Camera position
      cameraPositionX : 0,
      cameraPositionY : 0,
      cameraPositionZ : 3,
  
      // Lights
      // Ambient Color light
      ambientColor : "#080808",
      ambientIntensity : 1,
  
      // SpotLight
      spotColor : "#ffffff",
      spotPositionX : 1,
      spotPositionY : -370,
      spotPositionZ : 55,
      spotRotationX : 0,
      spotRotationY : 1,
      spotRotationZ : 2,
      spotVisible : false,
      spotHelperVisible : false,
  
      //Point light color
      pointVisible : true,
      pointIntensity : 1,
      pointDistance : 0,
      pointPositionX : 0,
      pointPositionY : 0,
      pointPositionZ : 3,
      lhue : 1,
      lsaturation : 0.9,
      llightness : 0.55,
  
      //Directional light orientation
      dLightVisible : true,
      dLightIntensity : 1,
      dLightX : -1,
      dLightY : 1,
      dLightZ : 1
    };

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      alpha: true
    });
    this.renderer.setClearColor(0xffffff, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerWidth);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container = document.getElementById(selector);
    (this.container ? this.container.appendChild(this.renderer.domElement) : false );
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.01, 3000
    );
    this.camera.position.set(
      this.metaController.cameraPositionX,
      this.metaController.cameraPositionY,
      this.metaController.cameraPositionZ
    );

    // объект отслеживания времени
    this.clock = new THREE.Clock();
    this.mouse = new THREE.Vector2();
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.time = 0;

    this.setupResize();
    this.setupMouseMove();
    this.setupTouchMove();

    this.resize();
    this.addObjects();
    this.animate();
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  setupMouseMove() {
    window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
  }

  setupTouchMove() {
    window.addEventListener('touchmove', this.onTouchMove.bind(this), false);
  }

  resize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  onTouchMove(event) {
    if (event.touches.length === 1) {
      event.preventDefault();
      this.mouse.x = event.touches[0].pageX - window.innerWidth / 2;
      this.mouse.y = event.touches[0].pageY - window.innerHeight / 2;
    }
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  addObjects() {

    // lights
    // global light
    this.ambientLight = new THREE.AmbientLight(
      this.metaController.ambientColor,
      this.metaController.ambientIntensity
    );
    this.scene.add(this.ambientLight);

    // spot light
    this.spotLight = new THREE.SpotLight(this.metaController.spotColor);
    this.spotLight.position.set(
      this.metaController.spotPositionX,
      this.metaController.spotPositionY,
      this.metaController.spotPositionZ
    );
    this.spotLight.visible = this.metaController.spotVisible;
    this.scene.add(this.spotLight);

    // sun light
    this.light = new THREE.DirectionalLight(0xffffff, this.metaController.dLightIntensity);
    this.light.position.set(
      this.metaController.dLightX,
      this.metaController.dLightY,
      this.metaController.dLightZ
    );
    this.scene.add(this.light);

    // point light
    this.pointLight = new THREE.PointLight(0xff3300);
    this.pointLight.position.set(
      this.metaController.pointPositionX,
      this.metaController.pointPositionY,
      this.metaController.pointPositionZ
    );
    this.pointLight.visible = this.metaController.pointVisible;
    this.scene.add(this.pointLight);



    // metaball
    let metaMat = new THREE.MeshPhongMaterial({
      color: this.metaController.metaColor,
      specular: this.metaController.metaSpec,
      shininess: this.metaController.metaShine
    });
    this.meta = new THREE.MarchingCubes(300, metaMat, true, true);

    this.meta.position.set(
      this.metaController.positionX,
      this.metaController.positionY,
      this.metaController.positionZ
    );
    // meta.scale.set(100, 100, 100);
    this.scene.add(this.meta);

  }

  colorChanger(mx, object) {
    let hue;
    let saturate = 100;
    let lightness = 70;

    if (mx <= 0) {
      hue = mx * 90 + 330;
    } else {
      hue = 330 - mx * 90;
    }
    let newColor = String("hsl(" + (Math.abs(Math.round(hue))) + "," + saturate + "%" + "," + lightness + "%" + ")");
    // console.log(newColor);
    object.material = new THREE.MeshPhongMaterial({
      color: newColor
    });
  }

  // this controls content of marching cubes voxel field
  updateCubes(object, time, numblobs, mx, my) {

    object.reset();

    // fill the field with some metaballs
    let i, ballx, bally, ballz, subtract, strength;
    subtract = 12;
    strength = 2 / ((Math.sqrt(numblobs) - 1) / 4 + 1);

    for (i = 0; i < numblobs; i++) {
      ballx = Math.sin(i + 1.26 * time / 1.5 * (1.03 + 0.5 * Math.sin(0.21 * i))) * (Math.cos(mx) - .1) * 0.3 + 0.5;
      bally = Math.sin(Math.sin(i + 3.52 * time / 1.5 * Math.sin(1.22 + 0.1424 * i))) * (Math.cos(my) - 0.2) * 0.43 + 0.5;
      ballz = Math.cos(i + 1.32 * time * 0.1 * Math.sin((0.92 + 0.53 * i))) * 0.27 + 0.5;
      this.colorChanger(mx, object);
      object.addBall(ballx, bally, ballz, strength, subtract);
    }
  }

  animate() {

    // изменение в секундах Текущее минус oldTime (обычно равно около 0.015 )
    let delta = this.clock.getDelta();

    this.time += delta * this.metaController.speed * 0.5;

    this.pointLight.position.x = this.mouse.x * 3;
    this.pointLight.position.y = this.mouse.y * 3;

    // Metaball simulation GUI
    this.meta.init(Math.floor(this.metaController.resolution));

    // position metaballs
    // meta.position.set(metaController.positionX, metaController.positionY, metaController.positionZ);

    // lights
    this.light.position.set(
      this.metaController.dLightX,
      this.metaController.dLightY,
      this.metaController.dLightZ
    );
    this.light.position.normalize();

    this.pointLight.color.setHSL(
      this.metaController.lhue,
      this.metaController.lsaturation,
      this.metaController.llightness
    );

    this.updateCubes(
      this.meta,
      this.time,
      this.metaController.numBlobs,
      this.mouse.x/1.2,
      this.mouse.y/1.2
    );

    this.renderer.clear();

    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }
}

// new Metaballs('container');
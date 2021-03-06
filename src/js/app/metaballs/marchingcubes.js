import * as THREE from 'three/build/three.module';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes';
export default class Balls {
  constructor() {
    if (window.matchMedia("(orientation: portrait)").matches) {
      this.resolution = 35;
    }else{
      this.resolution = 60;
    }
    this.isolation = 40;
    this.materials = new THREE.MeshPhongMaterial({
      color: 0xff00e5,
      specular: 0x090909,
      shininess: 40
    });
    this.balls = new MarchingCubes( this.resolution, this.materials, true, true );
    this.balls.position.set( 700, 0, 0 );
    this.balls.scale.set( 700, 700, 700 );
    this.balls.isolation = this.isolation;
    this.balls.enableUvs = false;
    this.balls.enableColors = false;
  }

  updateColors(mx){
    let x;
    if (mx <= 0) {
      x = mx * 30 + 320;
    } else {
      x = 320 - mx * 30;
    }
    let hue = Math.abs(x / 360).toFixed(2);
    return hue;
  }

  updateMarchingCubes(time, numblobs, mx, my){
    this.balls.reset();
    var i, ballx, bally, ballz, subtract, strength;
    subtract = 12;
    strength = 1.2 / ( ( Math.sqrt( numblobs ) - 1 ) / 4 + 1 );


    let mouseX = Math.abs(mx);
    let mouseY = Math.abs(my);

    for ( i = 0; i < numblobs; i ++ ) {

      ballx = Math.sin(i + 1.26 * time / 1.5 * (1.03 + 0.5 * Math.sin(0.21 * i))) * (Math.cos(mouseX) - .1) * 0.3 + 0.5;
      bally = Math.sin(Math.sin(i + 3.52 * time / 1.5 * Math.sin(1.22 + 0.1424 * i))) * (Math.cos(mouseY) - 0.2) * 0.43 + 0.5;
      ballz = Math.cos(i + 1.32 * time * 0.1 * Math.sin((0.92 + 0.53 * i))) * 0.27 + 0.5;

      this.balls.material.color.setHSL(
        this.updateColors(mx),
        1.0,
        0.5
      );
      this.balls.addBall( ballx, bally, ballz, strength, subtract);
    }
  }

}
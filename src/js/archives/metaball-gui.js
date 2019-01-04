import * as dat from 'dat.gui';

function settingGui( controller ){
    //SETUP GUI
    var gui = new dat.GUI({
      name: 'Настройки меташариков'
    });
  
    var h = gui.addFolder("Показать оси XYZ");
    h.add(controller, "axes").onChange(function (e) {
      axes.visible = e;
    });
  
    var h = gui.addFolder("Шарики");
    h.add(controller, "speed", 0.0, 10.0, 0.1).name("скорость");
    h.add(controller, "numBlobs", 0, 40, 1).name("кол-во");
    h.add(controller, "resolution", 50, 100).name("качество");
    h.add(controller, "isolation", 50, 450);
    h.add(controller, "positionX", -200, 200).name("x");
    h.add(controller, "positionY", -200, 200).name("y");
    h.add(controller, "positionZ", -999, 999).name("z");
    //
    h = gui.addFolder("Материал шариков");
    h.addColor(controller, "metaColor");
    h.addColor(controller, "metaSpec");
    h.add(controller, "metaShine", 0, 250).name("блеск");
    //
    // h = gui.addFolder("Камера");
    // h.add(controller, "cameraPositionX", -999, 999);
    // h.add(controller, "cameraPositionY", -999, 999);
    // h.add(controller, "cameraPositionZ", -999, 999);
    //
    h = gui.addFolder("Глобальный свет");
    h.add(controller, 'ambientIntensity', 0, 4, 0.1).name("интенсивность").onChange(function (e) {
      ambientLight.intensity = e
    });
    h.addColor(controller, 'ambientColor').name("цвет").onChange(function (e) {
      ambientLight.color = new THREE.Color(e);
    });
    //
    h = gui.addFolder("Прожектор");
    h.add(controller, "spotVisible").name("вкл/выкл").onChange(function (e) {
      spotLight.visible = e;
    });
    h.add(controller, "spotHelperVisible").name("help").onChange(function (e) {
      spotLightHelper.visible = e;
    });
    h.add(controller, 'spotPositionX', -999, 999).name("x").onChange(function (e) {
      spotLight.position.x = e
    });
    h.add(controller, 'spotPositionY', -999, 999).name("y").onChange(function (e) {
      spotLight.position.y = e
    });
    h.add(controller, 'spotPositionZ', -999, 999).name("z").onChange(function (e) {
      spotLight.position.z = e
    });
    h.add(controller, 'spotRotationX', 0, 6.28).name("поворот вокруг x").onChange(function (e) {
      spotLight.rotation.x = e
    });
    h.add(controller, 'spotRotationY', 0, 6.28).name("поворот вокруг y").onChange(function (e) {
      spotLight.rotation.y = e
    });
    h.add(controller, 'spotRotationZ', 0, 6.28).name("поворот вокруг z").onChange(function (e) {
      spotLight.rotation.z = e
    });
    h.addColor(controller, 'spotColor').onChange(function (e) {
      spotLight.color = new THREE.Color(e);
    });
  
    //
    h = gui.addFolder("Точечный свет");
    h.add(controller, "pointVisible").name("вкл/выкл").onChange(function (e) {
      pointLight.visible = e;
    });
    h.add(controller, "pointIntensity", 1, 100, 1).name("интенсивность света").onChange(function (e) {
      pointLight.intensity = e;
    });
    h.add(controller, "pointDistance", 0, 999, 1).name("Диапазон света").onChange(function (e) {
      pointLight.distance = e;
    });
    h.add(controller, 'pointPositionX', -999, 999).name("x").onChange(function (e) {
      pointLight.position.x = e
    });
    h.add(controller, 'pointPositionY', -999, 999).name("y").onChange(function (e) {
      pointLight.position.y = e
    });
    h.add(controller, 'pointPositionZ', -999, 999).name("z").onChange(function (e) {
      pointLight.position.z = e
    });
    h.add(controller, "lhue", 0.0, 1.0, 0.025).name("hue");
    h.add(controller, "lsaturation", 0.0, 1.0, 0.025).name("saturation");
    h.add(controller, "llightness", 0.0, 1.0, 0.025).name("lightness");
  
    //
    h = gui.addFolder("Прямой свет (солнечный)");
    h.add(controller, "dLightVisible").name("вкл/выкл").onChange(function (e) {
      light.visible = e;
    });
    h.add(controller, 'dLightIntensity', 1, 100, 1).name("интенсивностьgit ").onChange(function (e) {
      light.intensity = e
    });
    h.add(controller, "dLightX", -1.0, 1.0, 0.025).name("x");
    h.add(controller, "dLightY", -1.0, 1.0, 0.025).name("y");
    h.add(controller, "dLightZ", -1.0, 1.0, 0.025).name("z");
}

export {settingGui};
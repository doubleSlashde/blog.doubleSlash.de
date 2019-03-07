var root = document.getElementById("dsLogoDiv");
var colorPickerDomElement = document.getElementById("colorPicker");
var autoRotateDomElement = document.getElementById("autoRotate");

var rootPath = "https://TODO";
var mtlName = "dsLogo.mtl";
var objName = "dsLogo.obj";
	
var width = 250;
var height = 200;
var windowHalfX = width / 2;
var windowHalfY = height / 2;

var container, scene, camera, renderer;
var clock = new THREE.Clock();

var scene = undefined;
var controls = undefined;

var logo = undefined;
var dsCyan = undefined;

var autoRotate = true;
var autoRotateSpeedDegPerSecond = 10;

init();

function init() {

    colorPickerDomElement.addEventListener("change", function(evt) {
        if (dsCyan === undefined) return;
        dsCyan.color = new THREE.Color(parseInt(evt.target.value.replace("#", "0x"), 16));
    });

    autoRotateDomElement.addEventListener("change", function(evt) {
        autoRotate = evt.target.checked;
    });
    autoRotateDomElement.checked = autoRotate;

    container = document.createElement('div');

    root.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, width / height, .1, 100);
    camera.position.z = 3;

    scene = new THREE.Scene();
    var ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);

    loadAndAddModelToScene();

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = controls.enablePan = false;
    animate();
}

function loadAndAddModelToScene(){
	var mtlLoader = new THREE.MTLLoader();
    mtlLoader.crossOrigin = "anonymous";
    mtlLoader.setPath(rootPath);
    mtlLoader.load(mtlName, function(materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(rootPath);
        objLoader.crossOrigin = "anonymous";
        objLoader.load(objName, function(object) {
            logo = object;
            var child = logo.children[0];
            for (var i = 0; i < child.material.materials.length; i++) {
                var material = child.material.materials[i];
                if (material.name.includes("dsCyan")) {
                    dsCyan = material;
                    if (colorPickerDomElement !== undefined) {
                        colorPickerDomElement.value = "#" + dsCyan.color.getHexString();
                    }
                }
            }
            logo.rotation.x = THREE.Math.degToRad(90);
            scene.add(logo);
        });
    });
}

function animate() {
    requestAnimationFrame(animate);
	
	var delta = clock.getDelta();
	
	if (logo !== undefined && autoRotate) {
        var rotate = THREE.Math.degToRad(delta * autoRotateSpeedDegPerSecond);
        logo.rotateZ(rotate);
    }
	
    render();
}

function render() {
    renderer.render(scene, camera);
}
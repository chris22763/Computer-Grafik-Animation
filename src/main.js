// External Libraries


const DEG_TO_RAD = Math.PI / 180;


function main() {


    scene = new THREE.Scene();

    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    //add models
    
    landscape = addModelFromFile("landscape");
    tabel = addModelFromFile("tabel");
    canon = addModelFromFile("canon");

    scene.add(landscape);
    scene.add(tabel);
    scene.add(canon);

    canon.position.y = 9;
    canon.rotation.y = DEG_TO_RAD * 160;

    //add light
    addLights();

    camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,10000);
    camera.position.set(30, 40, 50);
    camera.lookAt(0,0,0);

    gui = new dat.GUI();
    gui.add(sun_light.position, "x", -1000, 1000).step(5);
    gui.add(sun_light.position, "y", -1000, 1000).step(5);
    gui.add(sun_light.position, "z", -1000, 1000).step(5);

   
	var orbitControls = new THREE.OrbitControls(camera);
    orbitControls.target = new THREE.Vector3(0,0,0);
    orbitControls.update();
    
    gui.domElement.onmouseenter = function() {
        orbitControls.enabled = false;
    }
    gui.domElement.onmouseleave = function() {
        orbitControls.enabled = true;
    }

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x95A1AC));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById("3d_content").appendChild(renderer.domElement);

    var clock = new THREE.Clock();

    function mainLoop() {
        var delta = clock.getDelta();

        TWEEN.update();
        renderer.render(scene, camera);
        requestAnimationFrame(mainLoop);
    }

    mainLoop();

    window.onresize = updateAspectRatio;
    window.onmousemove = calculateMousePosition;
    window.onclick = executeRaycast;
}

window.onload = main();

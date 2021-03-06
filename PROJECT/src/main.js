// External Libraries


const DEG_TO_RAD = Math.PI / 180;


function main() {


    physics = new Physics();
    physics.initialize(0, -100, 0, 1/120, true);
    scene = new THREE.Scene();

    //var axes = new THREE.AxesHelper(20);
    //scene.add(axes);

    //add models
    
    landscape = addModelFromFile("landscape");
    tabel = addModelFromFile("tabel");
    canon = addModelFromFile("canon");

    scene.add(landscape);
    scene.add(tabel);
    scene.add(canon);

    //add light
    addLights();
    x = canon.position.x;
    y = canon.position.y;
    z = canon.position.z;
    camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,10000);
    camera.position.set(10, 20, 10);
    camera.lookAt(0,6,0);

   
	var orbitControls = new THREE.OrbitControls(camera);
    orbitControls.target = new THREE.Vector3(0,6,0);
    orbitControls.update();
   

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x95A1AC));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById("3d_content").appendChild(renderer.domElement);

    var stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom); 
    var clock = new THREE.Clock();

    function mainLoop() {
        stats.begin();

        var delta = clock.getDelta();
        physics.update(delta);
        TWEEN.update();
        renderer.render(scene, camera);

        stats.end();
        requestAnimationFrame(mainLoop);
    }

    mainLoop();

    window.onresize = updateAspectRatio;
    window.onmousemove = calculateMousePosition;
    window.onclick = executeRaycast;
    window.onkeydown = keyDownAction;
    window.onkeyup = keyUpAction;

    window.addEventListener('canonStateChanged', setCanonSound);
    window.dispatchEvent(new Event('canonStateChanged'));
}

window.onload = main();

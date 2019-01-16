function addLights() {  
    var mapScale = 1;
    var ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 1;
    scene.add(ambientLight);

    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(20, 20, 0);
    spotLight.lookAt(0, 0, 0);
    spotLight.intensity = 0.5;
    spotLight.angle = 90 * DEG_TO_RAD;
    spotLight.penumbra = 1;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048 * mapScale;
    spotLight.shadow.mapSize.height = 2048 * mapScale;
    spotLight.target.position.set(-1, 0, 1 );
    scene.add(spotLight);

    var helper = new THREE.CameraHelper( spotLight.shadow.camera );
    scene.add( helper );


    var ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 0.4;
    scene.add(ambientLight);

    var directionaLight = new THREE.DirectionalLight(0xffffff);
    directionaLight.position.set(-30, 200, 100);
    directionaLight.lookAt(scene.position);
    directionaLight.intensity = 0.5;
    directionaLight.castShadow = true;
    directionaLight.shadow.radius = 2;
    directionaLight.shadow.camera.top = 100;
    directionaLight.shadow.camera.bottom = -100;
    directionaLight.shadow.camera.left = -100;
    directionaLight.shadow.camera.right = 100;
    directionaLight.shadow.mapSize.width = 2048 * mapScale;
    directionaLight.shadow.mapSize.height = 2048 * mapScale;
    //scene.add(directionaLight);
    direct_helper = new THREE.CameraHelper(directionaLight.shadow.camera);
    //scene.add(direct_helper); 

    //distaned shadows
    sun_light = new THREE.DirectionalLight(0xffffff);
    sun_light.position.set(210, 100, -505);
    sun_light.lookAt(scene.position);
    sun_light.intensity = 0.5;
    sun_light.castShadow = true;
    sun_light.shadow.radius = 2;
    sun_light.shadow.camera.top = 200;
    sun_light.shadow.camera.bottom = -200;
    sun_light.shadow.camera.left = -200;
    sun_light.shadow.camera.right = 200;
    sun_light.shadow.camera.front = 1000;
    sun_light.shadow.camera.near = 0;
    sun_light.shadow.camera.far = 600;
    sun_light.shadow.mapSize.width = 2048 * 1;
    sun_light.shadow.mapSize.height = 2048 * 1;
    scene.add(sun_light);
    sun_helper = new THREE.CameraHelper(sun_light.shadow.camera);
    scene.add(sun_helper);

    //near shadows
    sun_light2 = new THREE.DirectionalLight(0xffffff);
    sun_light2.position.set(210, 100, -505);
    sun_light2.lookAt(scene.position);
    sun_light2.intensity = 0.5;
    sun_light2.castShadow = true;
    sun_light2.shadow.radius = 2;
    sun_light2.shadow.camera.top = 200;
    sun_light2.shadow.camera.bottom = -200;
    sun_light2.shadow.camera.left = -200;
    sun_light2.shadow.camera.right = 200;
    sun_light2.shadow.camera.front = 1000;
    sun_light2.shadow.camera.near = 480;
    sun_light2.shadow.camera.far = 700;
    sun_light2.shadow.mapSize.width = 2048 * 3;
    sun_light2.shadow.mapSize.height = 2048 * 3;
    scene.add(sun_light2);
    sun_helper2 = new THREE.CameraHelper(sun_light2.shadow.camera);
    scene.add(sun_helper2);
}


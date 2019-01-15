function addLights() {  

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
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.target.position.set(-1, 0, 1 );
    scene.add(spotLight);

    var helper = new THREE.CameraHelper( spotLight.shadow.camera );
    scene.add( helper );
}

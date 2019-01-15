raycaster = new THREE.Raycaster();

function executeRaycast(event) {

    raycaster.setFromCamera(mousePosition, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {

        var firstHit = intersects[0].object;

        console.log(firstHit.name);

        if (firstHit.name === "Pull_Lever_Pivot"){
        	canonState.on = !canonState.on;
        	actionName = "Pull_Lever_Pivot|Pull_Lever_Full";
        	canonAnimationMixer.existingAction(actionName).stop();
        	canonAnimationMixer.existingAction(actionName).play();
        }

    }
}
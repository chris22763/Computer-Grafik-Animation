raycaster = new THREE.Raycaster();

function executeRaycast(event) {

    raycaster.setFromCamera(mousePosition, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {

        var firstHit = intersects[0].object;

        console.log(firstHit.name);
        if (firstHit.name === "Pull_Lever_Pivot"){
        	
        	actionName = "Pull_lever_Pivot|Pull_Lever_Full";
        	clip = THREE.AnimationClip.findByName(canonAni, actionName);
        	var action = mixer.clipAction(clip);
        	console.log(canonAni);

        	action.play();
        }

    }
}
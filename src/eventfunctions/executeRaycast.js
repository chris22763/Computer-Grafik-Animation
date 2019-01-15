raycaster = new THREE.Raycaster();



function executeRaycast(event) {

    raycaster.setFromCamera(mousePosition, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);
	ani_names = {};
	ani_names["Film_Retriever_Open"] = 3; 
	ani_names["Film_Retriever_Close"] = 9; 
	ani_names["Film_Retriever_Rotate"] = 1; 
	ani_names["Pull_Lever_close"] = 6; 
	ani_names["Pull_Lever_Full"] = 7; 
	ani_names["Pull_Lever_Reload"] = 8; 
	ani_names["Trigger_Full_Pressed"] = 5; 
	ani_names["Trigger_Half_Pressed_Down.001"] = 4; 
	ani_names["On_Off_Disarm"] = 0; 
	ani_names["On_Off_Arm"] = 2;


    if (intersects.length > 0) {

        var firstHit = intersects[0].object;
        console.log(firstHit.name);
        var object = scene.getObjectByName(firstHit.name);
        
    	

        if ((firstHit.name === "Pull_Lever_Pivot") || (firstHit.name === "Pull_Lever_Arm")){
        	console.log(firstHit.name);
        	var tween = new TWEEN.Tween(object.rotation)
        		.to({y: DEG_TO_RAD * 130}, 2000)
        		.onComplete(function() {
		            if (Math.abs(object.rotation.y)>=2*Math.PI) {
		                object.rotation.y = object.rotation.y % (2*Math.PI);
		            }
		        })
        		.start();
        }else if (firstHit.name === "On_Off_Lever"){
      		actionName = "On_Off_Arm";
			canon.mixer.existingAction(actionName).play();
        }

        // if(firstHit.name == "test"){
        // 	actionName = "something";
        // 	clip = canonAni[ani_names[actionName]];
        // 	canon.mixer.clipAction(clip).play();
        // }

    }
}
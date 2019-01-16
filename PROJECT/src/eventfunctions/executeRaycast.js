raycaster = new THREE.Raycaster();


function executeRaycast(event) {

    raycaster.setFromCamera(mousePosition, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);
	//ani_names["Film_Retriever_Open"] = 3; 
	//ani_names["Film_Retriever_Close"] = 9; 
	//ani_names["Film_Retriever_Rotate"] = 1; 
	//ani_names["Pull_Lever_close"] = 6;         
	//ani_names["Pull_Lever_Full"] = 7; 
	//ani_names["Pull_Lever_Reload"] = 8; 
	
    //ani_names["Trigger_Full_Pressed"] = 5; 
	//ani_names["Trigger_Half_Pressed_Down.001"] = 4; 
	//ani_names["On_Off_Disarm"] = 0; 
	//ani_names["On_Off_Arm"] = 2;

    mesh = null;
    tweens = {};
    

    if (intersects.length > 0) {

        var firstHit = intersects[0].object;
        console.log(firstHit.name);
        var mesh = scene.getObjectByName(firstHit.name);

        if ((firstHit.name === "Pull_Lever_Pivot") || (firstHit.name === "Pull_lever_Arm")){
            if (firstHit.name === "Pull_Lever_Arm"){
                mesh = scene.getObjectByName("Pull_Lever_Pivot");
            }
            if (canonState.loaded == false){
                canonState.loaded = true;
                pull_full = new TWEEN.Tween(mesh.rotation)
                .to({y: DEG_TO_RAD * 130}, 2000)
                .onComplete(function() {

                    if (Math.abs(mesh.rotation.y)>=2*Math.PI) {
                        mesh.rotation.y = mesh.rotation.y % (2*Math.PI);
                    }
                });
                pull_hold = new TWEEN.Tween(mesh.rotation)
                    .to({y: DEG_TO_RAD * 30}, 1500)
                    .onComplete(function() {
                        if (Math.abs(mesh.rotation.y)>=2*Math.PI) {
                            mesh.rotation.y = mesh.rotation.y % (2*Math.PI);
                        }
                    });
                pull_full.chain(pull_hold);

                pull_full.start();
            }else {
                pull_full = new TWEEN.Tween(mesh.rotation)
                    .to({y: DEG_TO_RAD * 80}, 1000)
                    .onComplete(function() {
                        if (Math.abs(mesh.rotation.y)>=2*Math.PI) {
                            mesh.rotation.y = mesh.rotation.y % (2*Math.PI);
                        }
                    });
                pull_hold = new TWEEN.Tween(mesh.rotation)
                    .to({y: DEG_TO_RAD * 30}, 1000)
                    .onComplete(function() {
                        if (Math.abs(mesh.rotation.y)>=2*Math.PI) {
                            mesh.rotation.y = mesh.rotation.y % (2*Math.PI);
                        }
                    });
                pull_full.chain(pull_hold);

                pull_full.start();
            }
            
        }else if ((firstHit.name === "Trigger_0") || (firstHit.name === "Trigger_1")){
            
            mesh = scene.getObjectByName("Trigger_0");
            mesh.add( scene.getObjectByName("Trigger_1"));
            if (canonState.arm){
                canonState.triggered = true;
                push_down = new TWEEN.Tween(mesh.position)
                    .to({y: -1}, 1000)
                    .onComplete(function(object) {
                        if (Math.abs(mesh.position.y > -1)){
                            mesh.position.y = object.position.y;
                        }
                    });
            
                push_up = new TWEEN.Tween(mesh.position)
                    .to({y: 0}, 1000)
                    .onComplete(function(object) {
                        if (Math.abs(mesh.position.y < 0)){
                            mesh.position.y = object.position.y;
                        }
                    });
                
                push_down.chain(push_up);
                push_down.start();
            }
        
        }else if (firstHit.name === "On_Off_Lever"){
            if (canonState.arm){
                on_Off_Disarm = new TWEEN.Tween(mesh.rotation)
                    .to({y: DEG_TO_RAD * 30}, 1000)
                    .onComplete(function() {
                        if (Math.abs(mesh.rotation.y)>=2*Math.PI) {
                            mesh.rotation.y = mesh.rotation.y % (2*Math.PI);
                        }
                    });                
                lever = scene.getObjectByName("Pull_Lever_Pivot");
                pull_close = new TWEEN.Tween(lever.rotation)
                    .to({y: DEG_TO_RAD * 0}, 1000)
                    .onComplete(function() {
                        if (Math.abs(lever.rotation.y)>=2*Math.PI) {
                            lever.rotation.y = lever.rotation.y % (2*Math.PI);
                        }
                    });
                on_Off_Disarm.chain(pull_close);
                on_Off_Disarm.start();
            }else {
                on_Off_Arm = new TWEEN.Tween(mesh.rotation)
                    .to({y: DEG_TO_RAD * 0}, 1000)
                    .onComplete(function() {
                        if (Math.abs(mesh.rotation.y)>=2*Math.PI) {
                            mesh.rotation.y = mesh.rotation.y % (2*Math.PI);
                        }
                    })
                    .start();
            }
            canonState.arm = !canonState.arm ;
        }else if (firstHit.name === "Film_Retriever_Case"){
            Film_Retriever_Rotate = new TWEEN.Tween(mesh.rotation)
                .to({y: DEG_TO_RAD * 360}, 1000)
                .onComplete(function() {
                    if (Math.abs(mesh.rotation.y)>=2*Math.PI) {
                        mesh.rotation.y = mesh.rotation.y % (2*Math.PI);
                    }
                })
                .start();
        }else if (firstHit.name === "Film_Retriever_Arm"){
            if (canonState.retriever == true){
                Film_Retriever_Open = new TWEEN.Tween(mesh.rotation)
                .to({z: DEG_TO_RAD * 0}, 2000)
                .onComplete(function() {
                    if (Math.abs(mesh.rotation.z)>=2*Math.PI) {
                        mesh.rotation.z = mesh.rotation.z % (2*Math.PI);
                    }
                })
                .start();
            }else {
                Film_Retriever_Open = new TWEEN.Tween(mesh.rotation)
                .to({z: DEG_TO_RAD * -180}, 2000)
                .onComplete(function() {
                    if (Math.abs(mesh.rotation.z)>=2*Math.PI) {
                        mesh.rotation.z = mesh.rotation.z % (2*Math.PI);
                    }
                })
                .start();
            }
            canonState.retriever = !canonState.retriever;
            
        }
        if((firstHit.name === "On_Off_Lever") || (firstHit.name === "Trigger_0") || 
            (firstHit.name === "Trigger_1") || (firstHit.name === "Pull_Lever_Pivot") || 
            (firstHit.name === "Pull_lever_Arm")){
            window.dispatchEvent(new Event('canonStateChanged'));
        }

        // if(firstHit.name == "test"){
        // 	actiooName = "something";
        // 	clip = canonAni[ani_names[actiooName]];
        // 	canon.mixer.clipAction(clip).play();
        // }

    }
}
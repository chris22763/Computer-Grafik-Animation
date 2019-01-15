function addModelFromFile(select){
	var path = ""
	var model = new THREE.Group();
	var fbxloader = new THREE.FBXLoader();
	
	mixer = null;
	canonAni = null;
	model.name = select;

	if (select == "landscape"){
		path = "3d_files/landscape.fbx";

	}
	else if (select == "tabel"){
		path = "3d_files/tabel.fbx";
	}
	else if (select == "canon"){
		path = "3d_files/camera.fbx";
		canonState = {
		    on: false,
		    loaded: false,
		    primed: false,
		    triggered: false,
		};

	}


	fbxloader.load(path, function(object){
		model.add(object);

		model.traverse( function ( child ) {

		    if ( child instanceof THREE.Mesh ) {
		        child.castShadow = true;
	    		child.receiveShadow = true;
		    }
		} );

		mixer = new THREE.AnimationMixer(object);
		for (var i = 0; i < object.animations.length; i++){
			var action = mixer.clipAction(object.animations[i]);
			action.clampWhenFinished = true;
			action.setLoop(THREE.LoopOnce);

			canonAni = canon.children[0].animations;
			//console.log(action);
		}
	});

	model.castShadow = true;
	model.receiveShadow = true;
	console.log(model);
	return model

}
function addModelFromFile(select){
	var path = ""

	var model = new THREE.Group();

	var fbxloader = new THREE.FBXLoader();
	
	animationmixer = null;

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
		animationmixer = new THREE.AnimationMixer(object);
		for (var i = 0; i < object.animations.length; i++){
			var action = animationmixer.clipAction(object.animations[i])
			action.clampWhenFinished = true;
			action.setLoop(THREE.LoopOnce);
			console.log(action._clip.name);
		}
	});

	model.traverse( function ( child ) {

	    if ( child instanceof THREE.Mesh ) {
	        child.castShadow = true;
    		child.receiveShadow = true;
	    	child.shadow.mapSize.height = 1024;
	    	child.shadow.mapSize.width = 1024;
	        child.receiveShadow = true;
	    }
	} );
	return model

}
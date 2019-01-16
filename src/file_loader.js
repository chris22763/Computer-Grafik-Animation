function addModelFromFile(select){
	var path = ""
	var model = new THREE.Group();
	var fbxloader = new THREE.FBXLoader();
	
	mixer = null;	model.name = select;

	if ((select == "landscape") || (select == "tabel")){
		if (select === "tabel"){
			path = "3d_files/tabel.fbx";
		}else {
			path = "3d_files/landscape.fbx";
		}
		
		fbxloader.load(path, function(object){
			model.add(object);
		});

	}else if (select == "canon"){

		path = "3d_files/canon.glb";
		canonState = {
		    on: false,
		    loaded: false,
		    hold: false,
		    primed: false,
		    triggered: false,
		    retriever: false,
		    arm: false,
		};

		var loader = new THREE.GLTFLoader();

		loader.load(
			path,
			function ( gltf ) {
				mesh = gltf.scene.children[0];
				mesh.animations = gltf.animations;


				model.add(mesh);
				model.mixer = new THREE.AnimationMixer(gltf.scene);
		        for (var i = 0; i < gltf.animations.length; i++) {
		            var action = model.mixer.clipAction(gltf.animations[i]);
		            action.clampWhenFinished = true;
		            action.setLoop(THREE.LoopOnce);
		        }
			},
			
		);

		model.scale.x = 0.2;
		model.scale.y = 0.2;
		model.scale.z = 0.2;
		model.position.y = 9;
		model.rotation.y = DEG_TO_RAD * 160;
		console.log(model);

	}

	model.traverse( function ( child ) {
		
		if ( child instanceof THREE.Mesh ) {
	        child.castShadow = true;
    		child.receiveShadow = true;
	    }
	});

	model.castShadow = true;
	model.receiveShadow = true;
	return model

}
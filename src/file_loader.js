function addModelFromFile(select){
	var path = ""
	var model = new THREE.Group();
	var fbxloader = new THREE.FBXLoader();
	
	mixer = null;	model.name = select;

	if (select === "tabel"){
		path = "3d_files/tabel.fbx";

		fbxloader.load(path, function(object){
			object.traverse(function(child) {
			    child.castShadow = true;
			    child.receiveShadow = true;
			    // if (child.geometry != null){
		     //   		physics.addTable(child, 10, 5, 10, 0);
		     //   	}

            });
			model.add(object);

            model.position.y = -3;

		});
	}else if (select === "landscape") {
		path = "3d_files/landscape.glb";
		var loader = new THREE.GLTFLoader();

		loader.load(
			path,
			function( gltf ){
				model.add(gltf.scene.children[0]);
				model.traverse(function(child) {
	            	child.castShadow = true;
	            	child.receiveShadow = true;
	            	// if (child.geometry != null){
	            	// 	physics.addComplex_shape(child, child, 1000);
	            	// }
		        });
			}
		);

		model.scale.x = 100;
		model.scale.y = 100;
		model.scale.z = 100;

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
				model.add(gltf.scene.children[0]);
				model.traverse(function(child) {
	            	child.castShadow = true;
	            	child.receiveShadow = true;

		        });
		    }
		);
			

		model.scale.x = 0.2;
		model.scale.y = 0.2;
		model.scale.z = 0.2;
		model.position.y = 7;
		model.rotation.y = DEG_TO_RAD * 160;

		physics.addBox(model, 4, 2, 0.8, 10);

	}else if (select == "dose"){
		path = "3d_files/dose.glb";
		var loader = new THREE.GLTFLoader();
		var scale = 0.5;
		loader.load(
			path,
			function ( gltf ) {
				console.log(gltf);
				model.add(gltf.scene.children[0]);
				model.traverse(function(child) {
	            	child.castShadow = true;
	            	child.receiveShadow = true;
	            	
		        });
		    }
		);
		model.position.set(camera.position.x, camera.position.y, camera.position.z);
	    var directionalVectorDC = new THREE.Vector3(0,0,1);
        var velocityVectorWC = directionalVectorDC.unproject(camera);
        velocityVectorWC.normalize();
        velocityVectorWC.multiplyScalar(800);
    	physics.addCylinder(model, 1 * scale, 1 * scale, 2 * scale , true, 0.1, velocityVectorWC);
	
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
Physics = function() {
	var world = new CANNON.World();
    var stepSize = 0;
    var timeToGo = 0;
    var visualObjects = [];
    var physicalBodies = [];

    var addPair = function(visualObject, body) {
        visualObjects.push(visualObject);
        physicalBodies.push(body);
    };

    this.initialize = function(gravityX, gravityY, gravityZ, stepsize, addfloor) {

        world.gravity.set(gravityX, gravityY, gravityZ);
        world.broadphase = new CANNON.NaiveBroadphase();
        stepSize = stepsize;

        if (addfloor) {
            var floor = new CANNON.Body({
                shape: new CANNON.Plane(),
                mass: 0
            });
            floor.position.y = 3.8;
            floor.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), -Math.PI / 2);
            world.addBody(floor);
        }
    }

    this.update = function(delta) {
        // Step physics world forward
        timeToGo += delta;
        while (timeToGo >= stepSize) {
            world.step(stepSize);
            timeToGo -= stepSize;
        }
        // Copy transformations
        for (var i = 0; i < visualObjects.length; i++) {
            visualObjects[i].position.copy(physicalBodies[i].position);
            visualObjects[i].quaternion.copy(physicalBodies[i].quaternion);
        }
    }

    this.addComplex_shape = function(mesh, visualObject, weight){
    	points = mesh.vertices;
    	faces = mesh.faces;
    	var body = CANNON.Body({
    		shape : new CANNON.ConvexPolyhedron ( points, faces ),
    		mass : weight
    	});
    	body.position.copy(visualObject.position);
        body.quaternion.copy(visualObject.quaternion);
        world.addBody(body);
        // addPair(visualObject, body);
    }
/*
    this.addCamera = function(visualObject, weight){
    	var body = CANNON.Body({mass: weight});
    	var camera_body = new CANNON.Box(new CANNON.Vec3(20,12,4));
		body.prototype.addShape(camera_body, new CANNON.Vec3(0,0,0), new CANNON.Quaternion());
		var camera_lens = new CANNON.Cylinder(8,8,7,32);
        
        var translation = new CANNON.Vec3(0,0,0);
        if (originAtBottom) {
            translation.y = height / 2;
        }
        var quaternion = new CANNON.Quaternion();
        quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), -Math.PI / 2);
        body.prototype.addShape(camera_lens, translation, quaternion);

        body.position.copy(visualObject.position);
        body.quaternion.copy(visualObject.quaternion);
        world.addBody(body);
        addPair(visualObject, body);
    }
*/
    this.addTable = function(visualObject, dimX, dimY, dimZ, weight) {
        var body = new CANNON.Body({
            shape: new CANNON.Box(new CANNON.Vec3(dimX / 2,dimY / 2,dimZ / 2)),
            mass: weight
        });
        var table_position = visualObject.position;
        table_position.y = 5;
        body.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), -Math.PI / 2);
        world.addBody(body);

    }

    this.addBox = function(visualObject, dimX, dimY, dimZ, weight) {
        var body = new CANNON.Body({
            shape: new CANNON.Box(new CANNON.Vec3(dimX / 2,dimY / 2,dimZ / 2)),
            mass: weight
        });
        body.position.copy(visualObject.position);
        body.quaternion.copy(visualObject.quaternion);
        world.addBody(body);
        addPair(visualObject, body);
    }

    this.addCylinder = function(visualObject, upperRadius, lowerRadius, height, originAtBottom, weight, velocityVector) {

        var shape = new CANNON.Cylinder(upperRadius,lowerRadius,height,32);
        
        var translation = new CANNON.Vec3(0,0,0);
        if (originAtBottom) {
            translation.y = height / 2;
        }
        var quaternion = new CANNON.Quaternion();
        quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), -Math.PI / 2);        
        shape.transformAllPoints(translation, quaternion);

        var body = new CANNON.Body({
            shape: shape,
            mass: weight
        });

        body.position.copy(visualObject.position);
        body.quaternion.copy(visualObject.quaternion);
        body.velocity.set(velocityVector.x, velocityVector.y, velocityVector.z);
        world.addBody(body);
        addPair(visualObject, body);
    }
}

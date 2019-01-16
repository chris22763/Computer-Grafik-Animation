var spaceDown = false;

function keyDownAction(event) {
    switch (event.keyCode) {
    case 32:
        if (!spaceDown) {
            spaceDown = true;
            var dose = addModelFromFile("dose");
            console.log("space");
            
            scene.add(dose);
        }
        break;
    }
}

function keyUpAction(event) {
    switch (event.keyCode) {
    case 32:
        spaceDown = false;
        break;
    }
}

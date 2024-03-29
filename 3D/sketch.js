let walls;
let particle;

let newBoundary;

let dimToggle = 2;

function setup() {
    createCanvas(1000, 800);

    walls = createBoundaries();
    particle = new Particle(475,475);
}

function draw() {
    particle.rayIntersect(walls);
	
	background(0);
	
	// Draw 3D Map
	if (dimToggle == 3) {
        for (let i = 0; i < particle.adjustedFov; ++i) {
            noStroke();
            fill(particle.rays[i].colour.r, particle.rays[i].colour.g, particle.rays[i].colour.b);

            let endPoint = particle.rays[i].getEndPoint();

            let a = endPoint.x - particle.pos.x;
            let b = endPoint.y - particle.pos.y;

            let rayLength = Math.sqrt(a * a + b * b);
            
            if (rayLength != 0) {
                let size = 500 / Math.pow(rayLength,0.35);
                
                rect(i * width / particle.adjustedFov, (height - size) / 2, (width / particle.adjustedFov) + 1, size);
            }
        }
    } else {
		for (let wall of walls) {
			wall.show();
		}
		
		particle.show();
	}

    checkMovePlayer();
}

function getCanvasSize() {
    return createVector(width, height);
}

function mousePressed() {
    newBoundary = createVector(mouseX, mouseY);
}

function mouseReleased() {
    if(mouseX != newBoundary.x && mouseY != newBoundary.y) {
        walls.push(new Boundary(newBoundary.x, newBoundary.y, mouseX, mouseY, {r: 255, g: 255, b: 255}));
    }
}

function checkMovePlayer() {
    if (keyIsDown(LEFT_ARROW)) {
        particle.rotate(1)
    }

    if (keyIsDown(RIGHT_ARROW)) {
        particle.rotate(-1);
    }

    if (keyIsDown(87)) { // W
        particle.move(-1);
    }

    if (keyIsDown(65)) { // A
        particle.move(0);        
    }

    if (keyIsDown(83)) { // S
        particle.move(1);
    }

    if (keyIsDown(68)) { // D
        particle.move(2);
    }    
}

function keyPressed() {
    if (key == 'b') {
        if (walls.length > 4) {
            let boundaryString = "";
        
            for (let i = 4; i < walls.length; ++i) {
                boundaryString += "walls.push(new Boundary(" + walls[i].a.x + ", " + walls[i].a.y + ", " + walls[i].b.x + ", " + walls[i].b.y + "));\n";
            }

            console.log(boundaryString);
        } else {
            console.log("No walls to save");
        }
    }

    if (key == ' ') { 
        dimToggle = (dimToggle == 2) ? 3 : 2;
    }
}
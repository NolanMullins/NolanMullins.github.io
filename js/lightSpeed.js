const CANVAS = document.getElementsByTagName("canvas")[0],
	CTX = CANVAS.getContext("2d"),
	W = window.innerWidth,
	H = window.innerHeight,
	XO = W / 2,
	YO = H / 2,
	NUM_PARTICLES = 400,
	MAX_Z = 2,
	MAX_R = 1,
	PARTICLES = [];

var Z_SPD = 0.1,
	jumping = false;

class Particle {
	constructor(x, y, z) {
		this.pos = new Vector(x, y, z);
		const X_VEL = 0, Y_VEL = 0;
		var Z_VEL = -Z_SPD;
		this.vel = new Vector(X_VEL, Y_VEL, Z_VEL);
		this.vel.scale(0.01);
		this.fill = "rgba(255,255,255,255)";
		this.stroke = this.fill;
	}

	update() {
		this.pos.add(this.vel);
	}

	updateVel() {
		var Z_VEL = -Z_SPD;
		this.vel = new Vector(0, 0, Z_VEL);
		this.vel.scale(0.01);
	}

	render() {
		const PIXEL = to2d(this.pos),
			X = PIXEL[0],
			Y = PIXEL[1],
			R = (MAX_Z - this.pos.z) / MAX_Z * MAX_R;

		if (X < 0 || X > W || Y < 0 || Y > H) this.pos.z = MAX_Z;

		this.update();
		CTX.beginPath();
		CTX.fillStyle = this.fill;
		CTX.strokeStyle = this.stroke;
		CTX.arc(X, PIXEL[1], R, 0, Math.PI * 2);
		CTX.fill();
		CTX.stroke();
		CTX.closePath();
	    // lineWidth:fix
		
	}
}

class Vector {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	add(v) {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
	}
	
	scale(n) {
		this.x *= n;
		this.y *= n;
		this.z *= n;
	}
}

function jump() {
	Z_SPD = 2;
	jumping = true;
	for (let i = 0; i < PARTICLES.length; i++) {
		PARTICLES[i].updateVel();
	}
}

function stop() {
	Z_SPD = 0.1;
	jumping = false;
	for (let i = 0; i < PARTICLES.length; i++) {
		PARTICLES[i].updateVel();
	}
}

function onClick() {
	
	if (jumping)
	{
		stop();
		document.getElementById("jmp").innerHTML = "Jump";
	}
	else
	{
		jump();
		document.getElementById("jmp").innerHTML = "stop";
	}
}


function to2d(v) {
	const X_COORD = v.x - XO,
		Y_COORD = v.y - YO,
		PX = X_COORD / v.z,
		PY = Y_COORD / v.z;
	return [PX + XO, PY + YO];
}

function render() {
	if (!jumping)
		CTX.clearRect(0, 0, 9999, 9999);

	for (let i = 0; i < PARTICLES.length; i++) {
		PARTICLES[i].render();
	}
}

function loop() {
	requestAnimationFrame(loop);
	CTX.fillStyle = "rgba(0,0,0,0.15)";
	CTX.fillRect(0, 0, W, H);
	render();
}

function createParticles() {
	for (let i = 0; i < NUM_PARTICLES; i++) {
		const X = Math.random() * W, Y = Math.random() * H, Z = Math.random() * MAX_Z;
		PARTICLES.push(new Particle(X, Y, Z));
	}
}

function init() {
	CANVAS.width = W;
	CANVAS.height = H;
	createParticles();
	loop();
}
init();
'use strict';

const util = require('util');

const glfw = require('.');
const { Window } = glfw;


const w1 = new Window({ title: 'GLFW Simple Test 1' });
const w2 = new Window({ title: 'GLFW Simple Test 2' });


// testing events
w1.on('keydown', e => console.log(`[#1 keydown] ${util.inspect(e)}`));
w1.on('mousedown', e => console.log(`[#1 mousedown] ${util.inspect(e)}`));
w1.on('mousemove', e => console.log(`[#1 mousemove] ${e.x}, ${e.y}`));
w1.on('mousewheel', e => console.log(`[#1 mousewheel] ${e.position}`));
w1.on('resize', e => console.log(`[#1 resize] ${e.width}, ${e.height}`));

w2.on('keydown', e => console.log(`[#2 keydown] ${util.inspect(e)}`));
w2.on('mousedown', e => console.log(`[#2 mousedown] ${util.inspect(e)}`));
w2.on('mousemove', e => console.log(`[#2 mousemove] ${e.x}, ${e.y}`));
w2.on('mousewheel', e => console.log(`[#2 mousewheel] ${e.position}`));
w2.on('resize', e => console.log(`[#2 resize] ${e.width}, ${e.height}`));

console.log(w1.version);


const draw = () => {
	
	w1.makeCurrent();
	const wsize1 = w1.framebufferSize;
	glfw.testScene(wsize1.width, wsize1.height);
	
	w2.makeCurrent();
	const wsize2 = w2.framebufferSize;
	glfw.testScene(wsize2.width, wsize2.height);
	
	// Swap buffers
	w1.swapBuffers();
	w2.swapBuffers();
	
	glfw.PollEvents();
	
};


const animate = () => {
	
	if ( ! (
		w1.shouldClose || w2.shouldClose ||
		w1.getKey(glfw.KEY_ESCAPE) || w2.getKey(glfw.KEY_ESCAPE)
	) ) {
		
		draw();
		setTimeout(animate, 16);
		
	} else {
		// Close OpenGL window and terminate GLFW
		w1.destroy();
		w2.destroy();
		
		glfw.Terminate();
		
		process.exit(0);
	}
	
};


animate();

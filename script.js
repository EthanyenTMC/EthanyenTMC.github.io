import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { InteractionManager } from "three.interactive";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { GLTFLoader } from  'three/examples/jsm/loaders/GLTFLoader';
import animate from "/animate.js";
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { BoxBufferGeometry, CameraHelper, Vector3, Vector2 } from 'three';
import {drawSquare, updateCanvas} from '/laptopScreen.js';
import { mouseMove } from './laptopScreen';


const renderer = new THREE.WebGLRenderer({
	antialias: true, //maybe replace this with fxaa post processing instead? don't know the difference though
	canvas: document.getElementById("viewport")}
);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 10000 );
document.body.appendChild( renderer.domElement );




const scene = new THREE.Scene();
const projectScene = new THREE.Scene();

var mouse, raycaster;
mouse = new THREE.Vector2();
raycaster = new THREE.Raycaster();

var mousePointer = new THREE.Mesh(
	new THREE.BoxGeometry(0.1,0.1,0.1),
	new THREE.MeshBasicMaterial({color: 0xFF0000})
)
scene.add(mousePointer);

window.addEventListener('pointermove', onMouseMove);
window.addEventListener('click', onClick);


function onMouseMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	
	//controls.target = new THREE.Vector3(-0.92192, 0.723, -0.2706);
	//camera.position.set(-0.4158, 1.0725, 0.83869),
	
	if(lapView){
		mouseMove(calculateLaptopMousePosition());
	}
	//console.log(camera.position);
}


function onClick(event){
	raycaster.setFromCamera(mouse,camera);
	const intersects = raycaster.intersectObjects(scene.children);
	if(intersects.length > 0){
		var temp = intersects[0].object.name;
		const pos = {x: camera.position.x, y: camera.position.y, z: camera.position.z};
		const target = orbitTarget;

		switch(temp){
			case 'red':
				projectView(pos, target);
				controls.enabled = false;
				controls.maxDistance = 999;
				break;
			case 'blue':
				defaultView(pos, target);
				controls.enabled = true;
				controls.maxDistance = 15;
				break;
			case 'green':
				controls.enabled = false; // MAKE SURE TO CHANGE THIS LATER BECAUSE YOU WILL FORGET
				laptopView(pos, target);

				break;
			case 'laptopScreen':
				//console.log(intersects[0].point);
				//mousePointer.position.set(intersects[0].point.x, intersects[0].point.y, intersects[0].point.z);
				drawSquare(calculateLaptopMousePosition());
				break;
		}

		/*if(temp === "red"){
			projectView(pos, target);
			controls.enabled = false;
			controls.maxDistance = 999;
		}else if(temp === "blue"){
			defaultView(pos, target);
			controls.enabled = true;
			controls.maxDistance = 15;
			
		}else if (temp === "green"){
			controls.enabled = false; // MAKE SURE TO CHANGE THIS LATER BECAUSE YOU WILL FORGET
			laptopView(pos, target);
			
		}*/
	}
}



//const renderTarget = new THREE.WebGLRenderTarget( 512, 512, { format: THREE.RGBFormat } );
/*
var planelikeGeometry = new THREE.BoxGeometry( 5, 5, 0.1 );
var plane = new THREE.Mesh( planelikeGeometry, new THREE.MeshBasicMaterial( { map: renderTarget } ) );
plane.position.set(0,0,-5);
scene.add(plane);*/


const interactionManager = new InteractionManager(
	renderer,
	camera,
	renderer.domElement
  );




renderer.setClearColor (0x010101);
var light = new THREE.AmbientLight(0xFFFFFF, 10);
scene.add(light);
var light2 = new THREE.AmbientLight(0xFFFFFF, 1);
projectScene.add(light2);

//var loader = new GLTFLoader();

let table;
new GLTFLoader().load(
	// resource URL
	'/3dmodels/table.glb',
	// called when the resource is loaded
	function ( gltf ) {
		table = gltf.scene;
		table.position.set(0,0,0);
		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened ETHAN HERE' + error);

	}
);
	

let chair;
new GLTFLoader().load(
	// resource URL
	'/3dmodels/chair.glb',
	// called when the resource is loaded
	function ( gltf ) {
		chair = gltf.scene;
		chair.position.set(0,0,1);
		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object


	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened:' + error);

	}
);


var numCodingProjects = 1;
let coding1;

new GLTFLoader().load(
	// resource URL
	'/3dmodels/Projects/coding1.glb',
	// called when the resource is loaded
	function ( gltf ) {
		coding1 = gltf.scene;
		coding1.position.set(-1.5, 1, -5);
		projectScene.add( coding1 );
		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object
	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened:' + error);
	}
);
/*
for(var i = 0; i < numCodingProjects; i++){
	
}*/



function createCube({ color, x, y, z }) {
	const geometry = new THREE.BoxGeometry();
	const material = new THREE.MeshLambertMaterial({ color });
	const cube = new THREE.Mesh(geometry, material);
	cube.position.set(x, y, z);
  
	return cube;
  }

const buttons = {
	red: createCube({color: 0xFF0000, x:1,y: 1, z:4}),
	blue: createCube({color: 0x0000FF, x:1,y: 1, z:5}),
	green: createCube({color: 0x00FF00,x:1,y:1,z:6})
};



const projects = {
	first: createCube({color: 0xFFFFFF, x:1.5, y:0.75, z:-10}),
	second: createCube({color: 0xFFFFFF, x:-1.5, y:0.75, z:-20}),
}
/*
for(const[name,object] of Object.entries(projects)){
	projectScene.add(object);
}*/

const orbitTarget = {x: 0, y: 1.5, z:0.545};

var projView = false;
var lapView = false;

function projectView(pos, target){
	projView = true;
	new TWEEN.Tween(target)
	.to({x:0, y:2, z:-15}) //{x:-3, y:1, z:4}
	.easing(TWEEN.Easing.Quadratic.Out)
	.onUpdate(() =>
		controls.target = new THREE.Vector3(orbitTarget.x, orbitTarget.y, orbitTarget.z)
	)
	.start();
	new TWEEN.Tween(pos)
	.to({x:0, y:1.95, z:3}) // {x:5.6, y:3, z:9.3}
	.easing(TWEEN.Easing.Quadratic.Out)
	.onUpdate(() =>
		camera.position.set(pos.x,pos.y,pos.z)
	)
	.start();
	if(chair){
		let chairPos = chair.position;
	new TWEEN.Tween(chairPos)
	.to({x:1.5, y:0, z:1})
	.easing(TWEEN.Easing.Quadratic.Out)
	.onUpdate(() =>
		chair.position.set(chairPos.x,chairPos.y,chairPos.z)
	)
	.start();
	}

	let chairRot = chair.rotation;
	new TWEEN.Tween(chairRot)
	.to({x:0, y:2, z:0})
	.easing(TWEEN.Easing.Quadratic.Out)
	.onUpdate(() =>
		chair.rotation.set(chairRot.x, chairRot.y, chairRot.z)
	)
	.start();
}

function defaultView(pos, target){
	projView = false;
	lapView = false;
	new TWEEN.Tween(target)
	.to({x:0, y:1.5, z:0})
	.easing(TWEEN.Easing.Quadratic.Out)
	.onUpdate(() =>
		controls.target = new THREE.Vector3(orbitTarget.x, orbitTarget.y, orbitTarget.z)
	)
	.start();
	new TWEEN.Tween(pos)
	.to({x:6, y:5.5, z:6})
	.easing(TWEEN.Easing.Quadratic.Out)
	.onUpdate(() =>
		camera.position.set(pos.x,pos.y,pos.z)
	)
	.start();

	if(chair){
		let chairPos = chair.position;
	new TWEEN.Tween(chairPos)
	.to({x:0, y:0, z:0.5})
	.easing(TWEEN.Easing.Quadratic.Out)
	.onUpdate(() =>
		chair.position.set(chairPos.x,chairPos.y,chairPos.z)
	)
	.start();

	let chairRot = chair.rotation;
	new TWEEN.Tween(chairRot)
	.to({x:0, y:0, z:0})
	.easing(TWEEN.Easing.Quadratic.Out)
	.onUpdate(() =>
		chair.rotation.set(chairRot.x, chairRot.y, chairRot.z)
	)
	.start();

	}
}


function laptopView(pos, target){
	projView = false;
	lapView = true;
	
	new TWEEN.Tween(target)
	.to({x:-0.92052, y:1.7232, z:0.022561}) //{x:-3, y:1, z:4}
	.easing(TWEEN.Easing.Quadratic.Out)
	.onUpdate(() =>
		controls.target = new THREE.Vector3(target.x, target.y, target.z),
		controls.update()
	)
	.start();

	new TWEEN.Tween(pos)
	.to(laptopCameraPos) // {x:5.6, y:3, z:9.3}
	.easing(TWEEN.Easing.Quadratic.Out)
	.onUpdate(() =>
		camera.position.set(pos.x,pos.y,pos.z),
		controls.update()
	)
	.start();

	//camera.position.set(-0.4158,0.0725, -0.74869),
	controls.update()
}



for(const[name, object] of Object.entries(buttons)){
	object.name = name;
	scene.add(object);
}


const geoFloor = new THREE.BoxGeometry( 2000, 0, 2000 );
				const matStdFloor = new THREE.MeshStandardMaterial( { color: 0x000000, roughness: 0.1, metalness: 0 } );
				const mshStdFloor = new THREE.Mesh( geoFloor, matStdFloor );
				mshStdFloor.position.set(0,-0.1,0);
				mshStdFloor.renderOrder = -1;
				scene.add( mshStdFloor );


const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 1000, 100 );
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

//scene.add( spotLight );

const width = 0.85;
const height = 0.53;
const intensity = 30;
const rectLight = new THREE.RectAreaLight( 0x7EDFFF, intensity,  width, height );
rectLight.position.set( 0,1.961,0 );
rectLight.lookAt( 0, 1.961, 1 );
scene.add( rectLight )

const rectLightHelper = new RectAreaLightHelper( rectLight );
//rectLight.add( rectLightHelper );






// THE CAMERA CONTROL STUFF ############################################################################################################################
var controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;
//controls.minDistance = 4;
controls.maxDistance = 999;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.65;
controls.target = new THREE.Vector3(orbitTarget.x, orbitTarget.y, orbitTarget.z);
controls.enableDamping = true;
/*const geometry = new THREE.BoxGeometry();
			const material = new THREE.MeshBasicMaterial( { color: 0xFFFB00 } );
			const cube = new THREE.Mesh( geometry, material );
			scene.add( cube );*/

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 6.545, 5.5, 6.545 );
controls.update();

window.addEventListener( 'resize', onWindowResize );
//window.addEventListener( 'scroll', updateCamera);
let lastKnownScrollPosition = 0;
let ticking = false;

window.addEventListener('scroll', function(e) {
  
	if (!ticking) {
	  window.requestAnimationFrame(function() {
		updateCamera();
		ticking = false;
	  });
  
	  ticking = true;
	}
	lastKnownScrollPosition = window.scrollY;
  });


function onWindowResize(width, height) {

	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = ( window.innerWidth / window.innerHeight );
	camera.updateProjectionMatrix();
	recalculateLaptopDistance();
	//resizePortal();
	
}

function resizeWindow(width, height){
	renderer.setSize( width, height );
	camera.aspect = ( width / height );
	camera.updateProjectionMatrix();
}

function resizePortal(){
	var aspect = camera.aspect;
	var portalWidth,portalHeight;
	//scene.remove(portal);
	
	if(aspect > (16/9)){
		portalWidth = 0.942;
		portalHeight = 0.942/aspect;
	}else{
		portalWidth = 0.53*aspect;
		portalHeight = 0.53;
	}
	portal.scale.set(portalWidth/0.942, portalHeight/0.53, 1);
}//just take the regular 

var laptopCameraPos = new THREE.Vector3(-0.6549889818652388, 1.889011900159804, 0.4124323790132744);
var laptopScreenPos = new THREE.Vector3(-0.92052, 1.7232, 0.022561);
var laptopCameraDirection = laptopCameraPos.clone().sub(laptopScreenPos);
recalculateLaptopDistance();
function recalculateLaptopDistance(){
	var aspect = camera.aspect;
	//point 1 x:-0.92052, y:1.7232, z:0.022561 laptop
	//point 2 x:-0.6549889818652388, y:1.889011900159804, z:0.4124323790132744 camera
	//(0.261/0.174)
	var factor = Math.max((0.261/0.174)/aspect, 1);
	var offset = laptopCameraDirection.clone();
	offset.multiplyScalar(factor);
	laptopCameraPos = laptopScreenPos.clone();
	

	/*
	if(aspect > (0.261/0.174)){
		laptopCameraPos.add(offset);
	}else{
		laptopCameraPos.add(offset);
	}*/
	laptopCameraPos.add(offset);
	if(lapView){
		camera.position.set(laptopCameraPos.x, laptopCameraPos.y, laptopCameraPos.z);

	}
}

var laptopVectorX = new THREE.Vector3(Math.cos(0.5846853), 0, -Math.sin(0.5846853)).normalize();
var laptopVectorY = new THREE.Vector3().crossVectors(laptopVectorX, laptopCameraDirection).normalize();
var screenMaxX = 0.262;
var screenMaxY = 0.174;

function calculateLaptopMousePosition(){
	raycaster.setFromCamera(mouse,camera);
	const intersect = raycaster.intersectObject(laptopScreen);
	if(intersect[0]){

		var relativePos = new THREE.Vector3().subVectors(intersect[0].point, laptopScreenPos);
		return new THREE.Vector2((relativePos.dot(laptopVectorX)+screenMaxX)/(2*screenMaxX), (relativePos.dot(laptopVectorY)+screenMaxY)/(2*screenMaxY));
	}else{
		return null;
	}
	
}
/*
function processLaptopClick(pointPos){
	var relativePos = new THREE.Vector3().subVectors(pointPos, laptopScreenPos);
	var clickPos = new THREE.Vector2((relativePos.dot(laptopVectorX)+screenMaxX)/(2*screenMaxX), (relativePos.dot(laptopVectorY)+screenMaxY)/(2*screenMaxY));
	
	drawSquare(clickPos);
	//console.log(clickPos);

}*/

function updateCamera(){
	if(projView){
		var pos = camera.position;
		var tweenTarget = -(window.scrollY/175 - 3);
		
		
		

		
		new TWEEN.Tween(pos)
		.to({x:0, y:1.95, z:tweenTarget})
		.easing(TWEEN.Easing.Quadratic.Out)
		.onUpdate(() =>
		camera.position.set(0,1.95,pos.z),
		camera.target = new Vector3(0,1.95,pos.z-1)
	)
	.start();
		//console.log(window.scrollY);
	}
}

/*function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );
	TWEEN.update(time);
}*/

const canvas = document.getElementById("aboutMe");


var laptopMat = new THREE.MeshBasicMaterial();
laptopMat.wrapS = THREE.MirroredRepeatWrapping;
laptopMat.wrapT = THREE.MirroredRepeatWrapping;
laptopMat.map = new THREE.CanvasTexture(canvas);
laptopMat.map.needsUpdate = true;
var lsWidth = 0.35;
var laptopScreen = new THREE.Mesh(
	new THREE.BoxGeometry(lsWidth*1.5, lsWidth, 0.007),
	laptopMat
);
laptopScreenPos.addScaledVector(laptopCameraDirection, 0.006);
laptopScreenPos.y += 0.01;
laptopScreen.position.set(laptopScreenPos.x, laptopScreenPos.y, laptopScreenPos.z);
laptopScreen.rotation.set(0, 0, 0); //(5.773, -0.58, 0)
laptopScreen.rotateOnAxis(new THREE.Vector3(0,1,0), 0.5846853);
laptopScreen.rotateOnAxis(new THREE.Vector3(1,0,0), -0.331613);
laptopScreen.name = 'laptopScreen';
scene.add(laptopScreen);




var bufferTexture = new THREE.WebGLRenderTarget( 1920, 1080, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter});

var projectCameraTexture = new THREE.WebGLRenderTarget( 1920, 1080, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter});

var bufferScene = new THREE.Scene();
var virtualScreen = new THREE.Mesh(
	new THREE.PlaneGeometry(1920, 1080),
	new THREE.MeshBasicMaterial({ map: bufferTexture.texture})
);
virtualScreen.position.z = 0;
bufferScene.add(virtualScreen);

const virtualCamera = new THREE.OrthographicCamera( 1920 / - 2, 1920 / 2, 1080 / 2, 1080 / - 2, - 10000, 10000 );
virtualCamera.position.z = 0; //117 big small
virtualCamera.position.y = 0;

var portalMat = new THREE.MeshBasicMaterial({
	//color: 0xFF00FF
	map:projectCameraTexture.texture
});
portalMat.wrapS = THREE.MirroredRepeatWrapping;
portalMat.wrapT = THREE.MirroredRepeatWrapping;


var portal = new THREE.Mesh(
	new THREE.BoxGeometry(0.942,0.53,0.01),
	portalMat
);
portal.position.set(0,1.961,-0.045);
scene.add(portal);
//resizePortal();



animate((time) => {
	if(projView){
		if(camera.position.z <= 0.550){
			renderer.setRenderTarget(null);
			renderer.clear();
			renderer.render(projectScene, camera);
		}else{
			renderDefault();
		}
	}else{
		renderDefault();
		//renderer.render(scene, testCamera);

	}
	
	//composer.render(time);
	interactionManager.update();
	TWEEN.update(time);
	controls.update();
	
	updateCanvas(time);
	if(lapView){
		laptopMat.map.needsUpdate = true;
	}
	//console.log(camera.position);
  });

renderer.autoClear = false;
renderer.autoClearStencil = false;

/*
const testCamera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 10000 );
testCamera.position.set(0,0,0.5);
const cameraHelper = new THREE.CameraHelper(testCamera);
scene.add(cameraHelper);
testCamera
const testCube = new THREE.Mesh(
	new THREE.BoxGeometry(0.01,0.01,0.01),
	new THREE.MeshBasicMaterial({color: 0xFF0000})
);
testCube.add(testCamera);
testCube.position.set(-0.92052, 1.7232, 0.022561);
testCube.rotation.set(2.7394687939303,2.58173919262736,3.3594);
scene.add(testCube);

const gui = new GUI();
const laptopCam = gui.addFolder('laptopCam');
laptopCam.add(testCube.rotation, 'x', 0, 2*Math.PI);

laptopCam.add(testCube.rotation, 'y', 2.5, 2.64522101432261);
laptopCam.add(testCube.rotation, 'z', 3.3, 3.5);

laptopCam.add(testCamera.position, 'z' ,0, 1);

laptopCam.open();
var camPos = new THREE.Vector3();
testCamera.getWorldPosition(camPos);
console.log(camPos);
*/
function renderDefault(){
	resizeWindow(1920,1080);
	renderer.setRenderTarget(bufferTexture);
	renderer.clear();
	renderer.render(projectScene, camera);

	renderer.setRenderTarget(projectCameraTexture);
	renderer.clear();
	renderer.render(bufferScene,virtualCamera);

	resizeWindow(window.innerWidth, window.innerHeight);
	renderer.setRenderTarget(null);
	renderer.clear();
	renderer.render(scene,camera);
}
animate();
controls.enabled = false;
laptopView({x: camera.position.x, y: camera.position.y, z: camera.position.z}, orbitTarget);
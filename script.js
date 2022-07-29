import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { InteractionManager } from "three.interactive";
import { GLTFLoader } from  'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import animate from "/animate.js";
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { BoxBufferGeometry, CameraHelper, Vector3, Vector2, SpotLightHelper, Object3D } from 'three';
import {drawSquare, updateCanvas} from '/laptopScreen.js';
import { mouseMove, onCanvasClick } from './laptopScreen';
import { loadModel } from './utils.js';


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
	}else if(projView){

	}else{
		/*
		raycaster.setFromCamera(mouse, camera);
		const intersect = raycaster.intersectObject(projectButton);
		if(intersect[0]){
			projectButton.lookAt(camera.position);
		}*/
	}
	//console.log(camera.position);
}

export function getCameraPos(){
	return camera.position;
}

export function getCameraTarget(){
	return controls.target;
}


function onClick(event){
	var temp;
	raycaster.setFromCamera(mouse,camera);
	const intersects = raycaster.intersectObjects(scene.children);
	if(intersects.length == 0){
		if(!lapView && !projView){
			defaultView(getCameraPos(), getCameraTarget());
		}
	}else{
		for(var i = 0; i < intersects.length; i++){
			intersects[i].object.traverse( function (child){
				temp = child.name.substring(0,5);
				console.log(temp);
			});
			switch(temp){
				case 'projt':
					projectView(camera.position, orbitTarget);
					controls.enabled = false;
					controls.maxDistance = 999;
					break;
				case 'about':
					controls.enabled = false; // MAKE SURE TO CHANGE THIS LATER BECAUSE YOU WILL FORGET
					laptopView(camera.position, orbitTarget);
	
					break;
				case 'lptpS':
					//console.log(intersects[0].point);
					//mousePointer.position.set(intersects[0].point.x, intersects[0].point.y, intersects[0].point.z);
					onCanvasClick(calculateLaptopMousePosition());
					break;
				default:
					if(!lapView && !projView){
						defaultView(camera.position, orbitTarget);
					}
					break;
		}
		}
	}
	
	
	/*
	if(intersects[0]){
		var temp = intersects[0].object.name;
		console.log(temp);
		const pos = {x: camera.position.x, y: camera.position.y, z: camera.position.z};
		const target = orbitTarget;

		switch(temp){
			case 'red':
				projectView(pos, target);
				controls.enabled = false;
				controls.maxDistance = 999;
				break;
			case aboutButton:
				controls.enabled = false; // MAKE SURE TO CHANGE THIS LATER BECAUSE YOU WILL FORGET
				laptopView(pos, target);

				break;
			case laptopScreen:
				//console.log(intersects[0].point);
				//mousePointer.position.set(intersects[0].point.x, intersects[0].point.y, intersects[0].point.z);
				onCanvasClick(calculateLaptopMousePosition());
				break;
			default:
				if(!lapView && !projView){
					defaultView(getCameraPos(), getCameraTarget());
				}
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
			
		}
	}else{
		if(!lapView && !projView){
			defaultView(getCameraPos(), getCameraTarget());
		}
	}*/
}



//const renderTarget = new THREE.WebGLRenderTarget( 512, 512, { format: THREE.RGBFormat } );
/*
var planelikeGeometry = new THREE.BoxGeometry( 5, 5, 0.1 );
var plane = new THREE.Mesh( planelikeGeometry, new THREE.MeshBasicMaterial( { map: renderTarget } ) );
plane.position.set(0,0,-5);
scene.add(plane);*/




renderer.setClearColor (0x000000);
var light = new THREE.AmbientLight(0xFFFFFF, 0.1);
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
		table.name = "table";
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

let projectButton;
new GLTFLoader().load(
	// resource URL
	'/3dmodels/projectButton.glb',
	// called when the resource is loaded
	function ( gltf ) {
		projectButton = gltf.scene;
		projectButton.position.set(-1.05*camera.aspect/(16/9),1.5,1.2);
		projectButton.scale.x = 0.3;
		projectButton.scale.y = 0.3;
		projectButton.scale.z = 0.3;
		projectButton.name = 'projects';
		gltf.asset.name = 'projects';
		scene.add( projectButton );

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
if(projectButton){
	
console.log(projectButton.name);
}
const projButtonLight = new THREE.RectAreaLight( 0x7EDFFF, 1,  1.2, 0.2 );
projButtonLight.position.set( -1.2,1.5,1.3 );
projButtonLight.lookAt( -1.2,1.5,1.2 );
scene.add( projButtonLight )

const projButtonLightHelper = new RectAreaLightHelper( projButtonLight );
//projButtonLight.add( projButtonLightHelper );

let aboutButton;
new GLTFLoader().load(
	// resource URL
	'/3dmodels/aboutButton.glb',
	// called when the resource is loaded
	function ( gltf ) {
		aboutButton = gltf.scene;
		aboutButton.position.set(1*camera.aspect/(16/9),1.5,1.2);
		aboutButton.scale.x = 0.3;
		aboutButton.scale.y = 0.3;
		aboutButton.scale.z = 0.3;
		scene.add( aboutButton );

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
const aboutButtonLight = new THREE.RectAreaLight( 0x7EDFFF, 1,  1.2, 0.2 );
aboutButtonLight.position.set( 1.2,1.5,1.3 );
aboutButtonLight.lookAt( 1.2,1.5,1.2 );
scene.add( aboutButtonLight )


let title;
new GLTFLoader().load(
	// resource URL
	'/3dmodels/name title.glb',
	// called when the resource is loaded
	function ( gltf ) {
		title = gltf.scene;
		title.position.set(0,3,-3);
		recalculateTitleDist(camera.aspect);
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

const opacityCube = createCube({color: 0xFFFFFF, x:0,y:0,z:0});
opacityCube.material.transparent = true;
opacityCube.material.opacity = 1;
opacityCube.name = 'pee';
scene.add(opacityCube);

const buttons = {
	red: createCube({color: 0xFF0000, x:1,y: 1, z:4}),
	blue: createCube({color: 0x0000FF, x:1,y: 1, z:5}),
	green: createCube({color: 0x00FF00,x:1,y:1,z:6})
};

const clickable = {
	laptopScreen,
	projectButton, 
	aboutButton
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
	controls.enabled = false;
	new TWEEN.Tween(target)
	.to({x:0, y:2, z:-15}) //{x:-3, y:1, z:4}
	.easing(TWEEN.Easing.Sinusoidal.Out)
	.onUpdate(() =>
		controls.target = new THREE.Vector3(orbitTarget.x, orbitTarget.y, orbitTarget.z)
	)
	.start();
	new TWEEN.Tween(pos)
	.to({x:0, y:1.95, z:4}) // {x:5.6, y:3, z:9.3}
	.easing(TWEEN.Easing.Sinusoidal.Out)
	.onUpdate(() =>
		camera.position.set(pos.x,pos.y,pos.z)
	)
	.start();
}

 var defaultTween;


export function defaultView(pos, target){
	controls.enabled = true;
	controls.maxDistance = 15;
	projView = false;
	lapView = false;
	new TWEEN.Tween(target)
	.to({x:0, y:2, z:0})
	.easing(TWEEN.Easing.Circular.Out)
	.onUpdate(() =>
		controls.target = new THREE.Vector3(target.x, target.y, target.z)
	)
	.start();
	defaultTween = new TWEEN.Tween(pos)
	.to({x:0, y:2.50, z:3.3}) //6, 5.5, 6
	.easing(TWEEN.Easing.Circular.Out)
	.onUpdate(() =>
		camera.position.set(pos.x,pos.y,pos.z)
	)
	.start();

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
				mshStdFloor.name = 'floor';
/*
const spotLight = new THREE.SpotLight( 0xffffff );

spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 0.1;
spotLight.shadow.camera.far = 99;
spotLight.shadow.camera.fov = 30;



const lightTarget = new THREE.Object3D();
scene.add(lightTarget);
spotLight.target = lightTarget;
spotLight.target.position.set(0,2,3);
spotLight.position.set(0,1.5,-3);

spotLight.target = new THREE.Object3D();
spotLight.target.position.set(0,2,3);
spotLight.position.set(0,1.5,-3);
scene.add(spotLight.target);
console.log(spotLight.target.position);

scene.add( spotLight );
/*
spotLight.position.set( 0, 5, 0 );
const testCube = new THREE.Mesh(
	new THREE.BoxGeometry(0.01,0.01,0.01),
	new THREE.MeshBasicMaterial({color: 0xFF0000, opacity: 0})
);
testCube.add(spotLight);
testCube.position.set(0,1.75,0);
testCube.rotateOnAxis(new Vector3(1,0,0), -Math.PI/3);
scene.add(testCube);
*/

const testObjectBack = new THREE.Object3D();
var spotLightBack = new THREE.SpotLight();
spotLightBack.power = 1;
spotLightBack.castShadow = true;
spotLightBack.position.set(0,3,0);
testObjectBack.add(spotLightBack);
scene.add(testObjectBack);
testObjectBack.position.set(0,1.75,0);
testObjectBack.rotateOnAxis(new Vector3(1,0,0), -3*Math.PI/8);
var lightHelperBack = new SpotLightHelper(spotLightBack);
scene.add(lightHelperBack);

const testObjectLeft = new THREE.Object3D();
var spotLightLeft = new THREE.SpotLight(0x17c0ec);
spotLightLeft.power = 2.5;
spotLightLeft.position.set(-5.1,0,0);
testObjectLeft.add(spotLightLeft);
scene.add(testObjectLeft);
testObjectLeft.position.set(0,1,0);
testObjectLeft.rotateOnAxis(new Vector3(0,0,1), -Math.PI/6);
var lightHelperLeft = new SpotLightHelper(spotLightLeft);
//scene.add(lightHelperLeft);

const testObjectRight = new THREE.Object3D();
var spotLightRight = new THREE.SpotLight(0xc228ec);
spotLightRight.power = 2.5;
spotLightRight.position.set(5.1,0,0);
testObjectRight.add(spotLightRight);
scene.add(testObjectRight);
testObjectRight.position.set(0,1,0);
testObjectRight.rotateOnAxis(new Vector3(0,0,-1), -Math.PI/6);
var lightHelperRight = new SpotLightHelper(spotLightRight);
//scene.add(lightHelperRight);







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
controls.rotateSpeed = 0.1;
//controls.minDistance = 4;
controls.maxDistance = 999;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.65;
//controls.target = new THREE.Vector3(orbitTarget.x, orbitTarget.y, orbitTarget.z);
controls.enableDamping = true;
/*const geometry = new THREE.BoxGeometry();
			const material = new THREE.MeshBasicMaterial( { color: 0xFFFB00 } );
			const cube = new THREE.Mesh( geometry, material );
			scene.add( cube );*/

//controls.update() must be called after any manual changes to the camera's transform
//camera.position.set( 6.545, 5.5, 6.545 );
defaultView(getCameraPos(), getCameraTarget());
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
	recalculateTitleDist(camera.aspect);
	recalculateButtonDist(camera.aspect);
	//resizePortal();
	
}

function resizeWindow(width, height){
	renderer.setSize( width, height );
	camera.aspect = ( width / height );
	camera.updateProjectionMatrix();
}

function recalculateTitleDist(aspect){
	var factor = Math.min(aspect/(16/9)*1.5, 1);
	//var factor = aspect/(16/9)*1.5;
	title.scale.x = factor;
	title.scale.y = factor;
	console.log(title.scale);
}
if(projectButton && aboutButton){
	
recalculateButtonDist(camera.aspect);
console.log("recalculated");
}
function recalculateButtonDist(aspect){
	//var factor = Math.max(aspect/(16/9)*1.5, 1);
	var factor = aspect/(16/9);
	aboutButton.position.set(1*factor,1.5,1.2);
	projectButton.position.set(-1.1*factor,1.5,1.2);
	
}


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
		
		var tweenTarget = -(window.scrollY/175 - 4);
		console.log(-(window.scrollY/175 - 4));
		console.log(camera.position.z);
		
		

		
		new TWEEN.Tween(pos)
		.to({x:0, y:1.95, z:tweenTarget})
		.easing(TWEEN.Easing.Quadratic.In)
		.onUpdate(() =>
		camera.position.set(0,1.95,pos.z),
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

var laptopScreen = new THREE.Mesh(
	new THREE.BoxGeometry(0.5235, 0.345, 0.002),
	laptopMat
);
laptopScreenPos.addScaledVector(laptopCameraDirection, 0.002);
laptopScreenPos.addScaledVector(laptopVectorY, -0.009);
laptopScreenPos.addScaledVector(laptopVectorX, -0.0005);
laptopScreen.position.set(laptopScreenPos.x, laptopScreenPos.y, laptopScreenPos.z);
laptopScreen.rotation.set(0, 0, 0); //(5.773, -0.58, 0)
laptopScreen.rotateOnAxis(new THREE.Vector3(0,1,0), 0.5846853);
laptopScreen.rotateOnAxis(new THREE.Vector3(1,0,0), -0.331613);
laptopScreen.name = 'lptpS';
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
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { InteractionManager } from "three.interactive";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { GLTFLoader } from  'three/examples/jsm/loaders/GLTFLoader';
import animate from "/animate.js";
import { BoxBufferGeometry, CameraHelper, Vector3 } from 'three';



const renderer = new THREE.WebGLRenderer({
	antialias: true, //maybe replace this with fxaa post processing instead? don't know the difference though
	canvas: document.getElementById("viewport")}
);
renderer.setSize( window.innerWidth, window.innerHeight );
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 10000 );
document.body.appendChild( renderer.domElement );




const scene = new THREE.Scene();
const projectScene = new THREE.Scene();


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

var loader = new GLTFLoader();

let table;
loader.load(
	// resource URL
	'/3dmodels/table.glb',
	// called when the resource is loaded
	function ( gltf ) {
		table = gltf.scene;
		table.position.set(0,-1,0.045);
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

		console.log( 'An error happened' + error);

	}
);
	

let chair;
loader.load(
	// resource URL
	'/3dmodels/chair.glb',
	// called when the resource is loaded
	function ( gltf ) {
		chair = gltf.scene;
		chair.position.set(0,-1,1.045);
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





function createCube({ color, x, y, z }) {
	const geometry = new THREE.BoxGeometry();
	const material = new THREE.MeshLambertMaterial({ color });
	const cube = new THREE.Mesh(geometry, material);
	cube.position.set(x, y, z);
  
	return cube;
  }

const buttons = {
	red: createCube({color: 0xFF0000, x:1,y: 0, z:4}),
	blue: createCube({color: 0x0000FF, x:1,y: 0, z:5})
};

const projects = {
	first: createCube({color: 0xFFFFFF, x:1.5, y:0.75, z:-10}),
	second: createCube({color: 0xFFFFFF, x:-1.5, y:0.75, z:-20}),
}

for(const[name,object] of Object.entries(projects)){
	projectScene.add(object);
}

const orbitTarget = {x: 0, y: 0.5, z:0.545};

var projView = false;

function projectView(pos, target){
	projView = true;
	new TWEEN.Tween(target)
	.to({x:0, y:1, z:-50}) //{x:-3, y:1, z:4}
	.easing(TWEEN.Easing.Quadratic.Out)
	.onUpdate(() =>
		controls.target = new THREE.Vector3(orbitTarget.x, orbitTarget.y, orbitTarget.z)
	)
	.start();
	new TWEEN.Tween(pos)
	.to({x:0, y:0.95, z:3}) // {x:5.6, y:3, z:9.3}
	.easing(TWEEN.Easing.Quadratic.Out)
	.onUpdate(() =>
		camera.position.set(pos.x,pos.y,pos.z)
	)
	.start();
	if(chair){
		let chairPos = chair.position;
	new TWEEN.Tween(chairPos)
	.to({x:1.5, y:-1, z:1})
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
	new TWEEN.Tween(target)
	.to({x:0, y:0.5, z:0})
	.easing(TWEEN.Easing.Quadratic.Out)
	.onUpdate(() =>
		controls.target = new THREE.Vector3(orbitTarget.x, orbitTarget.y, orbitTarget.z)
	)
	.start();
	new TWEEN.Tween(pos)
	.to({x:6, y:4.5, z:6})
	.easing(TWEEN.Easing.Quadratic.Out)
	.onUpdate(() =>
		camera.position.set(pos.x,pos.y,pos.z)
	)
	.start();

	if(chair){
		let chairPos = chair.position;
	new TWEEN.Tween(chairPos)
	.to({x:0, y:-1, z:0.5})
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

for(const[name, object] of Object.entries(buttons)){
	object.addEventListener("click", (event) =>{
		event.stopPropagation();
		console.log(name + ' cube was clicked');
		const pos = {x: camera.position.x, y: camera.position.y, z: camera.position.z};
		const target = orbitTarget;

		if(name === "red"){
			projectView(pos, target);
			controls.enabled = false;
			controls.maxDistance = 999;
		}else if(name === "blue"){
			defaultView(pos, target);
			controls.enabled = true;
			controls.maxDistance = 15;
			
		}
		
	});
	interactionManager.add(object);
	scene.add(object);
}


const geoFloor = new THREE.BoxGeometry( 2000, 0, 2000 );
				const matStdFloor = new THREE.MeshStandardMaterial( { color: 0x000000, roughness: 0.1, metalness: 0 } );
				const mshStdFloor = new THREE.Mesh( geoFloor, matStdFloor );
				mshStdFloor.position.set(0,-1,0);
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
rectLight.position.set( 0,0.961,0 );
rectLight.lookAt( 0, 0.961, 1 );
scene.add( rectLight )

const rectLightHelper = new RectAreaLightHelper( rectLight );
//rectLight.add( rectLightHelper );






// THE CAMERA CONTROL STUFF ############################################################################################################################
var controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;
controls.minDistance = 4;
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
camera.position.set( 6.545, 4.5, 6.545 );
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
	resizePortal();
	
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



function updateCamera(){
	if(projView){
		var pos = camera.position;
		var tweenTarget = -(window.scrollY/100 - 5);
		console.log(lastKnownScrollPosition - window.scrollY);
		
		
		

		
		new TWEEN.Tween(pos)
		.to({x:0, y:0.95, z:tweenTarget})
		.easing(TWEEN.Easing.Quadratic.Out)
		.onUpdate(() =>
		camera.position.set(0,0.95,pos.z),
		camera.target = new Vector3(0,0.95,pos.z-10)
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
virtualCamera.position.y = 15;

var portalMat = new THREE.MeshBasicMaterial({
	//color: 0xFF00FF
	map:projectCameraTexture.texture
});


var portalBack = new THREE.Mesh(
	new THREE.BoxGeometry(0.942,0.53,0.01),
	new THREE.MeshBasicMaterial({color: 0x000000})
);
portalBack.renderOrder = 9;
portalBack.position.set(0,0.961,0);
var portal = new THREE.Mesh(
	new THREE.BoxGeometry(0.942,0.53,0.01),
	portalMat
);
portal.position.set(0,0.961,0);
//scene.add(portalBack);
scene.add(portal);
//resizePortal();



animate((time) => {
	if(projView){
		if(camera.position.z <= 0.595){
			renderer.setRenderTarget(null);
			renderer.clear();
			renderer.render(projectScene, camera);
		}else{
			renderDefault();
		}
	}else{
		renderDefault();
	}
	
	console.log("hi meara");
	
	//composer.render(time);
	interactionManager.update();
	TWEEN.update(time);
	controls.update();
	
  });

renderer.autoClear = false;
renderer.autoClearStencil = false;

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
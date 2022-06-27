import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { InteractionManager } from "three.interactive";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { GLTFLoader } from  'three/examples/jsm/loaders/GLTFLoader';
import animate from "/animate.js";



const renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById("viewport")}
);
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



const interactionManager = new InteractionManager(
	renderer,
	camera,
	renderer.domElement
  );

const scene = new THREE.Scene();
renderer.setClearColor (0x010101);
var light = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(light);

var loader = new GLTFLoader();

function loadModel(name, x, y, z){
	loader.load(
		// resource URL
		name,
		// called when the resource is loaded
		function ( gltf ) {
			gltf.scene.position.set(x,y,z);
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
	
			console.log( 'An error happened' );
	
		}
	);
	//return gltf;
}
loadModel('/3dmodels/table.glb',0,-1,-0.5);
//loadModel('/3dmodels/chair.glb',0,-1,0.5);
let chair;
loader.load(
	// resource URL
	'/3dmodels/chair.glb',
	// called when the resource is loaded
	function ( gltf ) {
		chair = gltf.scene;
		chair.position.set(0,-1,0.5);
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

		console.log( 'An error happened' );

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

const orbitTarget = {x: 0, y: 0.5, z:0};

var projView = false;

function projectView(pos, target){
	projView = true;
	new TWEEN.Tween(target)
	.to({x:0, y:1, z:0}) //{x:-3, y:1, z:4}
	.easing(TWEEN.Easing.Quadratic.Out)
	.onUpdate(() =>
		controls.target = new THREE.Vector3(orbitTarget.x, orbitTarget.y, orbitTarget.z)
	)
	.start();
	new TWEEN.Tween(pos)
	.to({x:0, y:1.5, z:5}) // {x:5.6, y:3, z:9.3}
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
rectLight.position.set( 0,0.961,-0.545 );
rectLight.lookAt( 0, 0.961, 0 );
scene.add( rectLight )

//const rectLightHelper = new RectAreaLightHelper( rectLight );
//rectLight.add( rectLightHelper );






// THE CAMERA CONTROL STUFF ############################################################################################################################
var controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 15;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.65;
controls.target = new THREE.Vector3(orbitTarget.x, orbitTarget.y, orbitTarget.z);
controls.enableDamping = true;
/*const geometry = new THREE.BoxGeometry();
			const material = new THREE.MeshBasicMaterial( { color: 0xFFFB00 } );
			const cube = new THREE.Mesh( geometry, material );
			scene.add( cube );*/

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 6, 4.5, 6 );
controls.update();

window.addEventListener( 'resize', onWindowResize );
//window.addEventListener( 'scroll', updateCamera);
let lastKnownScrollPosition = 0;
let ticking = false;
window.addEventListener('scroll', function(e) {
	lastKnownScrollPosition = window.scrollY;
  
	if (!ticking) {
	  window.requestAnimationFrame(function() {
		updateCamera();
		ticking = false;
	  });
  
	  ticking = true;
	}
  });


function onWindowResize() {

	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = ( window.innerWidth / window.innerHeight );
	camera.updateProjectionMatrix();

}

function updateCamera(){
	if(projView){
		var pos = camera.position;

		new TWEEN.Tween(pos)
		.to({x:0, y:1.5, z:window.scrollY/50 + 4})
		.easing(TWEEN.Easing.Quadratic.Out)
		.onUpdate(() =>
		camera.position.set(0,1.5,pos.z),
	)
	.start();
		console.log(window.scrollY);
	}
}

/*function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );
	TWEEN.update(time);
}*/

animate((time) => {
	renderer.render(scene, camera);
	//console.log(camera.position);
	interactionManager.update();
	TWEEN.update(time);
	controls.update();
	
  });

window.onload(animate());
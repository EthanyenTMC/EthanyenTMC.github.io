import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';
import { RectAreaLightHelper } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/helpers/RectAreaLightHelper.js';
import { InteractionManager } from "https://cdn.skypack.dev/three@0.132.2/three.interactive";

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const loader = new GLTFLoader();

const interactionManager = new InteractionManager(
	renderer,
	camera,
	renderer.domElement
  );

const scene = new THREE.Scene();
renderer.setClearColor (0x010101);
var light = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(light);


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
}
loadModel('table.glb',0,-1,-0.5);
loadModel('chair.glb',0,-1,0.5);

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

for(const[name, object] of Object.entries(buttons)){
	object.addEventListener("click", (event) =>{
		event.stopPropagation();
		console.log('cube was clicked');
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

const rectLightHelper = new RectAreaLightHelper( rectLight );
rectLight.add( rectLightHelper );


const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );


// THE CAMERA CONTROL STUFF ############################################################################################################################
var controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 15;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.65;
controls.target = new THREE.Vector3(0,0.5,0);
controls.enableDamping = true;
/*const geometry = new THREE.BoxGeometry();
			const material = new THREE.MeshBasicMaterial( { color: 0xFFFB00 } );
			const cube = new THREE.Mesh( geometry, material );
			scene.add( cube );*/

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 6, 4.5, 6 );
controls.update();

window.addEventListener( 'resize', onWindowResize );

function onWindowResize() {

	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = ( window.innerWidth / window.innerHeight );
	camera.updateProjectionMatrix();

}

function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );

}

window.onload(animate());
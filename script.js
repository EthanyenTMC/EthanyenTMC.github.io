import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';
import { RectAreaLightHelper } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/helpers/RectAreaLightHelper.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const loader = new GLTFLoader();


const scene = new THREE.Scene();
renderer.setClearColor (0x000000);
//var light = new THREE.AmbientLight(0xFFFFFF, 0.1);
//scene.add(light);

loader.load(
	// resource URL
	'table.glb',
	// called when the resource is loaded
	function ( gltf ) {
		gltf.scene.position.set(0,0,-0.5);
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

loader.load(
	// resource URL
	'chair.glb',
	// called when the resource is loaded
	function ( gltf ) {
		gltf.scene.position.set(0,0,0.5);
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


const geoFloor = new THREE.BoxGeometry( 2000, 0.1, 2000 );
				const matStdFloor = new THREE.MeshStandardMaterial( { color: 0x808080, roughness: 0.1, metalness: 0 } );
				const mshStdFloor = new THREE.Mesh( geoFloor, matStdFloor );
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
rectLight.position.set( 0,1.961,-0.545 );
rectLight.lookAt( 0, 1.961, 0 );
scene.add( rectLight )

const rectLightHelper = new RectAreaLightHelper( rectLight );
rectLight.add( rectLightHelper );


const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );



const controls = new OrbitControls( camera, renderer.domElement );

/*const geometry = new THREE.BoxGeometry();
			const material = new THREE.MeshBasicMaterial( { color: 0xFFFB00 } );
			const cube = new THREE.Mesh( geometry, material );
			scene.add( cube );*/

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( -5, 5, -5 );
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
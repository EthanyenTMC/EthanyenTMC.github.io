

export function loadModel(name, scene, loader, thing){

        
loader.load(
	// resource URL
	name,
	// called when the resource is loaded
	function ( gltf ) {
		thing = gltf.scene;
		scene.add( thing );

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

}

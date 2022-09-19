import React from "react";

import { Scene, BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, WebGLRenderer} from 'three'
const BoxGeometryTest = () => {
  
  while(document.body.children.length !== 0) {
    document.body.removeChild(document.body.children[0]);
  }
  var renderer =  new WebGLRenderer();

  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );

  const scene = new Scene();

  const camera = new PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 0.1, 5);

  camera.position.z =3;

  const boxGeometry = new BoxGeometry(1,1,1);

  const material = new MeshBasicMaterial({color: 0x00fff0});

  const cube = new Mesh(boxGeometry, material)

  scene.add(cube)

  var animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
  };

  animate();
  return (
    <div></div>
  )
}
export default BoxGeometryTest
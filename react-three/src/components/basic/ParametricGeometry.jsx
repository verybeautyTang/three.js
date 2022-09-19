import React from "react";
import {  Scene, Mesh, PerspectiveCamera, WebGLRenderer, PolyhedronGeometry, MeshBasicMaterial} from 'three'

const PolyhedronGeometryTest = () =>  {
  while(document.body.children.length !== 0) {
    document.body.removeChild(document.body.children[0]);
  }
  const scene = new Scene();

  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight , 0.1, 100)
  camera.position.z = 20;
  const verticesOfCube = [
    -1, -1, -1,    1, -1, -1,    1,  1, -1,    -1,  1, -1,
    -1, -1,  1,    1, -1,  1,    1,  1,  1,    -1,  1,  1,
];
const indicesOfFaces = [
    2, 1, 0,    0, 3, 2,
    0, 4, 7,    7, 3, 0,
    0, 1, 5,    5, 4, 0,
    1, 2, 6,    6, 5, 1,
    2, 3, 7,    7, 6, 2,
    4, 5, 6,    6, 7, 4,
];
const radius = 7;  // ui: radius
const detail = 2;  // ui: detail
const geometry = new PolyhedronGeometry(
    verticesOfCube, indicesOfFaces, radius, detail);
  const material = new MeshBasicMaterial({color: 0x000eff0});
  const cube = new Mesh(geometry, material)
  scene.add(cube);

  var animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
  };

  animate();

  return (<></>)
}

export default PolyhedronGeometryTest
import React from "react";
import {  Scene, Mesh, PerspectiveCamera, WebGLRenderer, MeshBasicMaterial, TorusKnotGeometry} from 'three'

const TorusKnotGeometryTest = () =>  {
  while(document.body.children.length !== 0) {
    document.body.removeChild(document.body.children[0]);
  }
  const scene = new Scene();

  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight , 0.1, 100)
  camera.position.z = 20;
  const radius = 3.5;  // ui: radius
  const tubeRadius = 1.5;  // ui: tubeRadius
  const radialSegments = 8;  // ui: radialSegments
  const tubularSegments = 64;  // ui: tubularSegments
  const p = 2;  // ui: p
  const q = 3;  // ui: q
  const geometry = new TorusKnotGeometry(
      radius, tubeRadius, tubularSegments, radialSegments, p, q);
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

export default TorusKnotGeometryTest
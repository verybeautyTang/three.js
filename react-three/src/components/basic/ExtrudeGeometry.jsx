import React from "react";

import { Scene, PerspectiveCamera, Shape, WebGLRenderer, ExtrudeGeometry, MeshBasicMaterial, Mesh } from 'three'

const ExtrudeGeometryTest = () => {
  while(document.body.children.length !== 0) {
    document.body.removeChild(document.body.children[0]);
  }
  const scene = new Scene();

  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight , 0.01, 100)
  camera.position.z = 1;
  const shape = new Shape();
  const x = -2.5;
  const y = -5;
  shape.moveTo(x + 2.5, y + 2.5);
  shape.bezierCurveTo(x+ 2.5, y+ 2.5, x +2, y, x, y);
  shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
  shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
  shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
  shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
  shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
  const extrudeSettings = {
    steps: 2,  // ui: steps
    depth: 2,  // ui: depth
    bevelEnabled: true,  // ui: bevelEnabled
    bevelThickness: 1,  // ui: bevelThickness
    bevelSize: 1,  // ui: bevelSize
    bevelSegments: 2,  // ui: bevelSegments
  };
  
  const geometry = new ExtrudeGeometry(shape, extrudeSettings);
  const mesh = new MeshBasicMaterial({color: 0xfff00f});
  const cube = new Mesh(geometry, mesh);

  scene.add(cube);
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

export default ExtrudeGeometryTest
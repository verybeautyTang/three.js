import React from "react";

// 模拟太阳自转，地球自转、月球自转并且模拟太阳围绕地球转，月亮围绕地球转

import { WebGLRenderer, PerspectiveCamera, Scene, PointLight, SphereGeometry, Object3D, MeshPhongMaterial, Mesh} from 'three'

const Sun =  () => {
  while(document.body.children.length !== 0) {
    document.body.removeChild(document.body.children[0]);
  }
  // 渲染页面
  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const fov = 40; //  摄像机视锥体垂直视野角度
  const aspect = 2; //  摄像机视锥体长宽比
  const near = 0.1; // 摄像机视锥体近端面
  const far = 1000; //  摄像机视锥体远端面

  const camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0,50,0);
  camera.up.set(0,0,1);
  camera.lookAt(0,0,0);

  const scene = new Scene();
  
  {
    const color = 0xffffff;
    const intensity =  3;
    const light = new PointLight(color, intensity);
    scene.add(light);
  }
  const objects = []
  const radius = 1;
  const widthSegments =  6;
  const heightSegments = 6;
  const sphereGeometry = new SphereGeometry(radius, heightSegments, widthSegments) // 球体

  const solarSystem = new Object3D();
  scene.add(solarSystem);
  objects.push(solarSystem);

  const sunMaterial = new MeshPhongMaterial({emissive: 0xffff00});
  const sunMesh = new Mesh(sphereGeometry,sunMaterial);
  sunMesh.scale.set(5,5,5)
  solarSystem.add(sunMesh);

  
  objects.push(sunMesh);
}
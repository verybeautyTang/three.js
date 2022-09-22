import React from "react";

// 模拟太阳自转，地球自转、月球自转并且模拟太阳围绕地球转，月亮围绕地球转

import { WebGLRenderer, PerspectiveCamera, Scene, PointLight, SphereGeometry, Object3D, MeshPhongMaterial, Mesh, GridHelper, AxesHelper} from 'three'

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
  camera.lookAt(0,0,0); // 摄像机从它的位置“看向”我们传递 lookAt 的位置

  const scene = new Scene();
  
  {
    const color = 0xffffff;
    const intensity =  3;
    const light = new PointLight(color, intensity);
    scene.add(light);
  }
  // 一球多用
  const objects = []
  const radius = 1;
  const widthSegments =  6;
  const heightSegments = 6;
  const sphereGeometry = new SphereGeometry(radius, heightSegments, widthSegments) // 球体

  const solarSystem = new Object3D();
  scene.add(solarSystem);
  objects.push(solarSystem);

  // 太阳
  const sunMaterial = new MeshPhongMaterial({emissive: 0xffff00});
  const sunMesh = new Mesh(sphereGeometry,sunMaterial);
  sunMesh.scale.set(5,5,5) // 扩大太阳的大小【太阳的网格为5】
  solarSystem.add(sunMesh);
  objects.push(sunMesh);
  
  // 地球
  const earthOrbit = new Object3D();
  earthOrbit.position.z = 10;
  solarSystem.add(earthOrbit)
  objects.push(earthOrbit);

  const earthMaterial = new MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
  const earthMesh = new Mesh(sphereGeometry,earthMaterial);
  earthOrbit.add(earthMesh);
  objects.push(earthMesh);

  // 月亮
  const moonOrbit = new Object3D();
  moonOrbit.position.x = 2;
  earthOrbit.add(moonOrbit);

  const moonMaterial = new MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
  const moonMesh = new Mesh(sphereGeometry,moonMaterial);
  moonOrbit.add(moonMesh);
  objects.push(moonMesh);

  
  class AxisGridHelper {
    constructor(node, units = 10) {
      const axes = new AxesHelper();
      axes.material.depthTest = false;
      axes.renderOrder = 2;  // after the grid
      node.add(axes);

      const grid = new GridHelper(units, units);
      grid.material.depthTest = false;
      grid.renderOrder = 1;
      node.add(grid);

      this.grid = grid;
      this.axes = axes;
      this.visible = false;
    }
    get visible() {
      return this._visible;
    }
    set visible(v) {
      this._visible = v;
      this.grid.visible = v;
      this.axes.visible = v;
    }
  }

  function makeAxisGrid(node, label, units) {
    const helper = new AxisGridHelper(node, units);
    gui.add(helper, 'visible').name(label);
  }

  makeAxisGrid(solarSystem, 'solarSystem', 26);
  makeAxisGrid(sunMesh, 'sunMesh');
  makeAxisGrid(earthOrbit, 'earthOrbit');
  makeAxisGrid(earthMesh, 'earthMesh');
  makeAxisGrid(moonOrbit, 'moonOrbit');
  makeAxisGrid(moonMesh, 'moonMesh');

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    objects.forEach((obj) => {
      obj.rotation.y = time;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
  
}
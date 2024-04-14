import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'scratch-ext', // Replace it with your extension name
  //entry: ['src/RenderTheWorld.ts', 'src/RenderTheWorld.js', 'src/BufferGeometryUtils.js', 'src/GLTFLoader.js', 'src/MTLLoader.js', 'src/OBJLoader.js', 'src/three.js', 'src/WebGL.js', 'src/OrbitControls.js'],
  entry: ['src/RenderTheWorld.ts', 'src/RenderTheWorld.js'],
  target: ['esnext'],
  format: ['iife'],
  outDir: 'dist',
  banner: {
    // Replace it with your extension's metadata
    js: `// Name: xiaochen004hao's example Extension
// ID: RenderTheWorld
// Description: 立体空间, WebGL帮你实现!
// By: You
// Original: Me
// License: MPL-2.0
`
  },
  platform: 'browser',
  clean: true
})

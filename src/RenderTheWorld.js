// 依赖库
import * as THREE from './three.js';

// 插件
// 这里为该扩展目录下的三个js文件
import { OBJLoader } from './OBJLoader.js';
import { OrbitControls } from './OrbitControls.js';
import { MTLLoader } from './MTLLoader.js';
import { GLTFLoader } from './GLTFLoader.js';
// import {OBJLoader} from 'https://cdn.jsdelivr.net/gh/MoreBugOfDog/cdn-file@TBS/file/OBJLoader.js';
// import {OrbitControls} from 'https://cdn.jsdelivr.net/gh/MoreBugOfDog/cdn-file@TBS/file/OrbitControls.js';
// import {MTLLoader} from 'https://cdn.jsdelivr.net/gh/MoreBugOfDog/cdn-file@TBS/file/MTLLoader.js';
import WebGL from './WebGL.js';
import {
	chen_RenderTheWorld_picture,
	chen_RenderTheWorld_icon,
} from './assets/index.js';

// console.log(THREE);

const chen_RenderTheWorld_extensionId = 'RenderTheWorld';

/** @typedef {string|number|boolean} SCarg 来自Scratch圆形框的参数，虽然这个框可能只能输入数字，但是可以放入变量，因此有可能获得数字、布尔和文本（极端情况下还有 null 或 undefined，需要同时处理 */
/** 放在外面来装逼 */
Scratch.translate.setup({
	'zh-cn': {
		'RenderTheWorld.name': '渲染世界',
		'RenderTheWorld.fileListEmpty': '没有文件',
		'RenderTheWorld.apidocs': '📖API文档',
		'RenderTheWorld.objectLoadingCompleted': '当[name]对象加载完成时',
		'RenderTheWorld.set3dState': '设置3D显示器状态为: [state]',
		'RenderTheWorld.get3dState': '​3D显示器是显示的?',
		'RenderTheWorld.3dState.display': '显示',
		'RenderTheWorld.3dState.hidden': '隐藏',
		'RenderTheWorld.init':
			'初始化并设置背景颜色为[color] 大小[sizex]x[sizey]y [Anti_Aliasing]',
		'RenderTheWorld.Anti_Aliasing.enable': '启用抗锯齿',
		'RenderTheWorld.Anti_Aliasing.disable': '禁用抗锯齿',
		'RenderTheWorld.render': '渲染场景',
		'RenderTheWorld.color_': '颜色: [R] [G] [B]',
		'RenderTheWorld.tools': '🛠️工具',
		'RenderTheWorld.YN.true': '能',
		'RenderTheWorld.YN.false': '不能',
		'RenderTheWorld.controlCamera':
			'鼠标控制相机：[yn1]右键拖拽 [yn2]中键缩放 [yn3]左键旋转',
		'RenderTheWorld.isWebGLAvailable': '兼容性检查',
		'RenderTheWorld._isWebGLAvailable': '当前设备支持WebGL吗?',

		'RenderTheWorld.objects': '🧸物体',
		'RenderTheWorld.makeCube':
			'创建或重置长方体: [name] 长[a] 宽[b] 高[h] 颜色: [color] 位置: x[x] y[y] z[z] [YN]投射阴影 [YN2]被投射阴影',
		'RenderTheWorld.makeSphere':
			'创建或重置球体: [name] 半径[radius] 水平分段数[w] 垂直分段数[h] 颜色: [color] 位置: x[x] y[y] z[z] [YN]投射阴影 [YN2]被投射阴影',
		'RenderTheWorld.makePlane':
			'创建或重置平面: [name] 长[a] 宽[b] 颜色: [color] 位置: x[x] y[y] z[z] [YN]投射阴影 [YN2]被投射阴影',
		'RenderTheWorld.importOBJ':
			'导入或重置OBJ模型: [name] OBJ模型文件: [objfile] MTL材质文件: [mtlfile] 位置: x[x] y[y] z[z] [YN]投射阴影 [YN2]被投射阴影',
		'RenderTheWorld.importGLTF':
			'导入或重置GLTF模型: [name] GLTF模型文件: [gltffile] 位置: x[x] y[y] z[z] [YN]投射阴影 [YN2]被投射阴影',

		'RenderTheWorld.rotationObject': '将物体: [name] 旋转: x[x] y[y] z[z]',
		'RenderTheWorld.moveObject': '将物体: [name] 移动到: x[x] y[y] z[z]',
		'RenderTheWorld.scaleObject': '将物体: [name] 缩放: x[x] y[y] z[z]',

		'RenderTheWorld.getObjectPos': '获取物体: [name] 的[xyz]坐标',
		'RenderTheWorld.getObjectRotation': '获取物体: [name] [xyz]的旋转角度',
		'RenderTheWorld.getObjectScale': '获取物体: [name] [xyz]的缩放',

		'RenderTheWorld.deleteObject': '删除物体: [name]',

		'RenderTheWorld.xyz.x': 'x轴',
		'RenderTheWorld.xyz.y': 'y轴',
		'RenderTheWorld.xyz.z': 'z轴',

		'RenderTheWorld.lights': '🕯️光照',
		'RenderTheWorld.setAmbientLightColor':
			'设置环境光颜色: [color] 光照强度：[intensity]',
		'RenderTheWorld.setHemisphereLightColor':
			'设置半球光天空颜色: [skyColor] 地面颜色: [groundColor] 光照强度：[intensity]',
		'RenderTheWorld.makePointLight':
			'创建或重置点光源: [name] 颜色: [color] 光照强度: [intensity] 位置: x[x] y[y] z[z] 衰减量[decay] [YN]投射阴影',
		'RenderTheWorld.moveLight': '将光源: [name] 移动到: x[x] y[y] z[z]',
		'RenderTheWorld.getLightPos': '获取光源: [name] 的[xyz]坐标',
		'RenderTheWorld.deleteLight': '删除光源: [name]',

		'RenderTheWorld.camera': '📷相机',
		'RenderTheWorld.moveCamera': '将相机移动到x[x]y[y]z[z]',
		'RenderTheWorld.rotationCamera': '将获取相机旋转: x[x] y[y] z[z]',
		'RenderTheWorld.cameraLookAt': '让相机面向: x[x] y[y] z[z]',
		'RenderTheWorld.getCameraPos': '获取相机[xyz]坐标',
		'RenderTheWorld.getCameraRotation': '获取相机[xyz]的旋转角度',

		'RenderTheWorld.fogs': '🌫️雾',
		'RenderTheWorld.enableFogEffect':
			'启用雾效果并设置雾颜色为：[color] near[near] far[far]',
		'RenderTheWorld.disableFogEffect': '禁用雾效果',
	},
	en: {
		'RenderTheWorld.name': 'Render The World',
		'RenderTheWorld.fileListEmpty': 'file list is empty',
		'RenderTheWorld.apidocs': '📖API Docs',
		'RenderTheWorld.objectLoadingCompleted':
			'When [name] object loading is completed',
		'RenderTheWorld.set3dState': 'Set the 3D display status to: [state]',
		'RenderTheWorld.get3dState': 'The 3D display is show?',
		'RenderTheWorld.3dState.display': 'display',
		'RenderTheWorld.3dState.hidden': 'hidden',
		'RenderTheWorld.init':
			'init and set the background color to [color] size:[sizex]x[sizey]y [Anti_Aliasing]',
		'RenderTheWorld.Anti_Aliasing.enable': 'enable anti aliasing',
		'RenderTheWorld.Anti_Aliasing.disable': 'disable anti aliasing',
		'RenderTheWorld.render': 'render',
		'RenderTheWorld.color_': 'color: [R] [G] [B]',
		'RenderTheWorld.tools': '🛠️Tools',
		'RenderTheWorld.YN.true': 'can',
		'RenderTheWorld.YN.false': 'can\'t',
		'RenderTheWorld.controlCamera':
			'Mouse control camera: [yn1]right click drag [yn2] middle click zoom and [yn3] left click rotation',
		'RenderTheWorld.isWebGLAvailable': 'compatibility check',
		'RenderTheWorld._isWebGLAvailable':
			'Does the current device support WebGL?',

		'RenderTheWorld.objects': '🧸Objects',
		'RenderTheWorld.makeCube':
			'reset or make a Cube: [name] length[a] width[b] height[h] color: [color] position: x[x] y[y] z[z] [YN]cast shadows [YN2]shadow cast',
		'RenderTheWorld.makeSphere':
			'reset or make a Sphere: [name] radius[radius] widthSegments[w] heightSegments[h] color: [color] position: x[x] y[y] z[z] [YN]cast shadows [YN2]shadow cast',
		'RenderTheWorld.makePlane':
			'reset or make a Plane: [name] length[a] width[b] color: [color] position: x[x] y[y] z[z] [YN]cast shadows [YN2]shadow cast',
		'RenderTheWorld.importOBJ':
			'reset or make a OBJ Model: [name] OBJ file: [objfile] MTL file: [mtlfile] position: x[x] y[y] z[z] [YN]cast shadows [YN2]shadow cast',
		'RenderTheWorld.importGLTF':
			'reset or make a GLTF Model: [name] GLTF file: [gltffile] position: x[x] y[y] z[z] [YN]cast shadows [YN2]shadow cast',

		'RenderTheWorld.rotationObject':
			'Object: [name] rotation: x[x] y[y] z[z]',
		'RenderTheWorld.moveObject': 'Object: [name] go to: x[x] y[y] z[z]',
		'RenderTheWorld.scaleObject': 'Object: [name] scale: x[x] y[y] z[z]',

		'RenderTheWorld.getObjectPos': 'get Object: [name]\'s [xyz] pos',
		'RenderTheWorld.getObjectRotation':
			'get Object: [name]\'s  [xyz] rotation',
		'RenderTheWorld.getObjectScale': 'get Object: [name]\'s  [xyz] scale',

		'RenderTheWorld.deleteObject': 'delete object: [name]',

		'RenderTheWorld.xyz.x': 'x-axis',
		'RenderTheWorld.xyz.y': 'y-axis',
		'RenderTheWorld.xyz.z': 'z-axis',

		'RenderTheWorld.lights': '🕯️Lights',
		'RenderTheWorld.setAmbientLightColor':
			'set AmbientLight\'s color: [color] intensity: [intensity]',
		'RenderTheWorld.setHemisphereLightColor':
			'set HemisphereLight\'s skyColor: [skyColor] groundColor: [groundColor] intensity: [intensity]',
		'RenderTheWorld.makePointLight':
			'reset or make a PointLight: [name] color: [color] intensity: [intensity] position: x[x] y[y] z[z] decay[decay] [YN]cast shadows',
		'RenderTheWorld.moveLight': 'Light: [name] go to: x[x] y[y] z[z]',
		'RenderTheWorld.getLightPos': 'get Light: [name]\'s [xyz] pos',
		'RenderTheWorld.deleteLight': 'delete ligth: [name]',

		'RenderTheWorld.camera': '📷Camera',
		'RenderTheWorld.moveCamera': 'camera go to: x[x]y[y]z[z]',
		'RenderTheWorld.rotationCamera': 'camera rotation: x[x]y[y]z[z]',
		'RenderTheWorld.cameraLookAt':
			'Face the camera towards: x[x] y[y] z[z]',
		'RenderTheWorld.getCameraPos': 'get camera\'s [xyz] pos',
		'RenderTheWorld.getCameraRotation': 'get camera\'s  [xyz] rotation',

		'RenderTheWorld.fogs': '🌫️Fog',
		'RenderTheWorld.enableFogEffect':
			'Enable fog effect and set fog color to: [color] near[near] far[far]',
		'RenderTheWorld.disableFogEffect': 'Disable fog effect',
	},
});

class RenderTheWorld {
	constructor(runtime) {
		this.runtime = runtime;
		// console.log(this.runtime);
		const _draw = this.runtime.renderer.draw;
        const _resize = this.runtime.renderer.resize;
		this.runtime.renderer.resize = (pixelsWide, pixelsTall) => {
			_resize.call(this.runtime.renderer, pixelsWide, pixelsTall);
			if (this.tc) {
				this.tc.style.width = String(pixelsWide) + 'px';
		    	this.tc.style.height = String(pixelsTall) + 'px';
			}
		};
		this.runtime.renderer.draw = () => {
			if (!this.isTcShow) {
				_draw.call(this.runtime.renderer);
			} else if (this.dirty) {
			        this.dirty = false; // TODO: 和 Scratch renderer 共用 dirty
			        // this.dirty 是一个变量，每当场景变更（需要渲染）时就设置为 true
			        this.renderer.render(this.scene, this.camera);
			}
		};
		this.dirty = false;

		// 在项目结束时，恢复原生的渲染器的resize和draw方法
		// this.runtime.on('PROJECT_STOP_ALL', () => {
		// 	this.runtime.renderer.resize = this.__resize;
		// 	this.runtime.renderer.draw = this.__draw;
		// });

		// console.log(this.runtime);

		// 兼容性
		this.isWebglAvailable = false;

		// 渲染器
		this.renderer = null;
		// 场景
		this.scene = null;

		// 相机配置
		this.fov = null;
		this.aspect = null;
		this.near = null;
		this.far = null;
		this.camera = null;
		this.controls = null;

		// 环境光
		this.ambient_light = null;
		// 半球光
		this.hemisphere_light = null;

		// 光
		this.lights = {};
		// 物体
		this.objects = {};

		// 原CCW显示canvas
		//this._ccw = document.getElementsByClassName('gandi_stage_stage_1fD7k')[0].getElementsByTagName('canvas')[0];
		this.scratchCanvas = this.runtime.renderer.canvas;
		// threejs显示canvas
		this.tc = null;
		this.isTcShow = false;
	}

	/**
	 * 翻译
	 * @param {string} id
	 * @return {string}
	 */
	formatMessage(id) {
		return Scratch.translate({
			id,
			default: id,
			description: id,
		});
	}

	getInfo() {
		return {
			id: chen_RenderTheWorld_extensionId, // 拓展id
			docsURI: 'https://learn.ccw.site/article/aa0cf6d0-6758-447a-96f5-8e5dfdbe14d6',
			name: this.formatMessage('RenderTheWorld.name'), // 拓展名
			blockIconURI: chen_RenderTheWorld_icon,
			menuIconURI: chen_RenderTheWorld_icon,
			color1: '#121C3D',
			color2: '#4A76FF',
			color3: '#4A76FF',
			blocks: [
				{
					blockType: 'button',
					text: this.formatMessage('RenderTheWorld.apidocs'),
					onClick: this.docs,
				},
				{
					opcode: 'init',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.init'),
					arguments: {
						color: {
							type: 'number',
							defaultValue: 0,
						},
						sizex: {
							type: 'number',
							defaultValue: 640,
						},
						sizey: {
							type: 'number',
							defaultValue: 360,
						},
						Anti_Aliasing: {
							type: 'string',
							menu: 'Anti_Aliasing',
						},
					},
				},
				{
					opcode: 'set3dState',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.set3dState'),
					arguments: {
						state: {
							type: 'string',
							menu: '3dState',
						},
					},
				},
				{
					opcode: 'get3dState',
					blockType: 'Boolean',
					text: this.formatMessage('RenderTheWorld.get3dState'),
				},
				{
					opcode: 'render',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.render'),
				},
				{
					blockType: 'label',
					text: this.formatMessage('RenderTheWorld.objects'),
				},
				{
					opcode: 'makeCube',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.makeCube'),
					arguments: {
						name: {
							type: 'string',
							defaultValue: 'name',
						},
						a: {
							type: 'number',
							defaultValue: 5,
						},
						b: {
							type: 'number',
							defaultValue: 5,
						},
						h: {
							type: 'number',
							defaultValue: 5,
						},
						color: {
							type: 'number',
						},
						x: {
							type: 'number',
							defaultValue: 0,
						},
						y: {
							type: 'number',
							defaultValue: 0,
						},
						z: {
							type: 'number',
							defaultValue: 0,
						},
						YN: {
							type: 'string',
							menu: 'YN',
						},
						YN2: {
							type: 'string',
							menu: 'YN',
						},
					},
				},
				{
					opcode: 'makeSphere',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.makeSphere'),
					arguments: {
						name: {
							type: 'string',
							defaultValue: 'name',
						},
						radius: {
							type: 'number',
							defaultValue: 3,
						},
						w: {
							type: 'number',
							defaultValue: 32,
						},
						h: {
							type: 'number',
							defaultValue: 16,
						},
						color: {
							type: 'number',
						},
						x: {
							type: 'number',
							defaultValue: 0,
						},
						y: {
							type: 'number',
							defaultValue: 0,
						},
						z: {
							type: 'number',
							defaultValue: 0,
						},
						YN: {
							type: 'string',
							menu: 'YN',
						},
						YN2: {
							type: 'string',
							menu: 'YN',
						},
					},
				},
				{
					opcode: 'makePlane',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.makePlane'),
					arguments: {
						name: {
							type: 'string',
							defaultValue: 'name',
						},
						a: {
							type: 'number',
							defaultValue: 5,
						},
						b: {
							type: 'number',
							defaultValue: 5,
						},
						color: {
							type: 'number',
						},
						x: {
							type: 'number',
							defaultValue: 0,
						},
						y: {
							type: 'number',
							defaultValue: 0,
						},
						z: {
							type: 'number',
							defaultValue: 0,
						},
						YN: {
							type: 'string',
							menu: 'YN',
						},
						YN2: {
							type: 'string',
							menu: 'YN',
						},
					},
				},
				{
					opcode: 'importOBJ',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.importOBJ'),
					arguments: {
						name: {
							type: 'string',
							defaultValue: 'name',
						},
						objfile: {
							type: 'string',
							menu: 'file_list',
						},
						mtlfile: {
							type: 'string',
							menu: 'file_list',
						},
						x: {
							type: 'number',
							defaultValue: 0,
						},
						y: {
							type: 'number',
							defaultValue: 0,
						},
						z: {
							type: 'number',
							defaultValue: 0,
						},
						YN: {
							type: 'string',
							menu: 'YN',
						},
						YN2: {
							type: 'string',
							menu: 'YN',
						},
					},
				},
				{
					opcode: 'importGLTF',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.importGLTF'),
					arguments: {
						name: {
							type: 'string',
							defaultValue: 'name',
						},
						gltffile: {
							type: 'string',
							menu: 'file_list',
						},
						x: {
							type: 'number',
							defaultValue: 0,
						},
						y: {
							type: 'number',
							defaultValue: 0,
						},
						z: {
							type: 'number',
							defaultValue: 0,
						},
						YN: {
							type: 'string',
							menu: 'YN',
						},
						YN2: {
							type: 'string',
							menu: 'YN',
						},
					},
				},
				{
					opcode: 'deleteObject',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.deleteObject'),
					arguments: {
						name: {
							type: 'string',
							defaultValue: 'name',
						},
					},
				},
				{
					opcode: 'rotationObject',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.rotationObject'),
					arguments: {
						name: {
							type: 'string',
							defaultValue: 'name',
						},
						x: {
							type: 'number',
							defaultValue: 0,
						},
						y: {
							type: 'number',
							defaultValue: 0,
						},
						z: {
							type: 'number',
							defaultValue: 0,
						},
					},
				},
				{
					opcode: 'moveObject',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.moveObject'),
					arguments: {
						name: {
							type: 'string',
							defaultValue: 'name',
						},
						x: {
							type: 'number',
							defaultValue: 0,
						},
						y: {
							type: 'number',
							defaultValue: 0,
						},
						z: {
							type: 'number',
							defaultValue: 0,
						},
					},
				},
				{
					opcode: 'scaleObject',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.scaleObject'),
					arguments: {
						name: {
							type: 'string',
							defaultValue: 'name',
						},
						x: {
							type: 'number',
							defaultValue: 0,
						},
						y: {
							type: 'number',
							defaultValue: 0,
						},
						z: {
							type: 'number',
							defaultValue: 0,
						},
					},
				},
				{
					opcode: 'getObjectPos',
					blockType: 'reporter',
					text: this.formatMessage('RenderTheWorld.getObjectPos'),
					arguments: {
						name: {
							type: 'string',
							defaultValue: 'name',
						},
						xyz: {
							type: 'string',
							menu: 'xyz',
						},
					},
				},
				{
					opcode: 'getObjectRotation',
					blockType: 'reporter',
					text: this.formatMessage('RenderTheWorld.getObjectRotation'),
					arguments: {
						name: {
							type: 'string',
							defaultValue: 'name',
						},
						xyz: {
							type: 'string',
							menu: 'xyz',
						},
					},
				},
				{
					opcode: 'getObjectScale',
					blockType: 'reporter',
					text: this.formatMessage('RenderTheWorld.getObjectScale'),
					arguments: {
						name: {
							type: 'string',
							defaultValue: 'name',
						},
						xyz: {
							type: 'string',
							menu: 'xyz',
						},
					},
				},
				{
					opcode: 'objectLoadingCompleted',
					blockType: 'hat',
					text: this.formatMessage('RenderTheWorld.objectLoadingCompleted'),
					arguments: {
						name: {
							type: 'ccw_hat_parameter',
							defaultValue: 'name',
						},
					},
				},
				{
					blockType: 'label',
					text: this.formatMessage('RenderTheWorld.lights'),
				},
				{
					opcode: 'makePointLight',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.makePointLight'),
					arguments: {
						name: {
							type: 'string',
							defaultValue: 'name',
						},
						color: {
							type: 'number',
						},
						intensity: {
							type: 'number',
							defaultValue: 100,
						},
						x: {
							type: 'number',
							defaultValue: 0,
						},
						y: {
							type: 'number',
							defaultValue: 0,
						},
						z: {
							type: 'number',
							defaultValue: 0,
						},
						decay: {
							type: 'number',
							defaultValue: 2,
						},
						YN: {
							type: 'string',
							menu: 'YN',
						},
					},
				},
				{
					opcode: 'setAmbientLightColor',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.setAmbientLightColor'),
					arguments: {
						color: {
							type: 'number',
						},
						intensity: {
							type: 'number',
							defaultValue: 1,
						},
					},
				},
				{
					opcode: 'setHemisphereLightColor',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.setHemisphereLightColor'),
					arguments: {
						skyColor: {
							type: 'number',
						},
						groundColor: {
							type: 'number',
						},
						intensity: {
							type: 'number',
							defaultValue: 1,
						},
					},
				},
				{
					opcode: 'moveLight',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.moveLight'),
					arguments: {
						name: {
							type: 'string',
							defaultValue: 'name',
						},
						x: {
							type: 'number',
							defaultValue: 0,
						},
						y: {
							type: 'number',
							defaultValue: 0,
						},
						z: {
							type: 'number',
							defaultValue: 0,
						},
					},
				},
				{
					opcode: 'getLightPos',
					blockType: 'reporter',
					text: this.formatMessage('RenderTheWorld.getLightPos'),
					arguments: {
						name: {
							type: 'string',
							defaultValue: 'name',
						},
						xyz: {
							type: 'string',
							menu: 'xyz',
						},
					},
				},
				{
					opcode: 'deleteLight',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.deleteLight'),
					arguments: {
						name: {
							type: 'string',
							defaultValue: 'name',
						},
					},
				},
				{
					blockType: 'label',
					text: this.formatMessage('RenderTheWorld.camera'),
				},
				{
					opcode: 'moveCamera',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.moveCamera'),
					arguments: {
						x: {
							type: 'number',
							defaultValue: 0,
						},
						y: {
							type: 'number',
							defaultValue: 0,
						},
						z: {
							type: 'number',
							defaultValue: 0,
						},
					},
				},
				{
					opcode: 'rotationCamera',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.rotationCamera'),
					arguments: {
						x: {
							type: 'number',
							defaultValue: 0,
						},
						y: {
							type: 'number',
							defaultValue: 0,
						},
						z: {
							type: 'number',
							defaultValue: 0,
						},
					},
				},
				{
					opcode: 'cameraLookAt',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.cameraLookAt'),
					arguments: {
						x: {
							type: 'number',
							defaultValue: 0,
						},
						y: {
							type: 'number',
							defaultValue: 0,
						},
						z: {
							type: 'number',
							defaultValue: 0,
						},
					},
				},
				{
					opcode: 'getCameraPos',
					blockType: 'reporter',
					text: this.formatMessage('RenderTheWorld.getCameraPos'),
					arguments: {
						xyz: {
							type: 'string',
							menu: 'xyz',
						},
					},
					disableMonitor: true,
				},
				{
					opcode: 'getCameraRotation',
					blockType: 'reporter',
					text: this.formatMessage('RenderTheWorld.getCameraRotation'),
					arguments: {
						xyz: {
							type: 'string',
							menu: 'xyz',
						},
					},
					disableMonitor: true,
				},
				{
					blockType: 'label',
					text: this.formatMessage('RenderTheWorld.fogs'),
				},
				{
					opcode: 'enableFogEffect',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.enableFogEffect'),
					arguments: {
						color: {
							type: 'number',
						},
						near: {
							type: 'number',
							defaultValue: 1,
						},
						far: {
							type: 'number',
							defaultValue: 1000,
						},
					},
				},
				{
					opcode: 'disableFogEffect',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.disableFogEffect'),
				},
				{
					blockType: 'label',
					text: this.formatMessage('RenderTheWorld.tools'),
				},
				{
					opcode: 'controlCamera',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.controlCamera'),
					hideFromPalette: !0,
					arguments: {
						yn1: {
							type: 'string',
							menu: 'YN',
						},
						yn2: {
							type: 'string',
							menu: 'YN',
						},
						yn3: {
							type: 'string',
							menu: 'YN',
						},
					},
				},
				{
					opcode: 'color_',
					blockType: 'reporter',
					text: this.formatMessage('RenderTheWorld.color_'),
					arguments: {
						R: {
							type: 'number',
							defaultValue: 255,
						},
						G: {
							type: 'number',
							defaultValue: 255,
						},
						B: {
							type: 'number',
							defaultValue: 255,
						},
					},
				},
				{
					opcode: 'isWebGLAvailable',
					blockType: 'command',
					text: this.formatMessage('RenderTheWorld.isWebGLAvailable'),
				},
				{
					opcode: '_isWebGLAvailable',
					blockType: 'Boolean',
					text: this.formatMessage('RenderTheWorld._isWebGLAvailable'),
				},
			],

			menus: {
				file_list: {
					items: '__gandiAssetsJsonFileList',
				},
				xyz: {
					acceptReporters: false,
					items: [
						{
							text: this.formatMessage('RenderTheWorld.xyz.x'),
							value: 'x',
						},
						{
							text: this.formatMessage('RenderTheWorld.xyz.y'),
							value: 'y',
						},
						{
							text: this.formatMessage('RenderTheWorld.xyz.z'),
							value: 'z',
						},
					],
				},
				Anti_Aliasing: {
					acceptReporters: false,
					items: [
						{
							text: this.formatMessage('RenderTheWorld.Anti_Aliasing.enable'),
							value: 'enable',
						},
						{
							text: this.formatMessage('RenderTheWorld.Anti_Aliasing.disable'),
							value: 'disable',
						},
					],
				},
				YN: {
					acceptReporters: false,
					items: [
						{
							text: this.formatMessage('RenderTheWorld.YN.true'),
							value: 'true',
						},
						{
							text: this.formatMessage('RenderTheWorld.YN.false'),
							value: 'false',
						},
					],
				},
				'3dState': {
					acceptReporters: false,
					items: [
						{
							text: this.formatMessage('RenderTheWorld.3dState.display'),
							value: 'display',
						},
						{
							text: this.formatMessage('RenderTheWorld.3dState.hidden'),
							value: 'hidden',
						},
					],
				},
			},
		};
	}
	__gandiAssetsJsonFileList() {
		const list = this.runtime
		  .getGandiAssetsFileList('json')
		  .map((item) => item.name);
		if (list.length < 1) {
		    return [
				{
				  text: this.formatMessage('RenderTheWorld.fileListEmpty'),
				  value: 'fileListEmpty'
				}
			];
		}
		
		return list;
	}

	getFileURL(filename) {
		// console.log(this.runtime.getGandiAssetContent(filename));
		return this.runtime.getGandiAssetContent(filename).encodeDataURI();
	}

	docs() {
		let a = document.createElement('a');
		a.href = 'https://learn.ccw.site/article/aa0cf6d0-6758-447a-96f5-8e5dfdbe14d6';
		a.rel = 'noopener noreferrer';
		a.target = '_blank';	
		a.click();
	}

	/**
	 * 兼容性检查
	 */
	// @ts-ignore
	isWebGLAvailable(args) {
		this.isWebglAvailable = WebGL.isWebGLAvailable();
	}
	/**
	 * 兼容性
	 * @return {boolean}
	 */
	// @ts-ignore
	_isWebGLAvailable(args) {
		return this.isWebglAvailable;
	}

	objectLoadingCompleted({name}) {
		// @ts-ignore
		if (Scratch.Cast.toString(name) in this.objects) {
			return true;
		} else {
			return false;
		}
	}

	_deleteObject(model) {
		if (model.type === 'Mesh') {
			model.geometry.dispose();
			model.material.dispose();
		} else if (model.type === 'Group') {
			model.traverse((obj) => {
				if (obj.type === 'Mesh') {
					obj.geometry.dispose();
					if (Array.isArray(obj.material)) {
						obj.material.forEach((mat) => {
							mat.dispose();
						});
					} else {
						obj.material.dispose();
					}
				}
			});
		}

		// console.log('===========================');
		// console.log(model);
		// console.log('===========================');
		this.scene.remove(model);
	}

	/**
	 * 初始化
	 * @param {object} args
	 * @param {number} args.color
	 * @param {number} args.sizey
	 * @param {number} args.sizex
	 * @param {string} args.Anti_Aliasing
	 */
	init({color, sizex, sizey, Anti_Aliasing}) {
		// this._ccw.style.display = 'none';  // 隐藏原CCW显示canvas

		// 创建threejs显示canvas
		//this._ccw = document.getElementsByClassName('gandi_stage_stage_1fD7k')[0].getElementsByTagName('canvas')[0];
		if (
			this.scratchCanvas.parentElement.getElementsByClassName('RenderTheWorld')
				.length == 0
		) {
			this.tc = document.createElement('canvas');
			this.tc.className = 'RenderTheWorld';
			this.scratchCanvas.before(this.tc);
		}

		this.tc.style.display = 'block';

		// this.runtime.renderer.resize = (e, t) => {
		// 	this.__resize.call(this.runtime.renderer, e, t);
		// 	this._resize();
		// };
		// this.runtime.renderer.draw = () => {
		// 	if (!this.isTcShow) {
		// 		this.__draw.call(this.runtime.renderer);
		// 	}
		// };

		let _antialias = false;
		// 是否启动抗锯齿
		// @ts-ignore
		if (Scratch.Cast.toString(Anti_Aliasing) == 'enable') {
			_antialias = true;
		}
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.tc,
			antialias: _antialias,
		}); // 创建渲染器
		this.renderer.setClearColor('#000000'); // 设置渲染器背景
		// @ts-ignore
		this.renderer.shadowMap.enabled = true;
		//this.renderer.setSize(this.tc.clientWidth, this.tc.clientHeight, false);
		this.renderer.setSize(
			// @ts-ignore
			Scratch.Cast.toNumber(sizex),
			// @ts-ignore
			Scratch.Cast.toNumber(sizey),
		);
		this.renderer.outputColorSpace = THREE.SRGBColorSpace;

		this.scene = new THREE.Scene(); // 创建场景
		// @ts-ignore
		this.scene.background = new THREE.Color(Scratch.Cast.toNumber(color)); // 设置背景颜色

		// 创建摄像机
		this.fov = 40; // 视野范围
		// this.aspect = this.runtime.stageWidth / this.runtime.stageHeight; // 相机默认值 画布的宽高比
		this.aspect = this.tc.clientWidth / this.tc.clientHeight; // 相机默认值 画布的宽高比
		this.near = 0.1; // 近平面
		this.far = 1000; // 远平面
		// 透视投影相机
		this.camera = new THREE.PerspectiveCamera(
			this.fov,
			this.aspect,
			this.near,
			this.far,
		);
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.controls.enablePan = false; //禁止右键拖拽
		this.controls.enableZoom = false; //禁止缩放
		this.controls.enableRotate = false; //禁止旋转
		this.controls.update();
		this.controls.addEventListener('change', this.render);

		// 创建环境光
		this.ambient_light = new THREE.AmbientLight(0x000000);
		this.scene.add(this.ambient_light);

		// 创建半球光
		this.hemisphere_light = new THREE.HemisphereLight(0x000000, 0x000000);
		this.scene.add(this.hemisphere_light);

		// console.log(THREE);
		// console.log(this.renderer);
		// console.log(this.scene);
		// console.log(this.camera);

		this.tc.style.width = this.scratchCanvas.style.width;
		this.tc.style.height = this.scratchCanvas.style.height;
		this.tc.style.display = 'none'; // 默认隐藏
		this.isTcShow = false;
	}

	/**
	 * 设置3d渲染器状态
	 * @param {object} args
	 * @param {string} args.state
	 */
	// @ts-ignore
	set3dState({state}) {
		if (!this.tc) { return "<span>⚠️显示器未初始化！</span>";}

		// @ts-ignore
		if (Scratch.Cast.toString(state) === 'display') {
			this.tc.style.display = 'block';
			this.isTcShow = true;
		} else {
			this.tc.style.display = 'none';
			this.isTcShow = false;
		}
	}

	// @ts-ignore
	get3dState(args) {
		return this.isTcShow;
	}

	// _resize() {
	// 	this.tc.style.width = this.scratchCanvas.style.width;
	// 	this.tc.style.height = this.scratchCanvas.style.height;
	// }

	/**
	 * 渲染，放在主循环里
	 */
	// @ts-ignore
	render(args) {
		if (!this.tc) { return "⚠️显示器未初始化！";}
		this.renderer.render(this.scene, this.camera);
	}

	/**
	 * 创建或重置长方体
	 * @param {object} args
	 * @param {string} args.name
	 * @param {number} args.a
	 * @param {number} args.b
	 * @param {number} args.h
	 * @param {number} args.color
	 * @param {number} args.x
	 * @param {number} args.y
	 * @param {number} args.z
	 * @param {string} args.YN
	 * @param {string} args.YN2
	 */
	// @ts-ignore
	makeCube({name, a, b, h, color, x, y, z, YN, YN2}) {
		if (!this.tc) { return "⚠️显示器未初始化！";}
		// 名称
		// @ts-ignore
		name = Scratch.Cast.toString(name);
		// 长方体
		let geometry = new THREE.BoxGeometry(
			// @ts-ignore
			Scratch.Cast.toNumber(a),
			// @ts-ignore
			Scratch.Cast.toNumber(b),
			// @ts-ignore
			Scratch.Cast.toNumber(h),
		);
		// let material = new THREE.MeshPhongMaterial({
		//     color: Scratch.Cast.toNumber(args.color),
		// });
		// 纹理
		let material = new THREE.MeshLambertMaterial({
			// @ts-ignore
			color: Scratch.Cast.toNumber(color),
		});
		material.fog = true;

		// 添加到场景
		if (name in this.objects) {
			this._deleteObject(this.objects[name]);
		}
		// @ts-ignore
		this.objects[name] = new THREE.Mesh(geometry, material);
		this.objects[name].position.set(
			// @ts-ignore
			Scratch.Cast.toNumber(x),
			// @ts-ignore
			Scratch.Cast.toNumber(y),
			// @ts-ignore
			Scratch.Cast.toNumber(z),
		);
		// @ts-ignore
		if (Scratch.Cast.toString(YN) == 'true') {
			this.objects[name].castShadow = true;
		}
		// @ts-ignore
		if (Scratch.Cast.toString(YN2) == 'true') {
			this.objects[name].receiveShadow = true;
		}
		this.runtime.startHatsWithParams(
			chen_RenderTheWorld_extensionId + '_objectLoadingCompleted',
			{
				parameters: {
					name: name,
				},
			},
		);
		this.scene.add(this.objects[name]);
	}

	/**
	 * 创建或重置球体
	 * @param {object} args
	 * @param {string} args.name
	 * @param {number} args.radius
	 * @param {number} args.w
	 * @param {number} args.h
	 * @param {number} args.color
	 * @param {number} args.x
	 * @param {number} args.y
	 * @param {number} args.z
	 * @param {string} args.YN
	 * @param {string} args.YN2
	 */
	// @ts-ignore
	makeSphere({name, radius, w, h, color, x, y, z, YN, YN2}) {
		if (!this.tc) { return "⚠️显示器未初始化！";}
		// 名称
		// @ts-ignore
		name = Scratch.Cast.toString(name);
		// 长方体
		let geometry = new THREE.SphereGeometry(
			// @ts-ignore
			Scratch.Cast.toNumber(radius),
			// @ts-ignore
			Scratch.Cast.toNumber(w),
			// @ts-ignore
			Scratch.Cast.toNumber(h),
		);
		// let material = new THREE.MeshPhongMaterial({
		//     color: Scratch.Cast.toNumber(args.color),
		// });
		// 纹理
		let material = new THREE.MeshLambertMaterial({
			// @ts-ignore
			color: Scratch.Cast.toNumber(color),
		});
		material.fog = true;

		// 添加到场景
		if (name in this.objects) {
			this._deleteObject(this.objects[name]);
		}
		// @ts-ignore
		this.objects[name] = new THREE.Mesh(geometry, material);
		this.objects[name].position.set(
			// @ts-ignore
			Scratch.Cast.toNumber(x),
			// @ts-ignore
			Scratch.Cast.toNumber(y),
			// @ts-ignore
			Scratch.Cast.toNumber(z),
		);
		// @ts-ignore
		if (Scratch.Cast.toString(YN) == 'true') {
			this.objects[name].castShadow = true;
		}
		// @ts-ignore
		if (Scratch.Cast.toString(YN2) == 'true') {
			this.objects[name].receiveShadow = true;
		}
		this.runtime.startHatsWithParams(
			chen_RenderTheWorld_extensionId + '_objectLoadingCompleted',
			{
				parameters: {
					name: name,
				},
			},
		);
		this.scene.add(this.objects[name]);
	}

	/**
	 * 创建或重置平面
	 * @param {object} args
	 * @param {string} args.name
	 * @param {number} args.a
	 * @param {number} args.b
	 * @param {number} args.color
	 * @param {number} args.x
	 * @param {number} args.y
	 * @param {number} args.z
	 * @param {string} args.YN
	 * @param {string} args.YN2
	 */
	// @ts-ignore
	makePlane({name, a, b, color, x, y, z, YN, YN2}) {
		if (!this.tc) { return "⚠️显示器未初始化！";}
		// 名称
		// @ts-ignore
		name = Scratch.Cast.toString(name);
		// 长方体
		let geometry = new THREE.PlaneGeometry(
			// @ts-ignore
			Scratch.Cast.toNumber(a),
			// @ts-ignore
			Scratch.Cast.toNumber(b),
		);
		// let material = new THREE.MeshPhongMaterial({
		//     color: Scratch.Cast.toNumber(args.color),
		// });
		// 纹理
		let material = new THREE.MeshLambertMaterial({
			// @ts-ignore
			color: Scratch.Cast.toNumber(color),
		});
		material.fog = true;

		// 添加到场景
		if (name in this.objects) {
			this._deleteObject(this.objects[name]);
		}
		// @ts-ignore
		this.objects[name] = new THREE.Mesh(geometry, material);
		this.objects[name].position.set(
			// @ts-ignore
			Scratch.Cast.toNumber(x),
			// @ts-ignore
			Scratch.Cast.toNumber(y),
			// @ts-ignore
			Scratch.Cast.toNumber(z),
		);
		// @ts-ignore
		if (Scratch.Cast.toString(YN) == 'true') {
			this.objects[name].castShadow = true;
		}
		// @ts-ignore
		if (Scratch.Cast.toString(YN2) == 'true') {
			this.objects[name].receiveShadow = true;
		}
		this.runtime.startHatsWithParams(
			chen_RenderTheWorld_extensionId + '_objectLoadingCompleted',
			{
				parameters: {
					name: name,
				},
			},
		);
		this.scene.add(this.objects[name]);
	}

	/**
	 * 导入或重置OBJ模型
	 * @param {object} args
	 * @param {string} args.name
	 * @param {string} args.objfile
	 * @param {string} args.mtlfile
	 * @param {number} args.x
	 * @param {number} args.y
	 * @param {number} args.z
	 * @param {string} args.YN
	 * @param {string} args.YN2
	 */
	// @ts-ignore
	importOBJ({name, objfile, mtlfile, x, y, z, YN, YN2}) {
		if (!this.tc) { return "⚠️显示器未初始化！";}
		// @ts-ignore
		if (objfile == 'fileListEmpty') { return }
		// 名称
		// @ts-ignore
		name = Scratch.Cast.toString(name);
		// 创建加载器
		const objLoader = new OBJLoader();
		const mtlLoader = new MTLLoader();
		// 添加到场景
		if (name in this.objects) {
			this._deleteObject(this.objects[name]);
		}
		// 加载模型
		// @ts-ignore
		mtlLoader.load(this.getFileURL(Scratch.Cast.toString(mtlfile)), (mtl) => {
			mtl.preload();
			objLoader.setMaterials(mtl);
			// @ts-ignore
			objLoader.load(this.getFileURL(Scratch.Cast.toString(objfile)), (root) => {
				// console.log('--------');
				// console.log(root);
				// console.log('--------');
				this.objects[name] = root;
				// this.objects[name].position.set(Scratch.Cast.toNumber(args.x), Scratch.Cast.toNumber(args.y), Scratch.Cast.toNumber(args.z));
				// @ts-ignore
				this.objects[name].position.x = Scratch.Cast.toNumber(x);
				// @ts-ignore
				this.objects[name].position.y = Scratch.Cast.toNumber(y);
				// @ts-ignore
				this.objects[name].position.z = Scratch.Cast.toNumber(z);
				// @ts-ignore
				if (Scratch.Cast.toString(YN) == 'true') {
					this.objects[name].castShadow = true;
				}
				// @ts-ignore
				if (Scratch.Cast.toString(YN2) == 'true') {
					this.objects[name].receiveShadow = true;
				}
				for (let i = 0; i < this.objects[name].children.length; i++) {
					// @ts-ignore
					if (Scratch.Cast.toString(YN) == 'true') {
						this.objects[name].children[i].castShadow = true;
					}
					// @ts-ignore
					if (Scratch.Cast.toString(YN2) == 'true') {
						this.objects[name].children[i].receiveShadow = true;
					}
				}
				// console.log(this.objects[name]);
				this.runtime.startHatsWithParams(
					chen_RenderTheWorld_extensionId + '_objectLoadingCompleted',
					{
						parameters: {
							name: name,
						},
					},
				);
				this.scene.add(this.objects[name]);
			});
		});
	}

	/**
	 * 导入或重置GLTF模型
	 * @param {object} args
	 * @param {object} args
	 * @param {string} args.name
	 * @param {string} args.gltffile
	 * @param {number} args.x
	 * @param {number} args.y
	 * @param {number} args.z
	 * @param {string} args.YN
	 * @param {string} args.YN2
	 */
	// @ts-ignore
	importGLTF({name, gltffile, x, y, z, YN, YN2}) {
		if (!this.tc) { return "⚠️显示器未初始化！";}
		// @ts-ignore
		if (gltffile == 'fileListEmpty') { return }
		// console.log(args.mtlfile, args);
		// 名称
		// @ts-ignore
		name = Scratch.Cast.toString(name);
		// 创建加载器
		const gltfLoader = new GLTFLoader();
		// @ts-ignore
		const url = this.getFileURL(Scratch.Cast.toString(gltffile));
		// 添加到场景
		// console.log(name, name in this.objects);
		if (name in this.objects) {
			this._deleteObject(this.objects[name]);
		}
		// 加载模型
		gltfLoader.load(url, (gltf) => {
			const root = gltf.scene;
			this.objects[name] = root;
			// @ts-ignore
			this.objects[name].position.x = Scratch.Cast.toNumber(x);
			// @ts-ignore
			this.objects[name].position.y = Scratch.Cast.toNumber(y);
			// @ts-ignore
			this.objects[name].position.z = Scratch.Cast.toNumber(z);
			// @ts-ignore
			if (Scratch.Cast.toString(YN) == 'true') {
				this.objects[name].castShadow = true;
			}
			// @ts-ignore
			if (Scratch.Cast.toString(YN2) == 'true') {
				this.objects[name].receiveShadow = true;
			}
			for (let i = 0; i < this.objects[name].children.length; i++) {
				// @ts-ignore
				if (Scratch.Cast.toString(YN) == 'true') {
					this.objects[name].children[i].castShadow = true;
				}
				// @ts-ignore
				if (Scratch.Cast.toString(YN2) == 'true') {
					this.objects[name].children[i].receiveShadow = true;
				}
			}
			this.runtime.startHatsWithParams(
				chen_RenderTheWorld_extensionId + '_objectLoadingCompleted',
				{
					parameters: {
						name: name,
					},
				},
			);
			this.scene.add(this.objects[name]);
			console.log(this.objects[name]);
			console.log(this.scene);
			// console.log(this.objects[name], this.scene);
		});
	}

	/**
	 * 删除物体
	 * @param {object} args
	 * @param {string} args.name
	 */
	// @ts-ignore
	deleteObject({name}) {
		if (!this.tc) { return "⚠️显示器未初始化！";}
		// @ts-ignore
		name = Scratch.Cast.toString(name);
		if (name in this.objects) {
			this._deleteObject(this.objects[name]);
		}
	}

	// @ts-ignore
	rotationObject({name, x, y, z}) {
		if (!this.tc) { return "⚠️显示器未初始化！";}
		// @ts-ignore
		name = Scratch.Cast.toString(name);
		if (name in this.objects) {
			// 设置旋转角度
			this.objects[name].rotation.set(
				// @ts-ignore
				THREE.MathUtils.degToRad(Scratch.Cast.toNumber(x)),
				// @ts-ignore
				THREE.MathUtils.degToRad(Scratch.Cast.toNumber(y)),
				// @ts-ignore
				THREE.MathUtils.degToRad(Scratch.Cast.toNumber(z)),
			);
		} else {
			// @ts-ignore
			return;
		}
	}

	// @ts-ignore
	moveObject({name, x, y, z}) {
		if (!this.tc) { return "⚠️显示器未初始化！";}
		// @ts-ignore
		name = Scratch.Cast.toString(name);
		if (name in this.objects) {
			// 设置坐标
			this.objects[name].position.set(
				// @ts-ignore
				Scratch.Cast.toNumber(x),
				// @ts-ignore
				Scratch.Cast.toNumber(y),
				// @ts-ignore
				Scratch.Cast.toNumber(z),
			);
		} else {
			// @ts-ignore
			return;
		}
	}

	// @ts-ignore
	scaleObject({name, x, y, z}) {
		if (!this.tc) { return "⚠️显示器未初始化！";}
		// @ts-ignore
		name = Scratch.Cast.toString(name);
		if (name in this.objects) {
			// 设置缩放
			this.objects[name].scale.set(
				// @ts-ignore
				Scratch.Cast.toNumber(x),
				// @ts-ignore
				Scratch.Cast.toNumber(y),
				// @ts-ignore
				Scratch.Cast.toNumber(z),
			);
		} else {
			// @ts-ignore
			return;
		}
	}

	/**
	 * 获取物体坐标
	 * @param {object} args
	 * @param {string} args.name
	 * @param {string} args.xyz
	 */
	getObjectPos({name, xyz}) {
		// @ts-ignore
		name = Scratch.Cast.toString(name);
		if (name in this.objects) {
			// @ts-ignore
			switch (Scratch.Cast.toString(xyz)) {
				case 'x':
					return this.objects[name].position.x;
				case 'y':
					return this.objects[name].position.y;
				case 'z':
					return this.objects[name].position.z;
			}
		} else {
			return;
		}
	}

	/**
	 * 获取物体旋转角度
	 * @param {object} args
	 * @param {string} args.name
	 * @param {string} args.xyz
	 */
	// @ts-ignore
	getObjectRotation({name, xyz}) {
		// @ts-ignore
		name = Scratch.Cast.toString(name);
		if (name in this.objects) {
			// @ts-ignore
			switch (Scratch.Cast.toString(xyz)) {
				case 'x':
					return THREE.MathUtils.radToDeg(this.objects[name].rotation.x);
				case 'y':
					return THREE.MathUtils.radToDeg(this.objects[name].rotation.y);
				case 'z':
					return THREE.MathUtils.radToDeg(this.objects[name].rotation.z);
			}
		} else {
			// @ts-ignore
			return;
		}
	}

	/**
	 * 获取物体缩放
	 * @param {object} args
	 * @param {string} args.name
	 * @param {string} args.xyz
	 */
	getObjectScale({name, xyz}) {
		// @ts-ignore
		name = Scratch.Cast.toString(name);
		if (name in this.objects) {
			// @ts-ignore
			switch (Scratch.Cast.toString(xyz)) {
				case 'x':
					return this.objects[name].scale.x;
				case 'y':
					return this.objects[name].scale.y;
				case 'z':
					return this.objects[name].scale.z;
			}
		} else {
			return;
		}
	}

	/**
	 * 创建或重置点光源
	 * [name] 颜色: [color] 光照强度: [intensity] 位置:x[x] y[y] z[z]
	 * @param {object} args
	 * @param {string} args.name
	 * @param {number} args.color
	 * @param {number} args.intensity
	 * @param {number} args.x
	 * @param {number} args.y
	 * @param {number} args.z
	 * @param {number} args.decay
	 * @param {string} args.YN
	 */
	// @ts-ignore
	makePointLight({name, color, intensity, x, y, z, decay, YN}) {
		if (!this.tc) { return "⚠️显示器未初始化！";}
		// @ts-ignore
		name = Scratch.Cast.toString(name);
		// 创建点光源
		if (name in this.lights) {
			this._deleteObject(this.lights[name]);
			this.lights[name].dispose();
		}
		this.lights[name] = new THREE.PointLight(
			// @ts-ignore
			Scratch.Cast.toNumber(color),
			// @ts-ignore
			Scratch.Cast.toNumber(intensity),
			0,
			// @ts-ignore
			Scratch.Cast.toNumber(decay),
		); //创建光源
		this.lights[name].position.set(
			// @ts-ignore
			Scratch.Cast.toNumber(x),
			// @ts-ignore
			Scratch.Cast.toNumber(y),
			// @ts-ignore
			Scratch.Cast.toNumber(z),
		); //设置光源的位置
		// @ts-ignore
		if (Scratch.Cast.toString(YN) == 'true') {
			this.lights[name].castShadow = true;
		}
		this.scene.add(this.lights[name]); //在场景中添加光源
	}

	// @ts-ignore
	moveLight({name, x, y, z}) {
		if (!this.tc) { return "⚠️显示器未初始化！";}
		// @ts-ignore
		name = Scratch.Cast.toString(name);
		if (name in this.lights) {
			// 设置坐标
			this.lights[name].position.set(
				// @ts-ignore
				Scratch.Cast.toNumber(x),
				// @ts-ignore
				Scratch.Cast.toNumber(y),
				// @ts-ignore
				Scratch.Cast.toNumber(z),
			);
		} else {
			// @ts-ignore
			return;
		}
	}

	getLightPos({name, xyz}) {
		// @ts-ignore
		name = Scratch.Cast.toString(name);
		if (name in this.lights) {
			// @ts-ignore
			switch (Scratch.Cast.toString(xyz)) {
				case 'x':
					return this.lights[name].position.x;
				case 'y':
					return this.lights[name].position.y;
				case 'z':
					return this.lights[name].position.z;
			}
		} else {
			return;
		}
	}

	// @ts-ignore
	deleteLight({name}) {
		if (!this.tc) { return "⚠️显示器未初始化！";}
		// @ts-ignore
		name = Scratch.Cast.toString(name);

		if (name in this.lights) {
			this._deleteObject(this.lights[name]);
		}
	}

	/**
	 * 设置环境光颜色
	 * @param {object} args
	 * @param {number} args.color
	 * @param {number} args.intensity
	 */
	// @ts-ignore
	setAmbientLightColor({color, intensity}) {
		if (!this.tc) { return "⚠️显示器未初始化！";}
		// 设置环境光颜色
		this.ambient_light.color = new THREE.Color(
			// @ts-ignore
			Scratch.Cast.toNumber(color),
		);
		// @ts-ignore
		this.ambient_light.intensity = Scratch.Cast.toNumber(intensity);
	}

	/**
	 * 设置环境光颜色
	 * @param {object} args
	 * @param {number} args.skyColor
	 * @param {number} args.groundColor
	 * @param {number} args.intensity
	 */
	// @ts-ignore
	setHemisphereLightColor({skyColor, groundColor, intensity}) {
		if (!this.tc) { return "⚠️显示器未初始化！";}
		// 设置环境光颜色
		this.hemisphere_light.color = new THREE.Color(
			// @ts-ignore
			Scratch.Cast.toNumber(skyColor),
		);
		this.hemisphere_light.groundColor = new THREE.Color(
			// @ts-ignore
			Scratch.Cast.toNumber(groundColor),
		);
		// @ts-ignore
		this.hemisphere_light.intensity = Scratch.Cast.toNumber(intensity);
	}

	/**
	 * 移动相机
	 * @param {object} args
	 * @param {number} args.x
	 * @param {number} args.y
	 * @param {number} args.z
	 */
	// @ts-ignore
	moveCamera({x, y, z}) {
		if (!this.tc) { return "⚠️显示器未初始化！";}
		// @ts-ignore
		this.camera.position.set(
			// @ts-ignore
			Scratch.Cast.toNumber(x),
			// @ts-ignore
			Scratch.Cast.toNumber(y),
			// @ts-ignore
			Scratch.Cast.toNumber(z),
		);
	}

	/**
	 * 旋转相机
	 * @param {object} args
	 * @param {number} args.x
	 * @param {number} args.y
	 * @param {number} args.z
	 */
	// @ts-ignore
	rotationCamera({x, y, z}) {
		if (!this.tc) { return "⚠️显示器未初始化！";}
		// @ts-ignore
		this.camera.rotation.set(
			// @ts-ignore
			THREE.MathUtils.degToRad(Scratch.Cast.toNumber(x)),
			// @ts-ignore
			THREE.MathUtils.degToRad(Scratch.Cast.toNumber(y)),
			// @ts-ignore
			THREE.MathUtils.degToRad(Scratch.Cast.toNumber(z)),
		);
	}

	/**
	 * 让相机面向
	 * @param {object} args
	 * @param {number} args.x
	 * @param {number} args.y
	 * @param {number} args.z
	 */
	// @ts-ignore
	cameraLookAt({x, y, z}) {
		if (!this.tc) { return "⚠️显示器未初始化！";}
		this.camera.lookAt(
			// @ts-ignore
			Scratch.Cast.toNumber(x),
			// @ts-ignore
			Scratch.Cast.toNumber(y),
			// @ts-ignore
			Scratch.Cast.toNumber(z),
		);
	}

	/**
	 * 获取相机坐标
	 * @param {object} args
	 * @param {string} args.xyz
	 */
	getCameraPos({xyz}) {
		// console.log(this.camera);
		// @ts-ignore
		switch (Scratch.Cast.toString(xyz)) {
			case 'x':
				// @ts-ignore
				return this.camera.position.x;
			case 'y':
				// @ts-ignore
				return this.camera.position.y;
			case 'z':
				// @ts-ignore
				return this.camera.position.z;
		}
	}

	/**
	 * 获取相机旋转角度
	 * @param {object} args
	 * @param {string} args.xyz
	 */
	// @ts-ignore
	getCameraRotation({xyz}) {
		// @ts-ignore
		switch (Scratch.Cast.toString(xyz)) {
			case 'x':
				// @ts-ignore
				return THREE.MathUtils.radToDeg(this.camera.rotation.x);
			case 'y':
				// @ts-ignore
				return THREE.MathUtils.radToDeg(this.camera.rotation.y);
			case 'z':
				// @ts-ignore
				return THREE.MathUtils.radToDeg(this.camera.rotation.z);
		}
	}

	/**
	 * 鼠标控制相机
	 * @param {object} args
	 * @param {string} args.yn1
	 * @param {string} args.yn2
	 * @param {string} args.yn3
	 */
	controlCamera({yn1, yn2, yn3}) {
		let enablePan = false;
		let enableZoom = false;
		let enableRotate = false;
		if (yn1 == 'true') {
			enablePan = true;
		}
		if (yn2 == 'true') {
			enableZoom = true;
		}
		if (yn3 == 'true') {
			enableRotate = true;
		}
		// console.log(enablePan);
		// console.log(enableZoom);
		// console.log(enableRotate);

		this.controls.enablePan = enablePan;
		this.controls.enableZoom = enableZoom;
		this.controls.enableRotate = enableRotate;
	}

	/**
	 * 启用雾效果并设置雾颜色
	 * @param {object} args
	 * @param {number} args.color
	 * @param {number} args.near
	 * @param {number} args.far
	 */
	// @ts-ignore
	enableFogEffect({color, near, far}) {
		if (!this.tc) { return "⚠️显示器未初始化！";}
		this.scene.fog = new THREE.Fog(
			// @ts-ignore
			Scratch.Cast.toNumber(color),
			// @ts-ignore
			Scratch.Cast.toNumber(near),
			// @ts-ignore
			Scratch.Cast.toNumber(far),
		);
	}

	/**
	 * 禁用雾效果
	 */
	// @ts-ignore
	disableFogEffect(args) {
		if (!this.tc) { return "⚠️显示器未初始化！";}
		this.scene.fog = null;
	}

	/**
	 * 处理颜色
	 * @param {object} args
	 * @param {number} args.R
	 * @param {number} args.G
	 * @param {number} args.B
	 * @return {number}
	 */
	color_({R, G, B}) {
		return (
			// @ts-ignore
			Math.min(Math.max(Scratch.Cast.toNumber(R), 0), 255) * 65536 +
			// @ts-ignore
			Math.min(Math.max(Scratch.Cast.toNumber(G), 0), 255) * 256 +
			// @ts-ignore
			Math.min(Math.max(Scratch.Cast.toNumber(B), 0), 255)
		);
	}
}

window.tempExt = {
	// @ts-ignore
	Extension: RenderTheWorld,
	info: {
		name: 'RenderTheWorld.name',
		description: 'RenderTheWorld.descp',
		extensionId: chen_RenderTheWorld_extensionId,
		iconURL: chen_RenderTheWorld_picture,
		insetIconURL: chen_RenderTheWorld_icon,
		featured: true,
		disabled: false,
		collaborator: '陈思翰 @ CCW',
		collaboratorURL: 'https://www.ccw.site/student/643bb84051bc32279f0c3fa0',
		collaboratorList: [
			{
				collaborator: '陈思翰 @ CCW',
				collaboratorURL: 'https://www.ccw.site/student/643bb84051bc32279f0c3fa0',
			},
		],
	},
	l10n: {
		'zh-cn': {
			'RenderTheWorld.name': '渲染世界',
			'RenderTheWorld.descp': '立体空间, WebGL帮你实现!',
		},
		en: {
			'RenderTheWorld.name': 'Render The World',
			'RenderTheWorld.descp': 'WebGL Start!',
		},
	},
};

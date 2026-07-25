"use client";import{n as e,t}from"./react.B3l9tXpq.js";var n=e((e=>{var t=Symbol.for(`react.transitional.element`);function n(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.jsx=n})),r=e(((e,t)=>{t.exports=n()})),i=t(),a=r(),o=`attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`,s=`#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec3 u_colors[8];
uniform vec4 u_scene;      
uniform vec4 u_shape;      
uniform vec4 u_surface;    
uniform vec4 u_finish;     
uniform vec4 u_transform;  
uniform vec4 u_space;      
uniform vec4 u_cursor;

#define u_resolution u_scene.xy
#define u_time u_scene.z
#define u_colorCount u_scene.w
#define u_scale u_shape.x
#define u_intensity u_shape.y
#define u_paramA u_shape.z
#define u_warp u_shape.w
#define u_detail u_surface.x
#define u_contrast u_surface.y
#define u_brightness u_surface.z
#define u_saturation u_surface.w
#define u_hue u_finish.x
#define u_vignette u_finish.y
#define u_blur u_finish.z
#define u_grain u_finish.w

#ifdef GL_FRAGMENT_PRECISION_HIGH
#define u_seed u_transform.x
#else
#define u_seed mod(u_transform.x, 31.0)
#endif
#define u_rotate u_transform.y
#define u_drift u_transform.z
#define u_oklab u_transform.w
#define u_offset u_space.xy
#define u_mouse u_space.zw
#define u_cursorPresence u_cursor.x
#define u_cursorEffect u_cursor.y
#define u_cursorStrength u_cursor.z
#define u_cursorRadius u_cursor.w

float hash21(vec2 p) {
#ifndef GL_FRAGMENT_PRECISION_HIGH
  p = mod(p, 31.0);
#endif
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float grainHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.0, 9.2);
    a *= 0.5;
  }
  return v;
}

vec3 shade(vec2 uv, vec2 p, float t) {
  vec3 acc = u_colors[0] * 0.15;
  float total = 0.15;
  for (int i = 0; i < 8; i++) {
    if (float(i) >= u_colorCount) break;
    float fi = float(i);
    vec2 c = vec2(
      sin(t * (0.21 + fi * 0.071) + fi * 2.4 + u_seed),
      cos(t * (0.17 + fi * 0.093) + fi * 1.7)) * (0.45 + u_intensity * 0.35);
    float w = exp(-dot(p - c, p - c) * 6.0);
    acc += u_colors[i] * w;
    total += w;
  }
  return acc / total;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 screenUv = uv;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float cursorMask = 0.0;

  if (u_cursorPresence > 0.001) {
    vec2 cursor = (0.5 * u_mouse * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec2 cursorDelta = p - cursor;
    if (u_cursorEffect < 0.5) {
      p += cursor * u_cursorPresence * u_cursorStrength * 0.55;
    } else {
      float cursorDistance = length(cursorDelta);
      vec2 cursorDirection = cursorDelta / max(cursorDistance, 0.0001);
      cursorMask = u_cursorPresence * (1.0 - smoothstep(0.0, u_cursorRadius, cursorDistance));
      if (u_cursorEffect < 1.5) {
        p -= cursorDirection * cursorMask * u_cursorStrength * 0.24;
      }
    }
  }

  uv = p * min(u_resolution.x, u_resolution.y) / u_resolution.xy + 0.5;
  p *= u_scale;
  if (abs(u_rotate) > 0.0001) {
    float cr = cos(u_rotate), sr = sin(u_rotate);
    p = mat2(cr, -sr, sr, cr) * p;
  }
  p += u_offset;
  if (u_drift > 0.0001)
    p += u_drift * vec2(sin(u_time * 0.31), cos(u_time * 0.23));

  if (u_warp > 0.0) {
    p += u_warp * (vec2(fbm(p * u_detail + u_seed), fbm(p * u_detail + vec2(5.2, 1.3))) - 0.5);
  }

  vec3 col = shade(uv, p, u_time);
  if (u_vignette > 0.0001) {
    float vd = length(screenUv - 0.5) * 1.41421356;
    col *= 1.0 - u_vignette * smoothstep(0.35, 1.0, vd);
  }
  if (u_grain > 0.0001)
    col += (grainHash(gl_FragCoord.xy + vec2(u_seed * 17.0, u_seed * 31.0)) - 0.5) * u_grain;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 0.7);
}
`,c={colors:[[.035,.055,.1],[.05,.42,.38],[.55,.15,.28],[.35,.18,.6]],colorCount:4,scale:1.5,intensity:.5,paramA:.5,warp:.35,detail:2.2,contrast:1.1,brightness:-.04,saturation:1,hue:0,vignette:.5,blur:0,grain:.02,seed:15,rotate:0,offsetX:0,offsetY:0,drift:.2,cursorEnabled:!0,cursorEffect:1,cursorStrength:.5,cursorRadius:.4,oklab:0,timeScale:1.2},l=new WeakMap;function u({className:e}){let t=(0,i.useRef)(null);return(0,i.useEffect)(()=>{let e=t.current;if(!e)return;let n=l.get(e);n!==void 0&&window.clearTimeout(n),l.delete(e);let r=e.getContext(`webgl`,{antialias:!1,alpha:!0});if(!r)return;let i=(e,t)=>{let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n},a=r.createProgram(),u=i(r.VERTEX_SHADER,o),d=i(r.FRAGMENT_SHADER,s);r.attachShader(a,u),r.attachShader(a,d),r.linkProgram(a),r.deleteShader(u),r.deleteShader(d),r.useProgram(a);let f=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,f),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),r.STATIC_DRAW);let p=r.getAttribLocation(a,`a_position`);r.enableVertexAttribArray(p),r.vertexAttribPointer(p,2,r.FLOAT,!1,0,0);let m={colors:r.getUniformLocation(a,`u_colors`),scene:r.getUniformLocation(a,`u_scene`),shape:r.getUniformLocation(a,`u_shape`),surface:r.getUniformLocation(a,`u_surface`),finish:r.getUniformLocation(a,`u_finish`),transform:r.getUniformLocation(a,`u_transform`),space:r.getUniformLocation(a,`u_space`),cursor:r.getUniformLocation(a,`u_cursor`)},h=new Float32Array(c.colors.flat());r.uniform3fv(m.colors,h),r.uniform4f(m.shape,c.scale,c.intensity,c.paramA,c.warp),r.uniform4f(m.surface,c.detail,c.contrast,c.brightness,c.saturation),r.uniform4f(m.finish,c.hue,c.vignette,c.blur,c.grain),r.uniform4f(m.transform,c.seed,c.rotate,c.drift,c.oklab),r.uniform4f(m.cursor,0,c.cursorEffect,c.cursorStrength,c.cursorRadius);let g=0,_=0,v=0,y=0,b=0,x=0,S=e.getBoundingClientRect(),C=0,w=null,T=document.visibilityState===`visible`,E=!0,D=!1,O=performance.now(),k=()=>{S=e.getBoundingClientRect();let t=Math.min(window.devicePixelRatio||1,2),n=Math.max(1,Math.round(S.width*t)),i=Math.max(1,Math.round(S.height*t));(e.width!==n||e.height!==i)&&(e.width=n,e.height=i,r.viewport(0,0,n,i))};function A(){!D&&T&&E&&C===0&&(C=requestAnimationFrame(F))}let j=t=>{S=e.getBoundingClientRect(),!(S.width===0||S.height===0)&&(g=(t.clientX-S.left)/S.width*2-1,_=-((t.clientY-S.top)/S.height*2-1),v=1,A())},M=()=>{v=0,A()};window.addEventListener(`resize`,()=>{k(),A()}),c.cursorEnabled&&(window.addEventListener(`pointermove`,j,{passive:!0}),window.addEventListener(`pointerleave`,M));let N=new ResizeObserver(()=>{k(),A()});N.observe(e);let P=new IntersectionObserver(([e])=>{E=e?.isIntersecting??!0,E?A():C!==0&&(cancelAnimationFrame(C),C=0,w=null)});P.observe(e);function F(t){if(C=0,D||!T||!E)return;let n=w===null?0:Math.min((t-w)/1e3,.1);w=t;let i=1-Math.exp(-12*n);y+=(g-y)*i,b+=(_-b)*i,x+=(v-x)*i,k(),r.uniform4f(m.scene,e.width,e.height,(t-O)/1e3*c.timeScale,c.colorCount),r.uniform4f(m.space,c.offsetX,c.offsetY,y,b),r.uniform4f(m.cursor,x,c.cursorEffect,c.cursorStrength,c.cursorRadius),r.drawArrays(r.TRIANGLES,0,3),A()}return A(),()=>{D=!0,cancelAnimationFrame(C),N.disconnect(),P.disconnect(),c.cursorEnabled&&(window.removeEventListener(`pointermove`,j),window.removeEventListener(`pointerleave`,M)),r.deleteBuffer(f),r.deleteProgram(a)}},[]),(0,a.jsx)(`canvas`,{ref:t,className:e,style:{display:`block`,width:`100%`,height:`100%`}})}export{u as ShaderBackground};
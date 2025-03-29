const canvas = document.querySelector(`canvas`);

const gl=canvas.getContext(`webgl`); 

 gl.clearColor(0,1,1,1.0);
 gl.clear( gl.COLOR_BUFFER_BIT);

 const point = new Float32Array([

    -0.5,0.5,0.0,
    0.0,0.0,0.0,
    0.5,0.5,0.0
 ]);
 const colour = new Float32Array([   

    0.0,0.0,0.0,1.0,   
    0.0,1.0,1.0,1.0,
    0.0,1.0,0.1,1.0
  ]);
   
   const point_buff = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, point_buff);
   gl.bufferData(gl.ARRAY_BUFFER, point, gl.STATIC_DRAW );
    
   const colour_buff =gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, colour_buff);
   gl.bufferData(gl.ARRAY_BUFFER, colour, gl.STATIC_DRAW);


const vsSource = `

    attribute vec3 pos;
    attribute vec4 col;
    varying vec4 vCol;

    uniform float angle;
    uniform float shift;
uniform float move_up;
    void main(){
        
        gl_Position = vec4(pos.x*cos(angle) - pos.y*sin(angle) ,  pos.y*cos(angle) + pos.x*sin(angle),0.0,1.0)+vec4(shift,0,0,1.0)+vec4( 0,move_up,0,1.0);
   
        
        vCol = col;
 }`;

   const fsSource = `
   precision mediump float;
   varying vec4 vCol;
   
   void main(){
    gl_FragColor = vec4(vCol);
}`;

const vertexshader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexshader,vsSource);
gl.compileShader(vertexshader);

const fragmentshader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentshader,fsSource);
gl.compileShader(fragmentshader);

const program = gl.createProgram();
gl.attachShader(program,vertexshader);
gl.attachShader(program,fragmentshader);
gl.linkProgram(program);


gl.bindBuffer(gl.ARRAY_BUFFER,point_buff);
const attrib_2 = gl.getAttribLocation(program,`pos`);
gl.enableVertexAttribArray(attrib_2);
gl.vertexAttribPointer(attrib_2, 3 /* NOTICE_1*/, gl.FLOAT, false, 0, 0); 


gl.bindBuffer(gl.ARRAY_BUFFER,colour_buff);
const attrib_1 = gl.getAttribLocation(program,`col`);
gl.enableVertexAttribArray(attrib_1);
gl.vertexAttribPointer(attrib_1, 3 /* NOTICE_2*/, gl.FLOAT, false, 0, 0); 


const uniLoc = gl.getUniformLocation(program,`angle`);
const uniLoc_1 = gl.getUniformLocation(program,`shift`);
const uniLoc_2 = gl.getUniformLocation(program,`move_up`);
let shift =0.1;
let myshift= 0.0;
let myshift_1= 0.0;
let myshift_2= 0.0;
draw();

 function draw ()
 {
    gl.clearColor(0,1,1,1.0);
    gl.clear( gl.COLOR_BUFFER_BIT);
   myshift += shift;
   gl.uniform1f(uniLoc,myshift);
   gl.uniform1f(uniLoc_1,myshift_1);
   gl.uniform1f(uniLoc_2,myshift_2);
   gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES,0,3);
window.requestAnimationFrame( draw);

 }

 function rotationMatrix ()
 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const matrix = new Float32Array(16);
  
  if (axis === 'x') {

      matrix.set([
          1, 0, 0, 0,
          0, cos, -sin, 0,
          0, sin, cos, 0,
          0, 0, 0, 1
      ]);
  } else if (axis === 'y') {
      matrix.set([
          cos, 0, sin, 0,
          0, 1, 0, 0,
          -sin, 0, cos, 0,
          0, 0, 0, 1
      ]);
  } else if (axis === 'z') {
      matrix.set([
          cos, -sin, 0, 0,
          sin, cos, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1
      ]);

 }
}
  
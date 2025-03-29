const canvas = document.querySelector (` canvas`);// 1 const canvas, use a small letter "d" for document
const gl =canvas.getContext(webgl);

if ( !gl){ throw new Error (" gl not avalable ");

};
// set the vertex anf 
gl.clearColor(0.0,1.0,0.0,1.0);
gl.clear( gl.COLOR_BUFFER_BIT);
const vertices =new Float32Array([-0.2,-0.2 -0.2,0.2  ,0.2,0.2 ]);
const colour = new Float32Array([  1,0,0  ,0,1,0   ,1,1,1]);// 3 No comma
 
// 4. create a buffer for the position of the vertcis and colour 
const buffer =gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData( gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW );

const cbuffer = gl.createBuffer();
gl.bindBuffer( gl.ARRAY_BUFFER, cbuffer);
gl.bufferData( gl.ARRAY_BUFFER,colour,gl.STATIC_DRAW);
 
// create the vertex shader and the fragment shader 

const vsSource =
`

attribute vec2 pos ;
attribute vec3 col;
varying vec3 vcol;

void main ()
{ 
gl_Position.x = pos.x*cos(0.3)- pos.y*sin(0.3);
gl_Position.y=pos.y*cos(0.3)-pos.x*sin(0.3);
gl_Position.z= 0.0;
gl_Position.w=1.0;
vcol=col;
}
`

const fsSource =`
precision mediump float ;
varying vec3 vcol;
void main (){
gl_FragColor = vec4( vcol,1.0);
}
`
// create the vertex shader 
const vertexShader =gl.createShader(gl.VERTEX_SHADER);
 gl.shaderSource( vertexShader,vsSource);
 gl.compileShader( vertexShader);
 // create the fragment shader 
 const fragmentshader =gl.createShader(gl.FRAGMENT_SHADER);
   gl.shaderSource(fragmentshader,fsSource);
   gl.compileShader( fragmentshader);
   const program =gl.createProgram();
   gl.attachShader( program,vertexShader);
   gl.attachShader( program,fragmentshader);
   gl.linkProgram(program);

   gl.bindBuffer( gl.ARRAY_BUFFER,buffer);
   const positionLocation=gl.getAttribLocation( program,pos);
   gl.enableVertexAttribArray(positionLocation);
   gl.vertexAttribPointer(positionLocation,2,gl.FLOAT, false,0,0);

   gl.bindBuffer( gl.ARRAY_BUFFER, cbuffer);
   const loca=gl.getAttribLocation( program,col);
   gl.enableVertexAttribArray(loca);
   gl.vertexAttribPointer(loca,3,gl.FLOAT, false,0,0);
   gl.useProgram(program);
   gl.drawArrays(gl.TRIANGLE_FAN,0,3);
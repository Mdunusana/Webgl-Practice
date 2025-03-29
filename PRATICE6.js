const canvas= document.querySelector(`canvas`);
const gl =canvas.getContext(`webgl`);
// create the array
gl.clearColor( 1,0,0,1);
gl.clear( gl.COLOR_BUFFER_BIT);
// this one if for creating the vertices for my work 
const points = new Float32Array([
-0.8,-0.8,   -0.5,0.5,   0.2,0.2
]);
const colours = new Float32Array([  
1,0,0,1,    0,1,0,1,     0,0,1,0
  ]);

  // craete buffers for your code 
  const buffer = gl.createBuffer( gl.ARRAY_BUFFER);
  gl.bindBuffer( gl.ARRAY_BUFFER,buffer);
  gl.bufferData( gl.ARRAY_BUFFER,points , gl.STATIC_DRAW);

  const cbuffer =gl.createBuffer( gl.ARRAY_BUFFER);
  gl.bindBuffer( gl.ARRAY_BUFFER,buffer);
  gl.bufferData( gl.ARRAY_BUFFER,colours , gl.STATIC_DRAW);
  // create the vs sorce and the fs source for my code 
  const vsSource=`

  uniform mat4 matz;
  attribute vec2 my_triangle;
  attribute vec4 col;
  varying vec4 vCol;

  
  void main()
  {
  gl_Position= matz*vec4( my_trianlge , 0, 1);
  }
  `;

   const fsSource = `
precision mediump float;
   vCol= col;

   void main()
   {
   
   gl_FragColor =vec4( vcol,1.0);

   }
   `;

// create the shaders for  your code 
const vertexshader= gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource( vertexshader,vsSource);
gl.compileShader( vertexshader);

const fragmentShader=gl.createShader( gl.FRAGEMENT_SHADER);
gl.shaderSource( fragmentShader,fsSource);
gl.compileShader( fragmentShader);
// create the progran for my code 
const program = gl.createProgram();
gl.attachShader( program,fragmentShader);
gl.attachShader( program,vertexShader);
gl.linkProgram( program);
   // create the BGE
   // bind the buffer
   gl.bindBuffer( gl.ARRAY_BUFFER,buffer);
 const positionLocation= gl.getAttribLocation(  program,` pos`);
 const cLocation =gl.getActiveAttribLocation( program,`col`);
 gl.enableVertexAttribArray( positionLocation);
 gl.enableVertexAttribArray( cLocation);
 gl.bindBuffer( gl.ARRAY_BUFFER,buffer);
 gl.vertexAttribPointer( positionLocation,2,gl.FLOAT,false,0,0);
 gl.bindBuffer( gl.ARRAY_BUFFER,cbuffer);
 gl.vertexAttribPointer ( cLocation,3,gl.Float,false,0,0);
 gl.useProgram ( program);
 let angle = 2;
 let matz = gl.getUniformLocation(program, 'matz');
function draw(){
   angle += 0.01;
   gl.clear( gl.COLOR_BUFFER_BIT);
   let rotation = RotateZ(2);
   gl.uniformMatrix4fv(matz, false, rotation);
   gl.drawArrays(gl.TRIENGLES, 0, 3);
}

function RotateZ(angle){
   let sine = Math.sin(angle);
   let cosine = Math.cos(angle)
   return(new Float32Array(
      [
         cosine, -sine, 0, 0,
         sine, cosine, 0, 0,
         0,    0, 1, 0, 
         0, 0, 0, 1
      ]
   ));
}
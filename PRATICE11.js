const canvas= document.querySelector(` canvas`);
const gl=canvas.getContext(` webgl` );

gl.clearColor( 1,0,0,1);
gl.clear( gl.COLOUR_BUFFER_BIT);

const points=new Float32Array([
    -0.6,-0.6,   -0.6,0.6,    0.6,0.6

]);
const color = new Float32Array([

    1,0,0,1 ,      0,1,0,1,      0,0,1,1

]);

const buffer= gl.createBuffer( );
gl.bindBuffer( gl.ARRAY_BUFFER,buffer);
gl.bufferData( gl.ARRAY_BUFFER, points,gl.STATIC_DRAW);

 const cbuffer = gl.createBuffer();
 gl.bindBuffer( gl.ARRAY_BUFFER,cbuffer);
 gl.bufferData( gl.ARRAY_BUFFER,color,gl.STATIC_DRAW);

 //create the vertex and the fragement shders 

 const vsSource=`

 attribute vec2 pos;
 attribute vec3 col;
 varying  vec3 vCol;


 void main()
 {
 gl_Position= vec4( pos,0.0,1.0);// correct color to be w=1.0;
vCol=col;

}
 `;
 const fsSource=`
 precision mediump float;

 varying vec3 vCol;


 void main()
 {

 gl_FragColor= vec4( vCol,1.0);

}
 `;

 // create the shderes for my code 

 const veretexshder=gl.createShader();
 gl.shaderSource( vertexShader, vsSource);
 gl.compileShader( vertexShader);

 const fragmentShader=gl.createShader();
 gl.fragmentShader( fragmentShader,fsSource);
 gl.compileShader( fragmentShader)

 const program=gl.createProgram();
 gl.attaachShader( vertexshder);
 gl.attaachShader( fragmentShader);
 gl.linkProgram( program);


 gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
 const positionLocation=gl.getAttribLocation ( program,` pos`);
 gl.enableVertexAttribArray(positionLocation);
 gl.vertexAttribPointer( positionLocation,2,gl.FLOAT,false,0,0);
  gl.bindBuffer( gl.ARRAY_BUFFER, cbuffer);
  const cLocation =gl.getAttribLocation( program,`col`);
  gl.enableVertexAttribArray(cLocation);
  gl.vertexAttribPointer( cLocation,3,gl.FLOAT,false,0,0);










  

  
/*
let me take note of the part of the ccodes that i normally forget or that i always ommite 
make surebthat i checth for erros on my code anmd makje sure that i don't ommite anthing on my cpde 
taking note of the capital letter when doing the part where i have to continue from the line is important 
the p[art where i have to 









*/




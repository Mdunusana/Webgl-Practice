const canvas= document.querySelector(`canvas`);
const gl= canvas.getContext(` webgl`);
 gl.clearColor(0,0,1,1 );
 gl.clear( gl.COLOUR_BUFFER_BIT);
 // let me declar my points 
 const points= new Float32Array([
-0.6,0.5,  0.5,0.5,   0.5,-0.3
 ]);

 const color= new Float32Array([
1,0,0,1,   0,1,0,1,  0,0,1,1
 ]);

 // craete buffers for my color and points 
  const buffer= gl.createBuffer();
  gl.bindbuffer(gl.ARRAY_BUFFER,buffer);
  gl.bufferData( gl.ARRAY_BUFFER,color,gl.STAITC_DRAW );

  const cbuffer= gl.createBuffer();
  gl.bindbuffer( gl.ARRAY_BUFFER, cbuffer);
  gl.bufferData( gl. ARRAY_BUFFER,points,gl.STAITC_DRAW);

  /// create the vertex shsder and my vs shsder

const vsSource=`

void main()
{


}
`;
const fsSource= `



void main ()
{


}
`;


// create shaders 

const vertextshader = gl.createShader();
gl.shaderSource( vertextshader,vsSource);
gl.compileShader( vertextshader);

const fragmentShader=gl.createShader();
gl.shaderSource( fragmentShader,fsSource);
gl.compileShader( fragmentShader);

// create the program 
 const program=gl.createprogram();
 gl.attachShaders( vertextshader, program);
 gl.attachShaders( fragmentShader, program);
 gl.linkprogram( program)

 // creating my big green elephant sing and dram

// bbuffer and get position attribute  
  gl.bindbuffer( ARRAY_BUFFER, buffer);
  const positionAttrib=gl.getAttribLocation( program,` my_triangle `);
  gl.enableVertexAttribArray( posistionAttrib);
  gl.vertexAttribPointer( positionAttrib,2,gl.FLOAT,false,0,0);

 // bind colour buffer and set up attribes 
 gl.bindBuffer( gl.ARRAY_BUFFER,cbuffer);
 const colorAttrib=gl.getAttribLocation( program,` col`);
 gl.enableVertexAttribArray( colorAttrib);
 gl.vertexAttribPointer( colorAttrib,3,gl.FLOAT,false,0,0);
gl.useProgram( program);


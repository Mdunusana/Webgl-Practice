 /*cndBuffer(gl.ARRAY_BUFFER, cbuffer); // B 

    gl.vertexAttribPointer(cLocation, 3, gl.FLOAT, false, 0, 0);// S

    //webgl.vertexAttribPointer(index, size, type, normalized, stride, offset);

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);    
   //// THIS IS THE NEW ONE   
   
   
gl.bindBuffer( gl.ARRAY_BUFFER,buffer);

const positionLocation= gl.getActiveAttribLocation ( program,`pos`);
const cLocation=gl.getActiveAttribLocation( program,` col`);
gl.enableVertexAttribArray( positionLocation);
gl.vertexAttribPointer( positionLocation,2,gl.FLOAT,0,0);// this one is for the x and y location 
gl.bindBuffer(gl.ARRAY_BUFFER,cbuffer);
gl.vertexAttribPointer( cLocation,3,gl.FLOAT,false,0,0); // this one is for the points on the triangle 
gl.useProgram(program); // thhis one is the program 
gl.drawArrays(gl.TRIANGLES,0.3);// this one draws the triangle 

// THIS IS THE NEW ONE 
 onst canvas=document.querySelector(` canvas`);
 const gl=canvas.getContext(` webgl`);
  gl.clearColor( 1,0,0,1);
  gl.clear( gl.COLOR_BUFFER_BIT);
  // CREATE THE POINTS 
  const vertex= new Float32Array([


  ]);
   const colour= new Float32Array([

   ]);
   // create buffers 
   const buffer=gl.createBuffer();
   gl.bindBuffer( gl.ARRAY_BUFFER,buffer);
   gl.bufferData( gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
    const cbuffer= gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER,cbuffer);
    gl.bufferData( gl.ARRAY_BUFFER,colour,gl.STATIC_DRAW);
    /// assigm data to the GPU
    const vsSource=`
    attribute vec2 my_triangle;
    attribute vec4 col
    varying vec4 vCol;
     void main()
     {
     gl_Position= vec4( my_traingle,0.0,1.0);

     }
    `;
    const fsSource=`
    
    precision medimp float;
     vCol=col;
     void main()
     {
     
     gl_Fragcolour
     }
    `;
    // create shader
    const vertexshader= gl.createShader();
    gl.shaderSource( vertexShader,vsSource);
    gl.compileShader( vertexShader);
    const fragmentShader=gl.createShader();
    gl.shaderSource( fragmentShader,fsSource);
    gl.compileShader( fragmentShader);
// note that we do the vertex shders for both the fragment shder and the vertet shder 

    // create the program 

    const program=gl.createProgram();
    gl.attachShader( program,vertextshder);
    gl.attachShader( program,fragmentshader);
    gl.linkProgram( program);

    // creating the buffers for  binding my code 

*/
   
// pratice my big green elephant sing and dance 
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

const positionLocation = gl.getAttribLocation(program, `pos`); 
const cLocation = gl.getAttribLocation(program, `col`);        

gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0); 

gl.bindBuffer(gl.ARRAY_BUFFER, cbuffer);
gl.enableVertexAttribArray(cLocation); 
gl.vertexAttribPointer(cLocation, 3, gl.FLOAT, false, 0, 0);

gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES, 0, 3); 



// pratice my big green elephant sing dram 

 gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
 const = gl.getAttribLocation( program,`pos`);
 const cLocation=gl.getAttribLocation(program,`col`);
 gl.enableVertexAttribArray( positionLocation);
 gl.bindBuffer( gl.ARRAY_BUFFER,cbuffer);
 gl.enableVertexAttribArray( cLocation);
 gl.vertexAttribPointer( cLocation,3,gl.FLOAT,false,0,0);
 gl.useProgram( program);
 gl.drawArrays(gl.TRIANGLES,0,3);

// creating my big green elephant sing and dance 

gl.bindBuffer( gl.ARRAY_BUFFER,buffer);
const positionLocation=gl.getAttribLocation( program`pos`);
const cLocation= gl.getAttribLocation( program,` col`);
gl. enableVertexAttribArray( positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER,cbuffer);
gl.enableVertexAttribArray(cLocation );
gl.useProgram( program);
gl.drawArrays( gl.TRIANGLES,0,3);

// creating my big green traingle sing and dance 

gl.bindBuffer( gl.ARRAY_BUFFER,buffer);
const positionLocation=gl.getAttribLocation( program,` pos `);
const cLocation =gl.getAttribLocation( program,`  col`);
gl.enableVertexAttribArray( positionLocation);
gl.bindBuffer( gl.ARRAY_BUFFER,cbuffer);
gl.enableVertexAttribArray( cLocation);
gl.vertexAttribPointer( cLocation,3,gl.FLOAT,false,0,0);
gl.drawArrays( gl.TRIANGLES,0,3);
/// LETS LEARN THIS PART OF THE CODE AND PRATICE THE ONE THAT YOU HAVE NOT DONE FOR THE WHILE 
/// REMEMBVER IT IS MY BIG GREEN ELEPHANT SING AND DANCE 

gl.bindBuffer( gl.ARRAY_BUFFER,buffer);
const positionLocation = gl.getAttribLocation( program,` pos`);
const cLocation = gl.getAttribLocation( program,`col`);
gl.enableVertexAttribArray( positionLocation);
gl.bindBuffer( gl.ARRAY_BUFFER,cbuffer);
gl.enableVertexAttribArray(cLocation);
gl.vertexAttribPointer(  cLocation,3.gl.FLOAT,false,0,0);
gl.drawArrays( gl.TRIANGLES,0,3);


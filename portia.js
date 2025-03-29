  const canvas = document.querySelector(`canvas`);

const gl=canvas.getContext(`webgl`); // canvas.getContext(`webgl`) and not canvas.getContext(`gl`)
//1. these line of code are used for creatng the canvsa of the web page 

// 2. the lines to clear an give colour to tyhe canvas 
 gl.clearColor(1.0,1.0,0.0,1.0);
 gl.clear( gl.COLOR_BUFFER_BIT);

 // 3. these line of code are for the vertex data of my tringle 
 const point = new Float32Array([
    -0.5,0.5,// Top left point
    0.0,0.0,// Middle bottom point, changed from 0.0,0.5 to 0.0,0.0
    0.5,0.5// Top right point

 ]);
 const colour = new Float32Array([    
    1.0,0.0,0.0,1.0, // Best thing to do is remove the 1.0 at the end for all 3 rows
    0.0,1.0,0.0,1.0,
    0.0,0.0,1.0,1.0
  ]);
   // 4. CRAETE BUFFER FOR THE PINTS THAT I HAVE CREATE 
   const point_buff = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, point_buff);
   gl.bufferData(gl.ARRAY_BUFFER, point, gl.STATIC_DRAW );
    
   const colour_buff =gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, colour_buff);
   gl.bufferData(gl.ARRAY_BUFFER, colour, gl.STATIC_DRAW);

// 5. CREATE THE SORCE CUDE FOR MY BUFFERS AFTER BINDING THEM 
const vsSource = `
    attribute vec2 my_triangle;
    attribute vec4 col;
    varying vec4 vCol;

    void main(){
        gl_Position = vec4(my_triangle,0.0,1.0);
        vCol = col;
 }`;


   const fsSource = `
   precision mediump float;
   varying vec4 vCol;
   
   void main(){
    gl_FragColor = vec4(vCol);
}`;


// creating vertex shders for my code 
const vertexshader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexshader,vsSource);
gl.compileShader(vertexshader);

const fragmentshader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentshader,fsSource);
gl.compileShader(fragmentshader);

// creating the program for my source codes 
const program = gl.createProgram(); 
gl.attachShader(program,vertexshader);
gl.attachShader(program,fragmentshader);
gl.linkProgram(program);
// creating buffers for my code 

gl.bindBuffer(gl.ARRAY_BUFFER,point_buff);
const attrib_2 = gl.getAttribLocation(program,`my_triangle`);
gl.enableVertexAttribArray(attrib_2);
gl.vertexAttribPointer(attrib_2, 2 /* NOTICE_1*/, gl.FLOAT, false, 0, 0); // You forgot to add this line which is called gl.vertexAttribPointer

/* NOTICE_1: This value MUST be the same as the vec value as in this case my_triangle is a vec2
therefore this value MUST be 2*/

gl.bindBuffer(gl.ARRAY_BUFFER,colour_buff);
const attrib_1 = gl.getAttribLocation(program,`col`);
gl.enableVertexAttribArray(attrib_1);
gl.vertexAttribPointer(attrib_1, 3 /* NOTICE_2*/, gl.FLOAT, false, 0, 0); // You forgot to add this line which is called gl.vertexAttribPointer

/* NOTICE_2: This value MUST be the same as the vec value as in this case col is a vec3
therefore this value MUST be 3*/

// this peice of a programs allows webgl to run the code 

gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES,0,3);
const canvas =document.querySelector(` canvas`);
const gl = canvas.getContent( ` webgl`);// tjsi is for creating the canvsa of the triangle 
// this is for creating the colour for my triangel 

gl.clearColor( 0.0,0.1,0.0,1.0);
gl.clear( gl.COLOR_BUFFER_BIT);
// CREATING THE PINS FOR MY TRINAGLE 
const point = new Float32Array( [



])
 const colour = new Float32Array([



 ]);

 // create the buffers 
 const point_buff = gl.createBuffer();
 gl.bindBuffer( gl.ARRAY_BUFFER,point);
 gl.bufferData( gl.ARRAY_BUFFER,points,gl.STATIC_DRAW);
 
 const colour_buff = gl.createBuffer();
 gl.bindBuffer( gl.ARRAY_BUFFER,colour);
 gl.bufferData( gl.ARRAY_BUFFER,colors,gl.STATIC_DRAW);
 // creating the shders for my code 

 const vsSource=`
 
 attribute vec2 my_triangle;
 attribute vec4 col;
 carying vec4 vcol;
 void main(){
 
 gl_Position= vec4( my_triangle ,0.0,1.0)
 
 
 }
 `
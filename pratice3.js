const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

gl.clearColor(1.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// CREATE THE POINTS
const points = new Float32Array([
  0, 0.5,
  -0.5, -0.5, 
  0.5, -0.5,
  0.0, 0.5,
  0, -0.5   
]);

const colors = new Float32Array([
  0.0, 0.0, 0.0, 1.0, // Red
  0.0, 0.0, 0.0, 1.0, // Green
  0.0, 0.0, 0.0, 1.0, // Blue
  0.0, 0.0, 0.0, 1.0  // Blue
]);

// Create the position buffer
const pointBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

// Create the color buffer
const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

// Vertex Shader
const vsSource = `
  attribute vec2 my_triangle;
  attribute vec4 col;
  uniform mat4 matz;
  varying vec4 vcol;
  void main() {
    gl_Position = matz*vec4(my_triangle, 0.0, 1.0);
    vcol = col;
  }
`;

// Fragment Shader
const fsSource = `
  precision mediump float;
  varying vec4 vcol;
  void main() {
    gl_FragColor = vcol;
  }
`;

// Create and compile shaders
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
  console.error(gl.getShaderInfoLog(vertexShader));
}

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fsSource);
gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
  console.error(gl.getShaderInfoLog(fragmentShader));
}

// Create program and link shaders
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.error(gl.getProgramInfoLog(program));
}

// Bind position buffer and set up attributes
gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer);
const positionAttrib = gl.getAttribLocation(program, "my_triangle");
gl.enableVertexAttribArray(positionAttrib);
gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

// Bind color buffer and set up attributes
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
const colorAttrib = gl.getAttribLocation(program, "col");
gl.enableVertexAttribArray(colorAttrib);
gl.vertexAttribPointer(colorAttrib, 4, gl.FLOAT, false, 0, 0);

// Use the program and draw the triangle
gl.useProgram(program);
// gl.drawArrays(gl.TRIANGLES, 0, 3);

let angle = 2;
let matz = gl.getUniformLocation(program, 'matz');
function draw(){
  angle += 0.01;
  gl.clear( gl.COLOR_BUFFER_BIT);
  let rotation = RotateZ(angle);
  gl.uniformMatrix4fv(matz, false, rotation);
  gl.drawArrays(gl.LINES, 0, 2);
  gl.drawArrays(gl.LINES, 1, 2);
  gl.drawArrays(gl.LINES, 2, 3);
  gl.drawArrays(gl.LINES, 3, 4);
  window.requestAnimationFrame(draw);
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
console.log(RotateZ(2));
draw()

const canvas = document.querySelector(`canvas`);
const gl = canvas.getContext(`webgl`);

if (!gl) {
    alert(`WebGL not supported`);
}

// Clear the color of the canvas
gl.clearColor(0, 0, 1, 1); // Blue background
gl.clear(gl.COLOR_BUFFER_BIT);

// Create the vertex and color arrays
const points = new Float32Array([
    -0.5, -0.5,  // Bottom left
    -0.5,  0.5,  // Top left
     0.5,  0.5   // Top right
]);

const colors = new Float32Array([
    1, 0, 0, 1,  // Red
    0, 1, 0, 1,  // Green
    0, 0, 1, 1   // Blue
]);

// Create and bind the vertex buffer
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

// Create and bind the color buffer
const cbuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, cbuffer);
gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

// Vertex and Fragment Shader Sources (Fixed)
const vsSource = `
    attribute vec2 my_triangle;
    attribute vec4 col;
    varying vec4 vCol;

    void main() {
        gl_Position = vec4(my_triangle, 0, 1);
        vCol = col;
    }
`;

const fsSource = `
    precision mediump float;
    varying vec4 vCol;

    void main() {
        gl_FragColor = vCol;
    }
`;

// Create and compile shaders
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fsSource);
gl.compileShader(fragmentShader);

// Create and link the shader program
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

// Set up position attribute
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
const positionAttrib = gl.getAttribLocation(program, "my_triangle");
gl.enableVertexAttribArray(positionAttrib);
gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

// Set up color attribute
gl.bindBuffer(gl.ARRAY_BUFFER, cbuffer);
const colorAttrib = gl.getAttribLocation(program, "col");
gl.enableVertexAttribArray(colorAttrib);
gl.vertexAttribPointer(colorAttrib, 4, gl.FLOAT, false, 0, 0);

// Clear and draw the triangle
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, 3);

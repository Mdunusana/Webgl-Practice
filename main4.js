const canvas = document.querySelector(`canvas`);
const webgl = canvas.getContext(`webgl`);
if (!webgl) { throw new Error("WebGL not available/supported"); }

webgl.clearColor(1.0, 1.0, 0, 1);
webgl.clear(webgl.COLOR_BUFFER_BIT);

const vertices = new Float32Array([
    0, 0,
    -1, -1, 
    -1, 0
]);

const colours = new Float32Array([
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
]);

const buffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

const cbuffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, cbuffer);
webgl.bufferData(webgl.ARRAY_BUFFER, colours, webgl.STATIC_DRAW);


const vsSource = `     
attribute vec2 pos;
attribute vec3 col;
uniform mat4 b;
varying vec3 vcol;
void main() { 
    gl_Position = b * vec4(pos, 0, 1);
    vcol = col;
}`;

const fsSource = `
precision mediump float;
varying vec3 vcol;
void main() { 
    gl_FragColor = vec4(vcol, 1.0); 
}`;

const vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(vertexShader, vsSource);
webgl.compileShader(vertexShader);

const fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
webgl.shaderSource(fragmentShader, fsSource);
webgl.compileShader(fragmentShader);

const program = webgl.createProgram();
webgl.attachShader(program, vertexShader);
webgl.attachShader(program, fragmentShader);
webgl.linkProgram(program);

const positionLocation = webgl.getAttribLocation(program, `pos`);
const cLocation = webgl.getAttribLocation(program, `col`);
const bLocation = webgl.getUniformLocation(program, "b"); 

webgl.enableVertexAttribArray(positionLocation);
webgl.enableVertexAttribArray(cLocation);

webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
webgl.vertexAttribPointer(positionLocation, 2, webgl.FLOAT, false, 0, 0);

webgl.bindBuffer(webgl.ARRAY_BUFFER, cbuffer);
webgl.vertexAttribPointer(cLocation, 3, webgl.FLOAT, false, 0, 0);

webgl.useProgram(program);

function getRotationMatrix(angle) {
    let c  = Math.cos(angle);
    let s = Math.sin(angle);

    return new Float32Array([
        c, -s, 0, 0,
        s,  c, 0, 0,
        0,   0, 1, 0,
        0,  0, 0, 1
    ]);}
      
let angle = 0;
function draw() {
    angle += 0.02; 
    let rotationMatrix = getRotationMatrix(angle);

    webgl.uniformMatrix4fv(bLocation, false, rotationMatrix);

    webgl.clear(webgl.COLOR_BUFFER_BIT);
    webgl.drawArrays(webgl.TRIANGLES, 0, 3);

    requestAnimationFrame(draw);
}
draw(); 

const canvas = document.querySelector(`canvas`)
const gl = canvas.getContext(`webgl`)

gl.clearColor(0.7,0.7,1,1)
gl.clear(gl.COLOR_BUFFER_BIT)

const vertices = new Float32Array([
//   x     y    z   r   g   b
    0.5 , 0.5 , 0 , 1 , 0 , 0 ,
    -0.5, 0.5 , 0 , 0 , 0 , 1 ,
    -0.5,-0.5 , 0 , 0 , 1 , 0 ,
    0.5 ,-0.5 , 0 , 1 , 1 , 0 ,
])

const buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER,buffer)
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

const vSource = `
attribute vec3 pos;
attribute vec3 col;
varying vec3 vCol;
uniform mat4 t;
void main()
{
    vCol = col;
    gl_Position =  t * vec4( pos , 1.0 );
}

`
const fSource = `
precision mediump float;
varying vec3 vCol;
void main()
{
    gl_FragColor = vec4(vCol , 1.0);
}
`

const vertexShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertexShader , vSource)
gl.compileShader(vertexShader)

const fragShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragShader , fSource)
gl.compileShader(fragShader)

const program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragShader)
gl.linkProgram(program)

const posLoc = gl.getAttribLocation(program, `pos`)
gl.enableVertexAttribArray(posLoc)
gl.vertexAttribPointer(posLoc,3,gl.FLOAT,false,6*4,0)

const posCol = gl.getAttribLocation(program ,`col`)
gl.enableVertexAttribArray(posCol)
gl.vertexAttribPointer(posCol,3,gl.FLOAT,false,6*4,3*4)

const posRotY = gl.getUniformLocation(program,`t`)

gl.useProgram(program)

let angle = 0;
let oblect = indentity()
multiply(oblect , oblect , rotOverZ(0.5))
multiply(oblect , oblect , rotOverY(1.5))

annie();


function annie()
{
    angle += 0.003;
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.uniformMatrix4fv(posRotY,false, oblect)
    gl.drawArrays(gl.TRIANGLE_FAN,0,4)
    window.requestAnimationFrame(annie)
}




function rotOverY(alpha)
{
    const c = Math.cos(alpha)
    const s = Math.sin(alpha)
    return new Float32Array([
        c , 0 , s , 0 ,
        0 , 1 , 0 , 0 , 
        -s, 0 , c , 0 ,
        0 , 0 , 0 , 1 ,
    ])
}

function rotOverZ(alpha)
{
    const c = Math.cos(alpha)
    const s = Math.sin(alpha)
    return new Float32Array([
        c , s , 0 , 0 ,
        -s, c , 0 , 0 , 
        0 , 0 , 1 , 0 ,
        0 , 0 , 0 , 1 ,
    ])
}

function indentity()
{
    return new Float32Array([
        1 , 0 , 0 , 0 ,
        0 , 1 , 0 , 0 , 
        0 , 0 , 1 , 0 ,
        0 , 0 , 0 , 1 ,
    ])
}

function multiply(out , a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15]; // Cache only the current line of the second matrix
  
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }
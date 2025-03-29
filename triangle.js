const canvas=document.querySelector(` canvas `);
const gl=canvas.getContext( ` gl`);
/*
function matrix_multplication (){

R[0]= a[0]*b[0]+ a[1]*b[4]+ a[2]*b[8]+a[3]*b[12]
R[15]=a[12]*b[3]+a[13]*b[7]+a[14]*b[11]+a[13]*b[13]


create a function that multiply two functions and returns the results 

* /
};
// clear colour on the canvas 
*/
gl.clearColour( 0.0,0.1,0.0,1.0);
gl.Clear( gl.COLOUR_BUFFER_BIT);

// 
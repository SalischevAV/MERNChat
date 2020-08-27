function qwe(delay=1000){
    let t = 1;
    setInterval(() => {
        console.log(t);
        t++;
        
    }, delay);
    
}
let delay = 1000;
function qwe(){
    setTimeout( function tick(){
// console.log(new Date().getSeconds());
delay += 1000 ;
if(delay ===10000) {
    console.log('the end');
    return;
}
console.log(delay);
setTimeout(tick, delay);
},2000);
}


 qwe();
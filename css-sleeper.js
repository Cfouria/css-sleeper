var styles, tol, tollen, stylelen, current, buttonEleC, buttonEleS

window.addEventListener('load', (event) => {holyshitonloadeventandsimiliarisbroken()});
(document.readyState === "complete") ? holyshitonloadeventandsimiliarisbroken() : false

window.addEventListener("keydown", function(event) {
  if (event.target === buttonEleC || event.target === buttonEleS){  
    if (event.shiftKey  &&  event.code === "KeyC"){
      shiftC()
    }
    if (event.shiftKey  &&  event.code === "KeyS"){
      shiftS()
    }
  }
  if (event.altKey  &&  event.code === "KeyC"){
    console.log('alt+c not in use? well sites like youtube block the top soooo...');
    shiftC()
  }
}, true);

function splitter(allsheet,oneXth=3){
  return [...Array(oneXth)].map((item,ind)=>{
    return allsheet.filter((it,index)=>(index%oneXth)===ind? it: false)
  })
};

function holyshitonloadeventandsimiliarisbroken(){
  styles = [...document.styleSheets]
//  styles.forEach(e=>e.disabled=true) //disable on load
  tol = splitter(styles,3)
  tol.unshift(styles)
  tol.unshift([])
  tollen = tol.length
  stylelen = styles.length
  current = 0
  console.log(tol);
  buttons()
}

function shiftC(){
  styles.forEach(e=>e.disabled=false)
  tol[(current++ % tollen)].forEach(e=>e.disabled=true)
}
function shiftS(){
  styles[(current % stylelen)].disabled = !styles[(current % stylelen)].disabled
  current++
}

function buttons(){
  buttonEleC = document.createElement('button');
  buttonEleS = document.createElement('button');
  buttonEleC.type = 'button';
  buttonEleS.type = 'button';
  buttonEleC.title = 'otherwise it will trigger while typing';
  buttonEleS.title = 'button needs to be focus for keypress';
  buttonEleC.textContent = "css-sleeper shift+C"
  buttonEleS.textContent = "css-sleeper shift+S"
  document.body.prepend(buttonEleC)
  document.body.prepend(buttonEleS)
  buttonEleC.onclick = shiftC
  buttonEleS.onclick = shiftS
}


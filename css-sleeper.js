var styles, tol, tollen, stylelen, current, buttonEleC, buttonEleS, buttonEleN, inlinestyles, fcount

window.addEventListener('load', (event) => {holyshitonloadeventandsimiliarisbroken()});
(document.readyState === "complete") ? holyshitonloadeventandsimiliarisbroken() : false

window.addEventListener("keydown", function(event) {
  if (event.target === buttonEleC || event.target === buttonEleS || event.target === buttonEleN){  
    if (event.shiftKey  &&  event.code === "KeyS"){
      shiftS()
    }
    if (event.shiftKey  &&  event.code === "KeyC"){
      shiftC()
    }
    if (event.shiftKey  &&  event.code === "KeyN"){
      shiftN()
    }
  }
  if (event.altKey  &&  event.code === "KeyC"){
    console.log('sites like youtube block the buttons soooo...alt+c not in use');
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
  tol.unshift([])
  tol.unshift(styles)
  tollen = tol.length
  stylelen = styles.length
  current = 0
  console.log(tol);
  buttons()
  fcount = []
  shiftLoad()
}
function shiftLoad(){
  JSON.parse(localStorage.getItem('cssSleeper')).forEach(e=>{e==='s'?shiftS():false;e==='c'?shiftC():false;e==='n'?shiftN():false;})
}

function shiftS(){
  styles[(current % stylelen)].disabled = !styles[(current % stylelen)].disabled
  current++
  fcount.push('s')
}
function shiftC(){
  styles.forEach(e=>e.disabled=false)
  tol[(current++ % tollen)].forEach(e=>e.disabled=true)
  fcount.push('c')
}
function shiftN(){
  if (document.querySelectorAll('[style]').length) {true} else {inlinestyles.length ? inlinestyles.map(e=>{e.remove();inlinestyles=[]}):false}
  inlinestyles= [...document.querySelectorAll('[style]')]
  inlinestyles.map(e=>e.removeAttribute('style'))
  fcount.push('n')
}
function shiftL(){
  localStorage.setItem('cssSleeper', JSON.stringify(fcount));
}
function shiftU(){
  localStorage.removeItem('cssSleeper');
}

function buttons(){
  buttonEleC = document.createElement('button');
  buttonEleS = document.createElement('button');
  buttonEleN = document.createElement('button');
  buttonEleL = document.createElement('button');
  buttonEleU = document.createElement('button');
  buttonEleC.type = 'button';
  buttonEleS.type = 'button';
  buttonEleN.type = 'button';
  buttonEleL.type = 'button';
  buttonEleU.type = 'button';
  buttonEleC.title = 'otherwise it will trigger while typing';
  buttonEleS.title = 'button needs to be focus for keypress';
  buttonEleN.title = '1st kill inline styles & 2nd purge styled elements';
  buttonEleL.title = 'Keeps button click count in localstorage to executes css-sleeper buttons: CSN on page load. Note! Dont go crazy with buttons.';
  buttonEleU.title = 'Who would of guessed having a clear button is nice. press this and reload for css';
  buttonEleC.textContent = "css-sleeper shift+C"
  buttonEleS.textContent = "css-sleeper shift+S"
  buttonEleN.textContent = "css-sleeper shift+N"
  buttonEleL.textContent = "css-sleeper Keep"
  buttonEleU.textContent = "css-sleeper Clear"
  document.body.prepend(buttonEleU)
  document.body.prepend(buttonEleL)
  document.body.prepend(buttonEleN)
  document.body.prepend(buttonEleC)
  document.body.prepend(buttonEleS)
  buttonEleC.onclick = shiftC
  buttonEleS.onclick = shiftS
  buttonEleN.onclick = shiftN
  buttonEleL.onclick = shiftL
  buttonEleU.onclick = shiftU
}


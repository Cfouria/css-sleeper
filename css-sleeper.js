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
//    console.log('sites like youtube block the buttons soooo...alt+c not in use');
    shiftC()
  }
}, true);

function splitter(allsheet,oneXth=2){
  return [...Array(oneXth)].map((item,ind)=>{
    return allsheet.filter((it,index)=>(index%oneXth)===ind? it: false)
  })
};

function styleBucketing(){
//  styles.forEach(e=>e.disabled=true) //disable all styles onload
  styles.forEach(e=>e.disabled=false);
  tol = splitter(styles,parseInt(document.querySelector("#styleBucketCount")?.value)||2)
  tol.unshift([])
  tol.unshift(styles)
  tollen = tol.length
  stylelen = styles.length
  current = 0
  fcount = []
  shiftLoad()
}

function holyshitonloadeventandsimiliarisbroken(){
  styles = [...document.styleSheets]
  buttons()
  styleBucketing()
}

function shiftLoad(){
  var pcount=0;
  JSON.parse(localStorage.getItem('cssSleeper'))?.forEach(e=>{e==='s'?shiftS():false;e==='c'?shiftC():false;e==='n'?shiftN():false;e==='f'?killFontFace():false;e==='p'?pcount+=1:false;});
  pcount ? inputUp(pcount) : false;
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
  (document.querySelectorAll('[style]').length===0) ? inlinestyles.map(e=>e.remove()) : false
  inlinestyles= [...document.querySelectorAll('[style]')];
  inlinestyles.map(e=>e.removeAttribute('style'));
  fcount.push('n')
//  console.log('Note: the website I tested on, how lucky, would create a new style on mouse click thus never allowing the element purge feature. The remedy was Shift+N.')
}
function shiftL(){
  localStorage.setItem('cssSleeper', JSON.stringify(fcount));
}
function shiftU(){
  localStorage.removeItem('cssSleeper');
  fcount=[];
  current = 0;
  document.querySelector("#styleBucketCount")?.value ? document.querySelector("#styleBucketCount").value = 2 : false;
  styleBucketing();
}
function inputUp(pc){
  if (typeof(pc) === 'object'){
    document.querySelector("#styleBucketCount").value = parseInt(document.querySelector("#styleBucketCount")?.value)+1
    Array(pc).fill().map(()=> fcount.push('p'))
    shiftL();
    styleBucketing();
  } else {
    Array(pc).fill().map(()=> fcount.push('p'));
    document.querySelector("#styleBucketCount")?.value ? document.querySelector("#styleBucketCount").value = 2+pc : false;
    (tollen-2) !== parseInt(document.querySelector("#styleBucketCount")?.value) ? styleBucketing() : false;
  }
}

function buttons(){
  buttonEleC = document.createElement('button');
  buttonEleS = document.createElement('button');
  buttonEleN = document.createElement('button');
  buttonEleL = document.createElement('button');
  buttonEleU = document.createElement('button');
  buttonEleE = document.createElement('button');
  inputEleP = document.createElement('input');
  buttonEleC.type = 'button';
  buttonEleS.type = 'button';
  buttonEleN.type = 'button';
  buttonEleL.type = 'button';
  buttonEleU.type = 'button';
  buttonEleE.type = 'button';
  inputEleP.type = 'number';
  buttonEleC.title = 'all styles turn on and then turn off 1 group of styles (1 group will be off and the rest will be on)';
  buttonEleS.title = 'toggle on/off 1 group of styles and next click will be next group (buttons needs to be focus for keypress otherwise it will trigger while typing)';
  buttonEleN.title = 'kill inline style attributes & if no style attributes purge the elements, that were styled, themselves';
  buttonEleL.title = 'Keeps button saves click count (and order) in localstorage to executes css-sleeper buttons on page load. Note! Dont go crazy with buttons. (basically it just a replays from a list)';
  buttonEleU.title = 'Who would of guessed having a clear button is nice. press this and it will also turn on all styles (wont rescue deleted things- clear&reload)';
  buttonEleE.title = 'preset that targets styles that contain the word "font"';
  inputEleP.title = 'splits all styles into # of groups that buttons c&s will work on (clicking on number will +1, and... buttons clicked since last keep will be dropped)';
  buttonEleC.textContent = "css-sleeper shift+C"
  buttonEleS.textContent = "css-sleeper shift+S"
  buttonEleN.textContent = "shift+N"
  buttonEleL.textContent = "Keep"
  buttonEleU.textContent = "Clear"
  buttonEleE.textContent = "fontkill"
  inputEleP.value = 2
  document.body.prepend(inputEleP)
  document.body.prepend(buttonEleU)
  document.body.prepend(buttonEleL)
  document.body.prepend(buttonEleE)
  document.body.prepend(buttonEleN)
  document.body.prepend(buttonEleC)
  document.body.prepend(buttonEleS)
  buttonEleC.onclick = shiftC
  buttonEleS.onclick = shiftS
  buttonEleN.onclick = shiftN
  buttonEleL.onclick = shiftL
  buttonEleU.onclick = shiftU
  buttonEleE.onclick = killFontFace
  inputEleP.id = 'styleBucketCount'
  inputEleP.setAttribute('readonly',true)
  inputEleP.onclick = inputUp
}

function killFontFace(){
fcount.push('f')
styles = [...document.styleSheets]
styles.map(function(e,eindex){
 if(e.href===null){e.disabled = true; return}
 if(e.href){
  if(new URL(window.location).origin !== new URL(e.href).origin){e.disabled = true; return}
 }
 if (e.rules.length){
  killstyle = [];
  [...e.cssRules].map((f,findex)=>{
   f.cssText.includes('font-family') ? killstyle.push([e,findex]) : false
  })
  killstyle.reverse().map(g=>g[0].removeRule(g[1]))
 }
 if (e.rules.length){
  killstyle = [];
  [...e.cssRules].map((f,findex)=>{
   f.cssText.includes('font') ? killstyle.push([e,findex]) : false
  })
  killstyle.reverse().map(g=>g[0].removeRule(g[1]))
 }
})
}





[...tol].forEach(p=>p.forEach(e=>console.log(e.disabled)))
[...tol].forEach(p=>{console.log('bucket'); p.forEach(e=>console.log(e.disabled))})

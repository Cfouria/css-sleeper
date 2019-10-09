function combinations(str) {
  var fn = function(active, rest, a) {
    if (!active.length && !rest.length){return;}
    if (!rest.length) {a.push(active);}
    else {
      fn(active.concat([rest[0]]), rest.slice(1), a);
      fn(active, rest.slice(1), a);
    }
    return a;
  }
  return fn([], str, []);
}

window.addEventListener('load', (event) => {holyshitonloadeventandsimiliarisbroken()});
(document.readyState === "complete") ? holyshitonloadeventandsimiliarisbroken() : holyshitonloadeventandsimiliarisbroken()

function holyshitonloadeventandsimiliarisbroken(){
  listenOnce();
  function listenOnce(){console.log('listenONCE')};
  var styles = [...document.styleSheets]
  styles.forEach(e=>e.disabled=true)
  var tol = combinations(styles)
  tol.unshift([])
  var count = tol.length
  var stylecount = styles.length
  var current = 0
  console.log(tol);
  console.log('load? css-sleeper shift+c & shift+s')
}

function listenOnce(){
  window.addEventListener("keydown", function(event) {
    if (event.shiftKey  &&  event.code === "KeyC"){
      let picker = current % count
      styles.forEach(e=>e.disabled=false)
      tol[picker].forEach(e=>e.disabled=true)
      current++
    }
    if (event.shiftKey  &&  event.code === "KeyS"){
      let picker = current % stylecount
      styles[picker].disabled = !styles[picker].disabled
      current++
    }
  }, true);
}

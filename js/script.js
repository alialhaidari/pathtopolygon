document.addEventListener("DOMContentLoaded", function() { 
    PathToPolygon();
  });
  
  $('#path-input').bind('input propertychnage', function (e) {
    PathToPolygon();
      }
  );
  
  function PathToPolygon(){
  let path = document.querySelector('path');
  let pathInput = document.getElementById('path-input').value;
  path.setAttribute('d',pathInput);
      
  let pathLength = Math.floor(path.getTotalLength());
  
  let steps = 10;
  let scaled = Math.floor(pathLength / steps);
  let bbox = path.getBBox();
  
  
  let points = Object.keys([...new Array(scaled)]).map(num => {
    let point = path.getPointAtLength(num * steps);
    let x = (point.x / bbox.width * 100).toFixed(2);
    let y = (point.y / bbox.height * 100).toFixed(2);
    return `${x}% ${y}%`;
  }).join(',');
  
  document.querySelector('style[title="s1"]').innerHTML = `.clipped {clip-path: polygon(${points});}`;
  
  document.getElementById('polygon-input').value = points;
  }
  function copy(element){
    
    var copyText = document.getElementById(element);
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value);
    alert("text was copied !");
  }  
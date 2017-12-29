setTimeout(() => {
  const bars = document.querySelector('.chart1');
  const bars2 = document.querySelector('.chart2');

  function barClick(e) {
    e.preventDefault();
    if(!e.target.isClicked && !e.target.attributes.stroke) {
      e.target.style.fill = 'red';
      e.target.isClicked = true;
    } else if(e.target.isClicked && !e.target.attributes.stroke){
      e.target.style.fill = e.target.attributes.fill.nodeValue;
      e.target.isClicked = false;
    }
  }

  bars.addEventListener('click', barClick, false)
  bars2.addEventListener('click', barClick, false)
}, 1000)

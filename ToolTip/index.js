const svgs = `
  <div class="tooltip__icon">
    <svg class="tooltip__icon__svg">
      <path d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z" fill-rule="evenodd"></path>
    </svg>
  </div>
  <div class="tooltip__icon">
    <svg class="tooltip__icon__svg">
      <path d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z" fill-rule="evenodd"></path>
    </svg>
  </div>
  <div class="tooltip__icon">
    <svg class="tooltip__icon__svg">
      <path d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z" fill-rule="evenodd"></path>
    </svg>
  </div>
  <div class="tooltip__divider"></div>
  <div class="tooltip__icon">
    <svg class="tooltip__icon__svg">
      <path d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z" fill-rule="evenodd"></path>
    </svg>
  </div>
`;


// Definir el elemento tooltip

const tooltip = document.createElement('div');

tooltip.classList.add('tooltip');
tooltip.innerHTML = svgs;

const tooltipTail = document.createElement('div');
tooltipTail.classList.add('tooltip_tail');

const article = document.getElementsByClassName('articulo')[0];

function displayTooltip() {
    const selection = document.getSelection();
    const anchorNode = selection.anchorNode;
    const focusNode = selection.focusNode;


    document.body.appendChild(tooltip);
    document.body.appendChild(tooltipTail);

    const tooltipWidht = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight; 
    const tooltipTailWidth = tooltipTail.offsetWidth;
    const tooltipTailHeight = tooltipTail.offsetHeight; 
// Esta linea obtiene la posicion del texto seleccionado en la pagina
    const rangeRect = selection.getRangeAt(0).getClientRects();

    const parentElemen = selection.anchorNode.parentElement; //punto de inicio de la seleccion
    const y = rangeRect[0].y;
    const x = rangeRect.length > 1 ? parentElemen.offsetLeft + parentElemen.offsetWidth/2 :
        rangeRect[0].x + rangeRect[0].width/2;

    tooltip.style.top = `${y - tooltipHeight - tooltipTailHeight}px`;
    tooltip.style.left = `${x - tooltipWidht/2}px`;

    tooltipTail.style.top = `${y - tooltipTailHeight/2}px`;
    tooltipTail.style.left = `${x - tooltipTailWidth/2}px`;
}

function removeTooltip() {
    if(document.body.contains(tooltip)){
        document.body.removeChild(tooltip);
        document.body.removeChild(tooltipTail);
    }
}

let selectionQueue = false;

document.onmouseup = () => {

    if (selectionQueue) {
        displayTooltip();
    } else{
        removeTooltip();
    }

    selectionQueue = false;

}

document.addEventListener('selectionchange', (e) => {
    const selection = document.getSelection();
    if(selection.type !== 'Range'){
        selectionQueue = false;
        return;
    }

    if(selection.anchorNode !== selection.focusNode){
        selectionQueue = false;
        return;
    }

    selectionQueue = true;
});


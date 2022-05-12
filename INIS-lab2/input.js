/*
* all the code for laboratory work 2 goes into this file.
You will attach event handlers to the document, workspace, and targets defined in the html file
to handle mouse, touch and possible other events.

You will certainly need a large number of global variables to keep track of the current modes and states
of the interaction.
*/
const dragEl = document.querySelectorAll('.target');
let coordX;
let coordY;
for (let i=0; i<dragEl.lenght; i++){
    dragEl[i].draggable= true;
    dragEl[i].addEventListener('dragstart',(e)=>{
        coordX = e.offsetX;
        coordY = e.offsetY;
    });
    dragEl[i].addEventListener('dragend', (e)=>{
        dragEl[i].style.top = (e.pageY - coordY)+ 'px';
        dragEl[i].style.left = (e.pageX - coordX)+ 'px';
    });
    dragEl[i].addEventListener('click',(e)=>{
        dragEl[i].style.background = 'blue';
        for (let j = 0; j< dragEl.lenght; j++){
            if (j===i){
                continue
            }
            dragEl[j].style.background = 'red';
        }
    });    
}

const workspace = document.querySelector('#workspace');
workspace.addEventListener('click', (e) =>{
    if(e.target == workspace){
        for(let i = 0; i < dragEl.lenght; i++)
        {dragEl[i].style.background = 'red';}
    }
});
// NOTE: The variable "shirts" is defined in the shirts.js file as the full
// list of shirt offerings
//       You can access this variable here, and should use this 
//variable here to build your webpages

let initProducts = () => {
for (let i = 0; i < shirts.length; i++){
    let divShirt=document.createElement('div');
    divShirt.className = "t-shirts_block";
    document
    .body
    .children[0]
    .children[1]
    .children[1]
    .insertAdjacentElement('afterbegin', divShirt);
    document
    .body
    .children[0]
    .children[1]
    .children[1]
    .children[0]
    .insertAdjacentHTML('beforeend', 
    '<img src=' + shirts[i].colors.white.front + ' alt="">'
    + '<h4 class="t-shirts_title">' + shirts[i].name + '</h4>'
    + '<p class="t-shirts_text">Available in '+ Object.keys(shirts[i].colors).length + ' </p>'
    + '<div class="buttons-block"></div>');
   if (Object.keys(shirts[i].colors).length == 1)
   document
   .body
   .children[0]
   .children[1]
   .children[1]
   .children[0]
   .children[2]
   .append('color')
   else
   document
   .body
   .children[0]
   .children[1]
   .children[1]
   .children[0]
   .children[2]
   .append('colors')    
   document
   .body
   .children[0]
   .children[1]
   .children[1]
   .children[0]
   .children[3]
   .insertAdjacentHTML('beforeend',
   '<button>Quick View</button>' 
   + '<button onclick = "clickButton(' + i + ')">See Page</button>')   
}
};
let initDetails = () => {
    let item = localStorage.getItem('item')
    document
   .body
   .children[0]
   .children[1]
   .insertAdjacentHTML('afterbegin',
   '<h3>' + shirts[item].name + '</h3>' 
   + '<div class="product_main-block"></div');
   document
   .body
   .children[0]
   .children[1]
   .children[1]
   .insertAdjacentHTML('beforeend',
    '<img src="' + shirts[item].colors.white.front + '" alt="">'
    + '<div class="detailes"></div>');
    document
   .body
   .children[0]
   .children[1]
   .children[1]
   .children[1]
   .insertAdjacentHTML('beforeend',
   '<div class="detailes_price">' + shirts[item].price + '</div>'
   + '<div class="detailes_text">' + shirts[item].description + '</div>'
   + '<div class="side-buttons"></div>' 
   + '<div class="color-buttons"></div>');
   document
   .body
   .children[0]
   .children[1]
   .children[1]
   .children[1]
   .children[2]
   .insertAdjacentHTML('beforeend','<div>Side:</div>'
   + '<button>Front</button>'
   + '<button>Back</button>');
   document
   .body
   .children[0]
   .children[1]
   .children[1]
   .children[1]
   .children[3]
   .insertAdjacentHTML('beforeend','<div>Color:</div>'
   + '<button>White</button>'
   + '<button>Blue</button>'
   + '<button>Green</button>'
   + '<button>Yellow</button>'
   + '<button>Red</button>');







};

function clickButton(i){   
    localStorage.setItem('item', i) 
    document.location='details.html';
}
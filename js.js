const mapOfColors = new Map();
mapOfColors.set('white', ["#efefef", "#0d193f"]);
mapOfColors.set('blue', ["#1976d2", "#fff"]);
mapOfColors.set('pink', ["#d81b60", "#fff"]);
mapOfColors.set('red', ["#d32f2f", "#fff"]);
mapOfColors.set('green', ["#2e7d32", "#fff"]);
mapOfColors.set('yellow', ["#ffeb3b", "#fff"]);

let selectedSide = "";
let selectedColor = "";
let colorItems = "";

let initProducts = () => {
    const json = JSON.stringify(shirts);
    const obj = JSON.parse(json);
    const entries = Object.values(obj);

    let code = "";
    for (i = 0; i < entries.length; i++) {
        try {
            const name = entries[i]['name'] || 'No name';
            const price = entries[i]['price'] || 'No info';
            const colors = Object.values(entries[i]['colors']);
            const image = colors[0]['front'];
            const colorNumber = colors.length;

            code +=
                `<div class="t-shirt">
                    <div class="t-shirts_block">
                        <img src=`+ image + `>
                        <p class="t-shirts_title">`+ name + `</p>
                        <p class="t-shirts_text">Available in `+ colorNumber + ` colors</p>
                        <div class="buttons-block">
                            <a class="quick-view" id=`+ i + ` href="#modal">Quick View</a>
                            <a class="see-page" id=`+ i + ` href="details.html">See Page</a>
                        </div>
                    </div>
                </div>`;
        } catch (e) {
            continue;
        }
    }

    document.getElementById('page-title').insertAdjacentHTML("afterend", code);
    document.addEventListener('click', function (e) {
        if (e.target.className == 'see-page') {
            localStorage.setItem('selected-item', e.target.id);
        }
        else if (e.target.className == 'quick-view') {
            initQuickView(entries[e.target.id], e.target.id);
        }
    }, false);
};

let initQuickView = (entry, id) => {
    selectedSide = "front";
    selectedColor = "white";

    colorItems = new Map(Object.entries(entry['colors']));

    const code = `<div id="modal">
                    <div id="modal-window">
                        <div id="modal-window-header">
                            <h2 id="modal-window-title">` + entry['name'] + `</h2>
                            <a href="#" class="modal-window-close">X</a>
                        </div>
                        <div id="modal-window-content">
                            <div class="modal-window-grid">
                                <img id="image" src=`+ colorItems.get(selectedColor)[selectedSide] + `>
                                <div class="modal-window-grid-info">
                                    <p class="modal-window-grid-price">`+ entry['price'] + `</p>
                                    <p class="modal-window-grid-description">Available in `+ colorItems.size + ` colors</p>
                                    <div class="items">
                                        <p class="items-title">Side:</p>
                                        <a id="front">Front</a>
                                        <a id="back">Back</a>
                                    </div>
                                    <div class="items">
                                        <a id="quick-see-page" href="details.html">See Page</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

    document.getElementsByClassName('wrapper')[0].insertAdjacentHTML("afterbegin", code);

    setFrontBackClickListeners();
    document.addEventListener('click', function (e) {
        if (e.target.id == 'quick-see-page') {
            localStorage.setItem('selected-item', id);
        }
    }, false);
};

let initDetails = () => {
    let id = localStorage.getItem('selected-item');
    selectedSide = "front";
    selectedColor = "white";

    const json = JSON.stringify(shirts);
    const obj = JSON.parse(json);
    const entry = Object.values(obj)[id];

    colorItems = new Map(Object.entries(entry['colors']));

    const code = `<h3 id="details-title">` + entry['name'] + `</h3>
                <div class="details-grid-item">
                    <div class="product_main-block"">
                        <img id="image" src=`+ colorItems.get(selectedColor)[selectedSide] + `>
                    </div>
                    <div class="details-grid-info">
                        <div class="detailes">
                            <p class="detailes-price">`+ entry['price'] + `</p>
                            <p class="detailes_text">`+ entry['description'] + `</p>
                            <div class="items">
                                <p class="items-title">Side:</p>
                                <a id="front">Front</a>
                                <a id="back">Back</a>
                            </div>
                            <div class="items">
                                <p class="items-title">Color:</p>
                            </div>
                        </div>
                    </div>
                </div>`;

    document.getElementsByClassName('details-grid')[0].insertAdjacentHTML("afterbegin", code);

    setFrontBackClickListeners();
    setupColorButtons(entry);
};

const setFrontBackClickListeners = () => {
    document.getElementById('front').addEventListener('click', function (e) {
        selectedSide = 'front';
        document.getElementById('image').src = colorItems.get(selectedColor)[selectedSide];
    });

    document.getElementById('back').addEventListener('click', function (e) {
        selectedSide = 'back';
        document.getElementById('image').src = colorItems.get(selectedColor)[selectedSide];
    });
};

const setupColorButtons = (entry) => {
    const colors = Object.keys(entry['colors']);
    const elements = getColorButtons(colors);
    for (i = 0; i < elements.length; i++) {
        document.getElementsByClassName('items')[1].appendChild(elements[i]);
    };
};

const getColorButtons = (colors) => {
    const listOfELements = new Array();

    const capitalizeFirstLetter = (string) => { return string.charAt(0).toUpperCase() + string.slice(1) };
    const setupColors = (elem, backgroundColor, color) => {
        elem.style.color = color;
        elem.style.backgroundColor = backgroundColor;
        elem.addEventListener("mouseover", function (e) {
            e.target.style.color = backgroundColor;
            e.target.style.backgroundColor = color;
        })
        elem.addEventListener("mouseout", function (e) {
            e.target.style.color = color;
            e.target.style.backgroundColor = backgroundColor;
        })
    };
    const setupClickListener = (elem, color) => {
        elem.addEventListener('click', function (e) {
            selectedColor = color;
            document.getElementById('image').src = colorItems.get(selectedColor)[selectedSide];
        });
    };

    for (i = 0; i < colors.length; i++) {
        let elem = document.createElement('a');
        elem.text = capitalizeFirstLetter(colors[i]);
        elem.id = colors[i];

        setupColors(elem, mapOfColors.get(colors[i])[0], mapOfColors.get(colors[i])[1]);
        setupClickListener(elem, colors[i]);

        listOfELements.push(elem);
    }

    return listOfELements;
}
document.querySelector("#sl-darkMode").addEventListener("slChange", darkMode);
function darkMode(event){
    var switchState = event.srcElement.checked;
    var root = document.querySelector(":root");
    if (switchState){
        root.setAttribute("sl-dark-mode", true);
        localStorage.setItem("sl-dark-mode","true");
    }
    else{
        root.setAttribute("sl-dark-mode", false);
        localStorage.setItem("sl-dark-mode","false");
    }
}
var root = document.querySelector(":root");
if (localStorage.getItem("sl-dark-mode") != null){
    root.setAttribute("sl-dark-mode", localStorage.getItem("sl-dark-mode"));
    if (localStorage.getItem("sl-dark-mode") == "true"){
        document.querySelector("#sl-darkMode").setAttribute("checked","checked");
    }
}

function tableOfContents(){
    var headings = document.querySelector("main").querySelectorAll("h1");
    var menu = document.querySelector("sl-menu")
    var table = "";
    var index = 0;
    for (x of headings){
        x.id = "h" + String(index);
        if (index == 0){
            table = table + "<sl-menu-divider></sl-menu-divider><sl-menu-label>Introduction</sl-menu-label>";
        }
        else if (index == 2){
            table = table + "<sl-menu-divider></sl-menu-divider><sl-menu-label>Examples</sl-menu-label>";
        }
        table = table + "<sl-menu-item id = '" + "h" + String(index) + "'>" + x.innerHTML + "</sl-menu-item>";
        index++;
    }
    menu.innerHTML = table;
    menu.addEventListener("click",navScroll);
}
tableOfContents();

function navScroll(event){
    var id = event.target.id;
    var heading = document.querySelector("main #" + id);
    document.querySelector("main").scrollTop = heading.offsetTop;
}

document.querySelector("#sl-primaryChange").addEventListener("slChange", changePrimaryColor);
function changePrimaryColor(event){
    setTimeout(apply,100,event);
    function apply(event){
        var hsl = event.target.attributes.value.value.substring(4).split(", ");
        var hue = hsl[0];
        var sat = hsl[1];
        var style = ":root{--sl-color-primary-hue:" + hue + ";--sl-color-primary-saturation:" + sat + ";}";
        document.querySelector("#sl-primaryChange-style").innerHTML = style;
    }
}

document.querySelector("#sl-mode-css-apply").addEventListener("click", applyChangedCSS);
function applyChangedCSS(){
    var text = document.querySelector("#sl-mode-css-display");
    var style = document.querySelector("#sl-mode-css-style");
    style.innerHTML = text.value;
}
setTimeout(applyChangedCSS, 100);
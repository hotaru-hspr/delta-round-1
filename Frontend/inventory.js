// Fetching data of laptop configs from API
// Initializing cart
var cart = [];

// Initializing array with laptops and their configs
var laptops = [];

// To fetch data of laptop configs from the API
fetch('https://www.snucdelta.tech/api/inductions/get-products')
.then(response => response.json())
.then(data => {
    console.log(data.laptops.length);
    for (let i=0; i<data.laptops.length; i++) {
        laptops.push(data["laptops"][i]);
        console.log(data["laptops"][i]);
        }
    console.log(laptops.length);

    // Transferring values to display to HTML
    //(P.S.: I tried looping these below blocks of code but for some reason they result in an error when adding to cart. So kindly enjoy redundancy :) )
    
    // Model 1
    document.getElementById("modelname0").innerHTML = laptops[0].model;
    
    let radioHTML = "";
    for (i=0; i < laptops[0].RAM.length; i++) {
        radioHTML += '<label><input type="radio" name="in0" value="' + laptops[0].RAM[i].size + '">' + laptops[0].RAM[i].size + '-' + laptops[0].RAM[i].price + '</label><br>'
    }
    document.getElementById("radioram0").innerHTML = radioHTML;

    radioHTML = "";
    for (i=0; i < laptops[0].storage.length; i++) {
        radioHTML += '<label><input type="radio" name="in0" value="' + laptops[0].storage[i].size + '">' + laptops[0].storage[i].size + '-' + laptops[0].storage[i].price + '</label><br>'
    }
    document.getElementById("radiostorage0").innerHTML = radioHTML;



    // Model 2
    document.getElementById("modelname1").innerHTML = laptops[1].model;

    radioHTML = "";
    for (i=0; i < laptops[1].RAM.length; i++) {
        radioHTML += '<label><input type="radio" name="in1" value="' + laptops[1].RAM[i].size + '">' + laptops[1].RAM[i].size + '-' + laptops[1].RAM[i].price + '</label><br>'
    }
    document.getElementById("radioram1").innerHTML = radioHTML;

    radioHTML = "";
    for (i=0; i < laptops[1].storage.length; i++) {
        radioHTML += '<label><input type="radio" name="in1" value="' + laptops[1].storage[i].size + '">' + laptops[1].storage[i].size + '-' + laptops[1].storage[i].price + '</label><br>'
    }
    document.getElementById("radiostorage1").innerHTML = radioHTML;



    // Model 3
    document.getElementById("modelname2").innerHTML = laptops[2].model;

    radioHTML = "";
    for (i=0; i < laptops[2].RAM.length; i++) {
        radioHTML += '<label><input type="radio" name="in2" value="' + laptops[2].RAM[i].size + '">' + laptops[2].RAM[i].size + '-' + laptops[2].RAM[i].price + '</label><br>'
    }
    document.getElementById("radioram2").innerHTML = radioHTML;

    radioHTML = "";
    for (i=0; i < laptops[2].storage.length; i++) {
        radioHTML += '<label><input type="radio" name="in2" value="' + laptops[2].storage[i].size + '">' + laptops[2].storage[i].size + '-' + laptops[2].storage[i].price + '</label><br>'
    }
    document.getElementById("radiostorage2").innerHTML = radioHTML;
    
    document.getElementById("Loading").innerHTML = "";
})
    

// Function to add config to cart
function addToCart(num, lid) {
    var prod = {};
    var ramopt = [];

    var laptopId = lid;
    
    for (i=0; i<laptops[parseInt(num)].RAM.length; i++) {
        ramopt[i] = laptops[parseInt(num)].RAM[i].size
    }
    
    var inputs = document.getElementsByName("in"+num);

    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
             if (ramopt.includes(inputs[i].value)) {
                 var RAMsize = inputs[i].value;
            }
            else {
                 var storagesize = inputs[i].value;
            }
        }
    }

    for (let i=0; i < laptops.length; i++) {
        if (laptops[i].id==laptopId) {
            prod.id = laptopId;
            for (let j=0; j<laptops[i].RAM.length; j++) {
                if (RAMsize == laptops[i].RAM[j].size) {
                    prod.RAM = RAMsize;
                }
            }
        for (k=0; k<laptops[i].storage.length; k++) {
                if (storagesize == laptops[i].storage[k].size) {
                    prod.storage = storagesize;
                    break
                }
            }
        }
    } 
    if (Object.keys(prod).length!=3){
        alert("Config not available");
    }
    else {
    cart.push(prod);
    alert("Added to cart!");
    console.log("New item to cart: ", prod);
    }
    calculateTotal();
}


// Function to remove config from cart by index
function removeFromCart(index) {
    let removed = cart.splice(index,1);
    alert("Removed from cart!");
    for (let i=0; i<removed.length; i++) {
        console.log("Removed: ", removed[i]);
    displayCartItems();
    calculateTotal();
    }
}


// Function to calculate total of cart
function calculateTotal() {
    var total = 0;

    for (let i=0; i<cart.length; i++) {
        let t_id = cart[i].id;
        let t_ramsize = cart[i].RAM;
        let t_storage = cart[i].storage;
        var t_bp, t_ramp, t_stp;

        t_bp = laptops[(t_id-1)].basePrice;

        for (let j=0; j<laptops[(t_id-1)].RAM.length; j++){
                if (laptops[(t_id-1)].RAM[j].size==t_ramsize){
                    t_ramp = laptops[(t_id-1)].RAM[j].price;
                }
            }
        
        for (let j=0; j<laptops[(t_id-1)].storage.length; j++){
                if (laptops[(t_id-1)].storage[j].size==t_storage){
                    t_stp = laptops[(t_id-1)].storage[j].price;
                }
            }
        
        total += t_bp+t_ramp+t_stp
        document.getElementById("cart")
    }
    
    document.getElementById("carttotal").innerHTML = "<br><b>Cart total: </b>" + total;
    displayCartItems();
}


// Support function to go through cart items
function displayCartItems() {
    var ttp = "";

    for (let i=0; i<cart.length; i++) {
        let t_id = cart[i].id;
        let t_modelname = laptops[(t_id-1)].model;
        let t_ramsize = cart[i].RAM;
        let t_storage = cart[i].storage;
        var t_bp, t_ramp, t_stp;

        t_bp = laptops[(t_id-1)].basePrice;

        for (let j=0; j<laptops[(t_id-1)].RAM.length; j++){
                if (laptops[(t_id-1)].RAM[j].size==t_ramsize){
                    t_ramp = laptops[(t_id-1)].RAM[j].price;
                }
            }
        
        for (let j=0; j<laptops[(t_id-1)].storage.length; j++){
                if (laptops[(t_id-1)].storage[j].size==t_storage){
                    t_stp = laptops[(t_id-1)].storage[j].price;
                }
            }
        var itemprice = t_bp + t_ramp + t_stp;

        ttp += '<p class="inline">' + t_modelname + " - " + t_ramsize + " - " + t_storage + " - " + itemprice + " " + '</p><button type="button" class="inline" onclick="removeFromCart('+ i + ')">Remove item</button><br>';
        }

    document.getElementById("cart").innerHTML = ttp;
      
}
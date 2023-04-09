// ui
let frm = document.querySelector('#frm');
let product = document.querySelector('#product');
let price = document.querySelector('#price');
let qty = document.querySelector('#qty');
let productlist = document.querySelector('#showproduct');
let flashmsg = document.querySelector('.flashmsg')

// add eventlisteiner
// add product
frm.addEventListener('submit', addProduct);
// remove product       
productlist.addEventListener('click', removeproduct);
// get content form localstorage
document.addEventListener('DOMContentLoaded', getproduct);

// add froduct function
function addProduct(e) {
    // form validation

    if (product.value === "" || price.value === "" || qty.value === "") {
        // console.log("please Fild the all requird fild");
        flashmsg.innerText = "please Fild the all requird fild";
        flashmsg.style.color = "#ff0000";
    }
    else {
        flashmsg.innerText = "";
        flashmsg.style.color = "#000";
        // cerate tr tag
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${product.value}</td><td>${price.value}</td><td>${qty.value}</td><td><a href="#">X</a></td>`;
        // append child
        productlist.appendChild(tr);
        let productInfo = { product: product.value, price: price.value, qty: qty.value };
        storeInLocalStorage(productInfo);
    }
    product.value = '';
    price.value = '';
    qty.value = '';
};
// remove single product
function removeproduct(e) {
    if (e.target.hasAttribute('href')) {
        if (confirm("are you sure Dleate Product?")) {
            let dataElement = e.target.parentElement.parentElement;
            dataElement.remove();
            deleteInLocalStorage(dataElement);
        }
    }
    else {
        window.alert("Please Click Ancor")
    }

    e.preventDefault();
}

// store in Localstorage
function storeInLocalStorage(list) {
    let item;
    if (localStorage.getItem('items') === null) {
        item = [];
    }
    else {
        item = JSON.parse(localStorage.getItem('item'));
    }
    item.push(list);
    localStorage.setItem('items', JSON.stringify(item));
    console.log();
}
// dleate local storage
function deleteInLocalStorage(data) {
    console.log(data);
    let item;
    if (localStorage.getItem('items') === null) {
        item = [];
    }
    else {
        item = JSON.parse(localStorage.getItem('item'));
    }
    let itemData = data.chaildren[0].textContent.trim();
    item.forEach((value, index) => {
        if (tableproduct === item[index].product) {
            item.splice(index, 1)
        }
    });
    localStorage.setItem('items', JSON.stringify(item));
}
// get product form local storage
function getproduct() {
    let item;
    if (localStorage.getItem('items') === null) {
        item = [];
    }
    else {
        item = JSON.parse(localStorage.getItem('item'));
    }
    // cerate tr tag
    item.forEach((value, index) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${item[index].product}</td><td>${item[index].price}</td><td>${item[index].qty}</td><td><a href="#">X</a></td>`;
        // append child
        productlist.appendChild(tr);

    })

} 
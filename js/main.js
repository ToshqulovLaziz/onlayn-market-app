// API
const API_PATH = "https://market-backend-reec.onrender.com/";
const token = localStorage.getItem("loginToken");

// GET ELEMENTS
const elProductForm = document.querySelector('.js-product-form');
const elProductTitle = elProductForm.querySelector('.js-product-title');
const elProductText = elProductForm.querySelector('.js-product-text');
const elProductImg = elProductForm.querySelector('.js-product-img');
const elProductPrice = elProductForm.querySelector('.js-product-price');

//---------------------------------------------------------------
const elProductList = document.querySelector(".js-product-list");
const elProductTemp = document.querySelector(".js-product-temp").content;
const newFragment = new DocumentFragment();


async function setProduct(id) {
    if (id >= 0) {
        try {
            // Create FormData object
            const formData = new FormData();
            formData.append('product_name', elProductTitle.value);
            formData.append('product_desc', elProductText.value);
            formData.append('product_price', elProductPrice.value);
            formData.append('product_img', elProductImg.files[0]); // Append the image file

            const res = await fetch(API_PATH + 'product/' + id, {
                method: 'PUT',
                headers: {
                    Authorization: token,
                },
                body: formData // Pass the FormData object as the request body
            });
        } catch (error) {
            console.log(error.message);
        }
    } else {
        try {
            // Create FormData object
            const formData = new FormData();
            formData.append('product_name', elProductTitle.value);
            formData.append('product_desc', elProductText.value);
            formData.append('product_price', elProductPrice.value);
            formData.append('product_img', elProductImg.files[0]); // Append the image file

            const res = await fetch(API_PATH + 'product', {
                method: 'POST',
                headers: {
                    Authorization: token,
                },
                body: formData // Pass the FormData object as the request body
            });
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    }
}

async function deleteProduct(id, parentElement, cloneTemp) {
    try {
        const res = await fetch(API_PATH + 'product/' + id, {
            method: 'DELETE',
            headers: {
                Authorization: token,
            }
        });
        const data = await res.json();
        console.log(data);

        // Check if the product was successfully deleted from the server
        if (data.success) {
            // Remove the product from the DOM
            parentElement.removeChild(cloneTemp);
        } else {
            console.log('Failed to delete product from server');
        }
    } catch (error) {
        console.log(error.message);
    }
    getProducts();
}

async function getProducts() {
    try {
        const res = await fetch(API_PATH + "product", {
            method: "GET",
            headers: {
                Authorization: token
            }
        });
        const data = await res.json();
        renderProducts(data)
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
}

elProductForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const productId = elProductForm.getAttribute('data-product-id'); // Get the product ID from the data-product-id attribute of the form

    if (productId) {
        // If product ID exists, call the setProduct function with the product ID
        await setProduct(productId);
    } else {
        // If product ID does not exist, call the setProduct function without passing an ID
        await setProduct();
    }

    // Clear the form inputs after submission
    elProductTitle.value = '';
    elProductText.value = '';
    elProductImg.value = '';
    elProductPrice.value = '';

    // Refresh the product list
    getProducts();
});

function renderProducts(data){
    // Clear existing product list
    elProductList.innerHTML = '';

    // Loop through the products data and create DOM elements for each product
    data.forEach((product) => {
        const cloneTemp = elProductTemp.cloneNode(true);
        const elProductTitle = cloneTemp.querySelector('.js-product-title');
        const elProductText = cloneTemp.querySelector('.js-product-text');
        const elProductImg = cloneTemp.querySelector('.js-product-img');
        const elProductPrice = cloneTemp.querySelector('.js-product-price');
        const elDeleteBtn = cloneTemp.querySelector('.js-delete-btn');


        elProductImg.src = product.product_img;
        elProductImg.alt = product.product_name;
        elProductTitle.textContent = product.product_name;
        elProductText.textContent = product.product_desc;
        elProductPrice.textContent ="$" + product.product_price;

        elDeleteBtn.addEventListener('click', async () => {
            // Call deleteProduct function with product ID and DOM elements for deletion
            await deleteProduct(product.id, elProductList, cloneTemp);
        });

        newFragment.appendChild(cloneTemp);
    });

    // Append the new fragment to the product list
    elProductList.appendChild(newFragment);
}

// Fetch and render products on page load
window.addEventListener('load', async () => {
    await getProducts();
});



//API
const API_PATH = "http://192.168.1.32:5000/";

//GET ELEMENTS
const elKorList = document.querySelector('.js-korzina-list');
const elKorTemp = document.querySelector('.js-korzina-temp').content;
const newFragment = new DocumentFragment();

async function setPKor(id) {
      try {
          // Create FormData object
          const formData = new FormData();
          formData.append('product_name', elProductTitle.value);
          formData.append('product_desc', elProductText.value);
          formData.append('product_price', elProductPrice.value);
          formData.append('product_img', elProductImg.files[0]); // Append the image file

          const res = await fetch(API_PATH + 'order', {
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

  async function deleteKor(id, parentElement, cloneTemp) {
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

async function getKor() {
  try {
      const res = await fetch(API_PATH + "order", {
          method: "GET",
          headers: {
              Authorization: token
          }
      });
      const data = await res.json();
      renderKor(data)
      console.log(data);
  } catch (error) {
      console.log(error.message);
  }
}

function renderKor(data){
  // Clear existing product list
  elKorList.innerHTML = '';

  // Loop through the products data and create DOM elements for each product
  data.forEach((product) => {
      const cloneTemp = elProductTemp.cloneNode(true);
      const elProductTitle = cloneTemp.querySelector('.js-korzinka-title');
      const elProductText = cloneTemp.querySelector('.js-korzinka-text');
      const elProductImg = cloneTemp.querySelector('.js-korzinka-img');
      const elProductPrice = cloneTemp.querySelector('.js-korzinka-price');
      const elDeleteBtn = cloneTemp.querySelector('.js-delete-btn');

      
      elProductImg.src = product.product_img;
      elProductImg.alt = product.product_name;
      elProductTitle.textContent = product.product_name;
      elProductText.textContent = product.product_desc;
      elProductPrice.textContent ="$" + product.product_price;

      elDeleteBtn.addEventListener('click', async () => {
          // Call deleteProduct function with product ID and DOM elements for deletion
          await deleteKor(product.id, elKorList, cloneTemp);
      });

      newFragment.appendChild(cloneTemp);
  });

  // Append the new fragment to the product list
  elProductList.appendChild(newFragment);
}
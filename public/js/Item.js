const urlParams = new URLSearchParams(window.location.search);

const category_name = urlParams.get("categoryname");
const product_id = urlParams.get("id");

function getItems() {
  let url =
    "https://e-commerce-web-tvae.onrender.com/product?categoryname=" +
    category_name +
    "&id=" +
    product_id;
  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);

      // createCategory(data.category);

      if(data){
        sale(data);
      }
    });
}

function sale(data) {
  console.log("sale", data);

  let item_id = document.getElementById("sale-item");

  let discount = data.price - (data.price / 100) * data.sale_percentage;

  let item_val = ` 
      <div class="prod-img">
        <img
          src="${data.url}"
          alt=""
        />
      </div>

      <br />
      <div class="prod-data">
        <div>
          <h1>${data.name}</h1>
        </div>

        <div class="d-flex cart-sec">
          <div class="price-sec">
            <p>Price</p>
            ${
              data.sale_percentage
                ? `<p>&#8377; ${discount}</p>
              <strike color="red">&#8377; ${data.price}</strike>
              `
                : `<p>&#8377; ${data.price}</p>`
            }
            </div>
          <div class="cart-style">
            <button class="btn btn-outline-secondary btn-sm" onclick="updateCounter('${"-"}')">-</button>
            <input type="text" class="form-control w-5" value="0"  id="inp_counter" disabled/>
            <button class="btn btn-outline-secondary btn-sm" onclick="updateCounter('${"+"}')">+</button>
          </div>
        </div>

        <div class="prod-desc">
              <div class="brand-desc">
                <h5>Product Detail</h5>
          ${data.product_detail.map((el) => {
            return `
              <div class="prod-detail">
                <div class="key-detail">${Object.keys(el)}</div>

                <div class="value-detail">${Object.values(el)}</div>
              </div>
            `
          }).join('')}
          </div>
          <hr>

          <div class="about-prod my-2">
            <h5>About this item</h5>
            <p>
              ${data.about_product}
            </p>
          </div>
         
        </div>
      </div>
  `;

  item_id.insertAdjacentHTML("beforeend", item_val);
}

let count = 0;

function updateCounter(countType) {
  let inp_counter = document.getElementById("inp_counter");
  // console.log(countType);
  if (countType == "+" && count < 10) {
    count = count + 1;
  } else if (countType == "-" && count > 0) {
    count = count - 1;
  }
  inp_counter.value = count;
}

getItems();

function logData() {
  fetch("https://e-commerce-web-tvae.onrender.com/category")
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);

      if (data.category) {
        createCategory(data.category);
      }

      if (data.featured) {
        createFeatured(data.featured);
      }
    });
}

function createCategory(data) {
  //   console.log(data);
  data.forEach((el) => {
    switch (el.name) {
      case "Clothing":
        category(el.items, el.name, "category-clothing");
        break;
      case "Gadgets":
        category(el.items, el.name, "category-gadgets");
        break;
      case "Food":
        category(el.items, el.name, "category-food");
        break;

      // case "Sale":
      //   sale(el.items, el.name, "sale-div", el.sale_percentage);
      //   break;

      default:
        break;
    }
  });
}

function createFeatured(data) {
  //   console.log(data);
  data.forEach((el) => {
    switch (el.name) {
      // case "Clothing":
      //   category(el.items, el.name, "category-clothing");
      //   break;
      // case "Gadgets":
      //   category(el.items, el.name, "category-gadgets");
      //   break;
      // case "Food":
      //   category(el.items, el.name, "category-food");
      //   break;

      case "Sale":
        sale(el.items, el.name, "sale-div", el.sale_percentage);
        break;

      default:
        break;
    }
  });
}

function category(data, name, categoryId) {
  if (data.length > 0) {
    let cat_clothing = document.getElementById(categoryId);

    for (let i = 0; i < data.length; i++) {
      let category_item = `
            <div class="category-items">
                <div class="card" style="width: 18rem">
                  <img
                    src="${data[i].url}"
                    class="card-img-top"
                    alt="${data[i].name}"
                  />
                  <div class="card-body">
                    <h5 class="card-title">${data[i].name}</h5>
                    <p class="card-text">Price ${data[i].price}</p>
                    <button class="btn btn-outline-primary btn-sm" onclick="redirectURL('${name}',${data[i].id})">Buy Now</button>
                  </div>
                </div>
              </div>
            `;

      cat_clothing.insertAdjacentHTML("beforeend", category_item);
    }
  } else {
    console.log("Error");
  }
}

function sale(data, name, categoryId, sale_percent) {
  console.log("sale", data, name, categoryId, sale_percent);

  if (data.length > 0) {
    let cat_clothing = document.getElementById(categoryId);

    for (let i = 0; i < data.length; i++) {
      let discount =data[i].price - ((data[i].price / 100) * sale_percent)
      let category_item = `
            <div class="card" style="width: 18rem">
            <img
              src="${data[i].url}"
              class="card-img-top"
              alt="${data[i].name}"
            />
            <div class="card-body">
              <h3 class="card-title">${data[i].name}</h3>
              <h5 class="card-title">${data[i].category}</h5>
              <div class="price-container">
                <div class="price-val">
                  &#8377; ${discount}
                </div>
                <div class="older-price-val">
                  <div class="strike-price">
                    <strike>&#8377;  ${data[i].price}</strike>
                  </div>
                  <div class="discount-val">
                    (Flat ${sale_percent}% Off)
                  </div>
                </div>
              </div>

              <hr>
              <div class="card-text card-text-style">
              ${data[i].short_description}
              </div>
              <button  class="btn btn-outline-secondary btn-sm" onclick="redirectURL('${name}',${data[i].id})">View</button>
            </div>
          </div>
            `;

      cat_clothing.insertAdjacentHTML("beforeend", category_item);
    }
  } else {
    console.log("Error");
  }
}

function redirectURL(name, id) {
  let url =
    "https://e-commerce-web-tvae.onrender.com/item.html?" + "categoryname=" + name + "&id=" + id;
  // console.log("Redirecting" , url);
  location.replace(url);
}

logData();

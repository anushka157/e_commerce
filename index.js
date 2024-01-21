const express = require("express");
const app = express();
const path = require("path");


const Home = require("./Data");

app.use(express.static(path.join(__dirname, "/public/")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


const data_from_json = Home.getCategory();

app.get("/category", (req, res) => {

    res.send(data_from_json);
});

// app.get('/product', (req, res) => {
//     const name = req.query.categoryname;
//     const product_id = req.query.id;


//     let jsonData = JSON.parse(data_from_json);

//     if (jsonData && jsonData.category && jsonData.category.length > 0) {
//         const category_data = jsonData.category.find(category => category.name === name);
//         if (category_data && category_data.items && category_data.items.length > 0) {
//             const product_data = category_data.items.find(item => item.id == product_id);

//             if (product_data) {
//                 res.send(product_data);
//             } else {
//                 res.send("No data Found");
//             }
//         } else {
//             res.send('No items found in the specified category.');
//         }
//     } else {
//         console.log('Invalid or empty data_from_json.category.');
//     }

   
// });


app.get('/product', (req, res) => {
    const name = req.query.categoryname;
    const product_id = req.query.id;


    let jsonData = JSON.parse(data_from_json);

    if(name !== "Sale"){
        if (jsonData && jsonData.category && jsonData.category.length > 0) {
            const category_data = jsonData.category.find(category => category.name === name);
            if (category_data && category_data.items && category_data.items.length > 0) {
                const product_data = category_data.items.find(item => item.id == product_id);
    
                if (product_data) {
                    res.send(product_data);
                } else {
                    res.send("No data Found");
                }
            } else {
                res.send('No items found in the specified category.');
            }
        } else {
            res.send('No data available');
        }
    }
    else if(name == "Sale" ){
        if (jsonData && jsonData.featured && jsonData.featured.length > 0)
        {
            const featured_data = jsonData.featured.find(featured => featured.name === name);
            if (featured_data && featured_data.items && featured_data.items.length > 0) {
                const product_data = featured_data.items.find(item => item.id == product_id);
                const newSale = {...product_data,sale_percentage:featured_data.sale_percentage}
    
                if (product_data) {
                    res.send(newSale);
                } else {
                    res.send("No data Found");
                }
            } else {
                res.send('No items found in the specified category.');
            }
        } else {
            res.send('No data available');
        }
    }
    

   
});

app.listen(10000);

console.log("Running at Port 10000");

const fs= require("fs");
// const path= require("path");

// const Data = require('../assets/data.json')

// const pathval = path.join()
function getCategory(){
    let data = fs.readFileSync('assets/data.json', 'utf-8')

    return data;
}

// import data from "../data/data.json" assert { type: "json" };
// console.log(data);

// let category = Data.category


// console.log(category);



module.exports = { getCategory }





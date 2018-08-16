var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Sundram2327",
  database: "bamazon"
});

var TAB = "\t";
var product_id;
var item_quantity;
var updatedQuantity;

connection.connect(function(err) {
  if (err) throw err;
  console.log('\n');
  manageItems();
});

function manageItems(){
    inquirer.prompt([

    {
          type: "list",
          message: "What do you want to do?",
          choices: ["View Products for Sale", "View Low Inventory","Add to Inventory","Add New Product","Exit"],
          name: "userAction"
    }
    ])
    .then(function(iRes) {
        if (iRes.userAction == "View Products for Sale"){
            showProducts();
        }else if (iRes.userAction == "View Low Inventory"){
            connection.query("SELECT item_id,product_name,price,stock_quantity FROM products WHERE stock_quantity < 5", function(err, res) {
                if (err) throw err;

                console.log("\nAll products with low inventory\n");
                console.log('ID'+TAB+'Product'+TAB+TAB+'Price'+TAB+'Stock Quantity');
                for (var index in res){
                    if (res[index].product_name.length > 7){
                        console.log(res[index].item_id+TAB+res[index].product_name+TAB+res[index].price+TAB+res[index].stock_quantity);
                    }else{
                        console.log(res[index].item_id+TAB+res[index].product_name+TAB+TAB+res[index].price+TAB+res[index].stock_quantity);
                    }
                }
                connection.end();
            });
        }else if (iRes.userAction == "Add to Inventory"){
            inquirer.prompt([

                {
                    type: "input",
                    message: "Please enter the ID of the product you would like to update: ",
                    name: "prod_id"
                },
                {
                    type: "confirm",
                    message: "Are you sure you want to update? ",
                    name: "confirm_id",
                    default: true
                },
                {
                    type: "input",
                    message: "Please enter the quantity you want to add: ",
                    name: "quantity"
                },
                {
                    type: "confirm",
                    message: "Are you sure? ",
                    name: "confirm_quantity",
                    default: true
                }
            ]).then(function(res){
                updatedQuantity = parseInt(res.quantity);
                if(res.confirm_id == false || res.confirm_quantity == false){
                    console.log("Please come back later. Exiting...");
                    connection.end();
                    return;
                }else{
                    
                    connection.query("SELECT item_id,product_name,price,stock_quantity FROM products WHERE ?",[{item_id:res.prod_id}], function(err, ResQ) {

                        if (err) throw err;
                        updatedQuantity = ResQ[0].stock_quantity + updatedQuantity;

                        connection.query("UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity : updatedQuantity
                                },
                                {
                                    item_id : res.prod_id
                                }
                            ],function(err,res){
                                if (err) throw err;
                                console.log('\n Quantity updated!')
                                connection.end();
                        });
                    });
                }
            });

        }else if (iRes.userAction == "Add New Product"){
            inquirer.prompt([

                {
                    type: "input",
                    message: "Please enter the product you would like to add: ",
                    name: "prod"
                },
                {
                    type: "input",
                    message: "Please enter the department of the product: ",
                    name: "department"
                },
                {
                    type: "input",
                    message: "Please enter the price of the product: ",
                    name: "price"
                },
                {
                    type: "input",
                    message: "Please enter the quantity you want to add: ",
                    name: "quantity"
                }
            ]).then(function(res){

                connection.query("INSERT INTO products SET ?",
                    
                        {
                            product_name : res.prod,
                            department_name : res.department,
                            price : res.price,
                            stock_quantity : res.quantity

                        },
                    function(err,res){
                        if (err) throw err;
                        console.log('\n Product Added!')
                        connection.end();
                });


            });
        }else if (iRes.userAction == "Exit"){
            console.log("\nGoodBye!!");
            connection.end();
            return;
        }
    });
}

function showProducts(){
    console.log("\nAll available products\n");
    connection.query("SELECT item_id,product_name,price,stock_quantity FROM products", function(err, res) {
        if (err) throw err;

        console.log(TAB+'ID'+TAB+'Product'+TAB+TAB+'Price'+TAB+'Stock Quantity');
        for (var index in res){
            if (res[index].product_name.length > 7){
                console.log(TAB+res[index].item_id+TAB+res[index].product_name+TAB+res[index].price+TAB+res[index].stock_quantity);
            }else{
                console.log(TAB+res[index].item_id+TAB+res[index].product_name+TAB+TAB+res[index].price+TAB+res[index].stock_quantity);
            }
        }
        connection.end();
    });        
}

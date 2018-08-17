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

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + '\n');
  
  display_items();


});

function display_items(){
    console.log("Here are all the products available...\n");
    connection.query("SELECT item_id,product_name,price FROM products", function(err, res) {
    if (err) throw err;
    
    console.log(TAB+'+---------------+-----------------------+---------------+');
    console.log(TAB+'|'+TAB+'ID'+TAB+'|'+TAB+'Product'+TAB+TAB+'|'+TAB+'Price'+TAB+'|');
    console.log(TAB+'+---------------+-----------------------+---------------+');
    for (var index in res){
        if (res[index].product_name.length > 7){
            console.log(TAB+'|'+TAB+res[index].item_id+TAB+'|'+TAB+res[index].product_name+TAB+'|'+TAB+res[index].price+TAB+'|');
        }else{
            console.log(TAB+'|'+TAB+res[index].item_id+TAB+'|'+TAB+res[index].product_name+TAB+TAB+'|'+TAB+res[index].price+TAB+'|');
        }
        
    }
    console.log(TAB+'+---------------+-----------------------+---------------+');
    console.log('\n');
    buyProduct();

  });
}
function buyProduct(){
    inquirer.prompt([

    {
        type: "input",
        message: "Please enter the ID of the product you would like to purchase: ",
        name: "prod_id"
    },
    {
        type: "confirm",
        message: "Are you sure you want to purchase? ",
        name: "confirm_id",
        default: true
    },
    {
        type: "input",
        message: "Please enter quantity: ",
        name: "quantity"
    },
    {
        type: "confirm",
        message: "Are you sure? ",
        name: "confirm_quantity",
        default: true
    }
    ])
    .then(function(iRes) {
        product_id = iRes.prod_id;
        item_quantity = iRes.quantity;
        // console.log(product_id);
        if(iRes.confirm_id == false || iRes.confirm_quantity == false){
            console.log("\n Please come back when you are sure.")
            connection.end();
            return;
        }
        connection.query("SELECT stock_quantity,price FROM products WHERE ?",
        {
            item_id : product_id
        } ,
        function(err, res) {
            if (err) throw err;
            if (res[0].stock_quantity >= item_quantity){
                updateQuantity(res[0].stock_quantity-item_quantity,product_id);
                console.log('\n'+'The total cost of your purchase is $'+(res[0].price)*item_quantity);
            }else{
                console.log("\n Insufficient quantity!");
                connection.end();
            }
        });
    })
}

function updateQuantity(quant,id){
    if(quant < 0){
        quant = 0;
    }

    connection.query("UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: quant
      },
      {
        item_id: id
      }
    ] ,
    function(err, res) {
        if (err) throw err;
        connection.end();
    });

}
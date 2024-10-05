let storeName = "Tech Haven";
let storeLocation = "Metro Manila";
let storeCapacity = 100;

let products = [
  {
    name: "iPhone",
    price: 150,
    quantity: 10
  },
  {
    name: "iPad",
    price: 55,
    quantity: 15
  },
  {
    name: "Airpods",
    price: 5,
    quantity: 20
  }
];

/*console.log(`Product 1: ${products[0].name}, ${products[0].price}, ${products[0].quantity}`);

console.log(`Product 2: ${products[1].name}, ${products[1].price}, ${products[1].quantity}`);

console.log(`Product 3: ${products[2].name}, ${products[2].price}, ${products[2].quantity}`);
*/

//global variable

let totalQuantity = 0;

function calculateTotalQuantity() {

	totalQuantity = 0; 

	for (let i = 0; i < products.length; i++) {
    totalQuantity += products[i].quantity;
  }
	return totalQuantity;
}

function checkInventoryCapacity() {
	let currentTotalQuantity = calculateTotalQuantity();
  
  //check if totalQuantity exceeds storeCapacity
	if (totalQuantity > storeCapacity) {
    console.log("Warning: over capacity!");
	} 

	else {
    console.log("Store is within capacity.");
	}
}

function addProduct(productName, price, quantity) {

	let currentTotalQuantity = calculateTotalQuantity();

	if (totalQuantity + quantity > storeCapacity) {
		console.log(`Warning: Adding ${productName} exceeds store capacity!`);
		
		return 0;
}

	products.push({ name: productName, price: price, quantity: quantity });
  	console.log(`${productName} added successfully.`);
}

function removeProduct(productName, quantity) {
  	for (let i = 0; i < products.length; i++) {
    	if (products[i].name === productName) {
	      	let product = products[i];
	      
	      	if (product.quantity - quantity < 0) {
	        	console.log(`Error: Not enough ${productName} in stock to remove ${quantity}.`);
	        	return;
	      	}
      
	      product.quantity -= quantity;
	      console.log(`${quantity} units of ${productName} removed successfully.`);
      
	      	if (product.quantity === 0) {

		        for (let j = i; j < products.length - 1; j++) {
		          products[j] = products[j + 1]; 
		        }

		        products.length -= 1; // Reduce the length of the array
		        console.log(`${productName} removed from inventory as the quantity is zero.`);
		    }

		    return;
    	} //end of if loop
  	} //end of for loop
  
  console.log(`Product ${productName} not found!`);
} //end for function removeProduct

function getMostExpensiveProduct() {
  	let mostExpensive = products[0];
  
  		for (let i = 1; i < products.length; i++) {
	    	if (products[i].price > mostExpensive.price) {
	      mostExpensive = products[i]; // most expensive product
	    }
  	}//end of for loop
  
  return mostExpensive.name;
} //end for getMostExpensiveProduct

function calculateTotalInventoryValue() {
  let totalInventory = 0;
  
  for (let i = 0; i < products.length; i++) {
    totalInventory += (products[i].price * products[i].quantity); 
  }

  return totalInventory;
}

function userPrompt() {

  let productName = prompt(`Enter Product Name:`);
  let productPrice = parseFloat(prompt(`Enter Product Price:`));
  let productQuantity = parseInt(prompt(`Enter Product Quantity:`));

  //to make sure that the user wants to add the product
  let doubleCheck = prompt(`Are you sure you want to add this product? (yes/no)`);

  if (doubleCheck.toLowerCase() === "yes") {
    addProduct(productName, productPrice, productQuantity);
    console.log(`Updated Inventory Value: ${calculateTotalInventoryValue()}`);

    restockProduct(productName, 10);
  }

  let removeItem = prompt(`Do you want to remove a product? (yes/no)`);

  if (removeItem.toLowerCase() === "yes") {
    let removeProdName = prompt(`Enter the product name you want to remove:`);
    let removeProdQuantity = parseInt(prompt(`Enter the quantity to remove:`));

    removeProduct(removeProdName, removeProdQuantity);

    console.log(`Updated Inventory Value: ${calculateTotalInventoryValue()}`);

    restockProduct(removeProdName, 10)
  }
}

function restockProduct(productName, threshold){

	for (let i = 0; i < products.length; i++){
		if (products[i].name === productName){
			if (products[i].quantity < threshold){
				let autoRestock = 20; //auto add 20

				products[i].quantity += autoRestock;

				console.log(`${productName} quantity is low. Will auto restock ${autoRestock}.`)
				console.log(`New Quantity for ${productName}: ${products[i].quantity} `)
				console.log(`Updated Inventory Value ${calculateTotalInventoryValue()}`)
			}
			return 0;
		}
	}
	console.log(`${productName} not found!`)
}

//List of Outputs

console.log(`Store Name: ${storeName}`);

console.log(`Store Location ${storeLocation}`);

console.log(`Total Number of Products: ${calculateTotalQuantity()}`)

console.log("Most Expensive Product:", getMostExpensiveProduct());

restockProduct("iPhone", 10);

userPrompt();

checkInventoryCapacity();

//addProduct("iPhone", 40, 5);

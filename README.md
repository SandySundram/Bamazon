# BAMAZON

### Overview

Bamazon is an Amazon-like storefront. The app will take in orders from _Customers_ and deplete stock from the store's inventory. The app will also allow a _Manager_ to check on inventory and add or update inventory as needed.

### FEATURES

**CUSTOMER APP**

Terminal command: `node bamazonCustomer.js`

* This will display all the available products for sale and their respective prices. It will then prompt the user to enter the _ID_ of the product they wish to purchase.
    [View all products](Images\customer_productView.PNG)

* After the customer confirms the product to purchase, the app will ask the customer the _quantity_ (of the item) they wish to purchase.
    [Prompt for quantiy](Images\customer_quantityView.PNG)

* After the customer confirms the quantity needed, the purchase is complete and the total cost of the transaction will be displayed. The inventory for that product will be reduced accordingly.
    [Purchase confirmed](Images\customer_purchasedView.PNG)

* IF the customer does not confirm either the product or the quantity, the transaction will be cancelled.
    [Purchase not confirmed](Images\customer_noConfirmationView.PNG)

* IF the store does not have enough of the product to meet the customer's request, the transaction will not be completed.
    [Insuffecint quantity](Images\customer_insufficientQuantityView.PNG)


**MANAGER APP**





**Hope you have fun in the store**
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var productsContainer;
if (localStorage.getItem("myStorage") == null) {
  productsContainer = [];
} else {
  productsContainer = JSON.parse(localStorage.getItem("myStorage"));
  display();
}
var products;
document.getElementById("updateButton").onclick = function addAndSubmit() {
  products = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDesc.value,
  };
  productsContainer.push(products);
  localStorage.setItem("myStorage", JSON.stringify(productsContainer));
  clearInputs();
  display();
};
function clearInputs() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
}
function display() {
  var temporaryContainer = "";
  for (var i = 0; i < productsContainer.length; i++) {
    temporaryContainer +=
      `<tr>
    <td>` +
      (i + 1) +
      `</td>
    <td>` +
      productsContainer[i].name +
      `</td>
    <td>` +
      productsContainer[i].price +
      `</td>
    <td>` +
      productsContainer[i].category +
      `</td>
    <td>` +
      productsContainer[i].description +
      `</td>
    <td>
      <button onclick="editItem(` +
      i +
      `)" type="button" class="btn btn-outline-warning">
        edit product
      </button>
    </td>
    <td>
      <button onclick="deleteItem(` +
      i +
      `)" type="button" class="btn btn-outline-danger">
        delete
      </button>
    </td>
  </tr>`;
  }
  document.getElementById("eachRow").innerHTML = temporaryContainer;
}
function deleteItem(deletedProduct) {
  productsContainer.splice(deletedProduct, 1);
  localStorage.setItem("myStorage", JSON.stringify(productsContainer));
  display();
}
var returnedIndex = 1;
function editItem(itemEdited) {
  //this will be called when edit item button is pressed and the inputs are filled with :
  productName.value = productsContainer[itemEdited].name;
  productPrice.value = productsContainer[itemEdited].price;
  productCategory.value = productsContainer[itemEdited].category;
  productDesc.value = productsContainer[itemEdited].description;
  document.getElementById("updateButton").innerHTML = "update";
  //the button name is changed to update
  returnedIndex = itemEdited; //the index is stored to be used by other functions
  typingAndSaving(); //after adding your values this is called
}
// ================================
function typingAndSaving() {
  //onclicking the submit button :
  document.getElementById(
    "updateButton"
  ).onclick = function RestoreSubmitText() {
    //the values is added to the array using the caught index,stored displayed and the values are cleared
    productsContainer[returnedIndex].name = productName.value;
    productsContainer[returnedIndex].price = productPrice.value;
    productsContainer[returnedIndex].category = productCategory.value;
    productsContainer[returnedIndex].description = productDesc.value;
    localStorage.setItem("myStorage", JSON.stringify(productsContainer));
    display();
    clearInputs();
    document.getElementById("updateButton").innerHTML = "Submit"; //the button name is also changed
    mainEffect(); //this is the reset function used to reset the button's usage
  };
  // ============================================
  function mainEffect() {
    //the reset function to allow you to enter your data and save it to the storage as before
    document.getElementById("updateButton").onclick = function addAndSubmit() {
      products = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        description: productDesc.value,
      };
      productsContainer.push(products);
      localStorage.setItem("myStorage", JSON.stringify(productsContainer));
      clearInputs();
      display();
    };
  }
}

// ==============================================

function searchItem(searchedItem) {
  cartoona = "";
  for (var i = 0; i < productsContainer.length; i++) {
    if (
      productsContainer[i].name
        .toLowerCase()
        .includes(searchedItem.toLowerCase()) == true ||
      productsContainer[i].price
        .toLowerCase()
        .includes(searchedItem.toLowerCase()) == true
    ) {
      cartoona +=
        `<tr>
  <td>` +
        (i + 1) +
        `</td>
  <td>` +
        productsContainer[i].name +
        `</td>
  <td>` +
        productsContainer[i].price +
        `</td>
  <td>` +
        productsContainer[i].category +
        `</td>
  <td>` +
        productsContainer[i].description +
        `</td>
  <td>
    <button onclick="editItem(` +
        i +
        `)" type="button" class="btn btn-outline-warning">
      edit product
    </button>
  </td>
  <td>
    <button onclick="deleteItem(` +
        i +
        `)" type="button" class="btn btn-outline-danger">
      delete
    </button>
  </td>
</tr>`;
    }
    document.getElementById("eachRow").innerHTML = cartoona;
  }
}
function checkSort() {
  if (document.getElementById("sorting").selectedIndex == "0") {
    var comparison = 0;
    function compare(a, b) {
      if (a.name > b.name) {
        comparison = 1;
      } else {
        comparison = -1;
      }
      return comparison;
    }
    productsContainer.sort(compare);
    display();
  } else if (document.getElementById("sorting").selectedIndex == "1") {
    var comparison2 = 0;
    function compare(a, b) {
      if (a.price < b.price) {
        comparison2 = 1;
      } else {
        comparison2 = -1;
      }
      return comparison2;
    }
    productsContainer.sort(compare);
    display();
  }
}

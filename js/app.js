var storesArray = [];
var storeHoursArray = [];
// Store hours between 6AM and 8PM
function storeHours () {
  for (var i = 6; i < 21; i++) {
    if (i < 12) {
      var morningTime = i + 'am';
      storeHoursArray.push(morningTime);
    } else if (i === 12){
      var noonTime = i + 'pm';
      storeHoursArray.push(noonTime);
    } else {
      var eveningTime = (i - 12) + 'pm';
      storeHoursArray.push(eveningTime);
    }
  }
  storeHoursArray.push('Total');
  console.log(storeHoursArray);
}

// For generating a random number with minimum and maximum values inclusively
function randomNumberCustomerGenerator(min, max){
  var randomNumberOfCustomers = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumberOfCustomers;
}

// For generating customers per hour based on minimum and maximum customer values and fills an array
function fillCustomersPerHourArray(index, min, max, customersPerHourArray) {
  for (var i = 0; i < storeHoursArray.length - 1; i++) {
    customersPerHourArray.push(randomNumberCustomerGenerator(min, max));
  }
  // console.log(customersPerHourArray);
};

// For generating number of cookies per hour based on customer averages and fills an array, also totals the sum
function numberOfCookiesPerHourGenerator(index, avgCookiePerCustomer, customersPerHourArray, cookiesPerHourArray) {
  var sum = 0;
  for (var i = 0; i < storeHoursArray.length - 1; i++) {
    var numberOfCookiesPerHour = customersPerHourArray[i] * avgCookiePerCustomer;
    cookiesPerHourArray.push(parseInt(numberOfCookiesPerHour));
  }
  // console.log(cookiesPerHourArray);
  for (var i = 0; i < cookiesPerHourArray.length; i++) {
    sum += cookiesPerHourArray[i];
  }
  cookiesPerHourArray.push(sum);
};

// For brand new Store objects
function Store(name, min, max, avg) {
  this.customersPerHourArray = new Array();
  this.cookiesPerHourArray = new Array();
  this.name = name;
  this.min = min;
  this.max = max;
  this.avgCookiePerCustomer = avg;
  this.index;

  fillCustomersPerHourArray (this.index, this.min, this.max, this.customersPerHourArray);
  numberOfCookiesPerHourGenerator(this.index, this.avgCookiePerCustomer, this.customersPerHourArray, this.cookiesPerHourArray);
  storesArray.push(this);
}

// For updating existing Store objects
function updateStore(index, name, min, max, avg) {
  storesArray[index].customersPerHourArray = new Array();
  storesArray[index].cookiesPerHourArray = new Array();

  fillCustomersPerHourArray(index, min, max, storesArray[index].customersPerHourArray);
  numberOfCookiesPerHourGenerator(index, avg, storesArray[index].customersPerHourArray, storesArray[index].cookiesPerHourArray);
}

// For creating a row header using data on store hours
function createRowHeader() {
  var firstRow = document.getElementById('firstRow');
  for(var i = 0; i < storeHoursArray.length; i++){
    var th = document.createElement('th');
    th.textContent = storeHoursArray[i];
    firstRow.appendChild(th);
  }
}

// For creating a table body filled with store names and cookiesPerHour data
function createBodyRows(tableBodyNode) {
  // console.log('Entering createBodyRows');
  for (var i = 0; i < storesArray.length; i++) {
    var tr = document.createElement('tr');
    tableBodyNode.appendChild(tr);
    var tdLabel = document.createElement('td');
    tdLabel.textContent = storesArray[i].name;
    tr.appendChild(tdLabel);
    for (var j = 0; j < storeHoursArray.length; j++) {
      var td = document.createElement('td');
      td.textContent = storesArray[i].cookiesPerHourArray[j];
      tr.appendChild(td);
    }
  }
}

// Deletes an exisiting table body and replaces it with a new empty table body node
function resetTable() {
  var newTableBody = document.createElement('tbody');
  oldTableBody.parentNode.replaceChild(newTableBody, oldTableBody);
  oldTableBody = newTableBody;
}

// Handles the submit event by updating exisiting store data or adding new store data
function handleStoreSubmit(event) {
  // console.log(event);
  //prevents page reload on submit or button events!! need to have this.
  event.preventDefault();
  //event.target.(name).value the name is in reference to the name of the input on html
  //Ensures that all fields are filled out after the submit event triggers
  if (!event.target.storename.value || !event.target.mincustomer.value ||
    !event.target.maxcustomer.value || !event.target.avgpercustomer.value) {
    return alert('Fields cannot be empty.');
  }
  // This stores the value from the event submission into a variable
  var newStoreName = event.target.storename.value.toString();
  var newStoreMin = event.target.mincustomer.value;
  var newStoreMax = event.target.maxcustomer.value;
  var newStoreAvg = event.target.avgpercustomer.value;
  // console.log(newStoreName + ', ' + newStoreMin + ', ' + newStoreMax + ', ' + newStoreAvg);

  var storeFound = false;
  var storeIndex = 0;
  for (i = 0; i < storesArray.length; i++) {
    if (newStoreName === storesArray[i].name) {
      storeFound = true;
      storeIndex = i;
      storesArray[i].name = newStoreName;
      storesArray[i].min = newStoreMin;
      storesArray[i].max = newStoreMax;
      storesArray[i].avgCookiePerCustomer = newStoreAvg;
      // console.log(storesArray[i]);
    }
  }
  if (storeFound) {
    // console.log('Store was found');
    updateStore(storeIndex, newStoreName, newStoreMin, newStoreMax, newStoreAvg);
    resetTable();
    createBodyRows(oldTableBody);
    // console.log(storesArray);
  }
  if (!storeFound) {
    // console.log('Store was not found');
    var createNewStore = new Store(newStoreName, newStoreMin, newStoreMax, newStoreAvg);
    // console.log(createNewStore);
    resetTable();
    createBodyRows(oldTableBody);
  }
  event.target.storename.value = null;
  event.target.mincustomer.value = null;
  event.target.maxcustomer.value = null;
  event.target.avgpercustomer.value = null;
}

storeHours();

var pikesPlace = new Store('Pikes Place Market', 17, 88, 5.2);
var seaTac = new Store('SeaTac Airport', 6, 24, 1.2);
var southCenter = new Store('Southcenter', 11, 38, 1.9);
var bellevue = new Store('Bellevue Square', 20, 48, 3.3);
var alki = new Store('Alki', 3, 24, 2.6);

var mainTable = document.getElementById('main-table');
var oldTableBody = document.createElement('tbody');
mainTable.appendChild(oldTableBody);

createRowHeader();
createBodyRows(oldTableBody);

var newStore = document.getElementById('store-name');
// This is the event listener for the submit event
newStore.addEventListener('submit', handleStoreSubmit);

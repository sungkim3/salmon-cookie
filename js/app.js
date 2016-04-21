var storesArray = [];
var storeHoursArray = [];
// store hours between 6AM and 8PM
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

function randomNumberCustomerGenerator(min, max){
  var randomNumberOfCustomers = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumberOfCustomers;
}

function Store(name, min, max, avg) {
  this.customersPerHourArray = new Array();
  this.cookiesPerHourArray = new Array();
  this.name = name;
  this.min = min;
  this.max = max;
  this.avgCookiePerCustomer = avg;
  // var customerAtHour;

  this.fillCustomersPerHourArray = function() {
    for (var i = 0; i < storeHoursArray.length - 1; i++) {
      this.customersPerHourArray.push(randomNumberCustomerGenerator(this.min, this.max));
    }
  };

  this.numberOfCookiesPerHourGenerator = function() {
    var sum = 0;
    for (var i = 0; i < this.customersPerHourArray.length; i++) {
      var numberOfCookiesPerHour = this.customersPerHourArray[i] * this.avgCookiePerCustomer;
      this.cookiesPerHourArray.push(parseInt(numberOfCookiesPerHour));
    }
    for (var i = 0; i < this.cookiesPerHourArray.length; i++) {
      sum += this.cookiesPerHourArray[i];
    }
    this.cookiesPerHourArray.push(sum);
  };
  storesArray.push(this);
  this.fillCustomersPerHourArray();
  this.numberOfCookiesPerHourGenerator();
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
var newTableBody = document.createElement('tbody');

function createRowHeader() {
  var firstRow = document.getElementById('firstRow');
  for(var i = 0; i < storeHoursArray.length; i++){
    var th = document.createElement('th');
    th.textContent = storeHoursArray[i];
    firstRow.appendChild(th);
  }
};

function createBodyRows(tableBodyNode) {
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
};

createRowHeader();
createBodyRows(oldTableBody);

function resetTable() {
  console.log(newTableBody, oldTableBody);
  oldTableBody.parentNode.replaceChild(newTableBody, oldTableBody);
  oldTableBody = newTableBody;
}
// function emptyTable() {
//   var emptyHeader = document.getElementById('table-header');
//   emptyHeader.innerHTML = '';
// }
//table
//thead
//tbody

//table appendchild thead
//table appendchild tbody

//if name is duplicate
//construct newTbody
//use tbody.parentNode.replaceChild(newTbody, tbody)
//tbody = newTbody

var newStore = document.getElementById('store-name');

function handleStoreSubmit(event) {
  console.log(event);
  //prevents page reload on submit or button events!! need to have this.
  event.preventDefault();
  //event.target.(name).value the name is in reference to the name of the input on html
  //Ensures that all fields are filled out after the submit event triggers
  if (!event.target.storename.value || !event.target.mincustomer.value || !event.target.maxcustomer.value || !event.target.avgpercustomer.value) {
    return alert('Fields cannot be empty.');
  }
  // This stores the value from the event submission into a variable
  var newStoreName = event.target.storename.value.toString();
  var newStoreMin = event.target.mincustomer.value;
  var newStoreMax = event.target.maxcustomer.value;
  var newStoreAvg = event.target.avgpercustomer.value;
  console.log(newStoreName + ', ' + newStoreMin + ', ' + newStoreMax + ', ' + newStoreAvg);

  var storeFound = false;
  for (i = 0; i < storesArray.length; i++) {
    if (newStoreName === storesArray[i].name) {
      storeFound = true;
      storesArray[i].name = newStoreName;
      storesArray[i].min = newStoreMin;
      storesArray[i].max = newStoreMax;
      storesArray[i].avgCookiePerCustomer = newStoreAvg;
      // console.log(storesArray[i]);
    }
  }
  if (storeFound) {
    console.log('Store was found');
    resetTable();
    createBodyRows(oldTableBody);
    console.log(storesArray);
  }
  if (!storeFound) {
    console.log('Store was not found');
    var createNewStore = new Store(newStoreName, newStoreMin, newStoreMax, newStoreAvg);
    console.log(createNewStore);
    resetTable();
    createBodyRows(oldTableBody);
  }
    // console.log(newStoreName);
    // console.log(storesArray[i].name);
    // if (newStoreName !== storesArray[i].name && storeFound === false) {
    //   // console.log(storesArray[i].name);
    //   // Here we are creating the new store with the Store object constructor
    //   var createNewStore = new Store(newStoreName, newStoreMin, newStoreMax, newStoreAvg);
    //   console.log(createNewStore);
    //   break;
    // } else if (newStoreName === storesArray[i].name) {
    //   // console.log(storesArray[i]);
    //   storesArray[i].name = event.target.storename.value;
    //   storesArray[i].min = event.target.mincustomer.value;
    //   storesArray[i].max = event.target.maxcustomer.value;
    //   storesArray[i].avgCookiePerCustomer = event.target.avgpercustomer.value;
    //   console.log(storesArray[i]);
    //   storeFound = true;
    //   // console.log(storesArray);
    //   break;
    // }
  event.target.storename.value = null;
  event.target.mincustomer.value = null;
  event.target.maxcustomer.value = null;
  event.target.avgpercustomer.value = null;

}
// This is the event listener for the submit event
newStore.addEventListener('submit', handleStoreSubmit);

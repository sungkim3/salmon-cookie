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
storeHours();

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

var pikesPlace = new Store('Pikes Place Market', 17, 88, 5.2);
var seaTac = new Store('SeaTac Airport', 6, 24, 1.2);
var southCenter = new Store('Southcenter', 11, 38, 1.9);
var bellevue = new Store('Bellevue Square', 20, 48, 3.3);
var alki = new Store('Alki', 3, 24, 2.6);

function createRowHeader() {
  var firstRow = document.getElementById('firstRow');
  for(var i = 0; i < storeHoursArray.length; i++){
    var th = document.createElement('th');
    th.textContent = storeHoursArray[i];
    firstRow.appendChild(th);
  }
};
var row = document.getElementById('table-body');

// function createOneRow() {
//   var trEl = document.createElement('tr');
//   row.appendChild(trEl);
//   for (var i = 0; i < storeHoursArray - 1; i++) {
//     var tdEl = document.createElement('td');
//     tdEl.textContent =
//   }
// }

function createBodyRows() {
  for (var i = 0; i < storesArray.length; i++) {
    var tr = document.createElement('tr');
    row.appendChild(tr);
    var tdLabel = document.createElement('td');
    tdLabel.textContent = storesArray[i].name;
    tr.appendChild(tdLabel);
    for (var j = 0; j < storeHoursArray.length; j++) {
      var td = document.createElement('td');
      td.textContent = storesArray[i].cookiesPerHourArray[j];
      tr.appendChild(td);
    }
  }
  // because the event listener at the bottom executes createBodyRows again we need to clear the array again
};

createRowHeader();
createBodyRows();

function clearTable() {
  var tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';
}

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
  for (i = 0; i < storesArray.length; i++) {
    if (event.target.storename.value !== storesArray[i].name) {
      // This stores the value from the event submission into a variable
      var newStoreName = event.target.storename.value;
      var newStoreMin = event.target.mincustomer.value;
      var newStoreMax = event.target.maxcustomer.value;
      var newStoreAvg = event.target.avgpercustomer.value;
      // This empties out the fields after the submit event occurs
      event.target.storename.value = null;
      event.target.mincustomer.value = null;
      event.target.maxcustomer.value = null;
      event.target.avgpercustomer.value = null;
      // Here we are creating the new store with the Store object constructor
      var createNewStore = new Store(newStoreName, newStoreMin, newStoreMax, newStoreAvg);
      console.log(createNewStore);
    } else if (event.target.storename.value === storesArray[i].name) {
      clearTable();
      storesArray[i].name = event.target.storename.value;
      storesArray[i].min = event.target.mincustomer.value;
      storesArray[i].max = event.target.maxcustomer.value;
      storesArray[i].avgCookiePerCustomer = event.target.avgpercustomer.value;
      console.log(storesArray[i]);
      event.target.storename.value = null;
      event.target.mincustomer.value = null;
      event.target.maxcustomer.value = null;
      event.target.avgpercustomer.value = null;

    }
  }
  // createBodyRows();
}
// This is the event listener for the submit event
newStore.addEventListener('submit', handleStoreSubmit);

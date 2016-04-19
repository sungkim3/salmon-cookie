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
};

function inputGoal() {
  var decision = prompt('Hello, do you have any new stores to enter into the system? Y or N').toUpperCase();
  if (decision === 'Y' || decision === 'YES') {
    var newStoreName = prompt('Where is your location?');
    var newStoreMin = prompt('What is the lowest number of customers expected?');
    var newStoreMax = prompt('What is the maximum number of customers expected?');
    var newStoreAvg = prompt('On average, how many cookies per customer do you expect to sell?');
    var newStore = new Store(newStoreName, newStoreMin, newStoreMax, newStoreAvg);
  } else if (decision === 'N' || decision === 'NO') {
    alert('Here is the current store data.');
  } else {
    alert('That was not a Y or N response, here is the current store data. Please refresh to input new store data.');
  }
}

inputGoal();
createRowHeader();
createBodyRows();

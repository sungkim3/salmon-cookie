// var nameStoreTitle = document.getElementById('storeTitle');
// var nameStoreTitle2 = document.getElementById('storeTitle2');
// var nameStoreTitle3 = document.getElementById('storeTitle3');
// var nameStoreTitle4 = document.getElementById('storeTitle4');
// var nameStoreTitle5 = document.getElementById('storeTitle5');
// var nameStoreTitleArray = [nameStoreTitle, nameStoreTitle2, nameStoreTitle3, nameStoreTitle4, nameStoreTitle5];
//
// var nameStoreData = document.getElementById('storeData');
// var nameStoreData2 = document.getElementById('storeData2');
// var nameStoreData3 = document.getElementById('storeData3');
// var nameStoreData4 = document.getElementById('storeData4');
// var nameStoreData5 = document.getElementById('storeData5');
// var nameStoreDataArray = [nameStoreData, nameStoreData2, nameStoreData3, nameStoreData4, nameStoreData5];
//
// var makeStoreTable = document.getElementById('storeTable');
//
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

// pikesPlace.fillCustomersPerHourArray();

// // Pikes Place Store Object
// var pikesPlace = {
//   customersPerHourArray: new Array(),
//   cookiesPerHourArray: new Array(),
//   min: 17,
//   max: 88,
//   avgCookiePerCustomer: 5.2,
//   name: 'Pikes Place Market',
// // Generates a random number of customers within the min and max parameters (inclusively)
//   randomNumberCustomerGenerator: function () {
//     var randomNumberOfCustomers = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
//     return randomNumberOfCustomers;
//   },
// // Fills customersPerHourArray with randomly generated number of customers based on min and max values
//   fillCustomersPerHourArray: function () {
//     for (var i = 6; i < 21; i++) {
//       var customerAtHour = this.randomNumberCustomerGenerator();
//       this.customersPerHourArray.push(customerAtHour);
//     }
//     return this.customersPerHourArray;
//   },
// // Generates a number of cookies sold per hour based on fillCustomersPerHourArray, returns an array
//   numberOfCookiesPerHourGenerator: function () {
//     var sum = 0;
//     for (var i = 0; i < this.customersPerHourArray.length; i++) {
//       var numberOfCookiesPerHour = this.customersPerHourArray[i] * this.avgCookiePerCustomer;
//       this.cookiesPerHourArray.push(parseInt(numberOfCookiesPerHour));
//     }
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) {
//       sum += this.cookiesPerHourArray[i];
//     }
//     this.cookiesPerHourArray.push(sum);
//     return this.cookiesPerHourArray;
//   },
// };
// console.log(pikesPlace.fillCustomersPerHourArray());
// console.log(pikesPlace.numberOfCookiesPerHourGenerator());
//
// var seaTac = {
//   customersPerHourArray: new Array(),
//   cookiesPerHourArray: new Array(),
//   min: 6,
//   max: 24,
//   avgCookiePerCustomer: 1.2,
//   name: 'SeaTac Airport',
//   randomNumberCustomerGenerator: function () {
//     var randomNumberOfCustomers = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
//     return randomNumberOfCustomers;
//   },
//   fillCustomersPerHourArray: function () {
//     for (var i = 6; i < 21; i++) {
//       var customerAtHour = this.randomNumberCustomerGenerator();
//       this.customersPerHourArray.push(customerAtHour);
//     }
//     return this.customersPerHourArray;
//   },
//   numberOfCookiesPerHourGenerator: function () {
//     var sum = 0;
//     for (var i = 0; i < this.customersPerHourArray.length; i++) {
//       var numberOfCookiesPerHour = this.customersPerHourArray[i] * this.avgCookiePerCustomer;
//       this.cookiesPerHourArray.push(parseInt(numberOfCookiesPerHour));
//     }
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) {
//       sum += this.cookiesPerHourArray[i];
//     }
//     this.cookiesPerHourArray.push(sum);
//     return this.cookiesPerHourArray;
//   },
// };
// console.log(seaTac.fillCustomersPerHourArray());
// console.log(seaTac.numberOfCookiesPerHourGenerator());
//
// var southCenter = {
//   customersPerHourArray: new Array(),
//   cookiesPerHourArray: new Array(),
//   min: 11,
//   max: 38,
//   avgCookiePerCustomer: 1.9,
//   name: 'Southcenter',
//   randomNumberCustomerGenerator: function () {
//     var randomNumberOfCustomers = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
//     return randomNumberOfCustomers;
//   },
//   fillCustomersPerHourArray: function () {
//     for (var i = 6; i < 21; i++) {
//       var customerAtHour = this.randomNumberCustomerGenerator();
//       this.customersPerHourArray.push(customerAtHour);
//     }
//     return this.customersPerHourArray;
//   },
//   numberOfCookiesPerHourGenerator: function () {
//     var sum = 0;
//     for (var i = 0; i < this.customersPerHourArray.length; i++) {
//       var numberOfCookiesPerHour = this.customersPerHourArray[i] * this.avgCookiePerCustomer;
//       this.cookiesPerHourArray.push(parseInt(numberOfCookiesPerHour));
//     }
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) {
//       sum += this.cookiesPerHourArray[i];
//     }
//     this.cookiesPerHourArray.push(sum);
//     return this.cookiesPerHourArray;
//   },
// };
// console.log(southCenter.fillCustomersPerHourArray());
// console.log(southCenter.numberOfCookiesPerHourGenerator());
//
// var bellevueSquare = {
//   customersPerHourArray: new Array(),
//   cookiesPerHourArray: new Array(),
//   min: 20,
//   max: 48,
//   avgCookiePerCustomer: 3.3,
//   name: 'Bellevue Square',
//   randomNumberCustomerGenerator: function () {
//     var randomNumberOfCustomers = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
//     return randomNumberOfCustomers;
//   },
//   fillCustomersPerHourArray: function () {
//     for (var i = 6; i < 21; i++) {
//       var customerAtHour = this.randomNumberCustomerGenerator();
//       this.customersPerHourArray.push(customerAtHour);
//     }
//     return this.customersPerHourArray;
//   },
//   numberOfCookiesPerHourGenerator: function () {
//     var sum = 0;
//     for (var i = 0; i < this.customersPerHourArray.length; i++) {
//       var numberOfCookiesPerHour = this.customersPerHourArray[i] * this.avgCookiePerCustomer;
//       this.cookiesPerHourArray.push(parseInt(numberOfCookiesPerHour));
//     }
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) {
//       sum += this.cookiesPerHourArray[i];
//     }
//     this.cookiesPerHourArray.push(sum);
//     return this.cookiesPerHourArray;
//   },
// };
// console.log(bellevueSquare.fillCustomersPerHourArray());
// console.log(bellevueSquare.numberOfCookiesPerHourGenerator());
//
// var alki = {
//   customersPerHourArray: new Array(),
//   cookiesPerHourArray: new Array(),
//   min: 3,
//   max: 24,
//   avgCookiePerCustomer: 2.6,
//   name: 'Alki',
//   randomNumberCustomerGenerator: function () {
//     var randomNumberOfCustomers = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
//     return randomNumberOfCustomers;
//   },
//   fillCustomersPerHourArray: function () {
//     for (var i = 6; i < 21; i++) {
//       var customerAtHour = this.randomNumberCustomerGenerator();
//       this.customersPerHourArray.push(customerAtHour);
//     }
//     return this.customersPerHourArray;
//   },
//   numberOfCookiesPerHourGenerator: function () {
//     var sum = 0;
//     for (var i = 0; i < this.customersPerHourArray.length; i++) {
//       var numberOfCookiesPerHour = this.customersPerHourArray[i] * this.avgCookiePerCustomer;
//       this.cookiesPerHourArray.push(parseInt(numberOfCookiesPerHour));
//     }
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) {
//       sum += this.cookiesPerHourArray[i];
//     }
//     this.cookiesPerHourArray.push(sum);
//     return this.cookiesPerHourArray;
//   },
// };
// console.log(alki.fillCustomersPerHourArray());
// console.log(alki.numberOfCookiesPerHourGenerator());
//
// var storeObjectArray = [pikesPlace, seaTac, southCenter, bellevueSquare, alki];
// var headingArray = ['Hour of Day', 'Cookies Sold'];
//
// function displayStoreData() {
//   for (var x = 0; x < storeObjectArray.length; x++) {
//     nameStoreTitleArray[x].textContent = storeObjectArray[x].name;
//     document.body.appendChild(nameStoreTitleArray[x]);
//
//     var newBorder = document.createElement('hr');
//     document.body.appendChild(newBorder);
//
//     var newTable = document.createElement('table');
//     document.body.appendChild(newTable);
//
//     var newRow = document.createElement('tr');
//     newTable.appendChild(newRow);
//     var newRow2 = document.createElement('tr');
//     newTable.appendChild(newRow2);
//
//     var newHeader = document.createElement('th');
//     newHeader.textContent = headingArray[0];
//     newRow.appendChild(newHeader);
//
//     var newHeader2 = document.createElement('th');
//     newHeader2.textContent = headingArray[1];
//     newRow2.appendChild(newHeader2);
//
//     for (var i = 0; i < storeHoursArray.length; i++) {
//       var newData = document.createElement('td');
//       newData.textContent = storeHoursArray[i];
//       newRow.appendChild(newData);
//
//       var newData2 = document.createElement('td');
//       newData2.textContent = storeObjectArray[x].cookiesPerHourArray[i];
//       newRow2.appendChild(newData2);
//       // var newList = document.createElement('li');
//       // newList.textContent = storeHoursArray[i] + ': ' + storeObjectArray[x].cookiesPerHourArray[i] + ' cookies';
//       // document.body.appendChild(newList);
//     }
//   }
// }
// displayStoreData();

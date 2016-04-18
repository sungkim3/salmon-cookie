var listStoreData = document.getElementById('storeData');
var storeHoursArray = [];
var customersPerHourArray = [];
var cookiesPerHourArray = [];

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
  console.log(storeHoursArray);
}
storeHours();

// Pikes Place Store Object
var pikesPlace = {
  min: 17,
  max: 88,
  avgCookiePerCustomer: 5.2,
  name: 'Pikes Place Market',
// Generates a random number of customers within the min and max parameters (inclusively)
  randomNumberCustomerGenerator: function () {
    var randomNumberOfCustomers = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    return randomNumberOfCustomers;
  },
// Fills customersPerHourArray with randomly generated number of customers based on min and max values
  fillCustomersPerHourArray: function () {
    for (var i = 6; i < 21; i++) {
      var customerAtHour = this.randomNumberCustomerGenerator();
      customersPerHourArray.push(customerAtHour);
    }
    return customersPerHourArray;
  },
// Generates a number of cookies sold per hour based on fillCustomersPerHourArray, returns an array
  numberOfCookiesPerHourGenerator: function () {
    for (var i = 0; i < customersPerHourArray.length; i++) {
      var numberOfCookiesPerHour = customersPerHourArray[i] * this.avgCookiePerCustomer;
      cookiesPerHourArray.push(parseInt(numberOfCookiesPerHour));
    }
    return cookiesPerHourArray;
  },
  displayStoreData: function () {
    for (var i = 0; i < storeHoursArray.length; i++) {
      var newList = document.createElement('li');
      newList.textContent = storeHoursArray[i] + ': ' + cookiesPerHourArray[i] + ' cookies';
      document.body.appendChild(newList);
    }
  },
};
console.log(pikesPlace.fillCustomersPerHourArray());
console.log(pikesPlace.numberOfCookiesPerHourGenerator());
pikesPlace.displayStoreData();

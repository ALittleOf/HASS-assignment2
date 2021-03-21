// Assignment Two (02.526 Interactive Data Visualisation)
'use strict'

// execute commands inside every time browser reloaded
window.onload = () => {
    getData();
}

//get Data 
async function getData() {
  try {
    const response = await fetch("https://api.data.gov.sg/v1/transport/carpark-availability");
    if (response.ok) {
      const data = await response.json();
      const carparkData = data.items[0].carpark_data
      return carparkData;
    }
  } catch (error) {
    console.log(error);
  }
};
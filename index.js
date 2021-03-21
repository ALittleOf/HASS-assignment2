// Assignment One (02.526 Interactive Data Visualisation)
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

//appends to HTML table
getData()
  .then(carparkData => {
    // console.log(carparkData);
    var table = document.getElementById("myTable")
    for (var i = 0; i < carparkData.length; i++){
        if(carparkData[i].carpark_info[0].total_lots == 0) {
            break;
        }
        var x = (carparkData[i].carpark_info[0].total_lots - carparkData[i].carpark_info[0].lots_available) / (carparkData[i].carpark_info[0].total_lots)
        var utiRate = (Math.round(x*100*10)/10).toFixed(2)
        if(utiRate<=80){
            var row = 
                `<tr>
                        <td>${carparkData[i].carpark_number}</td>
                        <td>${carparkData[i].update_datetime}</td>
                        <td>${carparkData[i].carpark_info[0].lots_available}</td>
                        <td>${carparkData[i].carpark_info[0].lot_type}</td>
                        <td>${carparkData[i].carpark_info[0].total_lots}</td>
                        <td>${utiRate}%</td>
                </tr>`
            table.innerHTML += row
        }
        else{
            var row = 
                `<tr>
                        <td>${carparkData[i].carpark_number}</td>
                        <td>${carparkData[i].update_datetime}</td>
                        <td>${carparkData[i].carpark_info[0].lots_available}</td>
                        <td>${carparkData[i].carpark_info[0].lot_type}</td>
                        <td>${carparkData[i].carpark_info[0].total_lots}</td>
                        <td id ="highUti">${utiRate}%</td>
                </tr>`
            table.innerHTML += row
        }
    }
  })
  .catch(err => {
    console.log(err);
});

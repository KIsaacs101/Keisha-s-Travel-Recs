/*
home page html elements

search input 
    id= 'DestinationInput'
search button
    id='SearchBTN;
clear button
    id='ClearBTN'

result section of page
    div
    id="result"

    result image 
    id="resultImage"; to change src (.src = ...)
    https://www.w3schools.com/jsref/prop_img_src.asp

    h1
    id="resultName"

    h2
    id="resultDescription"
*/

//!result div hidden until shown when search results are ready (not yet to be installed)

const searchInput = document.getElementById("DestinationInput");
const searchButton = document.getElementById("SearchBTN");
const clearButton = document.getElementById("ClearBTN");

let result = document.getElementById("result");

const resultName1 = document.getElementById("resultName1");
const resultImage1 = document.getElementById("resultImage1");
const resultDescription1 = document.getElementById("resultDescription1");

const resultName2 = document.getElementById("resultName2");
const resultImage2 = document.getElementById("resultImage2");
const resultDescription2 = document.getElementById("resultDescription2");

//reset/clear input when clear button is clicked
function clearInput() {
  searchInput.value = "";
}
clearButton.addEventListener("click", clearInput);

function searchDestination() {
  result.style.display = "";
  let value = searchInput.value.toLowerCase();
  let upperCaseFirstLetterValue =
    value.charAt(0).toUpperCase() + value.slice(1);

  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      if (value === "beach" || value === "beaches") {
        value = "beaches";
        resultImage1.src = data[value][0]["imageUrl"];
        resultImage2.src = data[value][1]["imageUrl"];
        resultName1.innerHTML = data[value][0]["name"];
        resultName2.innerHTML = data[value][1]["name"];
        resultDescription1.innerHTML = data[value][0]["description"];
        resultDescription2.innerHTML = data[value][1]["description"];
      } else if (value === "temple" || value === "temples") {
        value = "temples";
        resultImage1.src = data[value][0]["imageUrl"];
        resultImage2.src = data[value][1]["imageUrl"];
        resultName1.innerHTML = data[value][0]["name"];
        resultName2.innerHTML = data[value][1]["name"];
        resultDescription1.innerHTML = data[value][0]["description"];
        resultDescription2.innerHTML = data[value][1]["description"];
      } else {
        for (let i = 0; i < data["countries"].length; i++) {
          if (data["countries"][i]["name"] === upperCaseFirstLetterValue) {
            resultImage1.src = data["countries"][i]["cities"][0]["imageUrl"];
            resultImage2.src = data["countries"][i]["cities"][1]["imageUrl"];
            resultName1.innerHTML = data["countries"][i]["cities"][0]["name"];
            resultName2.innerHTML = data["countries"][i]["cities"][1]["name"];
            resultDescription1.innerHTML =
              data["countries"][i]["cities"][0]["description"];
            resultDescription2.innerHTML =
              data["countries"][i]["cities"][1]["description"];
            return;
          }
        }
        resultName1.innerHTML = "Search not found.";
        resultName2.innerHTML = "Please try again.";
        resultImage1.src =
          "https://seo-hacker.com/wp-content/uploads/2018/05/Search-Goes-Global_A-Look-Into-Search-Engines-Around-the-World-1024x768.jpg";
        resultImage2.src =
          "https://www.lifewire.com/thmb/9LILR_bPSZLFbsxlvr5gA-a3EsI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1047578412-692fa117cf86450287d8873eeb1a95c8.jpg";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      resultDescription1.innerHTML = "An error occurred while fetching data.";
      resultDescription2.innerHTML = "An error occurred while fetching data.";
    });
  clearInput();
}
searchButton.addEventListener("click", searchDestination);

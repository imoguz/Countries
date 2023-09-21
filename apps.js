fetch("https://restcountries.com/v3.1/all")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Datas can not be fetched");
    }
    return response.json();
  })
  .then((data) => {
    selectBox(data);
    const country = document.getElementById("country");
    country.addEventListener("change", (event) => {
      const selected = event.target.value;
      data.forEach((item) => {
        if (item.name.common == selected) extractData(item);
      });
    });
  })
  .catch((error) => {
    console.log("Datas can not be fetched");
  });

const extractData = ({
  name,
  borders,
  capital,
  currencies,
  flags,
  languages,
  population,
  region,
  maps,
}) => {
  const displayDiv = document.getElementById("displayDiv");
  displayDiv.setAttribute("style", "width: 20rem");

  flagToDom(flags);
  cNameToDom(name);
  regionToDom(region);
  capitalsToDom(capital);
  languagesToDom(languages);
  currenciesToDom(currencies);
  populationToDom(population);
  bordersToDom(borders);
  googleMap(maps);
};
function flagToDom(flagData) {
  const flag = document.getElementById("flag");
  flag.setAttribute("src", flagData.png);
}
function cNameToDom(cNameData) {
  const cName = document.getElementById("cName");
  cName.innerHTML = "";
  const cNameNode = document.createTextNode(cNameData.common);
  cName.appendChild(cNameNode);
}
function regionToDom(regionData) {
  const region = document.getElementById("region");
  region.innerHTML = "";
  const regionNode = document.createTextNode(regionData);
  region.appendChild(regionNode);
}
function capitalsToDom(capitalData) {
  const capitals = document.getElementById("capitals");
  capitals.innerHTML = "";
  const capitalNode = document.createTextNode(capitalData);
  capitals.appendChild(capitalNode);
}
function languagesToDom(languagesData) {
  const languages = document.getElementById("languages");
  languages.innerHTML = "";
  const languagesNode = document.createTextNode(Object.values(languagesData));
  languages.appendChild(languagesNode);
}
function currenciesToDom(currenciesData) {
  const currencies = document.getElementById("currencies");
  currencies.innerHTML = "";
  const currencyKey = Object.keys(currenciesData);
  currencyKey.forEach((item) => {
    const currenciesNode = document.createTextNode(
      currenciesData[item].name + ", " + currenciesData[item].symbol + " "
    );
    currencies.appendChild(currenciesNode);
  });
}
function populationToDom(populationData) {
  const population = document.getElementById("population");
  population.innerHTML = "";
  const populationNode = document.createTextNode(populationData);
  population.appendChild(populationNode);
}
function bordersToDom(bordersData) {
  if (bordersData) {
    const borders = document.getElementById("borders");
    borders.innerHTML = "";
    const bordersNode = document.createTextNode(bordersData);
    borders.appendChild(bordersNode);
  }
}
function googleMap(mapLink) {
  const googleMapLink = document.getElementById("googleMapLink");
  googleMapLink.setAttribute("href", mapLink.googleMaps);
}
function selectBox(countries) {
  const country = document.getElementById("country");
  let sortedCountry = countries.map((item) => item.name.common);
  sortedCountry.sort().forEach((item) => {
    const option = document.createElement("option");
    const optionsNode = document.createTextNode(item);
    option.appendChild(optionsNode);
    country.appendChild(option);
  });
}

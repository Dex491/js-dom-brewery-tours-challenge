// targeting
const breweriesList = document.querySelector('.breweries-list')
const stateSearch = document.querySelector('#select-state-form')
const filterByType = document.querySelector('#filter-by-type')
const filterByName = document.querySelector('#search-breweries')


// Local state
const state = {
  types: ["regional", "micro", "brewpub"],
  breweries: [],
  filterByType: "",
  filterByName: "",
}

// RENDERING

// function to trigger all rendering needed
function render() {
  renderBreweries()

  // call Ext. 2 render function
}

// Breweries function
function renderBreweries() {
  // clear html
  breweriesList.innerHTML = ''

  // apply filters function
  const breweries = applyFilters()
  // for each brewery create a card (point to card rendering function)

  breweries.forEach(renderBreweryCard)
}

// Filters function
function applyFilters() {
  // variable for state.breweries
  let filteredBreweries = state.breweries

  // filter breweries by type
  if(state.filterByType !== "") {
    console.log('Filtering by type')
    filteredBreweries = filteredBreweries.filter(brewery => brewery.brewery_type === state.filterByType)
  }

  // Ext. 1 - filter breweries by name
  if(state.filterByName !== "") {
    console.log('Filtering by name')
    filteredBreweries = filteredBreweries.filter(brewery => brewery.name.includes(state.filterByName))
  }

  // Ext. 2 - filter breweries by city
  
  return filteredBreweries
  // function end
}

// Card rendering function
function renderBreweryCard(brewery) {
  console.log('Card rendering')
  // create li
  const li = document.createElement('li')
  // create h2 for title
  const h2 = document.createElement('h2')
  h2.innerText = brewery.name
  // create div .type
  const div = document.createElement('div')
  div.setAttribute('class', 'type')
  div.innerText = brewery.brewery_type

  // create section for address
  const sectionAddress = document.createElement('section')
  sectionAddress.setAttribute('class', 'address')
  // h3 for address title
  const h3Address = document.createElement('h3')
  h3Address.innerText = 'Address:'
  // p for address line 1
  const pAddressL1 = document.createElement('p')
  pAddressL1.innerText = brewery.street
  // p for address line 2 /w strong
  const pAddressL2 = document.createElement('p')
  pAddressL2.setAttribute('style', 'font-weight: bold')
  pAddressL2.innerText = brewery.city + ', ' + brewery.postal_code
  sectionAddress.append(h3Address, pAddressL1, pAddressL2)

  // create section for phone number
  const sectionNumber = document.createElement('section')
  sectionNumber.setAttribute('class', 'phone')
  // h3 for phone title
  const h3Phone = document.createElement('h3')
  h3Phone.innerText = 'Phone:'
  // p for number
  if (brewery.phone === null) {
    brewery.phone = 'N/A'
  }
  const pPhone = document.createElement('p')
  pPhone.innerText = brewery.phone
  sectionNumber.append(h3Phone, pPhone)

  // section for website .link
  const sectionSite = document.createElement('section')
  sectionSite.setAttribute('class', 'link')
  // anchor link to brewery site
  const a = document.createElement('a')
  a.setAttribute('href', `${brewery.website_url}`)
  a.setAttribute('target', '_blank')
  a.innerText = 'Visit Website'
  if (brewery.website_url === null) {
    a.innerText = 'No Website'
    a.setAttribute('style', 'background-color: red')
  }
  sectionSite.appendChild(a)

  // append everything to where they should be
  breweriesList.appendChild(li)
  li.append(h2, div, sectionAddress, sectionNumber, sectionSite)

  // function end
}

// EVENT LISTENERS

// Event listener for when website button is clicked
  // anchor link to button?
// EL end

// Event listener for when search is submitted
stateSearch.addEventListener('submit', event => {
  // prevent the submit from F5'ing the page
  event.preventDefault()
  // create variable from the entered state
  const stateName = event.target[0].value
  // fetch from the brewery api using the above state (also 50 items per page)
  fetch(`https://api.openbrewerydb.org/breweries?by_state=${stateName}&per_page=50`)
    // extract JSON from the response and convert into a JS object
    .then(response => response.json())
    // extract the data so that it can be filtered through
    .then (data => {
      state.breweries = data.filter(brewery => state.types.includes(brewery.brewery_type))
      console.log(`Breweries that are from the searched state:`)
      console.log(state.breweries)

      // trigger render functions
      render()
    })
  // EL end
})

// Event listener for filtering by brewery type
filterByType.addEventListener('change', event => {
  // update type filter within state based on selection
  state.filterByType = event.target.value

  render()
  // EL end
})

// Ext. 1
// function to search by name
filterByName.addEventListener('input', event => {
  // update name filter when there's any input in the search bar
  state.filterByName = event.target.value

  render()
  // EL end
})

// Ext. 2

// cityFilter function
  // create cities array
  // search through the array for the requested cities
  // make sure it only finds micro, regional or brewpub breweries
// function end

// Ext. 3


//Ext. 4
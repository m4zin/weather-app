import {data} from "./fetchData";

const display = (function() {
    const searchBtn = document.querySelector('.search-btn')

    async function retrieveData() {
        const searchValue = document.getElementById('location').value
        const fetchedData = await data.fetchWeatherData(searchValue)
    }

    function init() {
        searchBtn.addEventListener('click', retrieveData)
    }

    return {
        init
    }
})()

export {display}

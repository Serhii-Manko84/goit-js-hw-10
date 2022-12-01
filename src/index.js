import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import { countryListMarkup } from './creatMerkup.js';
import { countryInfoMarkup } from './creatMerkup.js';

const DEBOUNCE_DELAY = 300;

const refs = {
    body: document.querySelector('body'),
    inputSearch: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}
// console.log(refs.countryInfo)

refs.inputSearch.addEventListener('input', debounce(inputCountry, DEBOUNCE_DELAY));

function inputCountry() {
    const name = refs.inputSearch.value.trim();
    if (name === '') {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
      
      return;
    }
    
    fetchCountries(name)
      .then(countrys => {
        console.log(countrys)
      if (countrys.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        
      }

      else if (countrys.length > 1) {
        const listMarkup = countrys.map(country => countryListMarkup(country));
        refs.countryList.innerHTML = listMarkup.join('');
        refs.countryInfo.innerHTML = '';        
        
      }

      else {
        const infoMarkup = countrys.map(country => countryInfoMarkup(country));
        refs.countryList.innerHTML = infoMarkup.join('');
        refs.countryInfo.innerHTML = '';
                
      }
    })
    
    .catch(error => {
        Notify.failure('Oops, there is no country with that name');
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return error;
      })
};
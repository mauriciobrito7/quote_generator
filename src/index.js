import './style.css';
import './app.css';

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter-btn');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function loading() {
 loader.hidden = false;
 quoteContainer.hidden = true;
}

function complete() {
 if (!loader.hidden) {
  quoteContainer.hidden = false;
  loader.hidden = true;
 }
}

async function getQuote() {
 loading();
 const apiUrl = 'https://api.api-ninjas.com/v1/quotes?limit=1&format=json';
 try {
  const response = await fetch(apiUrl, {
   headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Api-Key': 'tHjduBoEV50HGgWnKUX4Rg==WVuCw3P2AXArRTQi'
   }
  });
  const quoteCollection = await response.json();
  const data = quoteCollection[0];

  if (data.author === '') {
   authorText.innerText = 'Unknown';
  } else {
   authorText.innerText = data.author;
  }

  if (data.quote.length > 120) {
   quoteText.classList.add('long-quote');
  } else {
   quoteText.classList.remove('long-quote');
  }
  quoteText.innerText = data.quote;
  complete();
 } catch (error) {
  console.error(error);
 }
}

function tweetQuote() {
 const quote = quoteText.innerText;
 const author = authorText.innerText;
 const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
 window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();


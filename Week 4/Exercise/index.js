import { getData } from './one.js';

function updateDisplay(current, data) {
  document.getElementById('author').innerHTML = data[current - 1].author;
  document.getElementById('pic').src = data[current - 1].download_url;
}
function displayData(data) {
  let dataLength = data.length;
  let current = 1;
  document.getElementById('next').addEventListener('click', ()=> {
    if (current + 1 > dataLength) current = 1;
    else current ++;
    updateDisplay(current, data);
  })
  document.getElementById('back').addEventListener('click', () => {
    if (current - 1 < 1) current = dataLength;
    else current --;
    updateDisplay(current, data);
  })
  updateDisplay(current, data);
}

(async () => {
  let data = await getData();
  displayData(data);
})();

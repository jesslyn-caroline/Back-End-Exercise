import { getData } from './one.js';

function displayData(data) {
  data.forEach((i) => {
    document.getElementById('table').innerHTML += `
    <tr>
        <td><img src="${i.download_url}" style="max-width: 150px;"/></td>
        <td>${i.author}</td>
    </tr>`;
  });
}

(async () => {
  let data = await getData();
  displayData(data);
})();

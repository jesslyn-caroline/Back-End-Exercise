const link = 'https://picsum.photos/v2/list';

async function getData() {
  try {
    let fetchData = await fetch(link);
    if (!fetchData.ok) throw console.log(error);
    let data = await fetchData.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export {getData};
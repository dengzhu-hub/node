async function fetchData() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (response.ok) {
        const data = await response.json();
        console.log(data[2].title);
      } else {
        throw new Error('Error: ' + response.status);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  fetchData();
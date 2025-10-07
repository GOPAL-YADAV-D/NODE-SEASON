
fetch('https://api.demo.foo/v1/todo')

  .then(response => response.json())

  .then(json => console.log(json))

  .catch(error => console.log(error));
//Mettre le code JavaScript lié à la page photographer.html

const params = (new URL(document.location)).searchParams;
const id = params.get('id');

console.log(id);
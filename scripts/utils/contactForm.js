const bodyElt = document.querySelector('body');
const modalElt = document.getElementById("contact_modal");

function displayModal() {
	modalElt.style.display = "block";
    bodyElt.style.overflowY = 'hidden';
}

function closeModal() {
    modalElt.style.display = "none";
    bodyElt.style.overflowY = 'scroll';
}

const formElt = modalElt.querySelector('form');
formElt.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputElt = modalElt.querySelectorAll('input');
    const textAreaElt = modalElt.querySelector('textarea');

 
    inputElt.forEach(input => console.log(input.value));
    console.log(textAreaElt.value);
});
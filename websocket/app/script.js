'use strict';

const ws = new WebSocket('ws://localhost:7686');
console.log(ws);

const btn = document.querySelector('form');
const text = document.querySelector('.form-text');
const input = document.querySelector('.form-input');
console.log(input);
const value = input.dataset.value;
console.log(value);
console.log(btn);

const getMessage = (e) => {
  e.preventDefault();
  console.log('did');

  if (input.value) {
    console.log('did');
    ws.send(input.value);
    input.value = '';
  }
  input.focus();
};
btn.addEventListener('submit', getMessage);
ws.addEventListener('message', ({data}) => {
  console.log(data);
  const li = document.createElement('li');

  li.textContent = data;
  text.appendChild(li);
});

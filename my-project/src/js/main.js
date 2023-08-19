// Import all of Bootstrap's JS
import { Popover } from 'bootstrap';

document.querySelectorAll('[data-bs-toggle="popover"]')
  .forEach(popover => {
    new Popover(popover)
  })
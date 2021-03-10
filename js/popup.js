import { isEscEvent } from './util.js';

const main = document.querySelector('main');

// const successPopup = () => {

//   const successTemplate = document.querySelector('#success').content.querySelector('.success');
//   const errorTemplateClone = successTemplate.cloneNode(true);
//   errorTemplateClone.style.zIndex = 9999;
//   main.appendChild(errorTemplateClone);

//   const onPopupEscKeydown = (evt) => {
//     if (isEscEvent(evt)) {
//       evt.preventDefault();
//       closeUserModal();
//     }
//   };

//   const closeUserModal = () => {
//     errorTemplateClone.classList.add('hidden');
//     errorTemplateClone.removeEventListener('click', closeUserModal);
//     document.removeEventListener('keydown', onPopupEscKeydown);
//   };

//   errorTemplateClone.addEventListener('click', closeUserModal);
//   document.addEventListener('keydown', onPopupEscKeydown);

// }

// const errorPopup = () => {

//   const errorTemplate = document.querySelector('#error').content.querySelector('.error');
//   const errorTemplateClone = errorTemplate.cloneNode(true);
//   const buttonClose = errorTemplateClone.querySelector('.error__button');
//   errorTemplateClone.style.zIndex = 9999;
//   main.appendChild(errorTemplateClone);

//   const onPopupEscKeydown = (evt) => {
//     if (isEscEvent(evt)) {
//       evt.preventDefault();
//       closeUserModal();
//     }
//   };

//   const closeUserModal = () => {
//     errorTemplateClone.classList.add('hidden');
//     buttonClose.removeEventListener('click', closeUserModal);
//     errorTemplateClone.removeEventListener('click', closeUserModal);
//     document.removeEventListener('keydown', onPopupEscKeydown);
//   };

//   buttonClose.addEventListener('click', closeUserModal);
//   errorTemplateClone.addEventListener('click', closeUserModal);
//   document.addEventListener('keydown', onPopupEscKeydown);

// }

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const buttonClose = document.querySelector('.error__button'); // document bad

const popup = (item, button) => {

  const modal = item.cloneNode(true);
  modal.style.zIndex = 9999;
  main.appendChild(modal);

  const onPopupEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeUserModal();
    }
  };

  const closeUserModal = () => {
    modal.classList.add('hidden');
    if (button) {
      button.removeEventListener('click', closeUserModal);
    }
    modal.removeEventListener('click', closeUserModal);
    document.removeEventListener('keydown', onPopupEscKeydown);
  };

  if (button) {
    buttonClose.addEventListener('click', closeUserModal);
  }
  modal.addEventListener('click', closeUserModal);
  document.addEventListener('keydown', onPopupEscKeydown);

}

const successPopup = () => popup(successTemplate);
const errorPopup = () => popup(errorTemplate, buttonClose);

export { successPopup, errorPopup }



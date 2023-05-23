const classListForm = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    saveBtnSelector: '.popup__save-button',
    disabledBtnSelector: 'popup__save-button_disabled',
    inputErrorClassSelector: 'popup__input_type_error',
    errorClassSelector: 'popup__input_type_visible',
};

function showValidationError(formId, inputId, errorMessage) {
    const errorId = formId.querySelector(`.${inputId.id}-error`)
    inputId.classList.add(classListForm.inputErrorClassSelector);
    errorId.textContent = errorMessage;
    errorId.classList.add(classListForm.errorClassSelector);
}

function hideValidationError(formId, inputId) {
    const errorId = formId.querySelector(`.${inputId.id}-error`)
    inputId.classList.remove(classListForm.inputErrorClassSelector);
    errorId.classList.remove(classListForm.errorClassSelector);
    errorId.textContent = '';
}

function checkValidation(formId, inputId) {
    if (inputId.validity.valid === false) {
        showValidationError(formId, inputId, inputId.validationMessage);
    } else {
        hideValidationError(formId, inputId);
    }
}

function setEventListeners(formId) {
    const inputList = Array.from(formId.querySelectorAll(classListForm.inputSelector));
    const buttonItem = formId.querySelector(classListForm.saveBtnSelector);
    toggleButtonState(inputList, buttonItem);
    inputList.forEach((inputItem) => {
        inputItem.addEventListener('input', function () {
            checkValidation(formId, inputItem);
            toggleButtonState(inputList, buttonItem);
        });
    });
}

function hasInvalidValue(inputList) {
    return inputList.some((item) => {
        return !item.validity.valid;
    });
}

function toggleButtonState(inputList, buttonId) {
    if (hasInvalidValue(inputList)) {
        buttonId.classList.add(classListForm.disabledBtnSelector);
    } else {
        buttonId.classList.remove(classListForm.disabledBtnSelector);
    }
}

function enableValidationCheck() {
    const formList = Array.from(document.querySelectorAll(classListForm.formSelector));
    formList.forEach((formItem) => {
        formItem.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formItem);
    });
}

enableValidationCheck();
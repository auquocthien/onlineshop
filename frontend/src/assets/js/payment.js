/* eslint-disable no-unused-vars */

import $ from 'jquery'
var form = document.querySelector('#cardForm');

// Input switcher
var formItems = [];
var currentFormItem = 0;

$('.field-container').each(function () {
    formItems.push(this);
})

// Add the functionality for what happens when people will click on next
function formControlNext() {
    $(formItems[currentFormItem]).addClass('field-container--hidden');
    $(formItems[currentFormItem + 1]).removeClass('field-container--hidden');

    currentFormItem = currentFormItem + 1;
    checkFormVisibility();
    changeStepperNumber();

    hideNext();

    return false;
}

function hideNext() {
    if (!$(formItems[currentFormItem + 1]).find('.hosted-field').hasClass('hosted-field')) {
        $('.form-controls__next').addClass('form-controls--hidden');
    }

    $('.form-controls__prev').addClass('form-controls--back');
}

function formControlPrev() {
    $(formItems[currentFormItem]).addClass('field-container--hidden');
    $(formItems[currentFormItem - 1]).removeClass('field-container--hidden');

    currentFormItem = currentFormItem - 1;
    checkFormVisibility();
    changeStepperNumber();
}

function showNext() {
    $('.form-controls__next').removeClass('form-controls--hidden');
    $('.form-controls__prev').removeClass('form-controls--back');
}

$('.form-controls__next').click(function () {
    formControlNext();

    return false;
})

$('.form-controls__prev').click(function () {
    formControlPrev();

    return false;
})

function changeStepperNumber() {
    if (currentFormItem === 3) {
        $('.form-controls__steps').text('4 / 4');
        $('.field-message').text('Time to buy that sweet sweet bag.');
        $('.form-controls').addClass('form-controls--end');
    } else if (currentFormItem === 2) {
        $('.form-controls__steps').text('3 / 4');
        $('.field-message').text('This is on the back of your card.');
        $('.form-controls').removeClass('form-controls--end');
    } else if (currentFormItem === 1) {
        $('.form-controls__steps').text('2 / 4');
        $('.field-message').text('When will your card expire?');
    } else {
        $('.form-controls__steps').text('1 / 4');
        $('.field-message').text('Let\'s add your card number.');
    }
}

// Show/hide the appropriate controls
function checkFormVisibility() {
    if (currentFormItem === 0) {
        $('.form-controls__prev').addClass('form-controls--hidden');
    } else {
        $('.form-controls__prev').removeClass('form-controls--hidden');
    }

    if (currentFormItem === 3) {
        $('.form-controls__next').addClass('form-controls--hidden');
    } else {
        $('.form-controls__next').removeClass('form-controls--hidden');
    }
}


'use strict';

window.jQuery(function ($) {
	// находит форму
	var $form = $('.js-calc');

	// находим элементы внутри формы
	var $inputX = $form.find('.js-input-x');
	var $inputY = $form.find('.js-input-y');
	var $action = $form.find('.js-operator');
	var $result = $form.find('.js-input-result');

	// записываем названия классов в переменные, чтобы потом было удобнее
	var errorClass = 'error-input';
	var errorMessageClass = 'error-message';

	// функция, которая создает ошибку. Принимает в себя текст ошибки и элемент,
	// после которого нужно вставить ошибку
	function createError(errorMsg, $errorElement) {
		console.log('function createError');

		var $err = $('<p>');
		$err.addClass(errorMessageClass);
		$err.text(errorMsg);
		// либо, это все это можно записать одной строкой:
		// var $err = $('<p>').addClass(errorMessageClass).text(errorMsg)

		// вставялем $err после $errorElement
		$errorElement.after($err);

		// добавляем $errorElement класс ошибки
		$errorElement.addClass(errorClass);
	}

	function removeErrors() {
		console.log('function removeErrors');
		// находим input у которых есть класс ошибки и удаляем этот класс
		var $hasErrors = $form.find('.' + errorClass);
		$hasErrors.removeClass(errorClass);

		//находим элементы с текстом ошибки и удаляем сами элементы
		var $errorMessage = $form.find('.' + errorMessageClass);
		$errorMessage.remove();
	}

	function checkoutInput($input) {
		console.log('function checkoutInput');
		// получаем значение из input
		var value = $input.val();

		// проверяем, заполнино ли оно
		if (value.length === 0) {
			createError('имеет пустое значение', $input);
			return null;
		}

		// пытяаемся привести к числу
		value = +value;

		// проверяем, получилось ли у нас число
		if (isNaN(value)) {
			createError('имеет не числовое значение', $input);
			return null;
		}

		// если мы дошли до сюда, значит все хорошо и возвращаем число
		return value;
	}

	// calc
	function calc() {
		console.log('function calc');
		// получаем числа для valueX и valueY
		var valueX = checkoutInput($inputX);
		var valueY = checkoutInput($inputY);

		// проверяем, что мы получили числа, если все хорошо, то начнем вычисления
		if (valueX !== null && valueY !== null) {
			var action = $action.val();
			var result = null;

			switch (action) {
				case 'addition':
					result = valueX + valueY;
					break;
				case 'subtract':
					result = valueX - valueY;
					break;
				case 'multiple':
					result = valueX * valueY;
					break;
				case 'division':
					if (valueY === 0) {
						createError('на ноль делить нельзя', $inputY);
					} else {
						result = valueX / valueY;
					}
					break;
			}

			if (result !== null) {
				$result.val(result);
			}
		}
	}

	// событие отправки формы, submit
	$form.on('submit', function () {
		console.log('form submit');
		removeErrors();
		calc();
        console.log('----------------');
		return false;
	});

	// событие сброса формы, reset
	$form.on('reset', function () {
		console.log('form reset');
		removeErrors();
        console.log('----------------');
	});

});

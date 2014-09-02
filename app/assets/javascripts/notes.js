// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/


$(function(){
	$('#notes_wrapper').delegate('a', 'click', function() {
		$(this).closest('.row').remove();
	})
	$('#form_wrapper').on('ajax:complete', 'form', function(e, xhr, status) {
		$('input[type="text"]').val('');
		$('textarea').val('');
	})
	$('input[type="submit"]').click(function(){
		$('#error_wrapper').empty();
	})
	$('#notes_wrapper').delegate('.title', 'click', function() {
		$(this).attr('contenteditable', 'true');
		$(this).focus();
		$(this).closest('.row').attr('id', 'edit');
	})
	$('#notes_wrapper').delegate('.description', 'click', function() {
		$(this).attr('contenteditable', 'true');
		$(this).focus();
		$(this).closest('.row').attr('id', 'edit');
	})
	$('#notes_wrapper').on('focusout', '#edit', function() {
		$('#error_wrapper').empty();
		title = $('#edit').find('.title').text();
		description = $('#edit').find('.description').text();
		$.ajax({
			type: 'PATCH',
			url: $('#edit').find('a').attr('href'),
			data: {
				note: {
						title: title,
						description: description
					}
			}
		})
		$('#edit').find("[contenteditable='true']").removeAttr('contenteditable');
		$('#edit').removeAttr('id');
		return false;
	})
	// $(document).find('span.empty()').text('Cannot be blank');
})
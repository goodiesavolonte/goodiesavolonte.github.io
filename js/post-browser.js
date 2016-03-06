/*
** Copyright (c) 2013 Nicolas Huon (http://nicolashuon.appspot.com)
** Licensed under the MIT License (LICENSE.txt).
*/

(function($)
{
	function PostBrowser() {
		var self = this;
		this.options = [];

		this.InitOptionsFromURL();
		this.RefreshPosts();
		this.RefreshCounts();

		$('.pb-option-item input').click(function() {
			var element = $(this);
			var category = element.val();
			var index = self.options.indexOf(category);
			if (index > -1) {
				self.options.splice(index, 1);
			} else {
				self.options.push(category);
			}
			self.RefreshPosts();
			self.RefreshCounts();
		});
	}

	PostBrowser.prototype.InitOptionsFromURL = function() {
		var self = this;
		if (window.location.hash != "") {
			this.options = window.location.hash.substr(1).split('-');
			$('.pb-option-item input').each(function() {
				$(this).prop('checked', jQuery.inArray($(this).val(), self.options) != -1);
			});
		}
	}

	PostBrowser.prototype.RefreshCounts = function() {
		$('.pb-option-cat').each(function() {
			var element = $(this);
			var category = element.text();
			var count = $('.pb-cat-' + category + ':not(.pb-hidden)').length;
			var count_str = '';
			if (count > 0) {
				count_str = '(' + count.toString() + ')';
				element.removeClass('pb-empty');
			} else {
				element.addClass('pb-empty');
			}

			element.next('.pb-option-count').text(count_str);
		});
	}

	PostBrowser.prototype.RefreshPosts = function() {
		var selector = ".pb-post-item";
		$(selector).hide().addClass('pb-hidden');
		if (this.options.length) {
			for (i in this.options) {
				var category = this.options[i];
				selector += '.pb-cat-' + category;
			}
		}
		$(selector).show().removeClass('pb-hidden');
	}

	$(document).ready(function() {
		var post_browser = new PostBrowser();

		$(window).on('hashchange', function() {
			post_browser.InitOptionsFromURL();
			post_browser.RefreshPosts();
			post_browser.RefreshCounts();
		});
	});

})(jQuery);

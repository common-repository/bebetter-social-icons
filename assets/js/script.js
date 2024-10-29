jQuery(function($) {

	// Loads the color pickers
	$('.bb-color').wpColorPicker();

	$('body').on('click', '.bb-add-new', function() {
		var field = '<div class="bb-new-fields"><input type="text" name="bbsi[socials][icon][]" class="bb-icon-picker" value=""><input type="text" name="bbsi[socials][link][]" placeholder="Enter your url here" class="social_link" value=""><input type="button" value="Remove" class="bb-remove-field button"></div>';
		$('.bb-social-fields').append(field);
		createIconpicker();
	});


	$('body').on('click', '.bb-new-fields .button', function() {
		if (confirm('Do you really want to remove this social link?'))
			$(this).parent().remove();
	});

	var icomoon_json_icons = [],
			icomoon_json_search = [];


	function createIconpicker() {
		var iconPicker = $('.bb-icon-picker').fontIconPicker({
				theme: 'fip-bootstrap'
			});
		if(!icomoon_json_icons.length){
			// Get the JSON file
			$.ajax({
				url: bbsi.options_path + '/icons/selection.json',
				type: 'GET',
				dataType: 'json'
			})
			.done(function(response) {
				// Get the class prefix
				var classPrefix = response.preferences.fontPref.prefix;

				$.each(response.icons, function(i, v) {
					// support for multiclass icons
					var name = v.properties.name.split(',')[0];

					// Set the source
					icomoon_json_icons.push(classPrefix + name);

					// Create and set the search source
					if (v.icon && v.icon.tags && v.icon.tags.length) {
						icomoon_json_search.push(name + ' ' + v.icon.tags.join(' '));
					} else {
						icomoon_json_search.push(name);
					}
				});

				setTimeout(function() {
					// Set new fonts
					iconPicker.setIcons(icomoon_json_icons, icomoon_json_search);
				}, 1000);
			})
			.fail(function() {
				// Show error message and enable
				alert('Failed to load the icons, Please check file permission.');
			});
		}else{
			// Set new fonts
			iconPicker.setIcons(icomoon_json_icons, icomoon_json_search);
		}
	}
	createIconpicker();
});
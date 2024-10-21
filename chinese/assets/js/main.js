(function($) {

	var	$window	= $(window),
		$header = $('#header'),
		$body	= $('body');

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Tweaks/fixes.

		// Polyfill: Object fit.
			if (!browser.canUse('object-fit')) {

				$('.image[data-position]').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Apply img as background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-position', $this.data('position'))
							.css('background-size', 'cover')
							.css('background-repeat', 'no-repeat');

					// Hide img.
						$img
							.css('opacity', '0');

				});

			}

		// Menu.
		$('<a href="#navPanel" class="navPanelToggle"></a>')
		.appendTo($header);

		$('<div id="navPanel">' +
			'<nav>' +
				$('#nav') .navList() +
			'</nav>' +
			'<a href="#navPanel" class="close"></a>' +
		'</div>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				target: $body,
				visibleClass: 'is-navPanel-visible',
				side: 'right'
			});

		// IE-specific fixes.
			if (browser.name == 'ie'
			||	browser.name == 'edge')
				$body.addClass('is-ie');

		// Scroll Page
		$(".one").click(function() {
			$('html,body').animate({
				scrollTop: $("#one").offset().top},
			'slow');
		});

		$(".two").click(function() {
			$('html,body').animate({
				scrollTop: $("#two").offset().top},
			'slow');
		});

		$(".contact").click(function() {
			$('html,body').animate({
				scrollTop: $("#contact").offset().top},
			'slow');
		});

		// Only number

		$('.onlyNumber').on('keypress keyup blur',function (event) {
			$(this).val($(this).val().replace(/[^0-9\.]/g,''));
			if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
				event.preventDefault();
			}
		});

		// Parse

		$('.box').append(function() {

			$.ajaxPrefilter( function (options) {
				if (options.crossDomain && jQuery.support.cors) {
					var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
					options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
					//options.url = "http://cors.corsproxy.io/url=" + options.url;
				}
			});
			
			$.get('https://digitel.co.jp/',function (response) {
				var html = $(response).find('#et-boc > div * > et_pb_column et_pb_column_1_3 et_pb_column_3 et_pb_css_mix_blend_mode_passthrough').text();
	
					// 중국 송금 데이터
					//console.log(">>>> 중국 송금 데이터");
					var $chRateInfo = $(response).find("#et-boc > div * > #CNY");
					var chRate = $chRateInfo.find('#text-5 > div > div.rate').text().substr(0, 18);

					$('#chInfo .exchangeRateResult').text(chRate);
			});
		});

	// Checkd radio

	$('input:radio[name=radioName]').change(function() {
        if (this.value == 'radioJPY') {
			$('#iptSimulatorCNY').attr("disabled", true).val('');
			$('#btnSimulatorCNY').attr("disabled", true);
			$('#iptSimulatorJPY').attr("disabled", false).val('');
			$('#btnSimulatorJPY').attr("disabled", false);
        }
        else if (this.value == 'radioCNY') {
			$('#iptSimulatorJPY').attr("disabled", true).val('');
			$('#btnSimulatorJPY').attr("disabled", true);
			$('#iptSimulatorCNY').attr("disabled", false).val('');
			$('#btnSimulatorCNY').attr("disabled", false)
        }
	});
	
	$('.commaInt').number(true, 0);

})(jQuery);
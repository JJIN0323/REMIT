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
				$('#nav').navList() +
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


		// Toggle Language
		$('.languageSelect').mouseover(function() { //.mouseover(function()
			$('.languageSelectOther').toggleClass('active')
		})

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

	$('.bold').append(function() {

        $.ajaxPrefilter( function (options) {
            if (options.crossDomain && jQuery.support.cors) {
                var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
                options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
                //options.url = "http://cors.corsproxy.io/url=" + options.url;
            }
        });
        
        $.get('https://digitel.co.jp/',function (response) {
                var html = $(response).find('#et-boc > div * > et_pb_column et_pb_column_1_3 et_pb_column_3  et_pb_css_mix_blend_mode_passthrough').text();

                // 한국송금 데이터
                var $kr_ex_rate_info = $(response).find("#et-boc > div * > #krw_upto50");
                
				// 50만엔 이상
				var kr_ex_rate_over30 = $kr_ex_rate_info.find('#text-10 > div > div.rate').text();
				var kr_ex_rate_over30_str = kr_ex_rate_over30.substr(0, 21)
				$('#krInfo .rate2').text(kr_ex_rate_over30_str);
			                
				// 50만엔 이하
				var kr_ex_rate_under30 = $kr_ex_rate_info.find('#text-9 > div > div.rate').text();
				var kr_ex_rate_under30_str = kr_ex_rate_under30.substr(0, 21)
                $('#krInfo .rate1').text(kr_ex_rate_under30_str);

                // 중국 송금 데이터
                var $ch_ex_rate_info = $(response).find("#et-boc > div > div.et_pb_section.et_pb_section_1.et_pb_with_background.et_section_regular > div.et_pb_row.et_pb_row_2 > div.et_pb_column.et_pb_column_1_3.et_pb_column_4.et_pb_css_mix_blend_mode_passthrough.et-last-child");
				var ch_ex_rate = $ch_ex_rate_info.find('#text-5 > div > div.rate').text();
				var ch_ex_rate_str = ch_ex_rate.substr(0, 21)
                $('#chInfo .rate1').text(ch_ex_rate_str);
        });
	});

	// Checkd radio

	$('input:radio[name=radioName]').change(function() {
        if (this.value == 'radioJPY') {
			$('#iptSimulatorKRW').attr("disabled", true).val('');
			$('#btnSimulatorKRW').attr("disabled", true);
			$('#iptSimulatorJPY').attr("disabled", false).val('');
			$('#btnSimulatorJPY').attr("disabled", false);
        }
        else if (this.value == 'radioKRW') {
			$('#iptSimulatorJPY').attr("disabled", true).val('');
			$('#btnSimulatorJPY').attr("disabled", true);
			$('#iptSimulatorKRW').attr("disabled", false).val('');
			$('#btnSimulatorKRW').attr("disabled", false)
        }
	});

	// Hidden url

	$window.on('load', function() {
		history.pushState({data: '/korea/index.html'}, "DIGITEL", "/korea");
	})

})(jQuery);
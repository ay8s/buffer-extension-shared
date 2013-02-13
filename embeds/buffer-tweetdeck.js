;(function() {
		
	var config = {};
    config.base = "http://web.tweetdeck.com",
    config.buttons = [
        {
            text: "Buffer",
            container: '.tweet-footer',
            className: 'buffer-td-button',
            selector: '.buffer-td-button',
            data: function (elem) {
                var tweet = $(elem).parents('.js-tweet');
                var user = $(tweet).find('.username').text();
                var text = $(tweet).find('.tweet-text').text();
                var tweetText = "RT " + user + " " + text;
                
                return {
                  text: tweetText,
                  placement: 'td-add'
              };
            }
        }
    ];
    
    var createButton = function (btnConfig) {

        var a = document.createElement('a');
        a.setAttribute('class', btnConfig.className + " txt-mute txt-small");
        a.setAttribute('href', '#');
        $(a).text(btnConfig.text);

        return a;

    };

    var insertButtons = function () {

        var i, l=config.buttons.length;
        for ( i=0 ; i < l; i++ ) {

            var btnConfig = config.buttons[i];
            
            $(btnConfig.container).each(function () {
                
                var container = $(this);
                
                if ( $(container).hasClass('buffer-inserted') ) return;

                $(container).addClass('buffer-inserted');

                var btn = createButton(btnConfig);

                $(container).append(btn);
                
                $(btn).before(' | ');
                
                var getData = btnConfig.data;

                $(btn).click(function (e) {
                    xt.port.emit("buffer_click", getData(btn));
                    e.preventDefault();
                });
                
            });

        }

    };
    
    // Wait for xt.options to be set
    ;(function check() {
        // If hn is switched on, add the buttons
        if( xt.options && xt.options['buffer.op.hacker'] === 'hacker') {
            $(document).bind('DOMNodeInserted', function(event) {
            	insertButtons();
			});
        } else {
            setTimeout(check, 2000);
        }
    }());

}());
define(['jquery', 'core/log'], function($, log) {
    'use strict';

    function init() {
        log.debug('AttentionTag block initialized.');

        // Set interval to animate the icon every 30 seconds.
        setInterval(function() {
            $('.attentiontag-floating-icon').addClass('attentiontag-shake');
            setTimeout(function() {
                $('.attentiontag-floating-icon').removeClass('attentiontag-shake');
            }, 1000); // shake duration
        }, 30000); // 30 seconds

        // Handle click event.
        $('.attentiontag-floating-icon').on('click', function() {
            alert(M.str.block_attentiontag.displaytext);
        });
    }

    return {
        init: init
    };
});

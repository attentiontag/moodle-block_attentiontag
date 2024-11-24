// define(['jquery', 'core/log', 'block_attentiontag/attention-tag', 'lodash'], function($, log, attentiontag, _) {
require.config({
    paths: {
        // 'core/log': '/Users/arvind/attentiontag/code/moodle/moodle/lib/amd/build/log.min.js',
    // Map core/log to the appropriate location
        lodash: 'https://cdn.jsdelivr.net/npm/lodash/lodash.min' // Or your local path
    }
});

define(['jquery', 'core/log', 'lodash'], function($, log, _) {
    'use strict';

    /**
     * Floating icon code
     */
    function init() {
        console.log('AttentionTag init console.log');
        log.debug('AttentionTag block before init.');
//        attentiontag.init();

        // renderAttentionTag('attentiontag-container', { prop1: 'value1', prop2: 'value2' });
        // console.log('AttentionTag React component initialized.');
        //
        //
        // log.debug('AttentionTag block after initialization');

        // Demonstration: Use Lodash to join an array into a string
        console.log('Lodash is working:', _.isEmpty({}));

        const sampleArray = ['Hello', 'from', 'Lodash'];
        const joinedString = _.join(sampleArray, ' ');
        log.debug('Lodash joined string: ' + joinedString);
        console.log('Lodash joined string: ' + joinedString);

        // Show the chat box initially
        $('.attentiontag-chat-box').fadeIn();

        // Handle "No" button click - just hide the chat box and show Deactivated image
        $('#attentiontag-btn-no').on('click', function() {
            $('.attentiontag-chat-box').fadeOut();
            $('#attentiontag-image-initial').show();
        });

        // Handle "Yes" button click - ask for camera permission and change to Wake_up.gif if granted
        $('#attentiontag-btn-yes').on('click', function() {
            $('.attentiontag-chat-box').fadeOut();

            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then(function(stream) {
                        log.debug('NEW! - Camera access granted.');
                        stream.getTracks().forEach(track => track.stop()); // Stop the video stream

                        // Switch to the "Wake_up" image after permission is granted
                        $('#attentiontag-image-initial').hide();
                        $('#attentiontag-image-after-permission').show();

                        // After 15 seconds, switch to the happy face image
                        setTimeout(function() {
                            $('#attentiontag-image-after-permission').hide();
                            $('#attentiontag-image-happy').show();

                            // After 15 more seconds, switch to the sad face image
                            setTimeout(function() {
                                $('#attentiontag-image-happy').hide();
                                $('#attentiontag-image-sad').show();

                                // After another 15 seconds, start shaking the sad face
                                setTimeout(function() {
                                    $('#attentiontag-image-sad').addClass('attentiontag-shake');
                                }, 7000);
                            }, 7000);
                        }, 5000); // Delay before showing the happy face
                    })
                    .catch(function(err) {
                        log.debug('Camera access denied: ' + err);
                    });
            } else {
                log.debug('getUserMedia not supported by this browser.');
                // Handle the case where getUserMedia is not supported
            }
        });

        // Handle click event on the sad face image to show the message box and stop shaking
        $('#attentiontag-image-sad').on('click', function() {
            $('.attentiontag-message-box').fadeIn();

            // Stop the shaking by removing the class
            $('#attentiontag-image-sad').removeClass('attentiontag-shake');
        });

        // Handle click event to close the message box
        $('.attentiontag-close-button').on('click', function() {
            $('.attentiontag-message-box').fadeOut();
        });
    }

    return {
        init: init
    };
});

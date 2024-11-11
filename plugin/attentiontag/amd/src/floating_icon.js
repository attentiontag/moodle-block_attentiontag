define(['jquery', 'core/log', 'block_attentiontag/attention-tag'], function($, log, attentiontag) {
    'use strict';

    /**
     * Floating icon code
     */
    function init() {
        log.debug('AttentionTag block initialized.');
        attentiontag.init();

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
                        log.debug('Camera access granted.');
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

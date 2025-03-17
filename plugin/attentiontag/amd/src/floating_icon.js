// define(['jquery', 'core/log'], function($, log) {
//     'use strict';

//     /**
//      * Floating icon code
//      */
//     function init() {
//         console.log('AttentionTag init console.log');
//         log.debug('AttentionTag block before init.');
// //        attentiontag.init();

//         // renderAttentionTag('attentiontag-container', { prop1: 'value1', prop2: 'value2' });
//         // console.log('AttentionTag React component initialized.');
//         //
//         //
//         // log.debug('AttentionTag block after initialization');

//         // Demonstration: Use Lodash to join an array into a string
//         // console.log('Lodash is working:', _.isEmpty({}));

//         // const sampleArray = ['Hello', 'from', 'Lodash'];
//         // const joinedString = _.join(sampleArray, ' ');
//         // log.debug('Lodash joined string: ' + joinedString);
//         // console.log('Lodash joined string: ' + joinedString);

//         // Show the chat box initially
//         $('.attentiontag-chat-box').fadeIn();

//         // Handle "No" button click - just hide the chat box and show Deactivated image
//         $('#attentiontag-btn-no').on('click', function() {
//             $('.attentiontag-chat-box').fadeOut();
//             $('#attentiontag-image-initial').show();
//         });

//         // Handle "Yes" button click - ask for camera permission and change to Wake_up.gif if granted
//         $('#attentiontag-btn-yes').on('click', function() {
//             $('.attentiontag-chat-box').fadeOut();

//             if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//                 navigator.mediaDevices.getUserMedia({ video: true })
//                     .then(function(stream) {
//                         log.debug('NEW! - Camera access granted.');
//                         stream.getTracks().forEach(track => track.stop()); // Stop the video stream

//                         // Switch to the "Wake_up" image after permission is granted
//                         $('#attentiontag-image-initial').hide();
//                         $('#attentiontag-image-after-permission').show();

//                         // After 15 seconds, switch to the happy face image
//                         setTimeout(function() {
//                             $('#attentiontag-image-after-permission').hide();
//                             $('#attentiontag-image-happy').show();

//                             // After 15 more seconds, switch to the sad face image
//                             setTimeout(function() {
//                                 $('#attentiontag-image-happy').hide();
//                                 $('#attentiontag-image-sad').show();

//                                 // After another 15 seconds, start shaking the sad face
//                                 setTimeout(function() {
//                                     $('#attentiontag-image-sad').addClass('attentiontag-shake');
//                                 }, 7000);
//                             }, 7000);
//                         }, 5000); // Delay before showing the happy face
//                     })
//                     .catch(function(err) {
//                         log.debug('Camera access denied: ' + err);
//                     });
//             } else {
//                 log.debug('getUserMedia not supported by this browser.');
//                 // Handle the case where getUserMedia is not supported
//             }
//         });

//         // Handle click event on the sad face image to show the message box and stop shaking
//         $('#attentiontag-image-sad').on('click', function() {
//             $('.attentiontag-message-box').fadeIn();

//             // Stop the shaking by removing the class
//             $('#attentiontag-image-sad').removeClass('attentiontag-shake');
//         });

//         // Handle click event to close the message box
//         $('.attentiontag-close-button').on('click', function() {
//             $('.attentiontag-message-box').fadeOut();
//         });
//     }

//     return {
//         init: init
//     };
// });
define(['jquery', 'core/log'], function($, log) {
    'use strict';

    function init() {
        console.log('AttentionTag init console.log');
        log.debug('AttentionTag block before init.');

        $('.attentiontag-chat-box').fadeIn();

        $('#attentiontag-btn-no').on('click', function() {
            $('.attentiontag-chat-box').fadeOut();
            $('#attentiontag-image-initial').show();
        });

        $('#attentiontag-btn-yes').on('click', function() {
            $('.attentiontag-chat-box').fadeOut();
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then(function(stream) {
                        log.debug('NEW! - Camera access granted.');
                        stream.getTracks().forEach(track => track.stop());

                        $('#attentiontag-image-initial').hide();
                        $('#attentiontag-image-after-permission').show();

                        setInterval(updateEmotionFromIndexedDB, 10000);

                        // setTimeout(function() {
                        //     $('#attentiontag-image-after-permission').hide();
                        //     $('#attentiontag-image-happy').show();

                        //     setTimeout(function() {
                        //         $('#attentiontag-image-happy').hide();
                        //         $('#attentiontag-image-sad').show();

                        //         setTimeout(function() {
                        //             $('#attentiontag-image-sad').addClass('attentiontag-shake');
                        //         }, 7000);
                        //     }, 7000);
                        // }, 5000);
                    })
                    .catch(function(err) {
                        log.debug('Camera access denied: ' + err);
                    });
            } else {
                log.debug('getUserMedia not supported by this browser.');
            }
        });

        $('#attentiontag-image-sad').on('click', function() {
            $('.attentiontag-message-box').fadeIn();
            $('#attentiontag-image-sad').removeClass('attentiontag-shake');
        });

        $('.attentiontag-close-button').on('click', function() {
            $('.attentiontag-message-box').fadeOut();
        });

    }

    function updateEmotionFromIndexedDB() {
        const request = indexedDB.open('AttentionTagDB', 12);
        request.onsuccess = function(event) {
            const db = event.target.result;
            const transaction = db.transaction(['inferences'], 'readonly');
            const store = transaction.objectStore('inferences');
            const getAllRequest = store.getAll();

            getAllRequest.onsuccess = function() {
                const fromTime = Date.now() - 60 * 1000;

                const inferences = getAllRequest.result.filter(inf => inf.timestamp >= fromTime);
                console.log("INFERENCES ", inferences);
                if (inferences.length > 0) {
                    const avgEmotion = calculateAverageEmotion(inferences);
                    updateEmotionDisplay(avgEmotion);
                }
            };
        };
    }

    function calculateAverageEmotion(inferences) {
        const emotionCounts = {};
        inferences.forEach(entry => {
            emotionCounts[entry.emotion] = (emotionCounts[entry.emotion] || 0) + 1;
        });
        return Object.keys(emotionCounts).reduce((a, b) => emotionCounts[a] > emotionCounts[b] ? a : b);
    }

    function updateEmotionDisplay(emotion) {
        console.log("Emotion ", emotion);
        $('#attentiontag-image-initial').hide();
        switch (emotion) {
            case 'Happiness':
                $('#attentiontag-image-happy').show();
                break;
            case 'Sadness':
                $('#attentiontag-image-sad').show();
                break;
            case 'Anger':
                $('#attentiontag-image-sad').show();
                break;
            case 'Neutral':
                $('#attentiontag-image-initial').show();
                break;
            default:
                $('#attentiontag-image-initial').show();
        }
    }

    return {
        init: init
    };
});

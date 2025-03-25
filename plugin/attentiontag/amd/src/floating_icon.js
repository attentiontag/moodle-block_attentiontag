define(['jquery', 'core/log'], function($, log) {
    'use strict';

    function init({ at, updateEmotionIntervalSeconds }) {
        // log.debug('AttentionTag block before init.');

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
                        // console.log("time interval ", updateEmotionIntervalSeconds)
                        setInterval(() => updateEmotionFromIndexedDB(at), updateEmotionIntervalSeconds * 1000);

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

    async function updateEmotionFromIndexedDB(at) {
        const inferences = await at.getInferences(); // get inferences of the last 60 seconds using the AttentionTag SDK 
        if (inferences.length > 0) {
            const emotionCounts = {};
            inferences.forEach(entry => {
                emotionCounts[entry.emotion] = (emotionCounts[entry.emotion] || 0) + 1;
            });
            const avgEmotion = Object.keys(emotionCounts).reduce((a, b) => emotionCounts[a] > emotionCounts[b] ? a : b); // most frequent emotion
            updateEmotionDisplay(avgEmotion);
        }
    }

    function updateEmotionDisplay(emotion) {
        $('.attentiontag_bot').hide();
        switch (emotion) {
            case 'Happiness':
                $('#attentiontag-image-happy').show();
                break;
            case 'Sadness':
                $('#attentiontag-image-sad').show();
                break;
            case 'Anger':
                $('#attentiontag-image-angry').show();
                break;
            case 'Neutral':
                $('#attentiontag-image-neutral').show();
                break;
            case 'Fear':
                $('#attentiontag-image-scared').show();
                break;
            case 'Surprise':
                $('#attentiontag-image-surprise').show();
                break;
            case 'Contempt':
                $('#attentiontag-image-contempt').show();
                break;
            case 'Disgust':
                $('#attentiontag-image-disgust').show();
                break;
            default:
                $('#attentiontag-image-initial').show();
        }
    }

    return {
        init: init
    };
});

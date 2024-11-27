define(['jquery', 'block_attentiontag/attentiontag'], function($, renderAttentionTag) {
    'use strict';

    function init() {
        console.log("render attention tag ", renderAttentionTag.default)
        // Render the AttentionTag component
        renderAttentionTag.default('attentiontag-container', { apiKey: 'value1', viewerDetails: { 'id': 12 },
            viewerEmail: 'arvind+testviewer1@attentiontag.com', meetingDetails: {'id': 200}, projectId: 1,
            video: null, canvas: null});
        // apiKey, viewerDetails, viewerEmail, meetingDetails, projectId, video, canvas, multiFace=false, isLocalOnly = false, emotionCallBack=null, INFERENCE_TIME_GAP_SEC=1.00

        console.log('AttentionTag React component initialized.');
    }

    return {
        init: init
    };
});

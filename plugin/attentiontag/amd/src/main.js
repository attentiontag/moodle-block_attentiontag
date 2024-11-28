define(['@attention_tag/attentiontag'], function(atSDK) {
    'use strict';

    function init() {
        const visualPromptContainer = document.getElementById('attentiontag-container')
        const viewerDetails = {
            id: 386,
            email: 'smruti_viewer@attentiontag.com'
        }
        const meetingDetails = {
            id: 1338,
            project: 162,
            lesson: 583,
            content: 1061,
            start_datetime: new Date('28 Nov 2024'),
            duration_sec: 999999
        }
        const at = new atSDK.AttentionTag(null, viewerDetails, viewerDetails.email, meetingDetails, meetingDetails.project, null, null);
        at.init();
        at.startObservation(true, meetingDetails.start_datetime, new Date('29 Nov 2024'))
        at.startLiveWorkflows()
        if(visualPromptContainer) {
            at.initVisualPrompt(visualPromptContainer)
        }
        console.log('AT object', at)
        console.log('AttentionTag React component initialized.');
    }

    return {
        init: init
    };
});

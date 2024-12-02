define(["@attention_tag/attentiontag"], function(atSDK) {
    'use strict'
    function init(props) {
        const visualPromptContainer = document.getElementById("attentiontag-visual-prompt-container")
        const auditoryCueContainer = document.getElementById("attentiontag--auditory-cue-container")
        const chatWidgetContainer = document.getElementById("attentiontag-chat-widget-container")
        // const viewerDetails = {
        //     id: 229,
        //     email: "shahidracer3@gmail.com"
        // }
        // const meetingDetails = {
        //     id: 1338,
        //     project: 162,
        //     lesson: 583,
        //     content: 1061,
        //     start_datetime: new Date(),
        //     duration_sec: 99999999
        // }
        const viewerDetails = {
            id: 409,
            email: "new_sdk_viewer@gmail.com"
        }
        const meetingDetails = {
            id: 716,
            project: 81,
            module_id: 83,
            lesson: 94,
            content: 393,
            start_datetime: new Date(),
            duration_sec: 99999999
        }

        const at = new atSDK.AttentionTag(null, viewerDetails, viewerDetails.email, meetingDetails, meetingDetails.project, null, null);
        at.init();
        at.startMeeting(meetingDetails);
        at.startObservation(true, meetingDetails.start_datetime, new Date("30 Nov 2025"))
        at.startLiveWorkflows()
        if(visualPromptContainer) {
            at.initVisualPrompt(visualPromptContainer)
        }
        if(auditoryCueContainer) {
            at.initAuditoryCue(auditoryCueContainer)
        }
        if(chatWidgetContainer) {
            at.initChatWidget(chatWidgetContainer)
        }
        console.log("AT object", at)
        console.log("AttentionTag React component initialized.");
        console.log("Props", props)
    }

    return {
        init: init
    };
});
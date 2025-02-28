define(["@attention_tag/attentiontag/attention-tag"], function(atSDK) {
    'use strict'
    function init({user, atInfo }) {
        console.log("user", user)
        console.log("atInfo", atInfo)
        // const visualPromptContainer = document.getElementById("attentiontag-visual-prompt-container")
        // const auditoryCueContainer = document.getElementById("attentiontag--auditory-cue-container")
        // const chatWidgetContainer = document.getElementById("attentiontag-chat-widget-container")
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
        // const viewerDetails = {
        //     id: 409,
        //     email: "new_sdk_viewer@gmail.com"
        // }
        const meetingDetails = {
            id: 716,
            project: 81,
            module_id: 83,
            lesson: 94,
            content: 393,
            start_datetime: new Date(),
            duration_sec: 99999999
        }
        if(JSON.stringify(atInfo) != "{}") {
            console.log("Attention Tag SDK initialized");
            const at = new atSDK.AttentionTag({ clientId: atInfo.clientId, 
                clientSecret: atInfo.clientSecret, 
                viewerEmail: user.email, 
                meetingDetails: meetingDetails, 
                projectId: atInfo.project });
            
            console.log("Attention Tag object ", at);

            // at.init();
            // at.startContent({ module_name: atInfo.module_name, 
            //     module_ref: atInfo.module_ref,
            //     lesson_name: atInfo.lesson_name,
            //     lesson_ref: atInfo.lesson_ref,
            //     content_name: atInfo.content_name,
            //     content_ref: atInfo.content_ref,
            // });
        }
        // at.startMeeting(meetingDetails);
        // at.startObservation(true, meetingDetails.start_datetime, new Date("30 Nov 2025"))
        // at.startLiveWorkflows()
        // if(visualPromptContainer) {
        //     at.initVisualPrompt(visualPromptContainer)
        // }
        // if(auditoryCueContainer) {
        //     at.initAuditoryCue(auditoryCueContainer)
        // }
        // if(chatWidgetContainer) {
        //     at.initChatWidget(chatWidgetContainer)
        // }
        // console.log("AttentionTag React component initialized.");
    }

    return {
        init: init
    };
});
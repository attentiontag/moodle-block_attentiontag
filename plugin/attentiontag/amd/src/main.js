define(["@attention_tag/attentiontag/dist/attention-tag", "block_attentiontag/floating_icon"], function(atSDK, floatingIcon) {
    'use strict'
    async function init({user, atInfo, updateEmotionIntervalSeconds }) {
        const visualPromptContainer = document.getElementById("attentiontag-visual-prompt-container")
        const auditoryCueContainer = document.getElementById("attentiontag-auditory-cue-container")
        const chatWidgetContainer = document.getElementById("attentiontag-chat-widget-container")

        try {
            const at = new atSDK.AttentionTag({ clientId: atInfo.clientId, 
                clientSecret: atInfo.clientSecret, 
                projectId: atInfo.project });
            
            console.log("Attention Tag object ", at);

            await at.initViewer({
                viewerEmail: user.email, 
                viewerRefId: user.id,
                viewerName: user.username
            });
            await at.startContent({ module_name: atInfo.module_name, 
                module_ref: atInfo.module_ref,
                lesson_name: atInfo.lesson_name,
                lesson_ref: atInfo.lesson_ref,
                content_name: atInfo.content_name,
                content_ref: atInfo.content_ref,
            });
            // TODO: fix the start and end time for non-meeting type content
            at.startObservation(true, Date.now(), new Date("30 Nov 2025"))
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

            if(floatingIcon) {
                // initialise the floating-icon with AttentionTag object and update_emotion_interval_seconds
                floatingIcon.init({ at, updateEmotionIntervalSeconds })
            }
        } catch(err) {
            console.error("Error occurred ", err);
        }
    }

    return {
        init: init
    };
});
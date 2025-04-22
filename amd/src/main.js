// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Main function
 *
 * @package
 * @copyright  2025 AttentionTag Vision Technologies Pvt Ltd
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
define(["../../vendor/attention-tag.obfuscated.js"], function(atSDK) {
    'use strict';
    /**
     * Init function to initialise the SDK
     * @param {Object} options          The outer object
     * @param {Object} options.user     user info
     * @param {Object} options.atinfo   containing course info, section info, module info, clientid, clientsecret and projectid
     */
    async function init({user, atinfo}) {
        const visualPromptContainer = document.getElementById("attentiontag-visual-prompt-container");
        const auditoryCueContainer = document.getElementById("attentiontag-auditory-cue-container");
        const chatWidgetContainer = document.getElementById("attentiontag-chat-widget-container");
        const floatingIconContainer = document.getElementById("floating-icon-container");

        try {
            const at = new atSDK.AttentionTag({
                clientId: atinfo.clientid,
                clientSecret: atinfo.clientsecret,
                projectId: atinfo.project
            });

            await at.initViewer({
                viewerEmail: user.email,
                viewerRefId: user.id,
                viewerName: user.username
            });
            await at.startContent({
                moduleName: atinfo.modulename,
                moduleRef: atinfo.moduleref,
                lessonName: atinfo.lessonname,
                lessonRef: atinfo.lessonref,
                contentName: atinfo.contentname,
                contentRef: atinfo.contentref,
            });
            // Consider this as a recorded session for now
            at.startObservation();
            if (visualPromptContainer) {
                at.initVisualPrompt(visualPromptContainer);
            }
            if (auditoryCueContainer) {
                at.initAuditoryCue(auditoryCueContainer);
            }
            if (chatWidgetContainer) {
                at.initChatWidget(chatWidgetContainer);
            }
            if (floatingIconContainer) {
                at.initDart(floatingIconContainer);
            }
        } catch (err) {
            // Handle Error
        }
    }

    return {
        init: init
    };
});

<?php
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
 *
 * @package    block_attentiontag
 * @copyright  2025 AttentionTag Vision Technologies Pvt Ltd
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


defined('MOODLE_INTERNAL') || die();

/**
 * Block class
 */
class block_attentiontag extends block_base {

    /**
     * init function
     */
    public function init() {
        $this->title = get_string('pluginname', 'block_attentiontag');
    }

    /**
     * get_content function
     */
    public function get_content() {
        // Return an empty block content.
        $this->content = new stdClass();
        $this->content->text = '';
        $this->content->footer = '';

        return $this->content;
    }

    /**
     * get_required_javascript function
     */
    public function get_required_javascript() {
        global $OUTPUT, $USER, $COURSE, $DB;

        // Generate the HTML for the floating icon using the Mustache template.
        $attentiontaghtml = json_encode($OUTPUT->render_from_template('block_attentiontag/content', []));
        $user = json_encode($USER);
        $context = $this->page->context;

        // check if the user is a student
        $roles = get_user_roles($context, $USER->id);
        $roleshortnames = [];
        foreach ($roles as $role) {
            $roleshortnames[] = $role->shortname;
        }
        $isstudent = in_array('student', $roleshortnames); // check if any of the roles of the user is 'student'

        $atinfo = new stdClass();
        if ($context->contextlevel == CONTEXT_MODULE && $isstudent) {
            $contentid = $context->instanceid;
            $coursemodule = get_coursemodule_from_id(null, $contentid, 0, false, MUST_EXIST);

            $moduletype = $DB->get_record('modules', ['id' => $coursemodule->module])->name;
            $moduleid = $coursemodule->instance;
            $module = $DB->get_record($moduletype, ['id' => $moduleid]);
            $sectionid = $coursemodule->section;
            $section = $DB->get_record('course_sections', ['id' => $sectionid]);

            $atinfo->modulename = $COURSE->fullname;
            $atinfo->moduledescription = $COURSE->summary;
            $atinfo->moduleref = $COURSE->id;

            $atinfo->lessonname = $section->name;
            $atinfo->lessondescription = $section->summary;
            $atinfo->lessonref = $sectionid;

            $atinfo->contentname = $module->name;
            $atinfo->contentdescription = $module->intro;
            $atinfo->contentref = $moduleid;

            $atinfo->clientid = get_config("block_attentiontag", "client_id");
            $atinfo->clientsecret = get_config("block_attentiontag", "client_secret");
            $atinfo->project = get_config("block_attentiontag", "project_id");
        }
        $atinfo = json_encode($atinfo);

        // Inject JavaScript to add the floating icon to the footer.
        $jscode = <<<JS
            require(['jquery'], function($) {

                // Initialize the floating icon logic (Moodle-specific AMD module).
                require(['block_attentiontag/main'], function(main) {

                    if (Boolean($isstudent)) { // check if the loggedin user is a student
                        $('body').append($attentiontaghtml);  // Append content.mustache to the document
                        main.init({user: $user, atinfo: $atinfo}); // Initialize the attentiontag SDK.
                    }
                });
            });
JS;

        // Add inline JavaScript to the page.
        $this->page->requires->js_amd_inline($jscode);

        // Explicitly load the Moodle-specific AMD module (block_attentiontag/main).
        $this->page->requires->js_call_amd('block_attentiontag/main', 'init');
    }

    /**
     * applicable_formats function
     */
    public function applicable_formats() {
        // Specify the pages where this block can be added.
        return array('mod' => true, 'course-view' => false, 'site-index' => false);
    }

    /**
     * has_config function
     * this function is needed to enable settings for our block plugin
     */
    public function has_config() {
        return true;
    }
}

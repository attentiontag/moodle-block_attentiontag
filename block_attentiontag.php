<?php
/**
 * @copyright 2025 AttentionTag Vision Technologies Pvt Ltd
 */

defined('MOODLE_INTERNAL') || die();

class block_attentiontag extends block_base {

    public function init() {
        $this->title = get_string('pluginname', 'block_attentiontag');
    }

    public function get_content() {
        // Return an empty block content.
        $this->content = new stdClass();
        $this->content->text = '';
        $this->content->footer = '';

        return $this->content;
    }

    public function get_required_javascript() {
        global $PAGE, $OUTPUT, $USER, $LESSON, $COURSE, $TITLE, $CFG, $DB, $CM;

        // Generate the HTML for the floating icon using the Mustache template.
        $attention_tag_html = json_encode($OUTPUT->render_from_template('block_attentiontag/content', []));
        $user = json_encode($USER);

        $pagetype = $PAGE->pagetype;
        $context = $PAGE->context;

        // check if the user is a student
        $roles = get_user_roles($context, $USER->id);
        $roleShortnames = []; 
        foreach ($roles as $role) {
            $roleShortnames[] = $role->shortname;
        }
        $isStudent = in_array('student', $roleShortnames); // check if any of the roles of the user is 'student'

        $at_info = new stdClass();
        if($context->contextlevel == CONTEXT_MODULE && $isStudent) {
            $content_id = $context->instanceid;
            $course_module = get_coursemodule_from_id(null, $content_id, 0, false, MUST_EXIST);

            $module_type = $DB->get_record('modules', ['id' => $course_module->module])->name;
            $module_id = $course_module->instance;
            $module = $DB->get_record($module_type, ['id' => $module_id]);
            $section_id = $course_module->section;
            $section = $DB->get_record('course_sections', ['id' => $section_id]);    

            $at_info->module_name = $COURSE->fullname;
            $at_info->module_description = $COURSE->summary;
            $at_info->module_ref = $COURSE->id;

            $at_info->lesson_name = $section->name;
            $at_info->lesson_description = $section->summary;
            $at_info->lesson_ref = $section_id;

            $at_info->content_name = $module->name;
            $at_info->content_description = $module->intro;
            $at_info->content_ref = $module_id;
            
            $at_info->clientId = get_config("block_attentiontag", "client_id");
            $at_info->clientSecret = get_config("block_attentiontag", "client_secret");
            $at_info->project = get_config("block_attentiontag", "project_id");
        }
        $at_info = json_encode($at_info);

        // Inject JavaScript to add the floating icon to the footer.
        $js_code = <<<JS
            require(['jquery'], function($) {

                // Initialize the floating icon logic (Moodle-specific AMD module).
                require(['block_attentiontag/main'], function(main) {

                    if(Boolean($isStudent)) { // check if the loggedin user is a student
                        var attentionTagHtml = $attention_tag_html; 
                        $('body').append(attentionTagHtml);  // Append content.mustache to the document
                        main.init({user: $user, atInfo: $at_info}); // Initialize the attentiontag SDK.
                    }
                });
            });
JS;

        // Add inline JavaScript to the page.
        $PAGE->requires->js_amd_inline($js_code);

        // Explicitly load the Moodle-specific AMD module (block_attentiontag/main).
        $PAGE->requires->js_call_amd('block_attentiontag/main', 'init');
        // TODO (Arvind): Later, replace the above with the below code with details got from moodle
        // Corrected: Replaced `{}` with proper JSON encoding.
        // $PAGE->requires->js_call_amd('block_attentiontag/attentiontag', 'renderAttentionTag', [
        //    'attentiontag-container',
        //    json_encode(['prop1' => 'value1', 'prop2' => 'value2'])
        // ]);

    }

    public function applicable_formats() {
        // Specify the pages where this block can be added.
        return array('mod' => true, 'course-view' => false, 'site-index' => false);
    }

    // this function is needed to enable settings for our block plugin
    public function has_config() {
        return true;
    }
}

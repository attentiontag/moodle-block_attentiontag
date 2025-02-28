<?php
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
        $icon_html = json_encode($OUTPUT->render_from_template('block_attentiontag/content', []));
        $user = json_encode($USER);

        // below line gives unknown property of PAGE error
        // $lesson = json_encode($PAGE->lesson);

        // TODO: find out mapping of a Lesson in Moodle
        // $lesson = json_encode($LESSON);
        // $title = json_encode($TITLE);
        // $page = json_encode($PAGE);
        // $course = json_encode($COURSE);
        // $DB_LESSON = $DB->get_records('course_sections', ['course' => '2']);
        // $db_lesson = json_encode($DB_LESSON);

        // $modinfo = get_fast_modinfo(2);
        // $cm = $modinfo->get_cm($moduleid);
        // $modinfojson = json_encode($modinfo);
        // $cmjson = json_encode($cm);
        // $courseid = $COURSE->id;
        // $course = $DB->get_record('course', array('id' => $courseid));
        // $info = get_fast_modinfo($course);
        // print_object($info);
        // $cms = $info->get_cms();

        $pagetype = $PAGE->pagetype;
        $context = $PAGE->context;
        // if context == "course-view-topics", on course page
        // if context == "course-view-section-topics" on section page
        // if context == "mod-{module-type}-view" on module page
        // $context_json = json_encode($context);

        $pattern = '/^mod-[a-zA-Z0-9_-]+-view$/';

        // check if the user is a student
        $roles = get_user_roles($context, $USER->id);
        $roleShortnames = []; 
        foreach ($roles as $role) {
            $roleShortnames[] = $role->shortname;
        }
        $isStudent = in_array('student', $roleShortnames);
        // print_object($isStudent);

        $at_info = new stdClass();
        if(preg_match($pattern, $pagetype)) {
            // get the module(content) id from url
            $content_id = optional_param('id', 0, PARAM_INT);

            $course_module = $DB->get_record('course_modules', ['id' => $content_id]);
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

            $at_info->clientId = $CFG->local_attentiontag_client_id;
            $at_info->clientSecret = $CFG->local_attentiontag_client_secret;
            $at_info->project = $CFG->local_attentiontag_project_id;
            
        }
        $at_info = json_encode($at_info);

        // Inject JavaScript to add the floating icon to the footer.
        $js_code = <<<JS
            require(['jquery'], function($) {
                var iconHtml = $icon_html;
                $('body').append(iconHtml);  // Append the floating icon to the body.

                // Initialize the floating icon logic (Moodle-specific AMD module).
                require(['block_attentiontag/floating_icon', 'block_attentiontag/main'], function(floatingIcon, main) {
                    floatingIcon.init(); // Initialize the floating icon module.

                    // Initialize the attentiontag SDK.
                    main.init({user: $user, atInfo: $at_info });
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
        return array('mod' => true, 'course-view' => true, 'site-index' => false);
    }
}

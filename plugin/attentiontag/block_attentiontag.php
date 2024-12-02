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
        global $PAGE, $OUTPUT, $USER, $LESSON, $COURSE;

        // Generate the HTML for the floating icon using the Mustache template.
        $icon_html = json_encode($OUTPUT->render_from_template('block_attentiontag/content', []));
        $user = json_encode($USER);

        // below line gives unknown property of PAGE error
        // $lesson = json_encode($PAGE->lesson);

        $lesson = $LESSON;
        $page_course = json_encode($PAGE->course);
        $course = json_encode($COURSE);

        // Inject JavaScript to add the floating icon to the footer.
        $js_code = <<<JS
            require(['jquery'], function($) {
                var iconHtml = $icon_html;
                $('body').append(iconHtml);  // Append the floating icon to the body.

                // Initialize the floating icon logic (Moodle-specific AMD module).
                require(['block_attentiontag/floating_icon', 'block_attentiontag/main'], function(floatingIcon, main) {
                    floatingIcon.init(); // Initialize the floating icon module.

                    // Initialize the attentiontag SDK.
                    main.init({user: $user, lesson: $lesson, page_course: $page_course, course: $course});
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

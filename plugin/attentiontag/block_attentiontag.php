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
        global $PAGE, $OUTPUT;

        // Generate the HTML for the floating icon using the Mustache template.
        $icon_html = json_encode($OUTPUT->render_from_template('block_attentiontag/content', []));

        // Inject JavaScript to add the floating icon to the footer.
        $js_code = <<<JS
            require(['jquery'], function($) {
                var iconHtml = $icon_html;
                $('body').append(iconHtml);  // Append the floating icon to the body.
                require(['block_attentiontag/floating_icon'], function(floatingIcon) {
                    floatingIcon.init();
                });
            });
JS;
        $PAGE->requires->js_amd_inline($js_code);
    }

    public function applicable_formats() {
        return array('mod' => true,'course-view' => true, 'site-index' => false);
    }
}

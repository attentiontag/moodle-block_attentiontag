<?php
function block_attentiontag_footer() {
    global $OUTPUT;
    // Render and inject the floating icon into the footer.
    echo $OUTPUT->render_from_template('block_attentiontag/content', []);
}

<?php
defined('MOODLE_INTERNAL') || die;

if ($ADMIN->fulltree) {
    // Client ID field
    $settings->add(new admin_setting_configtext(
        'block_attentiontag/client_id',
        get_string('clientid', 'block_attentiontag'),
        '',
        PARAM_ALPHANUMEXT
    ));

    // Client Secret field 
    $settings->add(new admin_setting_configtext(
        'block_attentiontag/client_secret',
        get_string('clientsecret', 'block_attentiontag'),
        '',
        PARAM_ALPHANUMEXT
    ));

    // AttentionTag ProjectID field 
    $settings->add(new admin_setting_configtext(
        'block_attentiontag/project_id',
        get_string('projectid', 'block_attentiontag'),
        '',
        PARAM_ALPHANUMEXT
    ));
}

// time interval after which the DART icon updates
// currently it's 30 seconds
set_config('update_emotion_interval_seconds', 30, 'block_attentiontag');

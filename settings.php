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

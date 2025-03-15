<?php
defined('MOODLE_INTERNAL') || die;

if ($ADMIN->fulltree) {
    // Create a new settings page under "Blocks"
    // $settings = new admin_settingpage('block_attentiontag', get_string('pluginname', 'block_attentiontag'));

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

    // Client Secret field 
    $settings->add(new admin_setting_configtext(
        'block_attentiontag/project_id',
        get_string('projectid', 'block_attentiontag'),
        '',
        PARAM_ALPHANUMEXT
    ));

    // Register settings page under Plugins > Blocks
    // $ADMIN->add('blocksettings', $settings);
}

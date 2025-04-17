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
 * Admin Settings
 *
 * @package    block_attentiontag
 * @copyright  2025 AttentionTag Vision Technologies Pvt Ltd
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die;

if ($ADMIN->fulltree) {
    // Client ID field.
    $settings->add(new admin_setting_configtext(
        'block_attentiontag/client_id',
        get_string('clientid', 'block_attentiontag'),
        '',
        PARAM_ALPHANUMEXT
    ));

    // Client Secret field.
    $settings->add(new admin_setting_configtext(
        'block_attentiontag/client_secret',
        get_string('clientsecret', 'block_attentiontag'),
        '',
        PARAM_ALPHANUMEXT
    ));

    // AttentionTag ProjectID field.
    $settings->add(new admin_setting_configtext(
        'block_attentiontag/project_id',
        get_string('projectid', 'block_attentiontag'),
        '',
        PARAM_ALPHANUMEXT
    ));
}

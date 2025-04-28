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
 * Language Strings
 *
 * @package    block_attentiontag
 * @copyright  2025 AttentionTag Vision Technologies Pvt Ltd
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

$string['pluginname'] = 'Attention Tag';
$string['attentiontag:addinstance'] = 'Add a new Attention Tag block';
$string['attentiontag:myaddinstance'] = 'Add a new Attention Tag block to the My Moodle page';
$string['attentiontag:displaytext'] = 'Seems you are getting bored, let\'s play a game!';

// Below are lables for settings of AttentionTag plugin.
$string['clientid'] = 'AttentionTag client id';
$string['clientsecret'] = 'AttentionTag client secret';
$string['projectid'] = 'AttentionTag project id';

// Privacy API.
$string['privacy:metadata:username'] = 'The username of the Moodle user.';
$string['privacy:metadata:email'] = 'The email address of the Moodle user.';
$string['privacy:metadata:webcam_snapshots'] = 'Images captured from the webcam during plugin usage.';
$string['privacy:metadata:webcam_inference_data'] = 'ML inferences generated from webcam input.';
$string['privacy:metadata:course_info'] = 'The name and summary of the course where the plugin is used.';
$string['privacy:metadata:module_info'] = 'The name and summary of the module within the course.';
$string['privacy:metadata:section_info'] = 'The name and summary of the section from the Moodle course used to contextualize learning activities.';
$string['privacy:metadata:externalpurpose'] = 'This data is securely processed and stored externally by AttentionTag to personalize focus interventions and track engagement. This includes webcam snapshots, ML inferences, and limited course/user data.';

// Environment check.
$string['checkattentiontag'] = 'It has been detected that the AttentionTag npm package has not been installed on your Moodle server. The plugin requires the package to work. Please refer the plugin doc for further details';

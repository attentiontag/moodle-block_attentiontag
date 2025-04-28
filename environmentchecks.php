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
 * General Plugin Function
 *
 * @package    block_attentiontag
 * @copyright  2025 AttentionTag Vision Technologies Pvt Ltd
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Check if site has AttentionTag npm package installed.
 *
 * @param environment_results $result object to update, if relevant.
 * @return environment_results|null updated results or null.
 */
function check_attentiontag(environment_results $result) {
    global $CFG;

    $path = $CFG->dirroot.'/blocks/attentiontag/node_modules/@attention_tag/attentiontag';

    if (is_dir($path)) {
        // Folder exists
        $result->setStatus(true);
    } else {
        // Folder does not exist
        $result->setStatus(false);
    }
    return $result;
}
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
 * Privacy API Provider 
 *
 * @package    block_attentiontag
 * @copyright  2025 AttentionTag Vision Technologies Pvt Ltd
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace block_attentiontag\privacy;

class provider implements 
    \core_privacy\local\metadata\provider,
    \core_privacy\local\request\core_userlist_provider,
    \core_privacy\local\request\plugin\provider {

    public static function get_metadata(collection $collection): collection {
        $collection->add_external_location_link(
            'AttentionTag Backend',
            [
                'username' => 'privacy:metadata:username',
                'email' => 'privacy:metadata:email',
                'webcam_snapshots' => 'privacy:metadata:webcam_snapshots',
                'webcam_inference_data' => 'privacy:metadata:webcam_inference_data',
                'course_info' => 'privacy:metadata:course_info',
                'section_info' => 'privacy:metadata:section_info',
                'module_info' => 'privacy:metadata:module_info',
            ],
            'privacy:metadata:externalpurpose'
        );

        return $collection;
    }

    public static function get_contexts_for_userid(int $userid): contextlist {
        return new contextlist();
    }

    public static function get_users_in_context(userlist $userlist): void {
        // No user-specific data stored in Moodle. Contact team@attentiontag.com for requests.
    }

    public static function export_user_data(approved_contextlist $contextlist): void {
        // No user-specific data stored in Moodle. Contact team@attentiontag.com for requests.
    }

    public static function delete_data_for_all_users_in_context(\context $context): void {
        // No user-specific data stored in Moodle. Contact team@attentiontag.com for requests.
    }

    public static function delete_data_for_user(approved_contextlist $contextlist): void {
        // No user-specific data stored in Moodle. Contact team@attentiontag.com for requests.
    }

    public static function delete_data_for_users(approved_userlist $userlist): void {
        // No user-specific data stored in Moodle. Contact team@attentiontag.com for requests.
    }
}
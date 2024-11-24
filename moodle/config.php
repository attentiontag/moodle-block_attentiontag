<?php  // Moodle configuration file

unset($CFG);
global $CFG;
$CFG = new stdClass();

$CFG->dbtype    = 'pgsql';  // Set to 'pgsql' for PostgreSQL
$CFG->dblibrary = 'native';
$CFG->dbhost    = 'localhost';  // Default host for PostgreSQL
$CFG->dbname    = 'moodle';  // Replace with your PostgreSQL database name
$CFG->dbuser    = 'moodleuser';  // Replace with your PostgreSQL username
$CFG->dbpass    = 'moodleuser';  // Replace with your PostgreSQL password
$CFG->prefix    = 'mdl_';  // Table prefix for Moodle
$CFG->dboptions = array (
  'dbpersist' => false,
  'dbport' => 5432,  // Default PostgreSQL port
  'dbsocket' => false,
  'dbcollation' => 'utf8mb4_unicode_ci', // For PostgreSQL, utf8mb4_unicode_ci is not necessary
);

$CFG->wwwroot   = 'http://localhost:8081/moodle';  // Moodle site URL
$CFG->dataroot  = '/Users/arvind/moodledata';  // Replace with the path to your Moodle data directory
$CFG->admin     = 'admin';  // Admin directory

$CFG->directorypermissions = 0777;  // Permissions for created directories

$CFG->debug = (E_ALL | E_STRICT);
$CFG->debugdisplay = 1;

require_once(__DIR__ . '/lib/setup.php');

// There is no php closing tag in this file,
// it is intentional because it prevents trailing whitespace problems!

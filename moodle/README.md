# plugins

Setup on Mac:
1. Running moodle - needs Apache. Instead of MySQL, PostgreSQL can be used. It should be possible to use nginx, but haven't yet tried
2. On mac

# Install Apache
brew install httpd
# Install MySQL - below can be skipped
brew install mysql
# Install PHP (version 7.4 or higher)
brew install php
# Start Apache
sudo apachectl start
# Start MySQL
brew services start mysql

3. Configure apache - Find the right file on your system - Mac varies, on ubuntu - below
sudo vim /usr/local/etc/httpd/httpd.conf
LoadModule php_module /usr/local/opt/php/lib/httpd/modules/libphp.so
<Directory "/path/to/your/moodle">
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
DocumentRoot "/path/to/your/moodle"
--
On Mac - HTTP Apache root on Macosx
- Config: /usr/local/etc/httpd/httpd.conf
- Document root" /Library/WebServer/Documents

4. Restart apache: sudo apachectl restart

5. Create database & database user
For nginx below
    psql -U postgres
    CREATE DATABASE moodle;
    CREATE USER moodleuser WITH PASSWORD 'agrw'; 
    GRANT ALL PRIVILEGES ON SCHEMA public TO moodleuser;
     ALTER USER moodleuser WITH SUPERUSER;

    // This didn't work - hence the above 
    // GRANT ALL PRIVILEGES ON DATABASE moodle TO moodleuser;

6. Download moodle from https://download.moodle.org/download.php (latest version) or just use this repo
7. Add the database credentials in config.php

8. Run the moodle installation - http://localhost/moodle

9. Localsetup credentials - password Attentiontag@123 or Attentiontag12@3
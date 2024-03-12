-- Create FamilyHub db
CREATE DATABASE IF NOT EXISTS `CareerCraft`;

CREATE USER IF NOT EXISTS 'SY'@'localhost' IDENTIFIED BY 'SY_pwd';

GRANT ALL PRIVILEGES ON `CareerCraft`.* TO 'SY'@'localhost';
GRANT CREATE, ALTER, DROP, REFERENCES ON *.* TO 'SY'@'localhost';

GRANT SELECT ON `performance_schema`.* TO 'SY'@'localhost';

FLUSH PRIVILEGES;

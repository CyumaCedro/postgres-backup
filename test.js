const { exec } = require('child_process');

exec(
  `pg_dump "host=localhost port=5432 dbname=test_backup user=postgres password=codetoeat" > ./backups/test.sql`
);

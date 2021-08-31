### dump
pg_dump --dbname=postgresql://postgres:codetoeat@127.0.0.1:5432/test_backup  -F c -b -v -f .\backups\database-backup-2021.8.31.12.50.sql
### restore
pg_restore --dbname=postgresql://postgres:codetoeat@127.0.0.1:5432/test_backup  -v .\backups\database-backup-2021.8.31.12.50.sql

### get localhost:5001/filename.sql
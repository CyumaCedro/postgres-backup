#!/bin/bash
pg_restore -c -U [DB_USER] -d [DB] -v "./[FILE].dump" -W
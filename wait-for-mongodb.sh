#!/bin/sh

until nc -z mongo_db 27017
do
    echo "wait for up"
    sleep 1
done
  
>&2 echo "Mongodb is up - executing command"
exec "$@"
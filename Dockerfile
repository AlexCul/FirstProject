from debian:12.7

workdir /home/

run apt-get update && apt-get upgrade
run apt-get install python3 -y

copy src first_project/

# FirstProject
The first project for the course

To run the project, you must have Docker installed.

First, build the image:
`docker build -t first-project:latest .`

Then, you will see the ID of the built image, so you can execute it:
`docker run -it --network=host first-project`

You'll get the Bash environment, based on Debian 12.7. To run the server, do this:
`cd first_project && python3 -m http.server 8080`

Congratulations! Now, go [here](http://0.0.0.0:8080/templates/index.html)

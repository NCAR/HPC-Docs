# Creating Containers

There are a number of different ways to create a containerized version of an application. The Open Container Initiative (OCI) is a project that creates industry standards for container formats and runtimes. Some popular OCI compliant container engines are Docker, Podman, and Containerd to name a few. This document walks through building a Docker container as it's still the most popular option and is straightforward. The concepts covered in the walkthrough can be applied directly to other OCI compliant container engines.

## Python applications

Python applications are a great place to start when learning how to create a containerized version of the application. The main reason for this is because there is a base image built on top of Python readily available. For a simple application typically the only thing that needs to be added is your code and usually the only thing that needs to be installed is the python packages your application requires.  

!!!info
    The code that follows is available [here](https://github.com/NicholasCote/docker-how-to.git)

## Hello World Python Flask application

This example utilizes the Flask python module. [Flask](https://flask.palletsprojects.com/en/2.3.x/) is a lightweight web framework for python. It is a very straightforward and simple way to create a web server and connect it to your python code. Let's take a look at the python code for a Hello World Flask web application:

***app.py***
```python
# Import the flask python module
from flask import Flask

# Define the Flask constructor
app = Flask(__name__)

# The .route() function in flask is a decorator that tells the application what function to run when visiting certain URLs.
# This defines that when someone visits <URL>/ the hello_world application should run
@app.route('/')
def hello_world():
    return 'Hello World'

# Create the main driver function to run the app
if __name__ == '__main__':
    app.run(host="0.0.0.0")
```

!!!info
    Flask is the only required package and it's the only package in the requirements.txt file. This can be installed with `pip install Flask` or if you cloned the repository with `pip install -r requirements.txt`.

That's all that's required to spin up a web application to display "Hello World". This can be run locally with `python3 app.py`. The output after being launched should look like the following:

<img src="../../../media/hosting/flask-run.png" width="133%"/>

!!!info
    There is a Warning about running WSGI in production. This is absolutely something that needs to be done if you are deploying this framework in other places. K8s handles this for the CISL cloud containerized application deployment.

The webpage can now be accessed locally at `localhost:5000` or `127.0.0.1:5000`. In the last line of the python code the host is specified as `0.0.0.0` and the reason for this is to expose the application to all addresses. This is required for running on k8s or cloud platforms where the address that gets assigned is not known prior to deployment. As long as that all runs as expected and the Hello World page loads in the browser it's time to look at how to containerize the application. 

## Hello World Dockerfile

Now that there's a working python application that hosts web content it's time to containerize it. To start create a file named `Dockerfile`. This is where a list of instructions are defined on how to build the application. The following code block contains all the lines needed to build a containerized version of the application:

```
# Use an official Python runtime as a base image
FROM python:3.8-slim

# Copy all the files required in to the containers root directory
COPY . /

# Install the required python packages
RUN pip install --no-cache-dir -r requirements.txt

# Run the application
CMD ["python3", "app.py"]
```

There's not much to it! It utilizes an official python image so python tools we need installed like `pip` are already included. After picking the initial container image to build on all the required files are copied into the container. Now that `requirements.txt` has been copied over the required packages can be installed by using `RUN` to do a pip install. The last piece that is required is to actually launch the application and this is handled with `CMD`.  

A Dockerfile, and equivalent container assembly documents, are truly a list of instructions to run your application. How would you tell someone to install and run this application on there local machine? Install Python and pip, make sure you have all the required files and code, install the required python packages, and then run with this command! That's exactly the content that is in the Dockerfile and a great way to envision and plan on building container assembly documents for more complicated applications. 

## Build an image

With a complete container assembly document, in this example a Dockerfile, it's time to actually build the image. 

!!!info
    The following assumes that you have installed a Docker Engine and it's up running. If you do not have Docker installed please follow the documentation [here](https://docs.docker.com/engine/install/) for your OS.


The command used for building a docker image is
 ```
 docker build -t ncote/docker-how-to:v1 .
 ``` 
 
   * The `docker` application is called and it's asked to `build` and image from the Dockerfile. 
   * The `-t` flag is used to name and provide a tag for the image and in the example `ncote/` is the users Docker Hub repository, `docker-how-to` is the image name, and `:v1` is the image tag. 
   * Lastly the `.` is saying the Dockerfile is located in the current directory. 
   
After running this command the output should end with a line that says `Successfully built` followed by `Successfully tagged`. As long as it finished building successfully it's time to move on and run the application locally to make sure it works as expected.

!!!info
    When building your own images use a unique name that makes sense and is descriptive for your application. Tags are also used to provide different versions of your application. 

## Run an image

With a successfully built image it's time to run it and make sure it works with the following command:

```
docker run -p 5000:5000 ncote/docker-how-to:latest
``` 

   * The `docker` application is called to `run` an image. 
   * The next flag `-p` maps the port to publish on the host to the port exposed by the container. 
   * Lastly the image to run is provided with `ncote/docker-how-to:latest`. 

!!!info
    The run command used maps the localhost port 5000 to the container port 5000. This is the default port for Flask and this will vary based on the application. More often than not the port to run on can be specified explicitly as well. 

Browse to [http://localhost:5000/](http://localhost:5000/) and it will display Hello World in plain text. This is a very basic example to get started, but it puts in place a foundation to expand upon. There's numerous web frameworks and complex applications that can be built with container images harnessing the power of kubernetes. 

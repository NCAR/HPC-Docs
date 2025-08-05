# Creating Containers

There are several ways to create a containerized version of an application. The **Open Container Initiative (OCI)** is a project that creates industry standards for container formats and runtimes. Some popular OCI compliant container engines are Docker, Podman, and Containerd to name a few.

In this guide, we'll focus on **Docker** - still the most widely used and beginner-friendly tool. The approach shown here applies equally well to any OCI-compliant engine, so what you learn will carry over.

---

## Python Applications

Python applications are a great place to start when learning how to create a containerized version of the application. The main reason for this is because there is a base image built on top of Python readily available.

For most basic applications, you only need to:

- Add your code
- Define your dependencies (usually via `requirements.txt`), and
- Build the image

!!! info
    The code used in this guide is available at **[docker-how-to repository](https://github.com/NicholasCote/docker-how-to.git)**.

---

## Hello World Python Flask Application

We'll use **[Flask](https://flask.palletsprojects.com/en/2.3.x/)**, a lightweight Python web framework, to demonstrate a basic containerized web app. It's a very straightforward and simple way to create a web server and connect it to your python code. Let's take a look at the python code for a Hello World Flask web application:

**app.py**

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

!!! info
    Flask is the only required package and it's the only package in the `requirements.txt` file. This can be installed with `pip install Flask` or if you cloned the repository with `pip install -r requirements.txt`.

That's all that's required to spin up a web application to display "Hello World". This can be run locally with `python3 app.py`. The output after being launched should look like the following:

<img src="../../../media/hosting/flask-run.png" width="70%" class="center" alt="Flask Hello World output"/>

!!! info
    There is a Warning about running WSGI in production. This is absolutely something that needs to be done if you are deploying this framework in other places. K8s handles this for the CISL cloud containerized application deployment.

The webpage can now be accessed locally at `localhost:5000` or `127.0.0.1:5000`. In the last line of the python code the host is specified as `0.0.0.0` and the reason for this is to expose the application to all addresses. This is required for running on k8s or cloud platforms where the address that gets assigned is not known prior to deployment. As long as that all runs as expected and the Hello World page loads in the browser it's time to look at how to containerize the application.

---

## Dockerfile: Containerizing the App

Now that we have a working Flask app, let's containerize it.

Create a file named `Dockerfile` (no extension). It contains step-by-step instructions to build the container image:

```dockerfile
# Use an official Python runtime as a base image
FROM python:3.8-slim

# Copy all the files required in to the containers root directory
COPY . /

# Install the required python packages
RUN pip install --no-cache-dir -r requirements.txt

# Run the application
CMD ["python3", "app.py"]
```

This Dockerfile does the following:

1. **Uses an official Python base image**, which already includes Python and pip.
2. **Copies all local files** into the container.
3. **Installs required dependencies** listed in `requirements.txt`
4. **Runs the application** using the specified command.

Think of the Dockerfile as a scripted recipe to install and run your application in any environment. If you were setting this up manually, you'd do the same steps: install Python, copy your files, install dependencies, and run the app.

---

## Build an Image

With a complete container assembly document, in this example a Dockerfile, it's time to actually build the image.

!!! info
    The following assumes that you have installed a Docker Engine and it's up running. If you do not have Docker installed please follow the **[Docker installation documentation](https://docs.docker.com/engine/install/)** for your OS.

The command used for building a docker image is:

```bash
docker buildx build -t ncote/docker-how-to:v1 .
```

- `docker buildx build` triggers the image build.
- `-t ncote/docker-how-to:v1` names and tags the image.
  - `ncote/` is the Docker Hub namespace (your username).
  - `docker-how-to` is the image name.
  - `v1` is the version tag.
- `.` tells Docker to look for the Dockerfile in the current directory.

After running this command the output should end with a line that says `Successfully built` followed by `Successfully tagged`. As long as it finished building successfully it's time to move on and run the application locally to make sure it works as expected.

!!! info
    **Best practice:** Use meaningful names and tags for your images (e.g., version numbers or deployment stages like `v1`, `latest`, `dev`, `prod`, etc.).

---

## Run the Docker Image Locally

With a successfully built image it's time to run it and make sure it works with the following command:

```bash
docker run -p 5000:5000 ncote/docker-how-to:v1
```

- The `docker` application is called to `run` an image.
- `-p 5000:5000` maps port 5000 on your host to port 5000 inside the container (the port Flask listens on).
- `ncote/docker-how-to:v1` specifies the image to run.

!!! info
    The run command used maps the localhost port 5000 to the container port 5000. This is the default port for Flask and this will vary based on the application. More often than not the port to run on can be specified explicitly as well.

You can now open [http://localhost:5000](http://localhost:5000) in your browser and see "Hello World" served from your containerized app. This is a very basic example to get started, but it puts in place a foundation to expand upon. There's numerous web frameworks and complex applications that can be built with container images harnessing the power of kubernetes.
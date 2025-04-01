FROM docker.io/mambaorg/micromamba:latest

USER root

# Install git and other necessary packages
RUN apt-get update && apt-get install -y git && apt-get clean && rm -rf /var/lib/apt/lists/*

# Clone your repository
ARG REPO_URL=https://github.com/NicholasCote/HPC-Docs-ncote.git
ARG REPO_BRANCH=ncote-cirrus-dev1
WORKDIR /app
RUN git clone --recursive --depth 1 --branch ${REPO_BRANCH} ${REPO_URL} .

# Create environment from conda.yaml
ENV ENV_NAME=mkdocs
RUN micromamba env create -f conda.yaml

# Fix ownership of the repository
RUN chown -R mambauser:mambauser /app

# Switch to non-root user
USER mambauser

# Configure git for mambauser
RUN git config --global --add safe.directory /app
RUN git config --global --add safe.directory '*'

# Configure the shell to run in the conda environment
SHELL ["/usr/local/bin/_entrypoint.sh", "micromamba", "run", "-n", "mkdocs", "/bin/bash", "-c"]

EXPOSE 8000

# Set the entrypoint to run in the conda environment
ENTRYPOINT ["/usr/local/bin/_entrypoint.sh", "micromamba", "run", "-n", "mkdocs"]
CMD ["mkdocs", "serve", "--dev-addr=0.0.0.0:8000"]
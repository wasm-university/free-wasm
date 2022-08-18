FROM gitpod/workspace-full


RUN sudo apt-get update && \
    sudo apt-get install gettext libncurses5 libxkbcommon0 libtinfo5 -y

USER gitpod

RUN brew install bat && \
    brew install exa

# ------------------------------------
# Install TinyGo
# ------------------------------------
ARG TINYGO_VERSION="0.23.0"
RUN wget https://github.com/tinygo-org/tinygo/releases/download/v${TINYGO_VERSION}/tinygo_${TINYGO_VERSION}_amd64.deb
RUN sudo dpkg -i tinygo_${TINYGO_VERSION}_amd64.deb
RUN rm tinygo_${TINYGO_VERSION}_amd64.deb

# ------------------------------------
# Install Wasi Runtimes
# ------------------------------------
RUN curl -sSf https://raw.githubusercontent.com/WasmEdge/WasmEdge/master/utils/install.sh | bash -s -- -v 0.10.0 && \
    curl https://get.wasmer.io -sSfL | sh && \
    curl https://wasmtime.dev/install.sh -sSf | bash

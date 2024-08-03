# Testing ReqRes.in APIs

This repository contains scripts for testing ReqRes.in APIs using Python. [ReqRes.in](https://reqres.in/) is a popular API testing service that allows developers to mock APIs for testing purposes.

## Dependencies

- **Requests**: Python HTTP library for making requests and working with APIs.
- **PyYAML**: YAML parser and emitter for Python.
- **Faker**: Python library that generates fake data.

## Installation

1. clone this repository:

    ```bash
    git clone https://github.com/gloofo/reqres.in-test
    ```

2. install the required Python packages:

    ```bash
    pip install -r requirements.txt
    ```
3. install jest axios:

    ```bash
    npm install --save-dev jest axios
    ```

## Usage

1. run the script using: <br>
   pytest:
   
    ```bash
    pytest -vvvsq
    ```
    axios:
   
    ```bash
    npm test --verbose
    ```


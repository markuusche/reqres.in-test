FROM python:latest

RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_21.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN npm install --save-dev jest && \
    npm install axios && \
    pip install --no-cache-dir -r requirements.txt

CMD ["sh", "-c", "npx jest && pytest -vvvsq"]

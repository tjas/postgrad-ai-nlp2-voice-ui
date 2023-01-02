# Docker buil and run examples:
# 	sudo docker build -f Dockerfile -t tjas/postgrad-ai-nlp2-voice-ui .
# 	sudo docker run -p 3000:8000 --name postgrad-ai-nlp2-voice-ui --rm -d tjas/postgrad-ai-nlp2-voice-ui

ARG PYTHON_VERSION="3.6.9"
FROM python:${PYTHON_VERSION}-slim

RUN apt-get update \
	&& apt-get install -y --no-install-recommends build-essential \
		vim procps curl dnsutils iputils-ping iproute2 nmap \
		libportaudio2 libasound2-dev libasound2 libasound2-data libasound2-plugins \
		portaudio19-dev libportaudiocpp0 python-all-dev \
	&& apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV PYTHONUNBUFFERED 1

RUN python -m pip install --upgrade pip

WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

EXPOSE 8000

CMD python nlp2/manage.py makemigrations \
    && python nlp2/manage.py migrate \
    && python nlp2/manage.py runserver 0.0.0.0:8000

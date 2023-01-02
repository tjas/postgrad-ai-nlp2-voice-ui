# postgrad-ia-nlp2-voice-ui

[![Status](https://img.shields.io/badge/status-active-brightgreen.svg)](./README.md)
[![Licence](https://img.shields.io/github/license/tjas/postgrad-ia-nlp2-voice-ui?color=blue)](./LICENSE.md)
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Ftjas%2Fpostgrad-ia-nlp2-voice-ui&count_bg=%2379C83D&title_bg=%23555555&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
[![Stars](https://img.shields.io/github/stars/tjas/postgrad-ia-nlp2-voice-ui?color=yellow)](https://github.com/tjas/postgrad-ai-nlp2-voice-ui)
[![Python](https://img.shields.io/badge/python-v3.6.9-darkgreen)](https://www.python.org/)
[![Django](https://img.shields.io/badge/django-v3.2.5-green)](https://www.djangoproject.com/)
[![Bootstrap](https://img.shields.io/badge/bootstrap-v5.0.2-purple)](https://www.djangoproject.com/)

This project aims to solve the proposed exercise in "Cognitive Computing 2: Voice User Interface" (Prof. Rafael Brasileiro) discipline, taken place in later 2021 in the context of postgraduate in artificial intelligence, at [Centro de Educação Superior de Brasília (IESB)](https://www.iesb.br/). We plan to evolve the app in the future, refactor the code and resolve some known issues.

A preview is available online at: https://postgrad-ia-nlp2-voice-ui.herokuapp.com/

![Início][screenshot-home]
![Texto Para Voz][screenshot-tts]
![Voz Para Texto][screenshot-stt]
![Configurações][screenshot-config]

## Build With

* Python 3.6.9
* Django 3.2.5
* Bootstrap 5.0.2
* jQuery 3.6.0

## Getting Started

This is an example of how you may set up your project locally. To get a local copy up and running follow these steps. We strongly recommended that you use virtual environments to run the application, we recommend [Virtualenv](https://virtualenv.pypa.io/en/latest/), read it, create and activate the virtual environment inside project folder and before steps 5.

### Installation

1. Make sure you have Python 3.6.9+ installed or do it from [Python.org](https://www.python.org/) or from [Anaconda](https://www.anaconda.com/);
2. Make sure you have Git installed or do it from [Git-scm.com](https://git-scm.com/);
3. Access the folder you want to save the project, then clone the repo there
   ```sh
   git clone https://github.com/tjas/postgrad-ai-nlp2-voice-ui
   ```
4. Access the project folder
   ```sh
   cd nlp2
   ```
5. Resolve dependencies
   ```py
   pip install -r requirements.txt
   ```
6. Make migrations
    ```py
    python manage.py migrate
    ```
7. Run Django project
    ```py
    python manage.py runserver
    ```
8. Then access aplication at http://127.0.0.1:8000/


<!-- CONTACT -->
## Contact

* Thiago Jorge Almeida dos Santos (thiago.tjas@gmail.com)
* Project Link: [https://github.com/tjas/postgrad-ai-nlp2-voice-ui](https://github.com/tjas/postgrad-ai-nlp2-voice-ui)

<!-- LICENSE -->
## License

* Distributed under [MIT License](./LICENSE.md).

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* Related work of 
    * [sergiosdlima](https://github.com/sergiosdlima/ibm-watson-tts-stt)
    * [luciano-f](https://github.com/luciano-f/iesb-nlp2)
* Official documentation of
    * [Django](https://docs.djangoproject.com/en/3.2/)
    * [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
    * [jQuery](https://api.jquery.com/)
* Graphycal components obtained from the web and adapted
    * Vectorial icons from [Font Awesome](https://fontawesome.com/)
    * Illustrations from [unDraw](https://undraw.co/illustrations)
    * Audio player: [green-audio-player](https://github.com/greghub/green-audio-player)
    * Audio recorder: [work of Well Wisher at CodePen](https://codepen.io/jayantnirmalkar/pen/YzXzpLB)
* Tutorials for Django deployment at Heroku
    * [Deploying Python and Django Apps on Heroku](https://devcenter.heroku.com/articles/deploying-python)
    * [Deploy de uma aplicação Django no Heroku](https://www.treinaweb.com.br/blog/deploy-de-uma-aplicacao-django-no-heroku)
    * [Tutorial Django Parte 11: Hospedando Django para produção](https://developer.mozilla.org/pt-BR/docs/Learn/Server-side/Django/Deployment)
    * [Tutorial como fazer deploy de um projeto Django usando Heroku [Python + Django + Heroku]](https://www.youtube.com/watch?v=f6PVDxCB08A)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[screenshot-home]: screenshots/nlp2_voice_ui_01_home_01.png
[screenshot-tts]: screenshots/nlp2_voice_ui_02_tts_02.png
[screenshot-stt]: screenshots/nlp2_voice_ui_03_stt_02.png
[screenshot-config]: screenshots/nlp2_voice_ui_04_config_01.png
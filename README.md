# postgrad-ia-nlp2-voice-ui

<!-- [![Website](https://img.shields.io/website?down_color=red&down_message=offline&up_color=brightgreen&up_message=online&url=http%3A%2F%2Fthiago-tjas.com%3A3000%2F&label=Website)](http://thiago-tjas.com:3000/) -->
[![Status](https://img.shields.io/badge/status-active-brightgreen.svg?label=Status)](./README.md)
[![Website](https://img.shields.io/badge/website-online-brightgreen.svg?label=Website)](http://thiago-tjas.com:3000/)
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Ftjas%2Fpostgrad-ia-nlp2-voice-ui&count_bg=%2379C83D&title_bg=%23555555&title=Hits&edge_flat=false)](https://hits.seeyoufarm.com)
[![Licence](https://img.shields.io/github/license/tjas/postgrad-ia-nlp2-voice-ui?color=orange&label=Licence)](https://github.com/tjas/postgrad-ia-nlp2-voice-ui/blob/master/LICENCE)
[![Commits](https://img.shields.io/github/commit-activity/t/tjas/postgrad-ia-nlp2-voice-ui?label=Commits)](https://github.com/tjas/postgrad-ia-nlp2-voice-ui/graphs/commit-activity)
![Last commit](https://img.shields.io/github/last-commit/tjas/postgrad-ia-nlp2-voice-ui?color=blue&label=Last%20commit)
![Repo size](https://img.shields.io/github/repo-size/tjas/postgrad-ia-nlp2-voice-ui?color=888888&label=Repo%20size)
![Code size](https://img.shields.io/github/languages/code-size/tjas/postgrad-ia-nlp2-voice-ui?color=888888&label=Code%20size)
[![Stars](https://img.shields.io/github/stars/tjas/postgrad-ia-nlp2-voice-ui?color=blue&label=Stars)](https://github.com/tjas/postgrad-ia-nlp2-voice-ui/stargazers)
[![Watchers](https://img.shields.io/github/watchers/tjas/postgrad-ia-nlp2-voice-ui?color=blue&label=Watchers)](https://github.com/tjas/postgrad-ia-nlp2-voice-ui/watchers)
[![Forks](https://img.shields.io/github/forks/tjas/postgrad-ia-nlp2-voice-ui?color=blue&label=Forks)](https://github.com/tjas/postgrad-ia-nlp2-voice-ui/forks)

[![Python](https://img.shields.io/badge/Python-v3.6.9-darkgreen)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-v3.2.5-green)](https://www.djangoproject.com/)
[![jQuery](https://img.shields.io/badge/jQuery-v3.6.0-yellow)](https://jquery.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-v5.0.2-purple)](https://www.djangoproject.com/)

> ⭐ Mark the project with a star. 👀 Watch the project for receive news.
>
> ⚙️ [Access the demo and see the project working](http://thiago-tjas.com:3000/).

<!-- A preview is available online at: https://postgrad-ia-nlp2-voice-ui.herokuapp.com/ -->

This project aims to solve the proposed exercise in "Cognitive Computing 2: Voice User Interface" (Prof. Rafael Brasileiro) discipline, taken place in later 2021 in the context of postgraduate in artificial intelligence, at [Centro de Educação Superior de Brasília (IESB)](https://www.iesb.br/). We plan to evolve the app in the future, refactor the code and resolve some known issues.

![Início][screenshot-home]
![Texto Para Voz][screenshot-tts]
![Voz Para Texto][screenshot-stt]
![Configurações][screenshot-config]

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

**Thiago Jorge Almeida dos Santos**, project author and maintainer.

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logoColor=white&link=https://www.linkedin.com/in/thiago-tjas)](https://www.linkedin.com/in/thiago-tjas) [![YouTube](https://img.shields.io/badge/-YouTube-FF0000?style=flat-square&logoColor=white&link=https://www.youtube.com/@thiago_tjas)](https://www.youtube.com/@thiago_tjas) [![Instagram](https://img.shields.io/badge/-Instagram-E4405F?style=flat-square&logoColor=white&link=https://www.instagram.com/thiago.tjas/)](https://www.instagram.com/thiago.tjas/) [![Website](https://img.shields.io/badge/-Website-888888?style=flat-square&logoColor=white&link=http://thiago-tjas.com/)](http://thiago-tjas.com/) [![GitHub](https://img.shields.io/badge/-GitHub-555555?style=flat-square&logoColor=white&link=https://github.com/tjas)](https://github.com/tjas)

<!-- LICENSE -->
## License

* Code distributed under [MIT License](./LICENSE).

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
<!-- * Tutorials for Django deployment at Heroku
  * [Deploying Python and Django Apps on Heroku](https://devcenter.heroku.com/articles/deploying-python)
  * [Deploy de uma aplicação Django no Heroku](https://www.treinaweb.com.br/blog/deploy-de-uma-aplicacao-django-no-heroku)
  * [Tutorial Django Parte 11: Hospedando Django para produção](https://developer.mozilla.org/pt-BR/docs/Learn/Server-side/Django/Deployment)
  * [Tutorial como fazer deploy de um projeto Django usando Heroku [Python + Django + Heroku]](https://www.youtube.com/watch?v=f6PVDxCB08A) -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[screenshot-home]: screenshots/nlp2_voice_ui_01_home_01.png
[screenshot-tts]: screenshots/nlp2_voice_ui_02_tts_02.png
[screenshot-stt]: screenshots/nlp2_voice_ui_03_stt_02.png
[screenshot-config]: screenshots/nlp2_voice_ui_04_config_01.png
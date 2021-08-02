import environ

from nlp2.settings.base import *

env = environ.Env()

DEBUG = env.bool("DEBUG", False)

SECRET_KEY = env("SECRET_KEY")

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS")

SPEECH_TO_TEXT_KEY = env("SPEECH_TO_TEXT_KEY")

TEXT_TO_SPEECH_KEY = env("TEXT_TO_SPEECH_KEY")

# DATABASES = {
#     "default": env.db(),
# }
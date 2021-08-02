from django.db import models
from nlp2.settings import SPEECH_TO_TEXT_KEY, TEXT_TO_SPEECH_KEY

# Create your models here.

API = sorted([
    ('IBM', 'IBM Cloud'), 
])

class Credentials(models.Model):
    api = models.CharField('API', choices=API, default='IBM', max_length=50)
    speech_to_text_key = models.CharField('Speech to Text', default=SPEECH_TO_TEXT_KEY, max_length=250)
    text_to_speech_key = models.CharField('Text to Speech', default=TEXT_TO_SPEECH_KEY, max_length=250)

    class Meta:
        ordering = ('api', )
        db_table = 'credentials'
        verbose_name = "Credential"
        verbose_name_plural = "Credentials"

    def __str__(self):
        return str(self.api)
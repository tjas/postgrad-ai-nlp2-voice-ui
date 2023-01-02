from django.shortcuts import render
from django.http import HttpResponse
from .models import Credentials
from nlp2.settings import BASE_DIR, PATH_TO_CREDENTIALS, PATH_TO_AUDIO, SPEECH_TO_TEXT_KEY, TEXT_TO_SPEECH_KEY
import json

def index(request):
    return render(request, 'index.html', {})

def tts(request):

    if request.method == 'GET':
        ttsText = request.GET.get('ttsText')
        context = {'success': True, 'ttsText': ttsText, 'audio': ""}
        return render(request, 'tts.html', context)

    if request.method == 'POST':
        ttsText = request.POST.get('ttsText')
        #credential.speech_to_text_key = sttKey
        #credential.text_to_speech_key = ttsKey
        #credential.save(update_fields=['speech_to_text_key', 'text_to_speech_key'])
        success = sintetizar(ttsText)
        context = {'success': True, 'ttsText': ttsText, 'audio': ""}
        if success:
            context = {'ttsText': ttsText, 'audio': os.path.join(PATH_TO_AUDIO, 'audio-sintetizado.wav')}
        
        return render(request, 'tts.html', context)

def stt(request):

    # def handle_uploaded_file(f):
    #     with open(os.path.join(PATH_TO_AUDIO, 'audio-gravado.webm'), 'wb+') as destination:
    #         for chunk in f.chunks():
    #             destination.write(chunk)

    if request.method == 'GET':
        sttGeneratedText = request.GET.get('sttGeneratedText')
        # audio = request.GET.get('blob')
        context = {'success': True, 'result': sttGeneratedText}
        return render(request, 'stt.html', context)

    if request.method == 'POST':
        #sttGeneratedText = request.POST.get('sttGeneratedText')
        audio = request.FILES['blob']

        #print("\nAudio: " + audio)

        if audio:
            # filename = 'audio-gravado.wav'
            print("\nReconheceu o áudio")
            try:
                with open(os.path.join(PATH_TO_AUDIO, 'audio-gravado.webm'), 'wb') as destination:
                    for chunk in audio.chunks():
                        destination.write(chunk)
                # with open(os.path.join(PATH_TO_AUDIO, 'audio-gravado.webm'), 'wb') as arquivo:
                #     arquivo.write(audio)
                # result = reconhecer(arquivo)
                result = reconhecer(os.path.join(PATH_TO_AUDIO, 'audio-gravado.webm'))
                #result = reconhecer(audio)
                # audio.save(filename)
                print("\nResultado: "+ str(result) +"\n")
                context = {'success': True, 'result': str(result)}

                #return HttpResponse(json.dumps(context))
                return HttpResponse(result)

            except PermissionError:
                print('Sem permissão de escrita')
                context = {'success': False, 'error': 'Não foi possível transcrever a fala.'}
                return HttpResponse(json.dumps(context))

            except Exception as exc:
                import linecache
                import sys
                exc_type, exc_obj, tb = sys.exc_info()
                f = tb.tb_frame
                lineno = tb.tb_lineno
                filename = f.f_code.co_filename
                linecache.checkcache(filename)
                line = linecache.getline(filename, lineno, f.f_globals)
                print('EXCEPTION thrown from {}, line {}: at "{}". {}: {}'.format(filename, lineno, line.strip(), type(exc), exc_obj))

        else:
            print("\nResultado: não entrou no tratamento do áudio\n")
            context = {'success': False, 'error': 'Não foi possível transcrever a fala.'}
            return HttpResponse(json.dumps(context))

        context = {'success': False, 'error': 'Não foi possível transcrever a fala.'}
        #return render(request, 'stt.html', context)
        return HttpResponse(json.dumps(context))


def settings(request):

    if request.method == 'GET':
        sttKey = request.GET.get('sttKey')
        ttsKey = request.GET.get('ttsKey')
        #page = request.GET.get('page')
        try:
            credential = Credentials.objects.all()[:1].get()
        except Exception as exc:
            credential = Credentials(speech_to_text_key=SPEECH_TO_TEXT_KEY, text_to_speech_key=TEXT_TO_SPEECH_KEY)
            credential.save()
        context = {'sttKey': credential.speech_to_text_key, 'ttsKey': credential.text_to_speech_key}
        return render(request, 'settings.html', context)

    if request.method == 'POST':
        sttKey = request.POST.get('sttKey')
        ttsKey = request.POST.get('ttsKey')
        credential.speech_to_text_key = sttKey
        credential.text_to_speech_key = ttsKey
        credential.save(update_fields=['speech_to_text_key', 'text_to_speech_key'])
        context = {'sttKey': credential.speech_to_text_key, 'ttsKey': credential.text_to_speech_key}
        return render(request, 'settings.html', context)


""" ***********************************
    IMPORTS
    ***********************************
""" 
from ibm_watson import TextToSpeechV1, SpeechToTextV1
from ibm_watson.websocket import RecognizeCallback, AudioSource
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
import os
import sys
import json
import pyaudio
import wave
import tempfile

from threading import Thread

try:
    from Queue import Queue, Full
except ImportError:
    from queue import Queue, Full

import logging
logging.disable(logging.CRITICAL)



""" ***********************************
    TEXT TO SPEECH
    ***********************************
""" 

class Synthetizer:

    def __init__(self):
        self.authenticator = IAMAuthenticator(TEXT_TO_SPEECH_KEY)
        self.text_to_speech = TextToSpeechV1(
            authenticator=self.authenticator
        )

    def call_api(self, orig_text):
        """Retorna os bytes conforme a sintetização"""
        api_result = self.text_to_speech.synthesize(
            orig_text,
            voice='pt-BR_IsabelaV3Voice',
            accept='audio/wav'
        ).get_result().content

        return api_result

def sintetizar(texto: str):
    download = PATH_TO_AUDIO
    transcriber = Synthetizer()
    audio = transcriber.call_api(texto)

    if download and audio:
        try:
            with open(os.path.join(PATH_TO_AUDIO, 'audio-sintetizado.wav'), 'wb') as arquivo:
                arquivo.write(audio)
        except PermissionError:
            print('Sem permissão de escrita')
            return False
        except Exception as exc:
            print('Erro ao ler o arquivo de áudio em \'nlp2/voice/static/audio/\'')
            return False
            

    return True


""" ***********************************
    SPEECH TO TEXT 
    ***********************************
""" 

def treat_api_output(speech_recognition_results):
    """Entre as alternativas, escolhe a de maior confiança. Supõe que a API devolve um dicionario em que os itens
    de interesse estão todos debaixo do nó da árvore ['results'][0]"""
    alternatives = [result['alternatives'] for result in speech_recognition_results['results'] if result['final']]

    return alternatives


class S2tTranscriber:

    def __init__(self):
        # with open(os.path.join(PATH_TO_AUDIO, , 'ibm-credentials.env'), 'r') as ibm_credentials:
        #     lines = ibm_credentials.readlines()
        #     for line in lines:
        #         if 'SPEECH_TO_TEXT_APIKEY' in line:
        #             api_key = line.split('=')[-1].strip()
        #         break
        self.authenticator = IAMAuthenticator(SPEECH_TO_TEXT_KEY)
        #self.authenticator = IAMAuthenticator(api_key)
        self.speech_to_text = SpeechToTextV1(
            authenticator=self.authenticator
        )

    def call_api(self, audio_file, extension):
        speech_recognition_results = self.speech_to_text.recognize(
            audio=audio_file,
            content_type='audio/' + extension,
            model='pt-BR_BroadbandModel'
        ).get_result()
        return speech_recognition_results


class MyRecognizeCallback(RecognizeCallback):
    """ Classe necessária para tratamento da resposta da API via websocket"""

    def __init__(self):
        RecognizeCallback.__init__(self)
        self.transcriptions = []
        self.data = {}

    def on_transcription(self, transcript):
        self.transcriptions.append(transcript)
        sys.stdout.flush()
        sys.stdout.write('\b\b\b\b')
        print(f'[Confiança {transcript[0]["confidence"]}]')
        sys.stdout.seek(0)

    def on_connected(self):
        print('Conexão estabelecida com API')
        print('Pressione ctrl + c para interromper a coleta de áudio')

    def on_error(self, error):
        print('Error received: {}'.format(error))

    def on_inactivity_timeout(self, error):
        print('Inactivity timeout: {}'.format(error))

    def on_listening(self):
        print('Ouvindo')

    def on_hypothesis(self, hypothesis):
        sys.stdout.write('\r')
        output = hypothesis + ' ...'
        sys.stdout.write(output)

    def on_data(self, data):
        self.data = data

    def on_close(self):
        sys.stdout.write('\n')
        print("Conexão finalizada")
        return self.transcriptions


class S2tLive(S2tTranscriber):

    CHUNK = 1024
    BUF_MAX_SIZE = CHUNK * 10
    FORMAT = pyaudio.paInt16
    CHANNELS = 1
    RATE = 44100

    q = Queue(maxsize=int(round(BUF_MAX_SIZE / CHUNK)))
    audio = pyaudio.PyAudio()

    def pyaudio_callback(self, in_data, frame_count, time_info, status):
        try:
            self.q.put(in_data)
        except Full:
            pass
        return None, pyaudio.paContinue

    audio_source = AudioSource(q, True, True)

    def recognize_using_websocket(self, *args):
        callback = MyRecognizeCallback()
        self.speech_to_text.recognize_using_websocket(audio=self.audio_source, content_type='audio/l16; rate=44100',
                                                      recognize_callback=callback, model='pt-BR_BroadbandModel',
                                                      interim_results=True)

    # def call_api_live(self):

    #     stream = self.audio.open(
    #         format=self.FORMAT,
    #         channels=self.CHANNELS,
    #         rate=self.RATE,
    #         input=True,
    #         frames_per_buffer=self.CHUNK,
    #         stream_callback=self.pyaudio_callback,
    #         start=False
    #     )

    #     stream.start_stream()
    #     try:
    #         recognize_thread = Thread(target=self.recognize_using_websocket, args=())
    #         recognize_thread.start()

    #         while True:
    #             pass
    #     except KeyboardInterrupt:
    #         # stop recording
    #         stream.stop_stream()
    #         stream.close()
    #         self.audio.terminate()
    #         self.audio_source.completed_recording()
    #     pass


def reconhecer(path: str):

    result = ''

    if path:
        transcriber = S2tTranscriber()
        with open(path, 'rb') as audio:
            extension = path.split('.')[-1]
            if not extension:
                extension = 'wav'
            saida = transcriber.call_api(audio, extension)

        alternativas = treat_api_output(saida)
        segn = 1
        for a in alternativas:
            for segmento in a:
                print(f'Transcrição segmento {segn}: {segmento["transcript"]}. [Confiança: {segmento["confidence"]}]')
                result = segmento["transcript"]
                segn += 1

    # else:
    #     transcriber = S2tLive()
    #     transcriber.call_api_live()
    #     # saida = transcriber.call_api_live()
    #     # alternativas = treat_api_output(saida)
    #     # segn = 1
    #     # for a in alternativas:
    #     #     for segmento in a:
    #     #         print(f'Transcrição segmento {segn}: {segmento["transcript"]}. [Confiança: {segmento["confidence"]}]')
    #     #         segn += 1

    return result


# def reconhecer(audio):
#         with open(audio, 'rb') as audio_file:
#             speech_recognition_results = self.stt.recognize(
#                 audio=audio_file,
#                 content_type='audio/webm',
#                 model='pt-BR_BroadbandModel',
#                 # max_alternatives=3
#             ).get_result()
#         # print(json.dumps(speech_recognition_results, indent=2, ensure_ascii=False))
#         return speech_recognition_results

var csrftoken = getCookie('csrftoken');

var startBtn = document.getElementById('start');
var stopBtn = document.getElementById('stop');
var audioLog = $('#sttGeneratedText');

//var global_stream;

//let recorder;
let log = console.log.bind(console);

var chunks = [];
const constraints = {
  audio: true, video: false
};

// Get access to the microphone
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

    const options = {mimeType: 'audio/webm'};

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        window.localStream = stream;
        window.localAudio.srcObject = stream;
        window.localAudio.autoplay = true;

        //global
        window.stream = stream;
        
        //media recorder
        window.recorder = new MediaRecorder(stream, options);
        

    }).catch(function(err) {
        console.log('The following error occurred: ' + err);
      });
  
    startBtn.addEventListener('click', function(){
        console.log('started');
        startTimer();

        startBtn.classList.remove('btn-danger');
        startBtn.classList.add('btn-outline-danger');
        startBtn.disabled = true;

        stopBtn.classList.remove('btn-outline-secondary');
        stopBtn.classList.add('btn-danger');
        stopBtn.disabled = false;

        audioLog.val('Gravando...');
        // startBlink(audioLog);
        recorder.start();
    });
  
    stopBtn.addEventListener('click', function(){

        console.log('stopped');

        //stop recorder
        recorder.stop();
        clearInterval(interval);
        
        //on stop
        recorder.onstop = function(e){
            console.log('on stop called');

            e.preventDefault();
            var csrftoken = getCookie('csrftoken');

            stopBtn.classList.remove('btn-danger');
            stopBtn.classList.add('btn-outline-secondary');
            stopBtn.disabled = true;

            startBtn.classList.remove('btn-outline-danger');
            startBtn.classList.add('btn-danger');
            startBtn.disabled = false;

            //var blob = new Blob(chunks, { 'type' : 'audio/ogg'});
            //const options = {mimeType: 'audio/webm'};
            //var blob = new Blob(chunks, { 'type' : 'audio/webm'});
            var blob = new Blob(chunks);
            var fd = new FormData();
            fd.append('blob', blob);
            //console.log(URL.createObjectURL(blob));

            var form_method = 'POST';
            var form_url = document.location;

            $.ajax({
                method: form_method,
                url: form_url,
                data: fd,
                async: true,
                //data: {
                //    'blob': fd
                //},
                // data: {
                //     'audio': fd
                // },
                cache: false,
                headers:{"X-CSRFToken": csrftoken},

                processData: false,
                contentType: false,

                beforeSend: function(data){
                    console.log(timestamp() + form_method.toString() + " " + form_url.toString());
        
                },
                success: function(data, status, request){
                                
                    console.log(timestamp() + " Sucesso");
                    //console.log(timestamp() + " result: " + result);

                    //console.log(timestamp() + " result: " + result);

                    audioLog.val('');
                    //var textResult = '';
                    //for (let i = 0; i < data.result.results.length; i++) {
                    //   textResult += data.result.results[i].alternatives[0].transcript + ' ';
                    //}
                    var textResult = data;
                    audioLog.val('' + textResult);
                    //audioLog.val('Sucesso.');

                },
                error: function (request, status, error) {
                    console.log(timestamp() + status + ": " + error);
                },
                
            }).done(function(data){
                // stopBlink(audioLog);
                // audioLog.val('');
                // textResult = '';
                // // for (let i = 0; i < data.result.results.length; i++) {
                // //     textResult += data.result.results[i].alternatives[0].transcript + ' ';
                // // }
                // textResult += data.result;
                // audioLog.val(textResult);
            }); 
        }

        //data available
        recorder.ondataavailable = function(e) {
            audioLog.val('Processando...');
            chunks.push(e.data);
        }
    });
}



function startTimer(){
    var current_minute = 0;
    var current_seconds = 00;
    window.interval = setInterval(function(){
        if(current_seconds == 60){
            current_seconds = 00;
            current_minute++;
        }
        current_seconds++;
        showTime(`${pad(current_minute)}:${pad(current_seconds)}`);
    }, 1000);
}

function pad(num){
    if(num < 10){
        return "0" + num;
    } else{
        return num;
    }
}

function showTime(time){
    document.querySelector('#timer').innerHTML = time;
}

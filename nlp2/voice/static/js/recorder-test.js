
//var csrftoken = getCookie('csrftoken');

// SPEECH TO TEXT
let log = console.log.bind(console);
let mediaRecorder;
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const audioLog = $('#sttGeneratedText');

startButton.addEventListener('click', function() {
    console.log('started');
    startTimer();
    
    startButton.classList.remove('btn-danger');
    startButton.classList.add('btn-outline-danger');
    startButton.disabled = true;
    
    stopButton.classList.remove('btn-outline-secondary');
    stopButton.classList.add('btn-danger');
    stopButton.disabled = false;
    
    audioLog.val('Gravando...');
    mediaRecorder.start();
});

stopButton.addEventListener('click', function() {
    console.log('stopped');

    stopButton.classList.remove('btn-danger');
    stopButton.classList.add('btn-outline-secondary');
    stopButton.disabled = true;

    startButton.classList.remove('btn-outline-danger');
    startButton.classList.add('btn-danger');
    startButton.disabled = false;
    
    mediaRecorder.stop();
});

const handleSuccess = function(stream) {

    const options = {mimeType: 'audio/webm'};
    let recordedChunks = [];

    mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener('start', function() {
        if (recordedChunks.length) {
        recordedChunks = [];
        }
    });

    mediaRecorder.addEventListener('dataavailable', function(e) {
        audioLog.val('Processando...');
        //if (e.data.size > 0) {
        recordedChunks.push(e.data);
        //}
    });

    mediaRecorder.addEventListener('stop', function(e) {
        console.log('on stop called');

        e.preventDefault();
        var csrftoken = getCookie('csrftoken');
        var form_method = 'POST';
        var form_url = document.location;

        var audioBlob = new Blob(recordedChunks, { 'type' : 'audio/webm'});
        let fd = new FormData();
        fd.append('blob', audioBlob);

        $.ajax({
            method: form_method,
            url: form_url,
            data: {
                'blob': fd
            },
            cache: false,
            headers:{"X-CSRFToken": csrftoken},
            processData: false,
            contentType: false,
            beforeSend: function(data){
                console.log(timestamp() + form_method.toString() + " " + form_url.toString());
            },
            success: function(result, status, request){
                            
                //audioLog.val('Printando LOG...');
                //console.log(timestamp() + " result: " + result);

                console.log(timestamp() + " result: " + result.result);

                audioLog.val('');
                var textResult = '';
                //for (let i = 0; i < data.result.results.length; i++) {
                //    textResult += data.result.results[i].alternatives[0].transcript + ' ';
                //}
                textResult = result.result;
                audioLog.val(textResult);

            },
            error: function (request, status, error) {
                console.log(timestamp() + status + ": " + error);
            },
            
        }).done(function(result){
            //;
        }); 
    });
};
// Acessa o microfone de forma interativa
navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(handleSuccess)
    .catch(log);

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

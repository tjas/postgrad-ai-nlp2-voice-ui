//
// Start cursor at the begining of text container element
//
function resetCursor(txtElement) { 

    if (document.body.contains(txtElement)){

        if (txtElement.setSelectionRange) { 
            txtElement.focus(); 
            txtElement.setSelectionRange(0, 0); 
        } else if (txtElement.createTextRange) { 
            var range = txtElement.createTextRange();  
            range.moveStart('character', 0); 
            range.select(); 
        } 
    }
}

function startBlink(elem) {
    if(elem) {
        setInterval(function(elem) {
            if (elem.css('visibility') == 'hidden') {
                elem.css('visibility', 'visible');
            } else {
                elem.css('visibility', 'hidden');
            }    
        }, 500);
    }
}


function stopBlink(elem){
    if(elem) clearInterval(elem);
} 

// $('.menu-option').click(function(){
//     let elem = $(this);
//     // let clearBtn = document.getElementById('ttsClearBtn');
//     $('.menu-option').each(function(index) {
//         $(this).removeClass('badge bg-primary');
//       });
//     elem.addClass('badge bg-primary');
// });


if (document.URL.includes("/tts")) {
    resetCursor(document.getElementById('ttsText'));
    // document.getElementById('menu-home').remove('selected-menu');
    $('.menu-option').each(function(index) {
        $(this).removeClass('selected-menu');
    });
    document.getElementById('menu-tts').classList.add('selected-menu');
}

if (document.URL.includes("/stt")) {
    // document.getElementById('menu-home').remove('selected-menu');
    $('.menu-option').each(function(index) {
        $(this).removeClass('selected-menu');
    });
    document.getElementById('menu-stt').classList.add('selected-menu');
}

if (document.URL.includes("/settings")) {
    // document.getElementById('menu-home').remove('selected-menu');
    $('.menu-option').each(function(index) {
        $(this).removeClass('selected-menu');
    });
    document.getElementById('menu-settings').classList.add('selected-menu');
}

$("#menu-home").on('click', function() {
    $('.menu-option').each(function(index) {
        $(this).removeClass('selected-menu');
    });
    document.getElementById('menu-home').classList.add('selected-menu');
});

$("#ttsText").keyup(function() {
    var textareaContent = document.getElementById('ttsText').value;
    
    //Has content except blank space
    if(/\S/.test(textareaContent)) {
        let submitBtn = document.getElementById('ttsSubmitBtn');

        if (submitBtn.disabled) {
            let clearBtn = document.getElementById('ttsClearBtn');
            submitBtn.classList.remove('btn-outline-success');
            submitBtn.classList.add('btn-success');
            submitBtn.disabled = false;
            clearBtn.disabled = false;
        }
    } else {
        let submitBtn = document.getElementById('ttsSubmitBtn');
        let clearBtn = document.getElementById('ttsClearBtn');
        submitBtn.classList.remove('btn-success');
        submitBtn.classList.add('btn-outline-success');
        submitBtn.disabled = true;
        clearBtn.disabled = true;
    }
});

$("#sttKey, #ttsKey").on('change keyup paste', function() {
    var sttKeyContent = document.getElementById('sttKey').value;
    var ttsKeyContent = document.getElementById('ttsKey').value;
    
    //Has content except blank space
    if(/\S/.test(sttKeyContent) && /\S/.test(ttsKeyContent)) {
        let submitBtn = document.getElementById('settingsSubmitBtn');

        if (submitBtn.disabled) {
            let clearBtn = document.getElementById('settingsClearBtn');
            submitBtn.classList.remove('btn-outline-success');
            submitBtn.classList.add('btn-success');
            submitBtn.disabled = false;
            clearBtn.disabled = false;
        }
    } else {
        let submitBtn = document.getElementById('settingsSubmitBtn');
        let clearBtn = document.getElementById('settingsClearBtn');
        submitBtn.classList.remove('btn-success');
        submitBtn.classList.add('btn-outline-success');
        submitBtn.disabled = true;
        clearBtn.disabled = true;
    }
});



$("#settingsClearBtn").on('click', function() {
    document.getElementById('sttKey').value = '';
    document.getElementById('ttsKey').value = '';
    
    let submitBtn = document.getElementById('settingsSubmitBtn');
    let clearBtn = document.getElementById('settingsClearBtn');

    submitBtn.classList.remove('btn-success');
    submitBtn.classList.add('btn-outline-success');
    submitBtn.disabled = true;
    clearBtn.disabled = true;
    
});

// $("#ttsSubmitBtn").on('click', function() {
//     let ttsText = document.getElementById('ttsText');
//     let submitBtn = document.getElementById('ttsSubmitBtn');
//     let clearBtn = document.getElementById('ttsClearBtn');

//     ttsText.disabled = true;

//     submitBtn.classList.remove('btn-success');
//     submitBtn.classList.add('btn-outline-success');
//     submitBtn.disabled = true;
//     clearBtn.disabled = true;
    
// });

$("#ttsClearBtn").on('click', function() {
    document.getElementById('ttsText').value = '';
    
    let submitBtn = document.getElementById('ttsSubmitBtn');
    let clearBtn = document.getElementById('ttsClearBtn');

    submitBtn.classList.remove('btn-success');
    submitBtn.classList.add('btn-outline-success');
    submitBtn.disabled = true;
    clearBtn.disabled = true;
    
});



// $(document).ready(function () {
//     resetCursor($('textarea'));
// });

// -------
// GETTERS
// -------

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            };
        };
    };
    return cookieValue;
};

function timestamp() {
    // dayName = new Array ("domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado");
    // monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro");
    var monthNameShort = new Array ("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    var now = new Date;
    var day =  now.getDate();
    if (day.toString().length < 2) {
        day = '0' + day.toString();
    };
    var hours =  now.getHours();
    if (hours.toString().length < 2) {
        hours = '0' + hours.toString();
    };
    var minutes = now.getMinutes();
    if (minutes.toString().length < 2) {
        minutes = '0' + minutes.toString();
    };
    var seconds = now.getSeconds();
    if (seconds.toString().length < 2) {
        seconds = '0' + seconds.toString();
    };
    return "[" + day + "/" + monthNameShort[now.getMonth()] + "/" + now.getFullYear() + " " +hours + ":" + minutes + ":" + seconds + "] ";
};

// --------
// BOOLEANS
// --------

function isUUID(uuid) {
    let s = uuid;

    result = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    // result = s.match('/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/');
    
    if (result == null) {
        return false;
    } else {
        return true;
    };
};


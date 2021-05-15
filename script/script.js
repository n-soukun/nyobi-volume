$(function(){
    $(".movie").on('click', function(){
        setTimeout(function(){
            const elem = document.getElementById('modal-inner-iframe');
            const iframe = elem.contentWindow.document;
            const video = iframe.getElementById("video-player");
            chrome.storage.local.get("video_volume", function (value) {
                if(value){
                    const volume = value.video_volume;
                    video.volume = Number(volume);
                }
            });
            let timeoutId = 0;
            $(video).on('volumechange', function(){
                if(timeoutId) return;
                timeoutId = setTimeout(function(){
                    timeoutId = 0;
                    const volume = video.volume;
                    chrome.storage.local.set({'video_volume': volume},function(){});
                },500);
            });
        },1000);
    });
})
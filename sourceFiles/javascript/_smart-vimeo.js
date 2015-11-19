function smartVimeo() {

    var vimeoHook = $('.vimeo-player');
    var overlayHook = $('.video-embed__overlay');

    vimeoHook.each(function() {

        var vimeoPlayer = $(this);
        var vimeoID = vimeoPlayer.data('vimeo-id');
        

        // fetch JSON data from Vimeo
        $.getJSON('http://vimeo.com/api/v2/video/'+vimeoID+'.json?callback=?', function(json) {  

            // store returned dato into variables
            videoData = json[0];
            videoThumbURL = videoData.thumbnail_large; // 640x480
            videoTitle = videoData.title;
            videoTags = videoData.tags;
              
            // trigger inject function
            injectVideoData();
            
        });
       

        function injectVideoData() {
            vimeoPlayer.attr('src', videoThumbURL);
            vimeoPlayer.attr('title', videoTitle);
            vimeoPlayer.attr('alt', videoTags);
        };

        function insertVimeoVideo() {

            overlayHook.click(function(){
                $(this).fadeOut();
                $(this).parent().html('<iframe src="https://player.vimeo.com/video/'+$(this).siblings('.vimeo-player').data('vimeo-id')+'?portrait=0&title=0&color=bf1f48&badge=0&byline=0&autoplay=1" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
            });

        };

        // trigger video function
        insertVimeoVideo();

    });

};






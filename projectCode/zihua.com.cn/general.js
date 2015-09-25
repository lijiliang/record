(function ( $, window, document, undefined ) {
    var pluginName = "zihuaPlayer";
    
    var defaults = {
        cdn: "",
        videoUrl: '',
        splashUrl: '',
        hasBitrates: false,
        licenseKey: "#$ee98fc3a8833069af9c",
        playerId: "flowplayer",
        autoPlay: true,
        flashUrl: "/swf/flowplayer/zhplayer-1.0.swf",
        gaTrackerUrl: "/swf/flowplayer/flowplayer.analytics-3.2.9.swf",
        gaTrackerCode: "UA-53823749-1"
    };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        
        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            var opts = this.options;
            
            if (opts.hasBitrates) {
                this.options.bitrates = [
                    { url: opts.videoUrl + "_540p.mp4", bitrate: 0, label: "标清" },
                    { url: opts.videoUrl + "_720p.mp4", bitrate: 1, isDefault: true, label: "高清" },
                    { url: opts.videoUrl + "_1080p.mp4", bitrate: 2, label: "超清" }
                ];
            } else {
                this.options.bitrates = [
                    { url: opts.videoUrl, bitrate: 1, isDefault: true, label: "高清" }
                ];
            }
            
            this.createPlayer();
        },
        
        isMobile: function() {
            var isAndroid = /Android/i.test(navigator.userAgent);
            var isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
            
            return isAndroid || isIOS;
        },

        createPlayerContainer: function() {
            var $el = $(this.element);
            $el.addClass("video-player play-button");
            $el.attr("data-fullscreen", true);

            if (this.isMobile()) {
                $el.css({
                    backgroundImage: "url(" + this.options.splashUrl + ")"
                });
            }
        },
        
        createPlayer: function() {
            this.createPlayerContainer();
            var self = this;
            
            if (this.isMobile()) {
                var url = this.options.cdn + '/js/flowplayer-html5/flowplayer.min.js';
                
                $.cachedScript(url).done(function() {
                    self.createHtml5Player();
                });
            } else {
                var url = this.options.cdn + '/js/flowplayer/flowplayer-3.2.13.min.js';
                
                $.cachedScript(url).done(function() {
                    self.createFlashPlayer();
                });
            }
        },
        
        createFlashPlayer: function() {
            var opts = this.options;
            
            flowplayer(this.element.id, {src: opts.flashUrl, wmode: 'opaque'}, {
                key: opts.licenseKey,
                canvas: {
                    background: '#333333',
                    backgroundGradient: 'none'
                },
                playlist: [
//                    {
//                        url: opts.splashUrl,
//                        scaling: 'fixed'
//                    },
                    {
                        autoPlay: opts.autoPlay,
                        provider: 'pseudo',
                        urlResolvers: 'brselect',
                        scaling: 'fit',
                        captionUrl: opts.captionUrl,
                        bitrates: opts.bitrates
                    }
                ],
                gatracker: {
                    url: opts.gaTrackerUrl,

                    // track all possible events. By default only Start and Stop
                    // are tracked with their corresponding playhead time.
                    events: {
                        all: true
                    },
                    accountId: opts.gaTrackerCode
                }
            });
        },
        
        createHtml5Player: function() {
            var opts = this.options;
            
            flowplayer.conf.embed = false;
            flowplayer.conf.analytics = opts.gaTrackerCode;
            flowplayer.conf.native_ipad_fullscreen = true;

            $(this.element).flowplayer({
                playlist: [[
                  { mp4: opts.videoUrl }
                ]],
                native_fullscreen: true,
                preload: 'none',
                key: "$347603811500124"
            });
        }
    };

    $.cachedScript = function(url, options) {
        options = $.extend(options || {}, {
            dataType: "script",
            cache: true,
            url: url
        });
        
        return $.ajax(options);
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );

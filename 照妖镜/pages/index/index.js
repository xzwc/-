//index.js
var util = require('../../utils/util.js')

var app = getApp()
var shakeUrls = 'http://7xlwy5.com1.z0.glb.clouddn.com/shake_sound_male.mp3'
var back_url = 'http://7xlwy5.com1.z0.glb.clouddn.com/%E7%8C%B4%E5%AD%902gif.gif'

var flg = 1

var audioUrls = [
    'http://7xlwy5.com1.z0.glb.clouddn.com/sorry.mp3',
    'http://7xlwy5.com1.z0.glb.clouddn.com/laugh.mp3'
];

Page({
    onReady: function(e) {
        var that = this
        that.audioCtx = wx.createAudioContext('myAudio')
        that.audioSuccessCtx = wx.createAudioContext('myAudioSuccess')
        that.audioFailCtx = wx.createAudioContext('myAudioFail')
    },

    data: {
        motto: 'Hello World',
        width: 185,
        height: 185,
        userInfo: {},
        imageSrc: 'http://7xlwy5.com1.z0.glb.clouddn.com/%E9%A6%96%E9%A1%B5-1@2x.png',
        gifSrc: 'http://7xlwy5.com1.z0.glb.clouddn.com/%E7%8C%B4%E5%AD%902gif.gif',
        takeSrc: 'http://7xlwy5.com1.z0.glb.clouddn.com/%E5%BC%80%E5%A7%8B%E7%85%A7%E5%A6%96@2x.png',
        title: '开始照妖',
        shakeAudioSrc: shakeUrls,
        bgUrl: 'http://7xlwy5.com1.z0.glb.clouddn.com/bg_square.png'
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    gotoPreview: function() {
        wx.navigateTo({ url: '../view/view' + '?' + 'back_url=' + back_url })
    },
    onLoad: function() {
        console.log('onLoad')
        var that = this
        app.getUserInfo(function(userInfo) {
                that.setData({
                    userInfo: userInfo,
                })
            }),
            // util.loadImage(function(res) {
            //     console.log("服务器返回的url" + res)
            //     that.setData({
            //         gifSrc: res
            //     });
            // });
            wx.onAccelerometerChange(function(res) {
                // console.log(res.x)
                // console.log(res.y)
                // console.log(res.z)
                if (flg == 1) {
                    if (Math.abs(res.x) > 1 && Math.abs(res.y) > 1 && Math.abs(res.z) > 1) {
                        // if (res.x > 0.5) {
                        flg = 0
                        wx.showToast({
                            title: '让我们一起摇摆...',
                            icon: 'loading',
                            duration: 10000
                        })
                        that.audioCtx.play();
                        util.loadImage(function(data) {
                            console.log("服务器返回的url" + data)
                            back_url = data
                            that.setData({
                                gifSrc: data,
                                width: 145,
                                height: 193,
                            });
                            wx.hideToast()

                            var audioSrc;
                            if (Math.random() > 0.5) {
                                audioSrc = audioUrls[0]
                                that.setData({
                                    successAudioSrc: audioSrc
                                })
                                that.audioSuccessCtx.play()
                            } else {
                                audioSrc = audioUrls[1];
                                that.setData({
                                    failAudioSrc: audioSrc
                                })
                                that.audioFailCtx.play()
                            }
                        });
                    } //x>1
                    // console.log('--' + flg)
                    flg = 1
                } //flag
            })
    },
    onShow: function() {
        console.log('onShow')
    },
    takephoto: function() {
        var that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['camera'],
            success: function(res) {
                var tempFilePaths = res.tempFilePaths
                console.log(tempFilePaths);

                wx.showToast({
                        title: '妖魔鬼怪正在袭来...',
                        icon: 'loading',
                        duration: 10000
                    })
                    // that.audioCtx.seek(0)

                // setTimeout(function() {
                //     wx.hideToast()
                // }, 2000)
                console.log("上传图片---")
                wx.uploadFile({
                        url: 'https://small.gongfudou.com/photos',
                        filePath: tempFilePaths[0],
                        name: 'file',
                        formData: {
                            'user_id': "1"
                        },
                        header: {
                            'Content-Type': 'multipart/form-data;'
                        },
                        success: function(res) {
                            var data = res.data.split('|')[0];
                            console.log("返回的图片---" + res.data)

                            if (data == "") {
                                back_url = 'http://7xlwy5.com1.z0.glb.clouddn.com/%E6%9C%AA%E8%AF%86%E5%88%AB%E5%9B%BE169@2x.png'
                                that.setData({
                                    gifSrc: "http://7xlwy5.com1.z0.glb.clouddn.com/%E6%9C%AA%E8%AF%86%E5%88%AB%E5%9B%BE169@2x.png",
                                    width: 256,
                                    heigth: 144
                                        //successAudioSrc: ''
                                })
                            } else {
                                back_url = data
                                that.setData({
                                    gifSrc: data,
                                    width: 145,
                                    heigth: 193
                                        //successAudioSrc: audioSrc
                                })
                            }

                            wx.hideToast()

                            var audioSrc;
                            if (Math.random() > 0.5) {
                                audioSrc = audioUrls[0]
                                that.setData({
                                    successAudioSrc: audioSrc
                                })
                                that.audioSuccessCtx.play()
                            } else {
                                audioSrc = audioUrls[1];
                                that.setData({
                                    failAudioSrc: audioSrc
                                })
                                that.audioFailCtx.play()
                            }

                        }
                    })
                    // wx.navigateTo({ url: '../main/main' + '?' + 'filePath=' + tempFilePaths })
                    // that.setData({
                    //         imageSrc: 'http://h.hiphotos.baidu.com/zhidao/pic/item/6d81800a19d8bc3ed69473cb848ba61ea8d34516.jpg',
                    //         title: '开始照妖'
                    //     })
            }
        })
    },
    goto: function() {
        wx.navigateTo({ url: '../main/main' })
    },

    downLoadImage: function(event) {
        console.log(event)
        var that = this
        this.setData({
            imagePath: "http://h.hiphotos.baidu.com/zhidao/pic/item/6d81800a19d8bc3ed69473cb848ba61ea8d34516.jpg"
        })
    },
    playVoice: function(e) {
        if (playing) {
            return
        }
        console.log(audioUrls[imgIndex])
        this.setData({
            audioSrc: audioUrls[imgIndex],
        })

        this.audioCtx.play()
        playing = true
    },
    onHide: function() {
        // Do something when page hide.
        console.log('onHide')
        try {
            wx.clearStorageSync()
        } catch (e) {
            // Do something when catch error
        }
    },
    onUnload: function() {
        // Do something when page close.
        try {
            wx.clearStorageSync()
        } catch (e) {
            // Do something when catch error
        }
    },
})
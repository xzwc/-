//index.js
var util = require('../../utils/util.js')

//获取应用实例
var app = getApp()
var flag = 1;

// var shakeUrls = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46';
var shakeUrls = 'http://7xlwy5.com1.z0.glb.clouddn.com/shake_sound_male.mp3';

var audioUrls = [
    'http://7xlwy5.com1.z0.glb.clouddn.com/sorry.mp3',
    'http://7xlwy5.com1.z0.glb.clouddn.com/laugh.mp3',
];

Page({
    onReady: function(e) {
        var that = this
        that.audioCtx = wx.createAudioContext('myAudio')
    },

    data: {
        motto: 'Hello World',
        userInfo: {},
        imageSrc: 'http://7xlwy5.com1.z0.glb.clouddn.com/%E9%A6%96%E9%A1%B5-1@2x.png',
        gifSrc: 'http://7xlwy5.com1.z0.glb.clouddn.com/%E7%8C%B4%E5%AD%902gif.gif',
        takeSrc: 'http://7xlwy5.com1.z0.glb.clouddn.com/%E5%BC%80%E5%A7%8B%E7%85%A7%E5%A6%96@2x.png',
        title: '开始照妖',
        shakeAudioSrc: shakeUrls
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },

    onLoad: function() {
        console.log('onLoad')
        var that = this
            //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
                //更新数据
                that.setData({
                    userInfo: userInfo,
                })
            }),
            wx.onAccelerometerChange(function(res) {
                // console.log(res.x)
                // console.log(res.y)
                // console.log(res.z)
                if (Math.abs(res.x) > 0.5 && Math.abs(res.y) > 0.5 && Math.abs(res.z) > 0.5) {
                    // if (res.x > 0.5) {
                    wx.showToast({
                            title: '成功' + res.x,
                            icon: 'success',
                            duration: 2000
                        })
                        // that.audioCtx.seek(0)
                    that.audioCtx.play();
                    util.loadImage(function(data) {
                        console.log("服务器返回的url" + data);
                        that.setData({
                            gifSrc: data.url
                        });
                    });
                } //x>0.5
            })
    },
    takephoto: function() {
        var that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['camera'],
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths
                console.log(tempFilePaths);
                // var that = this;
                that.setData({
                    gifSrc: "http://h.hiphotos.baidu.com/zhidao/pic/item/6d81800a19d8bc3ed69473cb848ba61ea8d34516.jpg"
                })
                console.log("执行");
                wx.uploadFile({
                        url: 'http://example.weixin.qq.com/upload',
                        filePath: tempFilePaths[0],
                        name: 'file',
                        formData: {
                            'user': 'test'
                        },
                        success: function(res) {
                            var data = res.data
                            console.log(event)
                            this.setData({
                                gifSrc: "http://h.hiphotos.baidu.com/zhidao/pic/item/6d81800a19d8bc3ed69473cb848ba61ea8d34516.jpg"
                            })
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
    test: function() {
        wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
        })
    },

    downLoadImage: function(event) {
        console.log(event)
        var that = this;
        this.setData({
            imagePath: "http://h.hiphotos.baidu.com/zhidao/pic/item/6d81800a19d8bc3ed69473cb848ba61ea8d34516.jpg"
        })
    },
    playVoice: function(e) {
        if (playing) {
            return;
        }
        console.log(audioUrls[imgIndex])

        this.setData({
            audioSrc: audioUrls[imgIndex],
        });

        this.audioCtx.play();
        playing = true;
    },
    onHide: function() {
        // Do something when page hide.
        console.log('onHide')
        wx.unAccelerometerChange(function(res) {});
         wx.unAccelerometerChange;
          wx.unAccelerometerChange();
    },
    onUnload: function() {
        // Do something when page close.
        wx.unAccelerometerChange(function(res) {});
    },
})
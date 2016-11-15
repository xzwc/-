var qr_code = 'http://7xlwy5.com1.z0.glb.clouddn.com/IMG_3057.JPG'
var width
var bg_url = 'http://7xlwy5.com1.z0.glb.clouddn.com/%E8%83%8C%E6%99%AF%E5%9B%BE22@2x_meitu_1.png'
var logo = 'http://7xlwy5.com1.z0.glb.clouddn.com/%E5%8A%9F%E5%A4%AB%E8%B1%86LOGO@2x.png'
Page({
    onLoad: function(options) {
        var that = this;
        console.log('文件路径：' + options.back_url)
        wx.getSystemInfo({
            success: function(res) {
                // console.log(res.model)
                // console.log(res.pixelRatio)
                // console.log(res.windowWidth)
                // console.log(res.windowHeight)
                // console.log(res.language)
                // console.log(res.version)
                width = res.windowWidth
            }
        })

        if (options.back_url == 'http://7xlwy5.com1.z0.glb.clouddn.com/%E6%9C%AA%E8%AF%86%E5%88%AB%E5%9B%BE169@2x.png') {
            this.setData({
                imageSrc: bg_url,
                gifSrc: options.back_url,
                logo: logo,
                qrCode: qr_code,
                width: (width - 30),
                height: (width - 30) * 9 / 16,
            })
        } else if (options.back_url == 'http://7xlwy5.com1.z0.glb.clouddn.com/%E7%8C%B4%E5%AD%902gif.gif') {
            this.setData({
                imageSrc: bg_url,
                gifSrc: options.back_url,
                logo: logo,
                qrCode: qr_code,
                width: 185,
                height: 185,
            })
        } else {
            this.setData({
                imageSrc: bg_url,
                gifSrc: options.back_url,
                logo: logo,
                qrCode: qr_code,
                width: (width - 30) * 3 / 4,
                height: width - 30,
            })
        }

    },


})
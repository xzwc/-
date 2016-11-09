Page({
    onLoad: function(options) {
        console.log('文件路径：' + options.filePath)
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
                var that = this;
                this.setData({
                    imagePath: "http://h.hiphotos.baidu.com/zhidao/pic/item/6d81800a19d8bc3ed69473cb848ba61ea8d34516.jpg"
                })
            }
        })
    },
    data: {
        motto: 'Hello World',
        userInfo: {},
        imagePath: 'http://7xlwy5.com1.z0.glb.clouddn.com/0094.gif',
        title: '上传照片'
    },
    downLoadImage: function(event) {
        console.log(event)
        var that = this;
        this.setData({
            imagePath: "http://h.hiphotos.baidu.com/zhidao/pic/item/6d81800a19d8bc3ed69473cb848ba61ea8d34516.jpg"
        })
    }
})
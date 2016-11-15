params =
    {
        data: {
            'name': 'zhangsan'
        },
        goto: function () {
            wx.navigateTo({ url: '../splash/splash' })
        },
    }
Page(params);
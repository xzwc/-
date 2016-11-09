function loadImage(callback) {

    downloadImage(function(data) {
        callback(data);
    });

};

function downloadImage(cb) {

    var apiURL = "https://api.darksky.net/forecast/";

    wx.request({
        url: apiURL,
        success: function(res) {
            cb(res.url);
        }
    });


}
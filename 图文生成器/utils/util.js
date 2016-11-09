function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}


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

module.exports = {
    formatTime: formatTime,
    loadImage: loadImage
}
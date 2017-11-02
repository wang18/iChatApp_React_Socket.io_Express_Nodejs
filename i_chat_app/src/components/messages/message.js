var React = require('react');
var createReactClass =require('create-react-class');

var Message = createReactClass({
    formatTime: function (timestamp) {
      var dt = new Date(timestamp*1000);
      var hours = dt.getHours();
      var minutes = dt.getMinutes();
      var seconds = dt.getSeconds();

        if(hours<10){
            hours = '0'+hours;
        }
        if(minutes<10){
            minutes = '0'+minutes;
        }
        if(seconds<10){
            seconds = '0'+seconds;
        }
        return hours +':'+ minutes+':'+seconds;
    },
    render: function() {
        const mtext=this.props.message.text;
        const mtime=this.props.message.timeStamp;
        var formattedTime = this.formatTime(mtime);
        return (
            <div className="message">
                <strong>{this.props.message.user}</strong>{formattedTime} - {mtext}
            </div>
        );
    }
});

module.exports = Message;
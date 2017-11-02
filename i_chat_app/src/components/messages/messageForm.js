var React = require('react');
var createReactClass =require('create-react-class');


var MessageForm = createReactClass({
    onSubmit: function (e) {
        e.preventDefault();
        this.props.emit('messageAdded', {
           timeStamp: Date.now(),
           text: this.refs.text.value.trim(),
           user: this.props.user.name

        });
        this.refs.text.value='';
    },
    render: function() {
        return (
            <div className="">
                <form onSubmit={this.onSubmit}>
                    <input type="text" className="form-control" ref="text" placeholder="Please type a message..."/>
                </form>
            </div>
        );
    }
});

module.exports = MessageForm;
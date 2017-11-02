var React = require('react');
var createReactClass =require('create-react-class');
var Message = require('./message');

var MessageList = createReactClass({
    render: function() {
        return (
            <div className="well">
                <h3>Messages</h3>
                {this.props.messages.map((message, i) => {
                    return <Message message={message} key={i}/>
                })
                }
            </div>
        );
    }
});

module.exports = MessageList;
var React = require('react');
var createReactClass =require('create-react-class')
var MessageList = require('./components/messages/messageList');
var MessageForm = require('./components/messages/messageForm');
var UserList = require('./components/users/userForm');
//var UserForm = require('./components/users/userList');
var io = require('socket.io-client');

var App = createReactClass({
    getInitialState:function () {
      return {
          status: 'disconnected',
          messages: [{
              timeStamp: Date.now(),
              text: "Welcome to SockChat"
          }],
          users:[],
          user:''
      };
    },
    componentWillMount: function () {
        this.socket = io('http://localhost:4001');
        this.socket.on('connect', this.connect);
        this.socket.on('disconnect', this.disconnect);
        this.socket.on('messageAdded', this.onMessageAdded);
        this.socket.on('userJoined', this.onUserJoined);
    },
    connect: function(){
        this.setState({status: 'connected'});
        console.log('Connected: '+this.socket.id);
    },
    disconnect: function(users){
        this.setState({users: users});
        this.setState({status: 'disconnected'});
    },
    onUserJoined: function(users){
        this.setState({users:users});
    },
    onMessageAdded: function(message){
        this.setState({messages: this.state.messages.concat(message)});
    },
    render: function() {
      return (
        <div className="row">
          <div className="col-md-4">
            <UserList/>
          </div>
          <div className="col-md-8">
            <MessageList/>
            <MessageForm/>
          </div>
        </div>
      );
    }
});

module.exports = App;
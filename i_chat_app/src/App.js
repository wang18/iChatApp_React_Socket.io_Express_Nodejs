var React = require('react');
var createReactClass =require('create-react-class')
var MessageList = require('./components/messages/messageList');
var MessageForm = require('./components/messages/messageForm');
var UserForm = require('./components/users/userForm');
var UserList = require('./components/users/userList');
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
    emit: function (eventName, payload) {
      this.socket.emit(eventName,payload);
    },
    setUser: function (user) {
        this.setState({user:user});
    },
    render: function() {
        if(this.state.user === ''){
            return(
                <UserForm emit={this.emit} setUser={this.setUser} />
            );
        } else {
          return (
            <div className="row">
              <div className="col-md-4">
                <UserList users={this.state.users}/>
              </div>
              <div className="col-md-8">
                <MessageList messages={this.state.messages}/>
                <MessageForm emit={this.emit} user={this.state.user}/>
              </div>
            </div>
          );
        }
    }
});

module.exports = App;
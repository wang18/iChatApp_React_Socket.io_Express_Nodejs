var React = require('react');
var createReactClass =require('create-react-class');


var UserForm = createReactClass({
    onSubmit: function (e) {
      e.preventDefault();
      var name = this.refs.name.value.trim();
      this.props.setUser({name: name});
      this.props.emit('userJoined', {name:name});
      this.refs.name.value='';
    },
    render: function() {
        return (
            <div className="">
                <h3>Chat Login</h3>
                <form onSubmit={this.onSubmit}>
                    <input type="text" className="form-control" ref="name" placeholder="Choose a Username..."/>
                </form>
            </div>
        );
    }
});

module.exports = UserForm;
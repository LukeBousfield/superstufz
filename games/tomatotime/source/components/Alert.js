import React from 'react';

var boxStatus;

const Alert = React.createClass({
	getInitialState: function () {
	    return {
	    	boxStatus: true
	    }
	},
	boxClick: function() {
		boxStatus = false;
		this.setState({ boxStatus: boxStatus})
	},
	render(){
		return (
			<div onClick={this.boxClick} className={this.state.boxStatus ? 'grey-out' : 'hidden'}>
				<img className='alert' src='./source/img/tv-alert.png' />
			</div>
		)
	}
})

export default Alert;
import React from 'react';

const Poster = React.createClass({
	render(){
		return (
			<div className="poster">
				<h3>{this.props.title}</h3>
				<img src={this.props.url}/>
			</div>
		)
	}
});

export default Poster;
import React from 'react';

var tomatoText = {
	tomatotext: '',
	answer: 0,
	multiplier: 0
};

var timeText = {
	timetext: '',
	answer: 0,
	multiplier: 0
};

const Guess = React.createClass({
	tomatoGuess: function(e){
		e.preventDefault();
		var tomato = this.refs.rating.value;
		tomatoText.answer = this.props.rating;

		var tomatoDiff = Math.abs(tomatoText.answer - tomato);
		tomatoDiff = tomatoDiff.toFixed(1);

		if (tomatoDiff == 0 && tomato != 0) {
			tomatoText.tomatotext = 'Correct Answer!';
			tomatoText.multiplier = 1;
		}
		else if ( tomatoDiff <= 0.5) {
			tomatoText.tomatotext = 'Very close! Answer: ' + tomatoText.answer;
			tomatoText.multiplier = 0.40;
		}
		else if ( tomatoDiff > 0.5 && tomatoDiff < 1) {
			tomatoText.tomatotext = 'Almost! Correct Answer: ' + tomatoText.answer;
			tomatoText.multiplier = 0.33;
		}
		else if ( tomatoDiff >= 1 && tomatoDiff < 2 ) {
			tomatoText.tomatotext = 'Close enough. Answer: ' + tomatoText.answer;
			tomatoText.multiplier = 0.15;
		}
		if (tomatoText.multiplier > 0) {
			this.handleScore(tomatoText);
			this.disableInput('ratingInput');
		};
		this.refs.guessForm.reset();
	},
	timeGuess: function(e){
		e.preventDefault();
		var duration = this.refs.time.value;

		var arr = this.props.time.split(' ');
		var timeNumber = parseInt(arr[0]);
		timeText.answer = timeNumber;

		var timeDiff = Math.abs(timeText.answer - duration);

		if ( timeDiff == 0 ) {
			timeText.timetext = 'Spot on, chap!';
			timeText.multiplier = 1.2;
		}
		else if ( timeDiff <= 10 ) {
			timeText.timetext = 'Close! Correct answer: ' + timeText.answer;
			timeText.multiplier = 0.45;
		}
		else if ( timeDiff > 10 && timeDiff <= 20) {
			timeText.timetext = 'Not bad. Answer: ' + timeText.answer;
			timeText.multiplier = 0.25;
		}
		else if ( timeDiff > 20 && timeDiff <= 25) {
			timeText.timetext = 'Close enough. Answer: ' + timeText.answer;
			timeText.multiplier = 0.10;
		}

		if (timeText.multiplier > 0) {
			this.handleScore(timeText);
			this.disableInput('timeInput');
		};
		this.refs.guessForm.reset();
	},
	handleScore: function(obj) {
		this.props.addScore(obj);
	},
	disableInput: function(type) {
		this.props.disable(type);
	},
	componentDidUpdate: function() {
		tomatoText.multiplier = 0;
		timeText.multiplier = 0;
	},
	render(){
		return (
			<div className='guess'>
				<h2>Round {this.props.game} of 10</h2>
				<button onClick={this.props.getMovie} className='next' type='button'>Next</button>
				<form ref='guessForm'>
					<input 
						type='number' 
						ref='rating' 
						disabled={this.props.ratingInput} 
						onSubmit={this.tomatoGuess} 
						placeholder={this.props.ratingInput == true ? tomatoText.tomatotext : 'Guess 0.0 to 10.0' } 
					/>
					<button onClick={this.tomatoGuess} type='button'>Tomatoes</button>
					<input 
						type='number' 
						ref='time' 
						disabled={this.props.timeInput} 
						placeholder={this.props.timeInput == true ? timeText.timetext : 'How many minutes?' } 
					/>
					<button onClick={this.timeGuess} type='button'>Time</button>
				</form>
			</div>
		)
	}
});

export default Guess;
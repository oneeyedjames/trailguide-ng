export interface Question {
	heading: string;
	keyword: string;
	message: string;
}

export interface Questions {
	observation: Question;
	interpretation: Question;
	application: Question;
	implementation: Question;
}

export const DefaultQuestions: Questions = {
	observation: {
		heading: 'Say What?',
		keyword: 'Observation',
		message: 'What do I see?'
	},
	interpretation: {
		heading: 'So What?',
		keyword: 'Interpretation',
		message: 'What does it mean?',
	},
	application: {
		heading: 'Now What?',
		keyword: 'Application',
		message: 'How does it apply to me?'
	},
	implementation: {
		heading: 'Then What?',
		keyword: 'Implementation',
		message: 'What do I do?'
	}
};

export const BlankQuestions: Questions = {
	observation: {
		heading: 'Say What?',
		keyword: 'Observation',
		message: ''
	},
	interpretation: {
		heading: 'So What?',
		keyword: 'Interpretation',
		message: '',
	},
	application: {
		heading: 'Now What?',
		keyword: 'Application',
		message: ''
	},
	implementation: {
		heading: 'Then What?',
		keyword: 'Implementation',
		message: ''
	}
};

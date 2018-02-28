import { Model } from '../model';

export class Question {
	heading: string;
	keyword: string;
	message: string;
}

export class Questions implements Model {
	_id: string;
	observation: Question;
	interpretation: Question;
	application: Question;
	implementation: Question;
	createdBy: string;
    createdAt: Date;
	modifiedBy: string;
    modifiedAt: Date;
}

export const DefaultQuestions: Questions = {
	_id: '',
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
	},
	createdBy: '',
	createdAt: new Date(0),
	modifiedBy: '',
	modifiedAt: new Date(0)
};

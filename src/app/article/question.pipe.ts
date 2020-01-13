import { Pipe, PipeTransform } from '@angular/core';

import { Question, DefaultQuestions } from './questions.model';

@Pipe({ name: 'questionMessage' })
export class QuestionMessagePipe implements PipeTransform {
	public transform(value: Question): string {
		return value.message || DefaultQuestions[value.keyword.toLowerCase()].message;
	}
}

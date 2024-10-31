import { Component } from '@angular/core';
import { Freelanceinterview, Freelanceinterviewfeedback, FreelanceinterviewService } from '../../../services/freelanceinterview.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
  selector: 'app-interview-feedback',
  templateUrl: './interview-feedback.component.html',
  styleUrl: './interview-feedback.component.scss'
})
export class InterviewFeedbackComponent {
interview: Freelanceinterview;

interviewIndex = 0;

get interviews(): Record<string, unknown>[] {
  return this.interview.feedback as unknown as Record<string, unknown>[];
}

form = this._form.getForm('interviewFeedback', {
  formId: 'interviewFeedback',
  title: 'Feedback',
  components: [
    {
      name: 'Select',
      key: 'author',
      fields: [
        {
          name: 'Placeholder',
          value: 'fill feedbacks author',
        },
        {
          name: 'Label',
          value: 'Author',
        },
        {
          name: 'Items',
          value: this._us.users,
        }
      ],
    },
    {
      name: 'Boolean',
      key: 'isApproved',
      fields: [
        {
          name: 'Label',
          value: 'Is Approved',
        },
      ],
    },
    {
      name: 'Number',
      key: 'grade',
      focused: true,
      fields: [
        {
          name: 'Placeholder',
          value: 'fill feedbacks grade',
        },
        {
          name: 'Label',
          value: 'Grade',
        },
      ],
    },
  ],
});

addInterview(): void {
  this.interview.feedback.push({} as Freelanceinterviewfeedback)
}

update() {
  this._fis.update(this.interview);
}

constructor(
  private _fis: FreelanceinterviewService,
  private _form: FormService,
  private _us: UserService
) { }
}

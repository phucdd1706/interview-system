type alertCase = 'add' | 'modify' | 'delete';

interface Props {
  id: string | number;
  alertCase: alertCase; // dựa theo method của request post=add, put=modify, delete=delete
  department: string; // language || question || adminstrator user ...
  name: string; // tên của đối tượng
  time: number; // thời gian update
  modified?: string; // for case modify ''
  to?: string; // for case add ví dụ: 'ranks list' 'applicant list'
  from?: string; // for case delete ví dụ: 'rank list' 'applicant list'
}
// {department} {name} has been added {to && `to ${to}`}
// {department} {name} has been modified {modified && modified}
// {department} {name} has been deleted {from && `from ${from}`}
// Applicant Nguyen Van Minh has been added to applicant list

const updated: Props[] = [
  {
    id: 1,
    alertCase: 'add',
    department: 'IT',
    name: 'Add new',
    time: 1588888888,
    to: 'https://www.google.com/'
  },
  {
    id: 2,
    alertCase: 'modify',
    department: 'IT',
    name: 'Modify',
    time: 1588888888,
    modified: 'Modify modifiedcription'
  }
];

export default updated;

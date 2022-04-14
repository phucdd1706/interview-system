const personalDetail = [
  {
    label: 'Information',
    render: [
      {
        key: 'firstName',
        label: 'First Name',
        type: 'text'
      },
      {
        key: 'lastName',
        label: 'Last Name',
        type: 'text'
      },
      {
        key: 'age',
        label: 'Age',
        type: 'number'
      }
    ]
  },
  {
    label: 'Contact',
    render: [
      {
        key: 'email',
        label: 'Email',
        type: 'email'
      },
      {
        key: 'phone',
        label: 'Phone Number',
        type: 'tel'
      }
    ]
  },
  {
    label: 'Address',
    render: [
      {
        key: 'address',
        label: 'Address',
        type: 'text'
      }
    ]
  },
  {
    label: 'Interview Time',
    render: [
      {
        key: 'interviewTime',
        label: 'Interview Time',
        type: 'datetime-local'
      }
    ]
  },
  {
    label: 'Notes',
    render: [
      {
        key: 'notes',
        label: 'Notes',
        type: 'text'
      }
    ]
  }
];

export default personalDetail;

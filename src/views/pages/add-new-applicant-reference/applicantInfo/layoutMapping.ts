const personalDetail = [
  {
    label: 'Information',
    render: [
      {
        key: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true
      },
      {
        key: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: true
      },
      {
        key: 'age',
        label: 'Age',
        type: 'number',
        required: true
      }
    ]
  },
  {
    label: 'Contact',
    render: [
      {
        key: 'email',
        label: 'Email',
        type: 'email',
        required: true
      },
      {
        key: 'phone',
        label: 'Phone Number',
        type: 'tel',
        required: true
      }
    ]
  },
  {
    label: 'Address',
    render: [
      {
        key: 'address',
        label: 'Address',
        type: 'text',
        required: true
      }
    ]
  },
  {
    label: 'Interview Time',
    render: [
      {
        key: 'interviewTime',
        label: 'Interview Time',
        type: 'datetime-local',
        required: true
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

const personalDetail = [
  {
    label: 'Information',
    render: [
      {
        key: 'name',
        label: 'Full Name',
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
        type: 'text'
      }
    ]
  },
  {
    label: 'Interview Time',
    render: [
      {
        key: 'time',
        label: 'Interview Time',
        type: 'datetime-local',
        required: true
      }
    ]
  }
];

export default personalDetail;

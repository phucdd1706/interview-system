const tableColumns = [
  {
    name: 'STT',
    sx: {
      width: '50px'
    }
  },
  {
    name: 'Questions',
    sx: {
      cursor: 'pointer',
      '&:hover': {
        background: '#f6f6f6'
      }
    },
    sort_key: 'question_content'
  },
  {
    name: 'Language',
    sx: {
      cursor: 'pointer',
      '&:hover': {
        background: '#f6f6f6'
      }
    },
    sort_key: 'language_id'
  },
  {
    name: 'Rank',
    sx: {
      cursor: 'pointer',
      '&:hover': {
        background: '#f6f6f6'
      }
    },
    sort_key: 'rank_id'
  },
  {
    name: 'Type',
    sx: {
      cursor: 'pointer',
      '&:hover': {
        background: '#f6f6f6'
      }
    },
    sort_key: 'type'
  },
  {
    name: 'Evaluate',
    sx: {
      width: '100px',
      cursor: 'pointer',
      '&:hover': {
        background: '#f6f6f6'
      }
    },
    sort_key: 'status'
  }
];

export default tableColumns;

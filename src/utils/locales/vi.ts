import complete from './vi-VN/complete.json';

const lang = {
  dashboard: 'Bảng điều khiển',
  history: 'Lịch sử',
  complete: 'Hoàn thành',
  inProgress: 'Trong tiến trình',
  'add new applicant reference': 'Thêm thông tin ứng viên',
  analytics: 'Thống kê',
  application: 'Ứng dụng',
  'manage-member': 'Quản lý thành viên',
  administrator: 'Quản trị viên',
  customer: 'Người dùng',
  'manage-rank': 'Quản lý Rank',
  interview: 'Phỏng vấn',
  'applicant reference form': 'Biểu mẫu thông tin ứng viên',
  'interview questions': 'Câu hỏi phỏng vấn',
  'reference results': 'Kết quả tham khảo',
  'interviewer results': 'Kết quả phỏng vấn',
  'applicant information': 'Thông tin ứng viên',
  department: 'Phòng ban',
  language: 'Ngôn ngữ',
  'manage-question': 'Quản lý câu hỏi'
};
const label = { ...lang, ...complete };

export default label;

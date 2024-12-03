import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, List, ListItem, Divider, Button, Stack, Paper, Chip } from '@mui/material';

// Fake data based on the updated structure
const fakeData = {
  "id": 1,
  "title": "Buổi 1 - OSG202",
  "position": 1,
  "created_at": "2024-05-27T08:53:47.495Z",
  "updated_at": "2024-11-28T15:23:20.826Z",
  "status": "PUBLISHED",
  "course_id": 10,
  "topic": [
      {
          "id": 1,
          "title": "OSG202 - Slot 4 + 5 - Operating Systems - Các hệ điều hành - FPT",
          "description": "OSG202 - Slot 4 + 5 - Operating Systems - Các hệ điều hành - FPT",
          "position": 1,
          "created_at": "2024-05-27T08:53:47.205Z",
          "updated_at": "2024-11-28T14:39:07.874Z",
          "status": "PUBLISHED",
          "chapter_id": 1
      }
  ],
  "course": {
      "id": 10,
      "title": "Khóa học OSG202",
      "price": 0,
      "title_description": "Kiến thức các bài giảng của khóa Operating Systems",
      "thumbnail": "https://firebasestorage.googleapis.com/v0/b/unicourse-f4020.appspot.com/o/Course%2Fversion2%2F15.png?alt=media&token=2f5c45e3-92ad-43ed-a937-a43b4bbee442",
      "learning_outcome": [
          "Hiểu rõ các khái niệm cơ bản về Hệ điều hành.",
          "Áp dụng các nguyên lý của Hệ điều hành vào các bài tập thực tế.",
          "Phát triển kỹ năng quản lý và tối ưu hóa tài nguyên hệ thống."
      ],
      "students_enrolled": 2,
      "requirements": [
          "Máy tính hoặc điện thoại có kết nối internet.",
          "Tài khoản đăng ký trên hệ thống Unicourse."
      ],
      "status": "PUBLISHED",
      "created_at": "2024-02-19T04:18:34.000Z",
      "updated_at": "2024-11-28T11:34:51.939Z",
      "category_id": 1,
      "lecture_id": 1,
      "description": "<p><span style=\"color: rgb(51, 51, 51);\">Khóa học OSG202 cung cấp kiến thức các bài giảng của khóa Hệ điều hành. Bạn sẽ hiểu rõ các khái niệm cơ bản về Hệ điều hành, áp dụng các nguyên lý của Hệ điều hành vào các bài tập thực tế, đồng thời phát triển kỹ năng quản lý và tối ưu hóa tài nguyên hệ thống.</span></p>\n<blockquote><span style=\"color: rgb(109, 109, 109);\">Khóa học này thường được mọi người gọi là \"OSG202 - Hệ điều hành\".</span></blockquote>\n<h3><span style=\"color: rgb(51, 51, 51);\">Học xong khóa này bạn sẽ đạt được những gì?</span></h3>\n<p><span style=\"color: rgb(51, 51, 51);\">Nếu bạn còn nghi ngờ về điều này, hãy xem bài viết:&nbsp;</span><u style=\"color: var(--primary-color);\"><a href=\"https://fullstack.edu.vn/blog/tong-hop-cac-san-pham-cua-hoc-vien-tai-f8.html\" rel=\"noopener noreferrer\" target=\"_blank\">Tổng hợp các sản phẩm của học viên tại F8 ??</a></u><span style=\"color: rgb(51, 51, 51);\">.</span></p>\n<p><span style=\"color: rgb(51, 51, 51);\">Danh sách sản phẩm ở bài viết trên mới chỉ là một phần nhỏ, thực tế đã có tới hàng ngàn trang web được tạo ra từ tay người học tại F8. Bạn có thể tham gia nhóm trên FB (</span><u style=\"color: var(--primary-color);\"><a href=\"https://www.facebook.com/groups/f8official\" rel=\"noopener noreferrer\" target=\"_blank\">Học lập trình web F8</a></u><span style=\"color: rgb(51, 51, 51);\">) để xem thêm các sản phẩm khác bằng cách tìm kiếm hashtag #f8_show nhé. Nhóm có trên 100K thành viên, hoạt động tích cực và thân thiện, sẽ hỗ trợ bạn trong quá trình học tập nhé.</span></p>\n<p><br></p>\n<h3><span style=\"color: rgb(51, 51, 51);\">Bạn học được gì sau khóa OSG202 này?</span></h3>\n<p><span style=\"color: rgb(51, 51, 51);\">Danh sách các kiến thức đã được đề cập ở phía trên, nhưng điều quan trọng nhất các bạn được đó là:</span></p>\n<ul>\n    <li><span style=\"color: rgb(51, 51, 51);\">Hiểu rõ các khái niệm cơ bản về Hệ điều hành.</span></li>\n    <li><span style=\"color: rgb(51, 51, 51);\">Áp dụng các nguyên lý của Hệ điều hành vào các bài tập thực tế.</span></li>\n    <li><span style=\"color: rgb(51, 51, 51);\">Phát triển kỹ năng quản lý và tối ưu hóa tài nguyên hệ thống.</span></li>\n</ul>\n<p><br></p>\n<h3><span style=\"color: rgb(51, 51, 51);\">Cần chuẩn bị gì cho khóa học OSG202?</span></h3>\n<ul>\n    <li><span style=\"color: rgb(51, 51, 51);\">Máy tính hoặc điện thoại có kết nối internet.</span></li>\n    <li><span style=\"color: rgb(51, 51, 51);\">Tài khoản đăng ký trên hệ thống Unicourse.</span></li>\n</ul>\n<p><br></p>\n<h3><span style=\"color: rgb(51, 51, 51);\">Cách tiếp cận với khóa học OSG202 cho người mới</span></h3>\n<h4><span style=\"color: rgb(51, 51, 51);\">Hiểu cơ bản về Hệ điều hành</span></h4>\n<ol>\n    <li><span style=\"color: rgb(51, 51, 51);\">Các khái niệm cơ bản: Hiểu rõ các khái niệm và định nghĩa cơ bản trong Hệ điều hành.</span></li>\n    <li><span style=\"color: rgb(51, 51, 51);\">Nguyên lý Hệ điều hành: Áp dụng các nguyên lý để giải quyết các bài toán thực tế.</span></li>\n    <li><span style=\"color: rgb(51, 51, 51);\">Kỹ năng quản lý và tối ưu hóa: Phát triển kỹ năng quản lý và tối ưu hóa tài nguyên hệ thống.</span></li>\n</ol>\n<h4><span style=\"color: rgb(51, 51, 51);\">Thực hành thông qua các bài tập và dự án</span></h4>\n<ol>\n    <li><span style=\"color: rgb(51, 51, 51);\">Tham gia vào các bài tập và dự án để áp dụng kiến thức lý thuyết vào thực tế.</span></li>\n    <li><span style=\"color: rgb(51, 51, 51);\">Sử dụng các công cụ và phần mềm phổ biến để thực hành.</span></li>\n</ol>\n<h4><span style=\"color: rgb(51, 51, 51);\">Liên tục thực hành và làm việc trên dự án thực tế</span></h4>\n<ol>\n    <li><span style=\"color: rgb(51, 51, 51);\">Thực hành đều đặn và tham gia dự án để nâng cao kỹ năng.</span></li>\n    <li><span style=\"color: rgb(51, 51, 51);\">Tham gia vào các hoạt động ngoại khóa để tăng cường kỹ năng làm việc nhóm và cá nhân.</span></li>\n</ol>\n<p><br></p>\n<h3><span style=\"color: rgb(51, 51, 51);\">Làm sao để nhớ được các khái niệm và thuật ngữ Hệ điều hành?</span></h3>\n<h4><span style=\"color: rgb(51, 51, 51);\">Học qua thực hành</span></h4>\n<p><span style=\"color: rgb(51, 51, 51);\">Thực hành là cách tốt nhất để ghi nhớ. Tạo các dự án nhỏ, thử thách bản thân bằng cách sử dụng các khái niệm và thuật ngữ. Khi bạn áp dụng thực tế, kiến thức sẽ được gắn kết mạnh mẽ hơn.</span></p>\n<h4><span style=\"color: rgb(51, 51, 51);\">Chia thành nhóm</span></h4>\n<p><span style=\"color: rgb(51, 51, 51);\">Sắp xếp các khái niệm và thuật ngữ thành các nhóm tương tự nhau. Ví dụ, nhóm các thuật ngữ liên quan đến quản lý bộ nhớ lại với nhau, nhóm các khái niệm liên quan đến quản lý tiến trình lại với nhau.</span></p>\n<h4><span style=\"color: rgb(51, 51, 51);\">Sử dụng ghi chú và danh sách</span></h4>\n<p><span style=\"color: rgb(51, 51, 51);\">Tạo danh sách hoặc ghi chú về các khái niệm và thuật ngữ bạn đang học. Viết xuống những điểm chính và thông tin quan trọng. Điều này có thể giúp bạn dễ dàng xem lại và nhớ lâu hơn.</span></p>\n<p><span style=\"color: rgb(51, 51, 51);\">Trang web này có tích hợp chức năng ghi chú trong các bài học video luôn. Bạn không cần phải ghi chú bằng giấy bút bên ngoài nữa.</span></p>\n<h4><span style=\"color: rgb(51, 51, 51);\">Học từ ví dụ thực tế</span></h4>\n<p><span style=\"color: rgb(51, 51, 51);\">Xem qua các bài học thực tế và xem cách họ sử dụng các khái niệm và thuật ngữ. Thường thì học từ những ví dụ thực tế có thể giúp bạn thấy rõ cách chúng được áp dụng.</span></p>\n<h4><span style=\"color: rgb(51, 51, 51);\">Sử dụng flashcards hoặc ứng dụng học tập</span></h4>\n<p><span style=\"color: rgb(51, 51, 51);\">Sử dụng flashcards hoặc ứng dụng học tập để tạo ra các bộ thẻ ghi chú với tên khái niệm và mô tả ngắn về chúng. Quá trình kiểm tra thường xuyên có thể giúp bạn củng cố kiến thức.</span></p>\n<p><strong style=\"color: rgb(51, 51, 51);\"><em>Unicourse có chức năng tích hợp flashcards giúp bạn ghi nhớ kiến thức hiệu quả!</em></strong></p>\n<h4><span style=\"color: rgb(51, 51, 51);\">Lập kế hoạch học tập</span></h4>\n<p><span style=\"color: rgb(51, 51, 51);\">Chia nhỏ kiến thức thành các phần nhỏ và đặt mục tiêu học mỗi ngày hoặc mỗi tuần. Điều này giúp bạn tiến bộ một cách liên tục.</span></p>\n<h4><span style=\"color: rgb(51, 51, 51);\">Tạo dự án thực tế</span></h4>\n<p><span style=\"color: rgb(51, 51, 51);\">Tham gia vào việc xây dựng các dự án thực tế có thể yêu cầu bạn sử dụng các khái niệm và thuật ngữ một cách thường xuyên, giúp bạn cải thiện khả năng nhớ và ứng dụng.</span></p>\n<h4><span style=\"color: rgb(51, 51, 51);\">Học qua giảng dạy</span></h4>\n<p><span style=\"color: rgb(51, 51, 51);\">Nếu có thể, tìm kiếm các tài liệu học từ người có kinh nghiệm trong lĩnh vực Hệ điều hành. Các hướng dẫn video, bài giảng trực tiếp có thể giúp bạn hình dung và hiểu rõ hơn về cách sử dụng các khái niệm và thuật ngữ.</span></p>\n<p><strong style=\"color: rgb(51, 51, 51);\"><em>Hãy nhớ rằng học là một quá trình liên tục. Tiến bộ từng bước một và không cần phải hiểu tất cả ngay từ đầu. Chúc bạn học tốt!</em></strong></p>\n<p><br></p>\n<h3><span style=\"color: rgb(51, 51, 51);\">Tầm quan trọng của Hệ điều hành trong cuộc sống và công việc</span></h3>\n<p><span style=\"color: rgb(51, 51, 51);\">Hệ điều hành đóng vai trò quan trọng và không thể thiếu trong nhiều lĩnh vực, từ công nghệ thông tin đến kỹ thuật và sản xuất.</span></p>\n<h4><span style=\"color: rgb(51, 51, 51);\">Ứng dụng trong công nghệ thông tin</span></h4>\n<p><span style=\"color: rgb(51, 51, 51);\">Khóa học OSG202 giúp bạn hiểu rõ hơn về cách Hệ điều hành được cấu tạo và hoạt động, từ đó giúp bạn quản lý và tối ưu hóa tài nguyên hệ thống hiệu quả.</span></p>\n<h4><span style=\"color: rgb(51, 51, 51);\">Ứng dụng trong kỹ thuật và sản xuất</span></h4>\n<p><span style=\"color: rgb(51, 51, 51);\">Nắm vững các kiến thức cơ bản về Hệ điều hành giúp bạn có lợi thế trong việc phát triển và ứng dụng các thiết bị công nghệ.</span></p>\n<p><br></p>\n<p><strong style=\"color: rgb(51, 51, 51);\"><em>Tóm lại, khóa học OSG202 là bước khởi đầu tuyệt vời cho những ai muốn hiểu sâu hơn về Hệ điều hành, giúp bạn tự tin hơn trong việc ứng dụng kiến thức vào cuộc sống và công việc.</em></strong></p>",
      "category": {
          "id": 1,
          "name": "Web Development",
          "description": "Building websites and web applications.",
          "created_at": "2024-07-22T10:19:00.000Z",
          "updated_at": "2024-07-22T10:19:00.000Z",
          "status": "PUBLISHED"
      },
      "lecturer": {
          "id": 1,
          "info_description": "Advanced JavaScript, Intermediate Python, Beginner SQL. Certified AWS Solutions Architect (2022) and Google Cloud Data Engineer (2023).",
          "skill_json": {
              "skills": [
                  {
                      "name": "JavaScript",
                      "level": "Advanced"
                  },
                  {
                      "name": "Python",
                      "level": "Intermediate"
                  },
                  {
                      "name": "SQL",
                      "level": "Beginner"
                  }
              ],
              "certifications": [
                  {
                      "name": "AWS Certified Solutions Architect",
                      "year": 2022
                  },
                  {
                      "name": "Google Cloud Professional Data Engineer",
                      "year": 2023
                  }
              ]
          },
          "created_at": "2024-07-22T08:44:11.000Z",
          "updated_at": "2024-07-22T08:44:11.000Z",
          "user_id": 2,
          "user": {
              "full_name": "Thầy Uni Cóc",
              "email": "tribdse161752@fpt.edu.vn",
              "profile_image": "https://firebasestorage.googleapis.com/v0/b/unicourse-f4020.appspot.com/o/User%2F9334415.jpg?alt=media&token=4a681abc-ae97-4c94-96fd-6a5c7fddf16d",
              "path_profile_image": null,
              "phone_num": null
          }
      }
  }
}

const ChapterView: React.FC = () => {
  // Get params from the URL
  const { id, chapterId } = useParams<{ id: string, chapterId: string }>();

  const [chapter, setChapter] = useState<any | null>(null);

  // Simulate fetching course data based on `id` and `chapterId`
  useEffect(() => {
    const selectedChapter = fakeData.id.toString() === chapterId ? fakeData : null;
    setChapter(selectedChapter);
  }, [chapterId]);

  if (!chapter) {
    return <Box>Chapter not found</Box>;
  }

  // Format dates
  const formatDate = (dateString: string) => new Date(dateString).toLocaleString();

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">{chapter.title}</Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        <strong>Vị trí:</strong> {chapter.position}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, marginTop: 1 }}>
        <Chip label={`Trạng thái: ${chapter.status}`} color="success" />
        <Chip label={`Ngày tạo: ${formatDate(chapter.created_at)}`} color="info" />
        <Chip label={`Cập nhật: ${formatDate(chapter.updated_at)}`} color="warning" />
      </Box>

      <Divider sx={{ marginY: 2 }} />

      <Typography variant="h6">Danh sách bài học:</Typography>
      <List>
        {chapter.topic.map((topic, index) => (
          <ListItem key={index}>
            <Box sx={{ width: '100%' }}>
              <Typography variant="subtitle1">{topic.title}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {topic.description}
              </Typography>

              <Box sx={{ marginTop: 1 }}>
                {/* Conditionally render different elements depending on the type of content */}
                {topic.element_topic.video && (
                  <Paper sx={{ padding: 2, marginTop: 2 }} variant="outlined">
                    <Typography variant="h6">Video:</Typography>
                    <Typography>
                      <a
                        href={`https://vimeo.com/${topic.element_topic.video.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Xem Video - Vimeo ID: {topic.element_topic.video.id}
                      </a>
                    </Typography>
                  </Paper>
                )}

                {topic.element_topic.document && (
                  <Paper sx={{ padding: 2, marginTop: 2 }} variant="outlined">
                    <Typography variant="h6">Tài liệu:</Typography>
                    <Typography
                      dangerouslySetInnerHTML={{
                        __html: topic.element_topic.document.content,
                      }}
                    />
                  </Paper>
                )}

                {topic.element_topic.question_bank && (
                  <Paper sx={{ padding: 2, marginTop: 2 }} variant="outlined">
                    <Typography variant="h6">Ôn tập:</Typography>
                    <Typography>{topic.element_topic.question_bank.title}</Typography>
                    <Typography>
                      Tổng số câu hỏi: {topic.element_topic.question_bank.total_question} - Thời gian làm bài:{' '}
                      {topic.element_topic.question_bank.duration} phút
                    </Typography>
                  </Paper>
                )}
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>

      <Stack direction="row" justifyContent="flex-start" spacing={2} mt={2}>
        <Button variant="contained" color="primary">
          Thêm chương mục
        </Button>
      </Stack>
    </Box>
  );
};

export default ChapterView;
const express = require('express');
const app = express();
const port = 3000;

// 댓글 데이터를 저장할 배열 (간단한 예시)
const comments = [];

app.use(express.json());

// 댓글 작성
app.post('/comments', (req, res) => {
    const { name, comment } = req.body;
    comments.push({ name, comment });
    console.log(`댓글 저장: ${name} - ${comment}`);
    res.status(201).json({ message: '댓글이 작성되었습니다.' });
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

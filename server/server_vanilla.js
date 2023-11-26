const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = 3000;

// CORS 미들웨어 사용
app.use(cors());

// 로그 기능을 위한 morgan 미들웨어 사용
app.use(morgan('dev'));

app.use(bodyParser.json());

let items = []; // 데이터 저장소
let nextId = 1; // 고유한 ID 생성을 위한 변수

// CRUD 라우트들...

// CREATE: 새 아이템 추가
app.post('/items', (req, res) => {
    const item = req.body;
    item.id = nextId++;
    items.push(item);
    res.status(201).send(item);
});

// READ: 모든 아이템 조회
app.get('/items', (req, res) => {
    res.status(200).send(items);
});

// READ: 특정 아이템 조회
app.get('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const item = items.find(i => i.id === itemId);
    if (item) {
        res.status(200).send(item);
    } else {
        res.status(404).send({ message: 'Item not found' });
    }
});

// UPDATE: 아이템 수정
app.put('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const itemIndex = items.findIndex(i => i.id === itemId);

    if (itemIndex === -1) {
        // 아이템 ID가 존재하지 않는 경우
        res.status(404).send({ message: 'Item not found' });
    } else {
        // 아이템 수정
        items[itemIndex] = { ...items[itemIndex], ...req.body, id: items[itemIndex].id };
        res.status(200).send(items[itemIndex]);
    }
});

// DELETE: 아이템 삭제
app.delete('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    const itemIndex = items.findIndex(i => i.id === itemId);

    if (itemIndex === -1) {
        // 아이템 ID가 존재하지 않는 경우
        res.status(404).send({ message: 'Item not found' });
    } else {
        // 아이템 삭제
        items = items.filter(i => i.id !== itemId);
        res.status(200).send({ message: 'Item deleted successfully' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

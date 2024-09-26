const express = require("express");
const cors = require("cors");
const dayjs = require("dayjs");

const app = express();
const port = 8888;

// 使用CORS中间件来允许跨域请求
app.use(cors());

// 创建一个GET路由
app.get("/data", (req, res) => {
  // 返回一个JSON数组
  res.json([
    { id: 1, date1: dayjs(), date2: dayjs() },
    { id: 2, date1: dayjs(), date2: dayjs() },
  ]);
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

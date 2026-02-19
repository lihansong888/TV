import fetch from "node-fetch";

export default async function handler(req, res) {
  const code = req.query.code;
  if (!code) return res.status(400).json({ error: "请提供基金代码" });

  try {
    const response = await fetch(`https://fundgz.1234567.com.cn/js/${code}.js?rt=${Date.now()}`);
    let text = await response.text();

    // 1234567 的返回是 jsonp，去掉包裹
    text = text.replace(/^jsonpgz\((.*)\);?$/, "$1");

    const data = JSON.parse(text);
    res.setHeader("Access-Control-Allow-Origin", "*"); // 允许前端跨域
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "请求基金数据失败", details: err.message });
  }
}

import { geterateConfig, geterateAnotherConfig } from "./snapshot";

test("测试 geterateConfig 函数", () => {
  // expect(geterateConfig()).toEqual({
  //   server: 'localhost',
  //   port: 8080
  // })

  expect(geterateConfig()).toMatchSnapshot(); // 利用快照测试配置文件
});

test("测试 geterateAnotherConfig 函数", () => {
  expect(geterateAnotherConfig()).toMatchSnapshot({
    time: expect.any(Date) // time每次都是变化的，所以需要这样处理
  });
});

// 行内的snapshot需要装prettier包
test("测试 geterateAnotherConfig 函数 行内快照", () => {
  expect(geterateAnotherConfig()).toMatchInlineSnapshot(
    {
      time: expect.any(Date) // time每次都是变化的，所以需要这样处理
    },
    `
    Object {
      "domin": "www.zhengfuwu.com",
      "port": 8080,
      "server": "localhost",
      "time": Any<Date>,
    }
  `
  );
});

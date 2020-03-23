// 匹配器
test('匹配器', () => {
  // toBe 匹配器 matchers object.js ===
  const a = {one: 1}
  expect(10).toBe(10);
})

test('测试对象内容相等', () => {
  // toBe 匹配器 matchers object.js ===
  const a = {one: 1}
  a['two'] = 2;
  expect(a).toEqual({one: 1, two: 2});
})

// Truthiness
/*
  toBeNull 只匹配 null
  toBeUndefined 只匹配 undefined
  toBeDefined 与 toBeUndefined 相反
  toBeTruthy 匹配任何 if 语句为真
  toBeFalsy 匹配任何 if 语句为假
*/
test('测试 undefined, null', () => {
  const n = null;
  const un = undefined;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).toBeFalsy()
  expect(n).not.toBeTruthy()
  expect(un).toBeUndefined()
})

test('测试zero', () => {
  const z = 0;
  expect(z).not.toBeNull()
  expect(z).toBeDefined()
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy(); // 是否不为真
  expect(z).toBeFalsy()
})

// 数字
test('测试数字', () => {
  const v = 3;
  expect(v).toBe(3)
  expect(v).toBeGreaterThan(2)  // 大于
  expect(v).toBeGreaterThanOrEqual(3) // 大于等于
  expect(v).toBeLessThan(4)  // 小于
  expect(v).toBeLessThanOrEqual(4) // 小于等于

  // 浮点数相加
  const v1 = 0.1 + 0.2;
  expect(v1).toBeCloseTo(0.3)
})

// 字符串
test('测试字符串', () => {
  expect('this is a Jess').not.toMatch(/I/);
  expect('Christoph').toMatch(/stop/)
})

// 数组
test('测试数组', () => {
  const list = ['des', 'name', 'title']
  expect(list).toContain('des') // 数组list里面包含des
  expect(new Set(list)).toContain('des')
})

// throw
test('测试捕获错误', () => {
  function compileCode() {
    throw new Error('you are using the wrong JDK')
  }
  expect(compileCode).toThrow()
  expect(compileCode).toThrow(Error)
  expect(compileCode).toThrow('you are using the wrong JDK')
  expect(compileCode).toThrow(/JDK/)
  // expect(compileCode).not.toThrow()  // 测试 没有异常

})
# form表单点击确认前的校验

```js

if (!addExamFormRef.value) return;
  addExamFormRef.value.validate((valid, fields) => {
    if (valid) {
      console.log('下一步');
      return true;
    }
    const keys = fields ? Object.keys(fields) : [];
    if (keys.length) {
      addExamFormRef.value.scrollToField(keys[0]);
    }
    return false;
  });

```

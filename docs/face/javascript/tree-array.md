# 数组转为树结构

```javascript
const treeData = (data) => {
  const result = []
  const map = new Map()

  // 创建所有节点的映射
  data.forEach((item) => {
    map.set(item.id, { ...item, children: [] })
  })

  // 构建树形结构
  data.forEach((item) => {
    const node = map.get(item.id)
    if (item.parentId) {
      const parent = map.get(item.parentId)
      if (parent) {
        parent.children.push(node)
      }
    } else {
      result.push(node)
    }
  })
  // result 的结构是 { ...item, children: [] }
  return result
}
```

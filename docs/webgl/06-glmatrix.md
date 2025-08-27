# gl-matrix 矩阵库

官网地址: [gl-matrix](https://glmatrix.net/docs/)

- `mat4.create()` : 创建一个新的4x4矩阵。返回一个初始状态的矩阵，这个矩阵是单位矩阵，即对角线上的元素为1，其余元素为0。
- `mat4.identity(out)` : 将一个矩阵设置为单位矩阵。这个函数会修改传入的矩阵，使其成为单位矩阵。
- `mat4.copy(out, a)` : 将矩阵 `a` 的值复制到矩阵 `out` 中。这个函数不会改变 `a`，而是将其内容复制到 `out`。
- `mat4.clone(a)` : 克隆一个矩阵 `a`，返回一个新的矩阵对象，其内容与 `a` 相同。这个函数不会修改原始矩阵 `a`。
- `mat4.lookAt(out, eye, center, up)` : 创建一个视图矩阵，用于将摄像机从 `eye` 位置指向 `center` 位置，`up` 向量定义了摄像机的上方向。这个函数通常用于3D场景中的摄像机设置。
- `mat4.perspective(out, fovy, aspect, near, far)` :创建一个透视投影矩阵。这个函数用于设置3D场景的透视投影效果，参数包括视野角度 `fovy`、宽高比 `aspect`、近裁剪面 `near` 和远裁剪面 `far`。
- `mat4.ortho(out, left, right, bottom, top, near, far)` :创建一个正交投影矩阵。这个函数用于设置3D场景的正交投影效果，参数包括左、右、下、上边界以及近、远裁剪面。
- `mat4.translate(out, a, v)` : 对矩阵 `a` 进行平移变换，将其内容复制到 `out` 中。参数 `v` 是一个向量，表示平移的距离。
- `mat4.fromTranslation(out, v)` : 创建一个平移矩阵，将向量 `v` 的值用于平移变换。这个函数返回一个新的矩阵，表示平移操作。
- `mat4.rotate(out, a, rad, axis)` : 对矩阵 `a` 进行旋转变换，将其内容复制到 `out` 中。参数 `rad` 是旋转角度（以弧度表示），`axis` 是旋转轴向量。
- `mat4.fromRotation(out, rad, axis)` : 创建一个旋转矩阵，将向量 `axis` 和角度 `rad` 用于旋转变换。这个函数返回一个新的矩阵，表示旋转操作。
- `mat4.scale(out, a, v)` : 对矩阵 `a` 进行缩放变换，将其内容复制到 `out` 中。参数 `v` 是一个向量，表示在每个轴上的缩放因子。
- `mat4.fromScaling(out, v)` : 创建一个缩放矩阵，将向量 `v` 的值用于缩放变换。这个函数返回一个新的矩阵，表示缩放操作。
- `mat4.multiply(out, a, b)` : 将矩阵 `a` 和 `b` 相乘，结果存储在 `out` 中。这个函数用于组合多个变换矩阵。
- `mat4.invert(out, a)` : 计算矩阵 `a` 的逆矩阵，并将结果存储在 `out` 中。逆矩阵通常用于将变换应用于模型的逆操作。
- `mat4.transpose(out, a)` : 计算矩阵 `a` 的转置矩阵，并将结果存储在 `out` 中。转置矩阵是将矩阵的行和列互换。

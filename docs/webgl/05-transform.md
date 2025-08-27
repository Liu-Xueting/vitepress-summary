# 8. 图像变化

图像变换包含三种变换方式：平移、缩放和旋转。每种变换都可以通过矩阵来实现。

## 8.1 平移变换

平移变换是将图像在二维平面上移动到新的位置。平移变换可以通过以下矩阵实现：

```shader
attribute vec2 a_position; // 顶点位置
uniform vec2 u_translation; // 平移向量
void main() {
    gl_Position = vec4(a_position + u_translation, 0.0, 1.0);
}
```

## 8.2 缩放变换

缩放变换是改变图像的大小，可以通过以下矩阵实现：

```shader
attribute vec2 a_position; // 顶点位置
uniform vec2 u_scale; // 缩放因子
void main() {
    gl_Position = vec4(a_position * u_scale, 0.0, 1.0);
}
```

## 8.3 旋转变换

旋转变换是将图像绕原点旋转一个角度，可以通过以下矩阵实现：

```shader
attribute vec2 a_position; // 顶点位置
uniform float u_angle; // 旋转角度（弧度）
void main() {
    float cosAngle = cos(u_angle);
    float sinAngle = sin(u_angle);
    gl_Position = vec4(
        a_position.x * cosAngle - a_position.y * sinAngle,
        a_position.x * sinAngle + a_position.y * cosAngle,
        0.0,
        1.0
    );
}
```

推导结果

```math
\begin{bmatrix}
\cos(\theta) & -\sin(\theta) & 0 \\
\sin(\theta) & \cos(\theta) & 0 \\
\end{bmatrix}
\times
\begin{bmatrix}
x \\
y \\
\end{bmatrix}
=
\begin{bmatrix}
x \cdot \cos(\theta) - y \cdot \sin(\theta) \\
x \cdot \sin(\theta) + y \cdot \cos(\theta) \\
\end{bmatrix}
```

## 8.4 矩阵

一个 m 行 n 列的矩阵被称为 m x n 矩阵。矩阵的乘法是线性变换的核心操作，可以将多个变换组合在一起。

2x2 矩阵

```math
\begin{bmatrix}
1 & 2 \\
3 & 4
\end{bmatrix}
```

3x3 矩阵

```math
\begin{bmatrix}
1 & 2 & 3 \\    
4 & 5 & 6 \\
7 & 8 & 9
\end{bmatrix}
```

4x4 矩阵

```math
\begin{bmatrix}
1 & 2 & 3 & 4 \\
5 & 6 & 7 & 8 \\
9 & 10 & 11 & 12 \\
13 & 14 & 15 & 16
\end{bmatrix}
```

这样的

```math
\begin{bmatrix}
1 \\
2 \\
3
\end{bmatrix}
```

被称为列向量。

而

```math
\begin{bmatrix}1 & 2 & 3
\end{bmatrix}
```

被称为行向量。

**矩阵计算**：

加法

```math
\begin{bmatrix}
1 & 2 \\
3 & 4
\end{bmatrix}
+
\begin{bmatrix}
5 & 6 \\    
7 & 8
\end{bmatrix}
=
\begin{bmatrix}
6 & 8 \\
10 & 12
\end{bmatrix}
```

乘法

```math
\begin{bmatrix}
1 & 2 \\
3 & 4
\end{bmatrix}
\times
\begin{bmatrix}
5 & 6 \\    
7 & 8
\end{bmatrix}
=
\begin{bmatrix}
19 & 22 \\    
43 & 50
\end{bmatrix}
```

## 8.5 旋转矩阵公式

1. 绕 x 轴旋转

```math
R(\theta) =  
\begin{bmatrix}
1 & 0 & 0 \\
0 & \cos(\theta) & -\sin(\theta) \\
0 & \sin(\theta) & \cos(\theta)
\end{bmatrix}
```

2. 绕 y 轴旋转

```math
R(\theta) =  
\begin{bmatrix}
\cos(\theta) & 0 & \sin(\theta) \\
0 & 1 & 0 \\
-\sin(\theta) & 0 & \cos(\theta)
\end{bmatrix}
```

3. 绕 z 轴旋转

```math
R(\theta) =  
\begin{bmatrix}
\cos(\theta) & -\sin(\theta) & 0 \\
\sin(\theta) & \cos(\theta) & 0 \\
0 & 0 & 1   
\end{bmatrix}
```

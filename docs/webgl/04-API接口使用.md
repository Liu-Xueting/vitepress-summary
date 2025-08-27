# WebGL API接口使用

## 4.1 创建着色器对象

`WebGLRenderingContext` 提供了 `createShader()` 方法来创建着色器对象。需要指定着色器的类型（顶点着色器或片段着色器）。参数type的值可以是：

- `gl.VERTEX_SHADER`：表示顶点着色器。
- `gl.FRAGMENT_SHADER`：表示片段着色器。

`WebGLRenderingContext.shaderSource()` : 用于设置着色器的源代码，创建着色器对象之后，相当于把着色器源码引入。

- 参数 `shader` ：是创建的着色器对象。
- 参数 `source` ：是着色器的源代码字符串。

`WebGLRenderingContext.compileShader()` : 用于编译着色器对象，使其成为二进制数据，然后就可以被 `WebGLProgram` 使用。

- 参数 `shader` ：是要编译的着色器对象。

代码例子：

```html

<script id="vertex-shader" type="x-shader/x-vertex">
  attribute vec4 a_position;
  void main() {
    gl_Position = a_position;
  }
</script>
<script id="fragment-shader" type="x-shader/x-fragment">
  precision mediump float;
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // 红色
  }
</script>

<script>
  const canvas = document.getElementById('canvas');
    const gl = canvas.getContext('webgl');
  // 创建顶点着色器和片段着色器
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    const vertexShaderSource = document.getElementById('vertex-shader').innerText;
    const fragmentShaderSource = document.getElementById('fragment-shader').innerText;
  // 设置着色器源代码
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
  // 编译着色器
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
</script>
```

## 4.2 创建程序对象

`WebGLRenderingContext` 提供了 `createProgram()` 方法来创建程序对象。程序对象是一个容器，用于存储顶点着色器和片段着色器。

`WebProgram` 的作用是将顶点着色器和片段着色器链接在一起，形成一个完整的渲染管线。

`WebGLRenderingContext.attachShader()` : 用于将着色器对象附加到程序对象上。

- 参数 `program` ：是要附加着色器的程序对象。
- 参数 `shader` ：是要附加的着色器对象。

`WebGLRenderingContext.linkProgram()` : 用于链接程序对象，从而完成程序的片元和顶点着色器准备GPU代码的过程，使其成为一个可用于渲染的着色器程序。

- 参数 `program` ：是要链接的程序对象。

`WebGLRenderingContext.useProgram()` : 用于激活程序对象，使其成为当前的渲染程序。

- 参数 `program` ：是要激活的程序对象。

代码例子：

```html
<script>
  const canvas = document.getElementById('canvas');
    const gl = canvas.getContext('webgl');
    // 创建程序对象 
    const program = gl.createProgram();
    // 附加顶点着色器和片段着色器
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    // 链接程序对象
    gl.linkProgram(program);
    // 激活程序对象
    gl.useProgram(program);
</script>
```

## 4.3 绘制图元的方法

`WebGLRenderingContext.drawArrays()` : 用于绘制图元。它从当前绑定的顶点缓冲区中读取顶点数据，并根据指定的绘制模式绘制图形。

`gl.drawArrays(mode, first, count)` :

- 参数 `mode` ：指定绘制的图元类型，可以是以下常量之一：
  - `gl.POINTS`：绘制一系列点。
  - `gl.LINES`：绘制一系列不连接线段。
  - `gl.LINE_STRIP`：绘制一系列连接的线段。
  - `gl.LINE_LOOP`：绘制一系列连接的线段，最后一个点与第一个点连接。
  - `gl.TRIANGLES`：绘制一系列不连接的三角形。
  - `gl.TRIANGLE_STRIP`：绘制一个三角形带，连续的顶点形成一系列三角形(三角形带)。
  - `gl.TRIANGLE_FAN`：绘制一个三角形扇，第一个顶点是中心点，后续顶点形成一系列三角形。
- 参数 `first` ：指定从顶点缓冲区的哪个位置开始绘制。
- 参数 `count` ：指定要绘制的顶点数量。

## 4.4 创建缓冲区对象

`WebGLRenderingContext.createBuffer()` : 用于创建缓冲区对象。缓冲区对象是一个用于存储顶点数据、颜色数据、索引数据或其他数据的内存区域。这些数据将被传递到GPU中以供渲染使用。

`WebGLRenderingContext.bindBuffer()` : 用于绑定缓冲区对象到指定的目标上。绑定后，所有对该目标的操作都将作用于这个缓冲区对象。

- 参数 `target` ：指定缓冲区的目标，可以是以下常量之一：
  - `gl.ARRAY_BUFFER`：用于存储顶点属性数据。
  - `gl.ELEMENT_ARRAY_BUFFER`：用于存储索引数据。
- 参数 `buffer` ：一个 `WebGLBuffer` 对象，表示要绑定的缓冲区对象。如果为 `null`，则解除绑定。

`WebGLRenderingContext.bufferData()` : 用于向绑定的缓冲区对象中传输数据。可以将数据传递到GPU中，以供后续渲染使用。

- 参数 `target` ：指定缓冲区的目标，必须与 `bindBuffer()` 中使用的目标相同。
- 参数 `data` ：要传输到缓冲区的数据，可以是一个 `ArrayBuffer`, `TypedArray` 或 `Array` 对象。如果传递为null，则会为缓冲区分配特定大小的内存，而不初始化。
- 参数 `usage` ：指定数据的使用方式，可以是以下常量之一：
  - `gl.STATIC_DRAW`：数据不会经常改变，适用于静态数据。
  - `gl.DYNAMIC_DRAW`：数据会经常改变，适用于动态数据。
  - `gl.STREAM_DRAW`：数据每次绘制都会改变，适用于流式数据。

代码例子：

```html
<script>
  const canvas = document.getElementById('canvas');
  const gl = canvas.getContext('webgl');
  // 创建缓冲区对象
  const buffer = gl.createBuffer();
  // 绑定缓冲区对象到 ARRAY_BUFFER
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  // 定义顶点数据
  const vertices = new Float32Array([
    -0.5, -0.5,
     0.5, -0.5,
     0.0,  0.5
  ]);
  // 将顶点数据传输到缓冲区
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
</script>
```

## 4.5 配置 WebGL 以正确读取和解释顶点数据

`WebGLRenderingContext.getAttribLocation()` : 返回了给定 `WebGLProgram` 中某属性的下标指向位置。其实就是要获取着色器中定义的变量的，那个变量在内存中的地址。

- 参数 `program` ：是要查询的程序对象。
- 参数 `name` ：是要查询的属性变量的名称。

`WebGLRenderingContext.vertexAttrib[1234]f[v]()` : 用于设置顶点属性的值。这些方法有多个变体，分别适用于不同数量和类型的数据，具体有：

- `vertexAttrib1f(location, v0)`
- `vertexAttrib2f(location, v0, v1)`
- `vertexAttrib3f(location, v0, v1, v2)`
- `vertexAttrib4f(location, v0, v1, v2, v3)`
- `vertexAttrib1fv(location, values)`
- `vertexAttrib2fv(location, values)`
- `vertexAttrib3fv(location, values)`
- `vertexAttrib4fv(location, values)`

代码例子：

```html
<script>
    const position = new Float32Array([-0.5, -0.5]);
    const posLocation = gl.getAttribLocation(program, 'a_position');
    gl.vertexAttrib2fv(posLocation, position);

    // 或者
    const position = new Float32Array([-0.5, -0.5]);
    const posLocation = gl.getAttribLocation(program, 'a_position');
    gl.vertexAttrib2f(posLocation, ...position);
</script>
```

`WebGLRenderingContext.vertexAttribPointer()` : 方法用于在当前绑定的顶点缓冲区对象中指定顶点属性数组的信息。他将顶点缓冲区的数据与顶点着色器中的顶点属性关联起来。这个方法是设置顶点属性数组的重要一步。

`gl.vertexAttribPointer(index, size, type, normalized, stride, offset)`

- 参数 `index` ：指定要设置的顶点属性的索引位置，通常是通过 `getAttribLocation()` 获取的。
- 参数 `size` ：指定每个顶点属性的组件数量，可以是1、2、3或4，例如对于二维位置坐标(x, y)，size为2。
- 参数 `type` ：指定数据类型，常用的有
  - `gl.FLOAT`：表示浮点数。
  - `gl.UNSIGNED_BYTE`：表示无符号字节。
  - `gl.UNSIGNED_SHORT`：表示无符号短整型。
  - `gl.INT`：表示整数。
  - `gl.BYTE`：表示有符号字节。
  - `gl.SHORT`：表示有符号短整型.
- 参数 `normalized` ：一个布尔值，表示是否将整数数据类型的值归一化到[0, 1]或[-1, 1]范围内。对于浮点数类型，这个参数通常为false。
- 参数 `stride` ：指定连续顶点属性之间的字节偏移量。如果为0，则表示顶点属性是紧密排列的。
- 参数 `offset` ：指定顶点属性数组的起始偏移量，通常用于跳过前面的数据。

代码例子：

```html
<script>
    const canvas = document.getElementById('canvas');
    const gl = canvas.getContext('webgl');
    // 创建缓冲区对象
    const buffer = gl.createBuffer();
    // 绑定缓冲区对象到 ARRAY_BUFFER
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // 定义顶点数据
    const vertices = new Float32Array([
        -0.5, -0.5,
         0.5, -0.5,
         0.0,  0.5
    ]);
    // 将顶点数据传输到缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    // 获取顶点属性位置
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    // 配置顶点属性指针
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 2 *  Float32Array.BYTES_PER_ELEMENT, 0);
    // 启用顶点属性数组
    gl.enableVertexAttribArray(positionLocation);
</script>
```

`WebGLRenderingContext.enableVertexAttribArray()` : 用于启用顶点属性数组，使其可以被顶点着色器使用。

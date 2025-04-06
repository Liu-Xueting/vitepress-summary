# CSS选择器

## CSS关系选择器

- 后代选择器：`div p` 选择所有在div元素内的p元素
- 子选择器：`div > p` 选择所有在div元素内的直接子元素p元素
- 相邻兄弟选择器：`div + p` 选择紧接在div元素后面的p元素
- 一般兄弟选择器：`div ~ p` 选择在div元素后面的所有p元素
- 伪类选择器：`div:hover` 选择鼠标悬停在div元素上的状态
- 伪元素选择器：`div::before` 选择在div元素前面插入的内容

## CSS伪类

- :hover：鼠标悬停在元素上
- :focus：元素获得焦点
- :active：元素被激活
- :first-child：元素是其父元素的第一个子元素
- :last-child：元素是其父元素的最后一个子元素
- :nth-child(n)：元素是其父元素的第n个子元素
- :nth-of-type(n)：元素是其父元素的第n个同类型子元素
- :not(selector)：选择不符合选择器的元素
- :checked：选择被选中的元素
- :disabled：选择被禁用的元素
- :enabled：选择未被禁用的元素
- :valid：选择有效的元素
- :invalid：选择无效的元素
- :required：选择必填的元素
- :optional：选择可选的元素
- :empty：选择没有子元素的元素

## CSS伪元素

- ::before：在元素前插入内容
- ::after：在元素后插入内容
- ::first-letter：选择元素的第一个字母
- ::first-line：选择元素的第一行
- ::selection：选择被选中的文本
- ::placeholder：选择输入框的占位符文本
- ::marker：选择列表项的标记
- ::backdrop：选择模态框的背景
- ::cue：选择视频或音频的字幕
- ::spelling-error：选择拼写错误的文本
- ::grammar-error：选择语法错误的文本
- ::slotted：选择插槽中的元素

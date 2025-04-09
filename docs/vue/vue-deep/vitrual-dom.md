# 虚拟DOM解析

## 模板转换成视图的过程

- Vue.js通过编译将template 模板转换成渲染函数(render ) ，执行渲染函数就可以得到一个虚拟节点树
- 在对 Model 进行操作的时候，会触发对应 Dep 中的 Watcher 对象。Watcher 对象会调用对应的 update 来修改视图。这个过程主要是将新旧虚拟节点进行差异对比，然后根据对比结果进行DOM操作来更新视图。

![虚拟DOM](/vue-vitrual-dom.png)

我们先对上图几个概念加以解释:

- 渲染函数：渲染函数是用来生成 `Virtual DOM` 的。Vue推荐使用模板来构建我们的应用界面，在底层实现中Vue会将模板编译成渲染函数，当然我们也可以不写模板，直接写渲染函数，以获得更好的控制。
- VNode 虚拟节点：它可以代表一个真实的 dom 节点。通过 `createElement` 方法能将 VNode 渲染成 dom 节点。简单地说，vnode可以理解成**节点描述对象**，它描述了应该怎样去创建真实的DOM节点。
- patch(也叫做patching算法) ：虚拟 DOM 最核心的部分，它可以将vnode渲染成真实的DOM，这个过程是对比新旧虚拟节点之间有哪些不同，然后根据对比结果找出需要更新的的节点进行更新，其实际作用是在现有DOM上进行修改来实现更新视图的目的。

## 虚拟DOM

Virtual DOM 是一棵以 JavaScript 对象作为基础的树，每一个节点称为 VNode ，**用对象属性来描述节点**，**实际上它是一层对真实 DOM 的抽象**，
最终可以通过渲染操作使这棵树映射到真实环境上，简单来说 **Virtual DOM 就是一个 Js 对象，用以描述整个文档**。

```html
<ul id='myId'>
 <li>Item 1</li>
 <li>Item 2</li>
<ul>
```

```javascript
{
 tag: 'ul'
   attributes: { id: 'myId' }
   children: [
   //这里是 li
   ]
};
```

## 虚拟DOM的优势

1. 具备跨平台的优势
由于 Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它**具有了跨平台的能力**。

2. 操作 DOM 慢，js运行效率高，提高效率。
diff 算法，减少 JavaScript 操作真实 DOM 的带来的性能消耗
因为DOM操作的执行速度远不如Javascript的运算速度快，因此，把大量的DOM操作搬运到Javascript中，运用patching算法来计算出真正需要更新的节点，最大限度地减少DOM操作，从而显著提高性能。**Virtual DOM 本质上就是在 JS 和 DOM 之间做了一个缓存**。可以类比 CPU 和硬盘，既然硬盘这么慢，我们就在它们之间加个缓存：既然 DOM 这么慢，我们就在它们 JS 和 DOM 之间加个缓存。CPU（JS）只操作内存（Virtual DOM），最后的时候再把变更写入硬盘（DOM）

3. 提升渲染性能
Virtual DOM的优势不在于单次的操作，而是在大量、频繁的数据更新下，能够对视图进行合理、高效的更新。

## 虚拟DOM作用

- 虚拟DOM的最终目标是将虚拟节点渲染到视图上。但是如果直接使用虚拟节点覆盖旧节点的话，会有很多不必要的DOM操作。例如，一个ul标签下很多个li标签，其中只有一个li有变化，这种情况下如果使用新的ul去替代旧的ul,因为这些不必要的DOM操作而造成了性能上的浪费。
- 为了避免不必要的DOM操作，虚拟DOM在虚拟节点映射到视图的过程中，将虚拟节点与上一次渲染视图所使用的旧虚拟节点（oldVnode）做对比，找出真正需要更新的节点来进行DOM操作，从而避免操作其他无需改动的DOM。

虚拟 DOM 在 Vue.js 主要做了两件事：

1. 提供与真实DOM节点所对应的虚拟节点vnode
2. 将虚拟节点vnode和旧虚拟节点oldVnode进行对比，然后更新视图

## 什么是VNode

Vue.js 利用 createElement 方法创建 VNode。就是描述真实节点的js对象

- 其实vnode只是一个名字，**本质上其实是Javascript中一个普通的对象**，是从VNode类实例化的对象。我们用这个Javascript对象来描述一个真实DOM元素的话，那么该DOM元素上的所有属性在VNode这个对象上都存在对应的属性。
- vnode可以理解成**节点描述对象**，它描述了应该怎样去创建真实的DOM节点。例如tag表示一个元素节点的名称，text表示一个文本节点的文本，children表示子节点等。
- vnode表示一个真实的DOM元素，所有真实的DOM节点都使用vnode创建并插入到页面中。（vnode-->DOM-->视图）
- vnode和视图是一一对应的。我们可以把vnode理解成Javascript对象版本的DOM元素。
- 渲染视图的过程是**先创建vnode，然后再使用vnode去生成真实的DOM元素，最后插入页面渲染视图**
  
## VNode的作用

由于每次渲染视图时都是先创建vnode，然后使用它创建真实DOM插入到页面中，所以可以将上一次渲染视图时所创建的vnode缓存起来，之后每当需要重新渲染视图时，将新创建的vnode和上一次缓存的vnode进行对比，查看它们之间有哪些不一样的地方，找出这些不一样的地方并基于此去修改真实的DOM。

```html
//html
<div class="test">
    <span class="demo">hello,VNode</span>
</div>
```

```javascript
//vnode
{
    tag: 'div'
    data: {
        class: 'test'
    },
    children: [
        {
            tag: 'span',
            data: {
                class: 'demo'
            }
            text: 'hello,VNode'
        }
    ]
}
```

snaddom

```html
// 编译
h('a', { props: { href: 'http://www.baidu.com' }}, 'Hello word');
// 得到
{ "sel": "a", "data": { props: { href: 'http://www.baidu.com' } }, "text": "Hello word" }
// 真实的节点
<a href="http://www.baidu.com">Hello word</a>
```

## updateChildren

由于代码太多了，这里先做个概述。updateChildren方法的核心：

- 提取出新老节点的子节点：新节点子节点ch和老节点子节点oldCh；
- ch和oldCh分别设置StartIdx（指向头）和EndIdx（指向尾）变量，它们两两比较（按照sameNode方法），有四种方式来比较。如果4种方式都没有匹配成功，如果设置了key就通过key进行比较，在比较过程种startIdx++，endIdx--，一旦StartIdx > EndIdx表明ch或者oldCh至少有一个已经遍历完成，此时就会结束比较。

看下图这个实例，就是新节点先遍历完成删除多余节点：

![updateChildren](/updateChildren.png)

## 总结

dom的diff算法时间复杂度为o(n^3),如果使用在框架中性能会很差。Vue使用的diff算法，时间复杂度为o(n)，简化了很多操作。

![diff](/diff.png)

因为React只是简单学了基础，这里作为对比来概述一下：

1.React渲染机制：React采用虚拟DOM，在每次属性和状态发生变化时，render函数会返回不同的元素树，然后对比返回的元素树和上次渲染树的差异并对差异部分进行更新，最后渲染为真实DOM。

2.diff永远都是同层比较，如果节点类型不同，直接用新的替换旧的。如果节点类型相同，就比较他们的子节点，依次类推。通常元素上绑定的key值就是用来比较节点的，所以一定要保证其唯一性，一般不采用数组下标来作为key值，因为当数组元素发生变化时index会有所改动。

3.渲染机制的整个过程包含了更新操作，将虚拟DOM转换为真实DOM，所以整个渲染过程就是Reconciliation。而这个过程的核心又主要是diff算法，利用的是生命周期 `shouldComponentUpdate` 函数。

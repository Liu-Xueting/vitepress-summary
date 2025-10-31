# 一个很好用的 Tabs 组件

效果图(动画已处理好)：

![tabs](/tabs.png)

```jsx

const Header: React.FC<{ activeKey?: string; onChange?: (k: string) => void;}> = ({ activeKey = '1', onChange }) => {
    const [active, setActive] = useState<string>(activeKey);
    const tabsRef = React.useRef<HTMLDivElement | null>(null);
    const [indicator, setIndicator] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
    React.useEffect(() => {
        setActive(activeKey);
    }, [activeKey]);
    const handleClick = (k: string) => {
        setActive(k);
        onChange && onChange(k);
    };
    const measureIndicator = React.useCallback(() => {
        const container = tabsRef.current;
        if (!container) return;
        const btn = container.querySelector(`button[data-tab-key="${active}"]`) as HTMLButtonElement | null;
        if (!btn) return;
        const cRect = container.getBoundingClientRect();
        const bRect = btn.getBoundingClientRect();
        const left = bRect.left - cRect.left;
        const width = bRect.width;
        setIndicator({ left, width });
    }, [active]);
    React.useLayoutEffect(() => {
        measureIndicator();
    }, [measureIndicator]);
    React.useEffect(() => {
        const onResize = () => measureIndicator();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [measureIndicator]);

    return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <div ref={tabsRef} className="tabs-switch" style={{ position: 'relative', display: 'inline-flex', background: '#f5f6fa', borderRadius: 12, padding: '0 4px' }}>
                    <div className="active-tab-indicator" style={{ width: indicator.width, transform: `translateX(${indicator.left}px)` }} />
                    {[
                        { key: '1', label: '创建' },
                        { key: '2', label: '分析' },
                        { key: '3', label: '调优' },
                    ].map(tab => (
                        <button
                            key={tab.key}
                            data-tab-key={tab.key}
                            onClick={() => handleClick(tab.key)}

                            style={{
                                border: 'none',
                                outline: 'none',
                                borderRadius: 10,
                                width: 96,
                                height: 32,
                                fontSize: 14,
                                padding: 0,
                                fontWeight: 500,
                                background: 'transparent',
                                cursor: 'pointer',
                                margin: '2px 0',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <div className={'btn-tab' + (active === tab.key ? ' active' : '')} style={{
                                width: '100%',
                                height: '100%',
                                padding: '6px 18px',
                                borderRadius: 10,
                                display: 'inline-block',
                                lineHeight: '18px',
                                fontSize: '16px',
                                fontWeight: 500,
                            }}>{tab.label}</div>
                        </button>
                    ))}
                </div>
            </div>
    );
}
```

```jsx
const BotDesign: React.FC = () => {

    const [key, setKey] = useState("1");
    const onChange = (key: string) => {
        console.log(key);
        setKey(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '创建',
            children: <Bot/>,
        },
        {
            key: '2',
            label: '分析',
            children: <Analysis/>,
        },
        {
            key: '3',
            label: '调优',
            children: <Edit />,
        },
    ];
    return (
        <div>
            <div className='bot-design-content'>
                <Header activeKey={key} onChange={onChange}/>
                {items.find(tab => tab.key === key)?.children}
            </div>
        </div>
    );
};
export default BotDesign;
```

```less

.btn-tab:hover {
  background-color: #e9eaed !important;
}

.btn-tab.active {
  background-color: transparent !important;
  /* 使用滑动指示器提供背景 */
  color: #5562f2 !important;
}

.btn-tab:not(.active):hover {
  background-color: #e9eaed !important;
}

/* 标签切换的滑动指示器 */
.tabs-switch {
  --tab-anim: 220ms;
  position: relative;
}

.active-tab-indicator {
  position: absolute;
  top: 2px;
  /* 和按钮的 margin 对齐 */
  left: 0;
  height: 32px;
  border-radius: 10px;
  background: #ffffff;
  z-index: 0;
  transition: transform var(--tab-anim) cubic-bezier(0.22, 1, 0.36, 1), width var(--tab-anim) cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform, width;
}

.btn-tab {
  position: relative;
  z-index: 1;
  /* 文本位于指示器之上 */
  transition: color 150ms ease, background-color 150ms ease;
}

/* 在自定义 tabs 容器内，移动过程中避免 hover 背景干扰整体滑动观感 */
.tabs-switch .btn-tab:hover,
.tabs-switch .btn-tab:not(.active):hover {
  background-color: transparent !important;
}
```

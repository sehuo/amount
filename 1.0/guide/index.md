## 综述

数量输入控件，支持步长、最大值、最小值设置，支持↑↓键，有限支持小数，可以自定义dom...

* 版本：1.0
* 作者：daqiu
* 标签：
* demo：[http://gallery.kissyui.com/amount/1.0/demo/index.html](http://gallery.kissyui.com/amount/1.0/demo/index.html)

## 初始化组件

    S.use('gallery/amount/1.0/index', function (S, Amount) {
         var amount = new Amount(Configs);
    })

## Configs
* container : 必须，控件插入的容器
* val : 初始值，默认1
* step : 一次改变的变化值（步长），默认1
* tip : input title
* minVal : 值下限，
* maxVal : 值上限
* elCls : 自定义控件顶层className
## Attributes
* val : 当前值
* el : 控件wrap节点
## Events
    所有的Attributes属性遵从http://docs.kissyui.com/docs/html/api/core/base/attribute.html事件方式
##Methods
* increase : 加一步长
* decrease : 减一步长

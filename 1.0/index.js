/**
 * @fileoverview 
 * @author daqiu<daqiu.lym@taobao.com>
 * @module amount
 **/
KISSY.add(function (S, Base, DOM, Event) {
    var EMPTY = '';
    var ClsPrefix = "ks-amount-";
    var DEFAULT = 1;
    var ClsWrap = ClsPrefix+"wrap",
        ClsIncrease= ClsPrefix+"increase",
        ClsDecrease = ClsPrefix+"decrease",
        ClsInput = ClsPrefix+"input";
    /**
     * 
     * @class Amount
     * @constructor
     * @extends Base
     * @param cfg.container {selector|dom} 容器
     * @param cfg.val {Number} 初始值，默认是1
     * @param cfg.step {Number} 变化步长，默认是1
    */
    function Amount(cfg) {
        var self = this;
        //调用父类构造函数
        Amount.superclass.constructor.call(self, cfg);
        self._init();
    }


    S.extend(Amount, Base, /** @lends Amount.prototype*/{
        _init:function(){
            var self = this;
            var val = self.get("val");
            var step = self.get("step");
            var container = self.get("container");
            var el = self.get("el");

            this.inputEl = DOM.get('.'+ClsInput, el);
            this.increaseEl = DOM.get('.'+ClsIncrease, el);
            this.decreaseEl = DOM.get('.'+ClsDecrease, el);

            //在点击+-按钮时写入
            Event.on(el, 'click', function(e){
                var target = e.target;
                if(DOM.hasClass(target,ClsDecrease)){
                    self.decrease();
                }else if(DOM.hasClass(target,ClsIncrease)){
                    self.increase();
                }
            });

            Event.on(self.inputEl, "keyup", function(e){
                var newVal = self._formatVal(self.inputEl.value);
                if(newVal != self.inputEl.value ){
                    self.inputEl.value = newVal;
                }
                self.set("val", self._formatVal(self.inputEl.value));
            });

            Event.on(self.inputEl, "keydown", function(e){
                if(e.keyCode == 38){
                    self.increase();
                    e.preventDefault();
                }else if(e.keyCode == 40){
                    self.decrease();
                    e.preventDefault();
                }
            });

            this.on("afterValChange" , function (ev) {
                var newVal = self._formatVal(ev.newVal);
                self.set("val",String(newVal));
                if(newVal != this.inputEl.value ){
                    this.inputEl.value = newVal;
                }
            });
        },
        _formatVal:function (value) {
            var value = parseFloat(value);
            var min = this.get("minVal");
            var max = this.get("maxVal");

            value = isNaN(value)?DEFAULT:value;
            if(min !== undefined){
                value = value<min ? min:value;
            }
            if(max !== undefined){
                value = value>max ? max:value;
            }
            return String(parseFloat(value).toFixed(this.get("decimal").len));
        },
        increase:function () {
            this._set("increase");
        },
        decrease:function () {
            this._set("decrease");
        },
        _set:function (type) {
            var value = this.get("val");
            var decimal = this.get("decimal");
            var step = this.get("step");
            if(type === "decrease"){
                value = (value*decimal.pow)-(step*decimal.pow);
            }else if(type === "increase"){
                value = (value*decimal.pow)+(step*decimal.pow);
            }
            this.set("val", this._formatVal(value/decimal.pow));
        }

    }, {ATTRS : /** @lends Amount*/{
        elCls:{
            value:""
        },
        val:{
            value:DEFAULT
        },
        step:{
            value:DEFAULT
        },
        decimal:{
            valueFn:function() {
                var decimalLen = String(this.get("step")).replace(/(\d*\.?)/,"").length
                return {
                    len:decimalLen,
                    pow:Math.pow(10,decimalLen)
                }
            }
        },
        el:{
            valueFn: function () {
                var el = DOM.get("."+ClsWrap, this.get("container"));
                if(!el){
                    el = DOM.create('<span class="'+ ClsWrap +' '+ this.get("elCls") +'"><input type="text" class="'+ClsInput+'" value="'+ parseFloat(this.get("val")).toFixed(this.get("decimal").len) +'" title="'+ this.get("tip") +'"/><span class="'+ClsIncrease+'"></span><span class="'+ ClsDecrease +'"></span></span>');
                }
                DOM.prepend(el,this.get("container"));
                return el;
            }
        }
    }});

    return Amount;

}, {requires:['base', 'dom', 'event']});









<template>
    <div :class="classes">
        <div :class="[prefixCls + '-bar']">
            <div :class="[prefixCls + '-nav-container']">
                <div ref="navWrap" :class="[prefixCls + '-nav-wrap', scrollable ? prefixCls + '-nav-scrollable' : '']">
                    <span :class="[prefixCls + '-nav-prev', scrollable ? '' : prefixCls + '-nav-scroll-disabled']" @click="scrollPrev"><Icon type="chevron-left"></Icon></span>
                    <span :class="[prefixCls + '-nav-next', scrollable ? '' : prefixCls + '-nav-scroll-disabled']" @click="scrollNext"><Icon type="chevron-right"></Icon></span>
                    <div ref="navScroll" :class="[prefixCls + '-nav-scroll']">
                        <div ref="nav" :class="[prefixCls + '-nav']" class="nav-text"  :style="navStyle">
                            <div :class="tabCls(item)" v-for="(item, index) in navList" @click="handleChange(index)">
                                <template>{{ item.label }}</template>
                                <i class="ivu-icon ivu-icon-ios-checkmark"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="contentClasses" :style="contentStyle"><slot></slot></div>
    </div>
</template>
<script>
    import { oneOf, MutationObserver } from '../../utils/assist';
    import Emitter from '../../mixins/emitter';
    import elementResizeDetectorMaker from 'element-resize-detector';

    const prefixCls = 'ivu-navbar';

    export default {
        name: 'Tabs',
        mixins: [ Emitter ],
        props: {
            value: {
                type: [String, Number]
            },
            type: {
                validator (value) {
                    return oneOf(value, ['button', 'default']);
                },
                default: 'default'
            },
            closable: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                prefixCls: prefixCls,
                navList: [],
                barWidth: 0,
                barOffset: 0,
                activeKey: this.value,
                navStyle: {
                    transform: ''
                },
                scrollable: false
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-card`]: this.type === 'button'
                    }
                ];
            },
            contentClasses () {
                return [
                    `${prefixCls}-content`,
                    {
                        [`${prefixCls}-content-animated`]: true
                    }
                ];
            },
            contentStyle () {
                const x = this.navList.findIndex((nav) => nav.name === this.activeKey);
                const p = x === 0 ? '0%' : `-${x}00%`;

                let style = {};
                if (x > -1) {
                    style = {
                        transform: `translateX(${p}) translateZ(0px)`
                    };
                }
                return style;
            },
            barStyle () {
                let style = {
                    display: 'none',
                    width: `${this.barWidth}px`
                };
                if (this.type === 'line') style.display = 'block';

                style.left = `${this.barOffset}px`;
                return style;
            }
        },
        methods: {
            getTabs () {
                return this.$children.filter(item => item.$options.name === 'TabPane');
            },
            updateNav () {
                this.navList = [];
                this.getTabs().forEach((pane, index) => {
                    let label = pane.label;
                    if (!label) {
                        let paneLabel = pane.$slots.label;
                        if (paneLabel) {
                            label = function() {
                                return paneLabel;
                            }; 
                        }
                    }
                    this.navList.push({
                        labelType: typeof label,
                        label: label,
                        icon: pane.icon || '',
                        name: pane.currentName || index,
                        disabled: pane.disabled,
                        closable: pane.closable
                    });
                    if (!pane.currentName) pane.currentName = index;
                    if (index === 0) {
                        if (!this.activeKey) this.activeKey = pane.currentName || index;
                    }
                });
                this.updateStatus();
                this.updateBar();
            },
            updateBar () {
                this.$nextTick(() => {
                    const index = this.navList.findIndex((nav) => nav.name === this.activeKey);
                    if (!this.$refs.nav) return;  // 页面销毁时，这里会报错，为了解决 #2100
                    const prevTabs = this.$refs.nav.querySelectorAll(`.${prefixCls}-tab`);
                    const tab = prevTabs[index];
                    this.barWidth = tab ? parseFloat(tab.offsetWidth) : 0;

                    if (index > 0) {
                        let offset = 0;
                        const gutter =  16;
                        for (let i = 0; i < index; i++) {
                            offset += parseFloat(prevTabs[i].offsetWidth) + gutter;
                        }

                        this.barOffset = offset;
                    } else {
                        this.barOffset = 0;
                    }
                    this.updateNavScroll();
                });
            },
            updateStatus () {
                const tabs = this.getTabs();
                tabs.forEach(tab => tab.show = (tab.currentName === this.activeKey) );
            },
            tabCls (item) {
                return [
                    `${prefixCls}-tab`,
                    {
                        [`${prefixCls}-tab-disabled`]: item.disabled,
                        [`${prefixCls}-tab-active`]: item.name === this.activeKey
                    }
                ];
            },
            handleChange (index) {
                const nav = this.navList[index];
                if (nav.disabled) return;
                this.activeKey = nav.name;
                this.$emit('input', nav.name);
                this.$emit('on-click', nav.name);
            },
            handleRemove (index) {
                const tabs = this.getTabs();
                const tab = tabs[index];
                tab.$destroy();

                if (tab.currentName === this.activeKey) {
                    const newTabs = this.getTabs();
                    let activeKey = -1;

                    if (newTabs.length) {
                        const leftNoDisabledTabs = tabs.filter((item, itemIndex) => !item.disabled && itemIndex < index);
                        const rightNoDisabledTabs = tabs.filter((item, itemIndex) => !item.disabled && itemIndex > index);

                        if (rightNoDisabledTabs.length) {
                            activeKey = rightNoDisabledTabs[0].currentName;
                        } else if (leftNoDisabledTabs.length) {
                            activeKey = leftNoDisabledTabs[leftNoDisabledTabs.length - 1].currentName;
                        } else {
                            activeKey = newTabs[0].currentName;
                        }
                    }
                    this.activeKey = activeKey;
                    this.$emit('input', activeKey);
                }
                this.$emit('on-tab-remove', tab.currentName);
                this.updateNav();
            },
            showClose (item) {
                if (this.type === 'card') {
                    if (item.closable !== null) {
                        return item.closable;
                    } else {
                        return this.closable;
                    }
                } else {
                    return false;
                }
            },
            scrollPrev() {
                const containerWidth = this.$refs.navScroll.offsetWidth;
                const currentOffset = this.getCurrentScrollOffset();

                if (!currentOffset) return;

                let newOffset = currentOffset > containerWidth
                    ? currentOffset - containerWidth
                    : 0;

                this.setOffset(newOffset);
            },
            scrollNext() {
                const navWidth = this.$refs.nav.offsetWidth;
                const containerWidth = this.$refs.navScroll.offsetWidth;
                const currentOffset = this.getCurrentScrollOffset();
                if (navWidth - currentOffset <= containerWidth) return;

                let newOffset = navWidth - currentOffset > containerWidth * 2
                    ? currentOffset + containerWidth
                    : (navWidth - containerWidth);

                this.setOffset(newOffset);
            },
            getCurrentScrollOffset() {
                const { navStyle } = this;
                return navStyle.transform
                    ? Number(navStyle.transform.match(/translateX\(-(\d+(\.\d+)*)px\)/)[1])
                    : 0;
            },
            setOffset(value) {
                this.navStyle.transform = `translateX(-${value}px)`;
            },
            scrollToActiveTab() {
                if (!this.scrollable) return;
                const nav = this.$refs.nav;
                const activeTab = this.$el.querySelector(`.${prefixCls}-tab-active`);
                if(!activeTab) return;

                const navScroll = this.$refs.navScroll;
                const activeTabBounding = activeTab.getBoundingClientRect();
                const navScrollBounding = navScroll.getBoundingClientRect();
                const navBounding = nav.getBoundingClientRect();
                const currentOffset = this.getCurrentScrollOffset();
                let newOffset = currentOffset;

                if (navBounding.right < navScrollBounding.right) {
                    newOffset = nav.offsetWidth - navScrollBounding.width;
                }

                if (activeTabBounding.left < navScrollBounding.left) {
                    newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left);
                }else if (activeTabBounding.right > navScrollBounding.right) {
                    newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right;
                }

                if(currentOffset !== newOffset){
                    this.setOffset(Math.max(newOffset, 0));
                }
            },
            updateNavScroll(){
                const navWidth = this.$refs.nav.offsetWidth;
                const containerWidth = this.$refs.navScroll.offsetWidth;
                const currentOffset = this.getCurrentScrollOffset();
                if (containerWidth < navWidth) {
                    this.scrollable = true;
                    if (navWidth - currentOffset < containerWidth) {
                        this.setOffset(navWidth - containerWidth);
                    }
                } else {
                    this.scrollable = false;
                    if (currentOffset > 0) {
                        this.setOffset(0);
                    }
                }
            },
            handleResize(){
                this.updateNavScroll();
            },
            isInsideHiddenElement () {
                let parentNode = this.$el.parentNode;
                while(parentNode && parentNode !== document.body) {
                    if (parentNode.style && parentNode.style.display === 'none') {
                        return parentNode;
                    }
                    parentNode = parentNode.parentNode;
                }
                return false;
            }
        },
        watch: {
            value (val) {
                this.activeKey = val;
            },
            activeKey () {
                this.updateBar();
                this.updateStatus();
                this.broadcast('Table', 'on-visible-change', true);
                this.$nextTick(() => {
                    this.scrollToActiveTab();
                });
            }
        },
        mounted () {
            this.observer = elementResizeDetectorMaker();
            this.observer.listenTo(this.$refs.navWrap, this.handleResize);

            const hiddenParentNode = this.isInsideHiddenElement();
            if (hiddenParentNode) {
                this.mutationObserver = new MutationObserver(() => {
                    if (hiddenParentNode.style.display !== 'none') {
                        this.updateBar();
                        this.mutationObserver.disconnect();
                    }
                });

                this.mutationObserver.observe(hiddenParentNode, { attributes: true, childList: true, characterData: true, attributeFilter: ['style'] });
            }
        },
        beforeDestroy() {
            this.observer.removeListener(this.$refs.navWrap, this.handleResize);
            if (this.mutationObserver) this.mutationObserver.disconnect();
        }
    };
</script>
<template>
    <div class="ivu-flows">
        <div class="ivu-flows-row" v-for="opt in options" :key="opt.index">
            <div class="ivu-flows-step" v-for="(item,index) in opt.rows" :key="index"  :style="[{float: opt.index%2?'right':'left'}]">
                <div class="ivu-flows-line-box">
                    <div class="ivu-flows-line"></div>
                    <div class="ivu-flows-icon" :class="[{'ivu-flows-icon-finished':active > (opt.index*4 + index),'ivu-flows-icon-process':active === (opt.index*4 + index)}]">
                        <span v-if="active > (opt.index*4 + index)" class="ivu-icon ivu-icon-ios-checkmark"></span>
                        <span v-if="active === (opt.index*4 + index)">{{opt.index*4 + index}}</span>
                    </div>
                </div>
                <div class="ivu-flows-content">
                    <div class="ivu-flows-title" :title="item.name">{{item.name}}</div>
                </div>
                <div class="ivu-flows-broken-line"></div>
            </div>
        </div>
    </div>
</template>
<script>
    const prefixCls = 'ivu-flows';
    export default {
        name: 'Flows',
        data() {
            return {
                options: []
            }  
        },
        props: {
            data: {
                type: Array,
                default: function() {
                    return []
                }
            },
            active: {
                type: Number,
                default: 0
            }
        },
        watch: {
            data: function(newOpts,oldOpts) {
                this.options = this.toRowsData(newOpts);
            }
        },
        computed: {

        },
        methods: {
            toRowsData(data) {
                var result = [],
                    count = 0;
                while(count < data.length) {
                    var obj = {};
                    obj.index = count/4;
                    obj.rows = data.slice(count, count += 4);
                    result.push(obj);
                }
                return result;
            },
            isBrokenNone(index) {
                var flag = true;

                return flag
            }
        },
        mounted() {
            this.options = this.toRowsData(this.data);
        }
    };
</script>
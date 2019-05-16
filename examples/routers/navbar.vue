<template>
    <Navbar type="button" value="条件判断办理人">
        <navbar-item v-for="(item,key) in navbar" :key="key" :label="item">
            <template v-if="item === '办理人'">
                <div class="isSingleTransactor">
                    <label>办理人是否单选：</label>
                    <Radio-group v-model="transactor">
                        <Radio label="是"></Radio>
                        <Radio label="否"></Radio>
                    </Radio-group>
                </div>
                <div class="isSingleAddress">
                    <label>是否地址簿单选：</label>
                    <Radio-group v-model="address">
                        <Radio label="是"></Radio>
                        <Radio label="否"></Radio>
                    </Radio-group>
                </div>
                <div class="rulesSelector">
                    <RadioGroup v-model="rules" vertical>
                        <Radio label="固定人员"></Radio>
                        <template v-if="rules ==='固定人员'">
                            <div contenteditable="false" class="rulesResult">
                                <Tag closable color="default">张翠山</Tag>
                                <Tag closable color="default">殷素素</Tag>
                            </div>
                        </template>
                        <Radio label="公共群组"></Radio>
                        <Radio label="组织结构"></Radio>
                        <Radio label="根据表达式获取"></Radio>
                        <Radio label="获取节点办理人"></Radio>
                    </RadioGroup>
                </div>
            </template>
            <template v-else-if="item === '条件判断办理人'">
                <Button @click="add">添加</Button>
            </template>
            <template v-else="item === '业务特性获取人'">
                <div class="feature">
                    <RadioGroup v-model="feature" vertical>
                        <Radio label="会议室及会议室管理员"></Radio>
                        <Radio label="自定义选项"></Radio>
                    </RadioGroup>
                </div>
            </template>
        </navbar-item>
    </Navbar>
</template>
<style>
    .isSingleTransactor,.isSingleAddress {
        margin-bottom: 9px;
        color: #666;
    }
    .isSingleTransactor>label,.isSingleAddress>label {
        display: inline-block;
        width: 100px;
        margin-right: 10px;
    }
    .rulesSelector .ivu-radio-group-vertical{
        display: block;
    }
    .rulesResult {
        width: 100%;
        line-height: 1.5;
        padding: 3px 6px;
        border: 1px solid #ccc;
        outline: 0px solid transparent;
        background-color: white;
        overflow-y: auto;
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: break-word;
        resize: vertical;
    }
    .rulesResult:focus{
        outline: none;
        border-color: #2d8cf0;
        box-shadow: 0 0 1px 2px rgba(45, 140, 240, 0.2);
    }
</style>
<script>
    export default {
        data () {
            return {
                navbar: ['办理人','条件判断办理人','业务特性获取人'],
                transactor: '是',
                address: '',
                rules: '固定人员',
                feature: '会议室及会议室管理员'
            }
        },
        methods: {
            add: function(){
                window.alert('添加')
            }
        }
    }
</script>
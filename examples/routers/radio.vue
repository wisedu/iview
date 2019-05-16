<template>
    <div>
        <Radio size="large" v-model="single">Radio</Radio>
        <Radio size="default" v-model="single">Radio</Radio>
        <Radio size="small" v-model="single">Radio</Radio>
        <br><br>
        <Radio-group v-model="phone">
            <Radio :label="options[0].name" :value="options[0].id">
                <Icon type="social-apple"></Icon>
                <span>Apple</span>
            </Radio>
            <Radio :label="options[1].name" :value="options[1].id">
                <Icon type="social-android"></Icon>
                <span>Android</span>
            </Radio>
            <Radio :label="options[2].name" :value="options[2].id">
                <Icon type="social-windows"></Icon>
                <span>Windows</span>
            </Radio>
        </Radio-group>
        <Radio-group v-model="button2" type="button" size="large">
            <Radio label="北京"></Radio>
            <Radio label="上海" disabled></Radio>
            <Radio label="深圳"></Radio>
            <Radio label="杭州"></Radio>
        </Radio-group>
        <Radio-group v-model="button2" type="button" size="default">
            <Radio label="北京"></Radio>
            <Radio label="上海" disabled></Radio>
            <Radio label="深圳"></Radio>
            <Radio label="杭州"></Radio>
        </Radio-group>
        <Radio-group v-model="button2" type="button" size="small">
            <Radio label="北京"></Radio>
            <Radio label="上海" disabled></Radio>
            <Radio label="深圳"></Radio>
            <Radio label="杭州"></Radio>
        </Radio-group>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                single: true,
                phone: 'id_0',
                button2: '北京',
                options:[{
                    id:"id_0",
                    name:"apple"
                },{
                    id:"id_1",
                    name:"androids"
                },{
                    id:"id_2",
                    name:"Windows"
                }],
                model: [],
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: '中国',
                        label: '中国'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ]
            };
        },
        watch:{
            phone:function(val){
                console.log(val)
            },
            button2:function(val){
                console.log(val)
            }
        },
        methods: {
            choose1: function(){
                console.log("a")
            },
            choose2: function(){
                console.log("b")
            },
            choose3: function(){
                console.log("c")
            }
        }
    };
</script>

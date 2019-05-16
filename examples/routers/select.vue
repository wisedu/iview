<template>
    <div>
        <Select v-model="model1" style="width:200px" :transfer="true">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="model2" multiple style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Button type="primary" @click="changeData">changeData</Button>
        <br><br>
        <Select v-model="model10" multiple style="width:260px" @remove-selected-tag="undateInput">
            <Option v-for="item in cityList" :value="item.value" :key="item.value" @iOptionSelect="handleClick">{{ item.label }}</Option>
        </Select>

        <Select v-model="model10" multiple @remove-selected-tag="undateInput">
            <Tree :data="data1" show-checkbox></Tree>
        </Select>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
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
                ],
                model1: '',
                model2: [],
                model10: [],
                model11: [],
                data1: [
                    {
                        title: 'parent 1',
                        children: [
                            {
                                title: 'parent 1-1',
                                children: [
                                    {
                                        title: 'leaf 1-1-1'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                children: [
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        watch:{
            model10: function(val){
                console.log(val)
            }
        },
        methods:{
            changeData() {
                this.model2.push('Canberra') 
            },
            handleClick: function (val) {
                // body...
                console.log(val)
            },
            undateInput: function (){
                console.log(111)
            }
        }
    }
</script>

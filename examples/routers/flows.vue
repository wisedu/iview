<template>
<div>
    <Flows :data="data" :active="data.length">
        this's a flow component.
    </Flows>
</div>
</template>
<script>
    export default {
        data () {
            return {
                data: [
                    {"startTime":"2019-04-17 14:35:48","id":"1382504","duration":"少于1秒","nodeId":"startevent1","name":"开始","typeCode":"","assignee":"","type":"","endTime":"2019-04-17 14:35:48"},
                    {"startTime":"2019-04-17 14:35:48","id":"1382524","duration":"2秒","nodeId":"usertask1","name":"任务1","typeCode":"completed","assignee":"导入姓名4 (user1)","type":"完成","endTime":"2019-04-17 14:35:51"},
                    {"startTime":"2019-04-17 14:35:51","id":"1382528","duration":"","nodeId":"UserTask_1t9rt5y","flowComment":"同意,Z ","name":"任务任务任务任务任务2任务2","assignee":"导入姓名4 (user1)","type":""},
                    {"startTime":"2019-04-17 14:35:51","id":"1382528","duration":"","nodeId":"UserTask_1t9rt5y","flowComment":"同意,Z ","name":"任务3","assignee":"导入姓名4 (user1)","type":""},
                    {"startTime":"2019-04-17 14:35:51","id":"1382528","duration":"","nodeId":"UserTask_1t9rt5y","flowComment":"同意,Z ","name":"任务4","assignee":"导入姓名4 (user1)","type":""},
                    {"startTime":"2019-04-17 14:35:51","id":"1382528","duration":"","nodeId":"UserTask_1t9rt5y","flowComment":"同意,Z ","name":"任务5","assignee":"导入姓名4 (user1)","type":""},
                    {"startTime":"2019-04-17 14:35:51","id":"1382528","duration":"","nodeId":"UserTask_1t9rt5y","flowComment":"同意,Z ","name":"任务6","assignee":"导入姓名4 (user1)","type":""},
                    {"startTime":"2019-04-17 14:35:51","id":"1382528","duration":"","nodeId":"UserTask_1t9rt5y","flowComment":"同意,Z ","name":"任务7","assignee":"导入姓名4 (user1)","type":""},
                    {"startTime":"2019-04-17 14:35:51","id":"1382528","duration":"","nodeId":"UserTask_1t9rt5y","flowComment":"同意,Z ","name":"任务8","assignee":"导入姓名4 (user1)","type":""},
                    {"startTime":"2019-04-17 14:35:51","id":"1382528","duration":"","nodeId":"UserTask_1t9rt5y","flowComment":"同意,Z ","name":"任务9","assignee":"导入姓名4 (user1)","type":""}]
            }
        },
        computed: {

        },
        methods: {

        },
        mounted () {
//            this.change();
        }
    }
</script>
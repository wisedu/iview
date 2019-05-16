<!-- Vue SFC -->
<template>
    <tree-select v-model="value" :multiple="true" :options="options"/>
</template>

<script>

  export default {
    data() {
      return {
        // define default value
        value: [],
        // define options
        options: [ {
          id: 'a',
          label: 'a',
          children: [ {
            id: 'aa',
            label: 'aa',
          }, {
            id: 'ab',
            label: 'ab',
          } ],
        }, {
          id: 'b',
          label: 'b',
        },{
          id: 'c',
          label: 'c',
        },{
          id: 'd',
          label: 'd',
        },{
          id: 'e',
          label: 'e',
        },{
          id: 'f',
          label: 'f',
        }, {
          id: 'g',
          label: 'g',
        } ],
      }
    },
    watch: {
      value: function(val){
        console.log(val)
      }
    },
    methods:{
      remove:function(val){
        console.log(val)
      }
    }
  }
</script>
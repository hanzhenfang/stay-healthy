import { defineComponent, PropType } from "vue";


interface Props {
 name:string
}


const MyComponent =defineComponent({
  props: {
    name:{
      type:String,
    }
    
  },
   setup(props){
   return ()=>{

   } 
  }
})
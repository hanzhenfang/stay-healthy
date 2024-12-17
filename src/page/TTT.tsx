import { defineComponent } from "vue";
import { popupCreator } from "@/components/Popup";

const tea = defineComponent({
  props: {
    age: {
      type: Number,
      required: true
    },
    nubi: {
      type: String,
      required: true
    }
  },
  setup(props) {
    return () => <div>{props.age}</div>;
  }
});

export default tea;

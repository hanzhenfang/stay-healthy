import { ref, computed, defineComponent } from "vue";

export default defineComponent({
  name: "Bbutton",
  props: {
    bgColor: {
      type: String,
      default: "yellow"
    }
  },
  setup(props) {
    const bg = computed(() => {
      console.log("props.bgColor", props.bgColor);
      return `bg-${props.bgColor}`;
    });

    return () => (
      <div
        class={bg.value}
        style={{
          width: "100px",
          height: "100px"
        }}>
        这是一个按钮
      </div>
    );
  }
});

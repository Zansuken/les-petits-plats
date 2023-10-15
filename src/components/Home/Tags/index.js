import { build } from "../../../componentBuilder";
import { dispatch } from "../../../store";
import { removeSelectedTag } from "../../../store/actions";
import {
  allDefaultOptionsSelector,
  useSelector,
} from "../../../store/selectors";
import Tag from "../../shared/Tag";

const styles = {
  root: "flex gap-4 pt-[21px] mb-[-10px] flex-wrap",
};

const Tags = ({ tags }) => {
  const allOptions = useSelector(allDefaultOptionsSelector);

  const buildDataId = (tag) => `${tag.category}-${tag.id}`;

  const onClick = (tag) => {
    dispatch(removeSelectedTag(tag));
    const element = document.querySelector(`[data-id="${buildDataId(tag)}"]`);

    element.remove();
  };

  return build(
    { element: "div", className: styles.root },
    ...tags.map((tag) =>
      Tag({
        onClick,
        tag,
        label: allOptions.find((option) => option.id === tag.id)?.name,
        id: buildDataId(tag),
      })
    )
  );
};

export default Tags;

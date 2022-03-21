import { LeftOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

export function ButtonBack(props) {
  const navigator = useNavigate();

  const { nav } = props;

  function handleNav() {
    navigator(nav);
  }

  return (
    <Tooltip title="back">
      <Button icon={<LeftOutlined />} size="large" onClick={handleNav}></Button>
    </Tooltip>
  );
}

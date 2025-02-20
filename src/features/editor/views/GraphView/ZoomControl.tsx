import React from "react";
import { ActionIcon, Flex } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { event as gaEvent } from "nextjs-google-analytics";
import { LuFocus, LuMaximize, LuMinus, LuPlus } from "react-icons/lu";
import useGraph from "./stores/useGraph";

export const ZoomControl = () => {
  const zoomIn = useGraph(state => state.zoomIn);
  const zoomOut = useGraph(state => state.zoomOut);
  const centerView = useGraph(state => state.centerView);
  const focusFirstNode = useGraph(state => state.focusFirstNode);

  useHotkeys(
    [
      ["mod+[plus]", () => zoomIn],
      ["mod+[minus]", () => zoomOut],
      ["shift+Digit1", centerView],
    ],
    []
  );

  return (
    <Flex
      align="center"
      gap="xs"
      style={{
        position: "absolute",
        bottom: "10px",
        right: "10px",
        alignItems: "start",
        zIndex: 100,
      }}
    >
      <ActionIcon
        variant="default"
        onClick={() => {
          focusFirstNode();
          gaEvent("focus_first_node");
        }}
      >
        <LuFocus />
      </ActionIcon>
      <ActionIcon
        variant="default"
        onClick={() => {
          centerView();
          gaEvent("center_view");
        }}
      >
        <LuMaximize />
      </ActionIcon>
      <ActionIcon.Group borderWidth={0}>
        <ActionIcon
          variant="default"
          onClick={() => {
            zoomOut();
            gaEvent("zoom_out");
          }}
        >
          <LuMinus />
        </ActionIcon>
        <ActionIcon
          variant="default"
          onClick={() => {
            zoomIn();
            gaEvent("zoom_in");
          }}
        >
          <LuPlus />
        </ActionIcon>
      </ActionIcon.Group>
    </Flex>
  );
};

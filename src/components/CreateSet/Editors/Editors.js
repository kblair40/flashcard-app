import React, { useContext, useRef, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";

import UserContext from "store/UserContext";
import SetContext from "store/SetContext";
import Editor from "components/Editor";

const styleMap = {
  bold: ["bold", "true"],
  italic: ["italic", "true"],
  underline: ["underline", "true"],
  left: ["align", "left"],
  center: ["align", "center"],
  right: ["align", "right"],
  justify: ["align", "justify"],
  small: ["size", "small"],
  medium: ["size", "normal"], // no such size as "medium" with quill
  large: ["size", "large"],
  huge: ["size", "huge"],
};

const Editors = ({ width = "100%" }) => {
  const {
    frontCardContent,
    setFrontCardContent,
    backCardContent,
    setBackCardContent,
    flashcardSetData,
    activeCard,
  } = useContext(SetContext);

  const { userData } = useContext(UserContext);

  const frontRef = useRef();
  const backRef = useRef();

  useEffect(() => {
    const getDefaultStyles = (styles, cardSide) => {
      if (!styles) return;

      const defaultStyles = [];

      if (styles.isBold) defaultStyles.push(styleMap.bold);
      if (styles.isItalic) defaultStyles.push(styleMap.italic);
      if (styles.isUnderlined) defaultStyles.push(styleMap.underline);
      if (styles.textAlign !== "left") {
        defaultStyles.push(styleMap[styles["textAlign"]]);
      }
      if (styles.fontSize !== "medium") {
        defaultStyles.push(styleMap[styles["fontSize"]]);
      }

      let ref = cardSide === "front" ? frontRef : backRef;
      // get editor for currently active side
      const editor = ref.current.getEditor();

      for (let style of defaultStyles) {
        // assign each style to the editor
        editor.format(...style);
      }

      // regardless of back or front, make sure front gets focused first
      frontRef.current.focus();
    };

    if (
      userData &&
      userData.default_styles &&
      activeCard &&
      (!activeCard.id || activeCard.index === -1)
    ) {
      if (frontRef.current) {
        const styles = userData.default_styles.front;
        getDefaultStyles(styles, "front");
      }
      if (backRef.current) {
        const styles = userData.default_styles.back;
        getDefaultStyles(styles, "back");
      }
    }
  }, [userData, flashcardSetData, activeCard]);

  return (
    <Flex
      w={width}
      h="max-content"
      pr={{ base: "8px", sm: "16px" }}
      pl={{ base: "8px", sm: "0" }}
      direction="column-reverse"
      alignItems="center"
    >
      <Box w="100%" maxW="700px" mt={{ base: "1rem", sm: "2rem" }}>
        <Editor
          ref={backRef}
          cardSide="back"
          value={backCardContent}
          onChange={setBackCardContent}
        />
      </Box>

      <Box w="100%" maxWidth="700px">
        <Editor
          ref={frontRef}
          cardSide="front"
          value={frontCardContent}
          onChange={setFrontCardContent}
        />
      </Box>
    </Flex>
  );
};

export default Editors;

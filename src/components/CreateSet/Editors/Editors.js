import React, { useContext, useRef, useEffect } from "react";
import { Box, VStack, Flex } from "@chakra-ui/react";

import UserContext from "store/UserContext";
import SetContext from "store/SetContext";
import Editor from "components/Editor";
import { act } from "react-dom/test-utils";

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

const Editors = ({ width = "100%", height = "100%" }) => {
  const {
    frontCardContent,
    setFrontCardContent,
    backCardContent,
    setBackCardContent,
    flashcardSetData,
    activeCard,
  } = useContext(SetContext);

  useEffect(() => {
    console.log("SET DATA:", flashcardSetData);
  }, [flashcardSetData]);

  const { userData } = useContext(UserContext);

  const frontRef = useRef();
  const backRef = useRef();

  useEffect(() => {
    const getDefaultStyles = (styles, cardSide) => {
      if (!styles) return;
      console.log("yes styles");

      let defaultStyles = [];

      if (styles.isBold) defaultStyles.push(styleMap.bold);
      if (styles.isItalic) defaultStyles.push(styleMap.italic);
      if (styles.isUnderlined) defaultStyles.push(styleMap.underline);
      if (styles.textAlign !== "left") {
        defaultStyles.push(styleMap[styles["textAlign"]]);
      }
      if (styles.fontSize !== "medium") {
        defaultStyles.push(styleMap[styles["fontSize"]]);
      }
      // console.log("default styles:", defaultStyles);

      let ref = cardSide === "front" ? frontRef : backRef;
      const editor = ref.current.getEditor();

      // const format = editor.getFormat();
      // console.log("FORMAT BEFORE:", format);
      // editor.removeFormat(0, 50);
      // const formatAfter = editor.getFormat();
      // console.log("FORMAT AFTER REMOVE:", formatAfter);

      for (let style of defaultStyles) {
        // console.log("SETTING:", style, " to", cardSide);
        editor.format(...style);
      }

      // const formatAfterUpdate = editor.getFormat();
      // console.log("FORMAT AFTER UPDATE:", formatAfterUpdate);

      // regardless of back or front, make sure front gets focused first
      frontRef.current.focus();
    };

    if (
      userData &&
      userData.default_styles &&
      activeCard &&
      (!activeCard.id || activeCard.index === -1)
    ) {
      console.log("TRUE");
      if (frontRef.current) {
        console.log("TRUE FRONT");
        const styles = userData.default_styles.front;
        getDefaultStyles(styles, "front");
      }
      if (backRef.current) {
        console.log("TRUE BACK");
        const styles = userData.default_styles.back;
        getDefaultStyles(styles, "back");
      }
    }
  }, [userData, flashcardSetData, activeCard?.id]);

  return (
    <Flex
      // spacing={{ base: "1rem", sm: "2rem" }}
      w={width}
      // h={height}
      h="max-content"
      pr={{ base: "8px", sm: "16px" }}
      pl={{ base: "8px", sm: "0" }}
      direction="column-reverse"
      // border="1px solid green"
      alignItems="flex-start"
    >
      <Box
        w="100%"
        maxW="700px"
        mt={{ base: "1rem", sm: "2rem" }}
        // border="1px solid #aaa"
      >
        <Editor
          ref={backRef}
          cardSide="back"
          value={backCardContent}
          onChange={setBackCardContent}
        />
      </Box>

      <Box
        w="100%"
        maxWidth="700px"
        // border="1px solid #aaa"
      >
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

//
//
// return (
//   <VStack
//     spacing={{ base: "1rem", sm: "2rem" }}
//     w={width}
//     h={height}
//     pr={{ base: "8px", sm: "16px" }}
//     pl={{ base: "8px", sm: "0" }}
//   >
//     <Box w="100%" maxWidth="700px">
//       <Editor
//         ref={frontRef}
//         cardSide="front"
//         value={frontCardContent}
//         onChange={setFrontCardContent}
//       />
//     </Box>

//     <Box w="100%" maxW="700px" pb="1rem">
//       <Editor
//         ref={backRef}
//         cardSide="back"
//         value={backCardContent}
//         onChange={setBackCardContent}
//       />
//     </Box>
//   </VStack>
// );

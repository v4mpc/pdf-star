import styles from "../pages/MultiPageView.module.css";
import { Thumbnail } from "react-pdf";
import { useState, memo } from "react";
import { Button, Flex, Tag } from "antd";

const SelectableThumbnail = memo(({ index, isSelected, onClick }) => {

  console.log("page re-rerendered ", index + 1);
  return (
    <Flex vertical={true}>
      <Thumbnail
        scale={0.3}
        className={`${styles.page} ${isSelected && styles.selected}`}
        key={`page_${index + 1}`}
        pageNumber={index + 1}
        onItemClick={onClick}
      />

      <Flex justify="center">
        {isSelected ? (
          <Button type="primary">
            <strong>{index + 1}</strong>
          </Button>
        ) : (
          <strong>{index + 1}</strong>
        )}
      </Flex>
    </Flex>
  );
});

export default SelectableThumbnail;

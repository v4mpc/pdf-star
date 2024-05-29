import styles from "../pages/MultiPageView.module.css";
import { Thumbnail } from "react-pdf";
import { useState, memo } from "react";
import { Button, Flex, Tag } from "antd";

const SelectableThumbnail = memo(({ index, isSelected, onClick }) => {
  //   todo : OnLoad show page number or loader
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
          <Button>{index + 1}</Button>
        )}
      </Flex>
    </Flex>
  );
});

export default SelectableThumbnail;

import { Box, Switch, Text, Textarea, Divider, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Builder = ({ type, defaultValue, onChange }) => {
  switch (type) {
    case "switch":
      return (
        <Switch
          defaultChecked={defaultValue || false}
          onChange={(e) => {
            onChange(e.target.checked);
          }}
        />
      );
    case "text":
      return (
        <Textarea
          resize="none"
          h="100px"
          defaultValue={defaultValue}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      );
    default:
      return null;
  }
};

const displayMode = {
  switch: "flex",
};

export default ({ configs, configValues = {}, onChange }) => {
  const [finalConfig, setFinalConfig] = useState({ ...configValues });

  const keys = Object.keys(configs);

  useEffect(() => {
    onChange(finalConfig);
  }, [finalConfig]);

  // Build every config
  return keys.map((key) => {
    const config = configs[key];

    // Check if the view should be flex or not
    const shouldFlex = displayMode[config.type] == "flex";

    return (
      <Box id={key}>
        <Box my={6} d={shouldFlex ? "flex" : "block"} alignItems="center">
          <Box mr={4}>
            <Text fontWeight="semibold">{config.info}</Text>
            <Text fontSize="sm" color="gray.500">
              {config.description}
            </Text>
          </Box>
          {shouldFlex && <Spacer />}

          <Box my={shouldFlex ? 0 : 4}>
            <Builder
              defaultValue={configValues[key]}
              type={config.type}
              onChange={(value) => {
                setFinalConfig({ ...finalConfig, [key]: value });
              }}
            />
          </Box>
        </Box>
        <Divider />
      </Box>
    );
  });
};

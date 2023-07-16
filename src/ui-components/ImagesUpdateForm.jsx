/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Images } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ImagesUpdateForm(props) {
  const {
    id: idProp,
    images: imagesModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    url: "",
    date: "",
    bearCount: "",
    bearList: "",
    camFeed: "",
  };
  const [url, setUrl] = React.useState(initialValues.url);
  const [date, setDate] = React.useState(initialValues.date);
  const [bearCount, setBearCount] = React.useState(initialValues.bearCount);
  const [bearList, setBearList] = React.useState(initialValues.bearList);
  const [camFeed, setCamFeed] = React.useState(initialValues.camFeed);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = imagesRecord
      ? { ...initialValues, ...imagesRecord }
      : initialValues;
    setUrl(cleanValues.url);
    setDate(cleanValues.date);
    setBearCount(cleanValues.bearCount);
    setBearList(cleanValues.bearList);
    setCamFeed(cleanValues.camFeed);
    setErrors({});
  };
  const [imagesRecord, setImagesRecord] = React.useState(imagesModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Images, idProp)
        : imagesModelProp;
      setImagesRecord(record);
    };
    queryData();
  }, [idProp, imagesModelProp]);
  React.useEffect(resetStateValues, [imagesRecord]);
  const validations = {
    url: [{ type: "URL" }],
    date: [],
    bearCount: [],
    bearList: [],
    camFeed: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          url,
          date,
          bearCount,
          bearList,
          camFeed,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Images.copyOf(imagesRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ImagesUpdateForm")}
      {...rest}
    >
      <TextField
        label="Url"
        isRequired={false}
        isReadOnly={false}
        value={url}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              url: value,
              date,
              bearCount,
              bearList,
              camFeed,
            };
            const result = onChange(modelFields);
            value = result?.url ?? value;
          }
          if (errors.url?.hasError) {
            runValidationTasks("url", value);
          }
          setUrl(value);
        }}
        onBlur={() => runValidationTasks("url", url)}
        errorMessage={errors.url?.errorMessage}
        hasError={errors.url?.hasError}
        {...getOverrideProps(overrides, "url")}
      ></TextField>
      <TextField
        label="Date"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={date && convertToLocal(new Date(date))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              url,
              date: value,
              bearCount,
              bearList,
              camFeed,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <TextField
        label="Bear count"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={bearCount}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              url,
              date,
              bearCount: value,
              bearList,
              camFeed,
            };
            const result = onChange(modelFields);
            value = result?.bearCount ?? value;
          }
          if (errors.bearCount?.hasError) {
            runValidationTasks("bearCount", value);
          }
          setBearCount(value);
        }}
        onBlur={() => runValidationTasks("bearCount", bearCount)}
        errorMessage={errors.bearCount?.errorMessage}
        hasError={errors.bearCount?.hasError}
        {...getOverrideProps(overrides, "bearCount")}
      ></TextField>
      <TextField
        label="Bear list"
        isRequired={false}
        isReadOnly={false}
        value={bearList}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              url,
              date,
              bearCount,
              bearList: value,
              camFeed,
            };
            const result = onChange(modelFields);
            value = result?.bearList ?? value;
          }
          if (errors.bearList?.hasError) {
            runValidationTasks("bearList", value);
          }
          setBearList(value);
        }}
        onBlur={() => runValidationTasks("bearList", bearList)}
        errorMessage={errors.bearList?.errorMessage}
        hasError={errors.bearList?.hasError}
        {...getOverrideProps(overrides, "bearList")}
      ></TextField>
      <TextField
        label="Cam feed"
        isRequired={false}
        isReadOnly={false}
        value={camFeed}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              url,
              date,
              bearCount,
              bearList,
              camFeed: value,
            };
            const result = onChange(modelFields);
            value = result?.camFeed ?? value;
          }
          if (errors.camFeed?.hasError) {
            runValidationTasks("camFeed", value);
          }
          setCamFeed(value);
        }}
        onBlur={() => runValidationTasks("camFeed", camFeed)}
        errorMessage={errors.camFeed?.errorMessage}
        hasError={errors.camFeed?.hasError}
        {...getOverrideProps(overrides, "camFeed")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || imagesModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || imagesModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

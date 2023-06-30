/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ButtonProps, DividerProps, FlexProps, TextFieldProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AddImageOverridesProps = {
    AddImage?: PrimitiveOverrideProps<FlexProps>;
    AddImage32482761?: PrimitiveOverrideProps<FlexProps>;
    Content?: PrimitiveOverrideProps<FlexProps>;
    "Edit Profile32482763"?: PrimitiveOverrideProps<FlexProps>;
    "Edit Profile32482766"?: PrimitiveOverrideProps<TextProps>;
    Divider32482767?: PrimitiveOverrideProps<DividerProps>;
    Forms?: PrimitiveOverrideProps<FlexProps>;
    TextField32482772?: PrimitiveOverrideProps<TextFieldProps>;
    TextField32482774?: PrimitiveOverrideProps<TextFieldProps>;
    Divider32482775?: PrimitiveOverrideProps<DividerProps>;
    Button?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type AddImageProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: AddImageOverridesProps | undefined | null;
}>;
export default function AddImage(props: AddImageProps): React.ReactElement;

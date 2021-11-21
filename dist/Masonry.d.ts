import { default as React } from 'react';
import { OrientationName, OrientationRuleOptions, OrientationVariant } from '@nodestrap/basic';
import { ContentProps } from '@nodestrap/content';
export declare const defaultOrientationRuleOptions: OrientationRuleOptions;
export declare const usesMasonryLayout: (options?: OrientationRuleOptions | undefined) => import("@cssfn/cssfn").StyleCollection;
export declare const usesMasonryVariants: () => import("@cssfn/cssfn").StyleCollection;
export declare const useMasonrySheet: import("@cssfn/types").Factory<import("jss").Classes<"main">>;
export declare const cssProps: import("@cssfn/css-config").Refs<{
    columnGap: import("@cssfn/css-types").Cust.Ref;
    columnGapSm: import("@cssfn/css-types").Cust.Ref;
    columnGapLg: import("@cssfn/css-types").Cust.Ref;
    rowGap: import("@cssfn/css-types").Cust.Ref;
    rowGapSm: import("@cssfn/css-types").Cust.Ref;
    rowGapLg: import("@cssfn/css-types").Cust.Ref;
    itemsRaiseSize: string;
    itemsRaiseSizeSm: string;
    itemsRaiseSizeLg: string;
    itemsMinColumnSize: string;
    itemsMinColumnSizeSm: string;
    itemsMinColumnSizeLg: string;
}>, cssDecls: import("@cssfn/css-config").Decls<{
    columnGap: import("@cssfn/css-types").Cust.Ref;
    columnGapSm: import("@cssfn/css-types").Cust.Ref;
    columnGapLg: import("@cssfn/css-types").Cust.Ref;
    rowGap: import("@cssfn/css-types").Cust.Ref;
    rowGapSm: import("@cssfn/css-types").Cust.Ref;
    rowGapLg: import("@cssfn/css-types").Cust.Ref;
    itemsRaiseSize: string;
    itemsRaiseSizeSm: string;
    itemsRaiseSizeLg: string;
    itemsMinColumnSize: string;
    itemsMinColumnSizeSm: string;
    itemsMinColumnSizeLg: string;
}>, cssVals: import("@cssfn/css-config").Vals<{
    columnGap: import("@cssfn/css-types").Cust.Ref;
    columnGapSm: import("@cssfn/css-types").Cust.Ref;
    columnGapLg: import("@cssfn/css-types").Cust.Ref;
    rowGap: import("@cssfn/css-types").Cust.Ref;
    rowGapSm: import("@cssfn/css-types").Cust.Ref;
    rowGapLg: import("@cssfn/css-types").Cust.Ref;
    itemsRaiseSize: string;
    itemsRaiseSizeSm: string;
    itemsRaiseSizeLg: string;
    itemsMinColumnSize: string;
    itemsMinColumnSizeSm: string;
    itemsMinColumnSizeLg: string;
}>, cssConfig: import("@cssfn/css-config").CssConfigSettings;
export interface MasonryProps<TElement extends HTMLElement = HTMLElement> extends ContentProps<TElement>, OrientationVariant {
    children?: React.ReactNode;
}
export declare function Masonry<TElement extends HTMLElement = HTMLElement>(props: MasonryProps<TElement>): JSX.Element;
export { Masonry as default };
export type { OrientationName, OrientationVariant };

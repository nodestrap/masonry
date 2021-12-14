// react:
import { default as React, useRef, } from 'react'; // base technology of our nodestrap components
// cssfn:
import { 
// compositions:
composition, mainComposition, imports, 
// layouts:
layout, children, 
// rules:
variants, rule, } from '@cssfn/cssfn'; // cssfn core
import { 
// hooks:
createUseSheet, } from '@cssfn/react-cssfn'; // cssfn for react
import { createCssConfig, 
// utilities:
usesGeneralProps, usesSuffixedProps, overwriteProps, } from '@cssfn/css-config'; // Stores & retrieves configuration using *css custom properties* (css variables)
// nodestrap utilities:
import { useIsomorphicLayoutEffect, } from '@nodestrap/hooks';
import spacers from '@nodestrap/spacers'; // configurable spaces defs
import { 
// utilities:
setRef, } from '@nodestrap/utilities';
// nodestrap components:
import { 
// hooks:
usesSizeVariant, defaultBlockOrientationRuleOptions, normalizeOrientationRule, usesOrientationRule, useOrientationVariant, } from '@nodestrap/basic';
import { 
// styles:
usesContentLayout, usesContentVariants, Content, } from '@nodestrap/content';
// hooks:
// layouts:
export const defaultOrientationRuleOptions = defaultBlockOrientationRuleOptions;
// styles:
export const usesMasonryLayout = (options) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationBlockSelector, orientationInlineSelector] = usesOrientationRule(options);
    return composition([
        imports([
            // layouts:
            usesContentLayout(),
        ]),
        layout({
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
        variants([
            /* the orientation variants are part of the layout, because without these variants the layout is broken */
            rule(orientationBlockSelector, [
                layout({
                    // layouts:
                    display: 'grid',
                    gridAutoFlow: 'row',
                    gridAutoRows: cssProps.itemsRaiseSize,
                    gridTemplateColumns: `repeat(auto-fill, minmax(${cssProps.itemsMinColumnSize}, 1fr))`,
                    // child default sizes:
                    justifyItems: 'stretch',
                    // alignItems          : 'stretch', // distorting the item's height a bit for consistent multiplies of `itemsRaiseSize` // causing the ResizeObserver doesn't work
                    alignItems: 'start',
                    // spacings:
                    rowGap: [[0], '!important'],
                    // children:
                    ...children('*', [
                        layout({
                            gridColumnEnd: [['unset'], '!important'], // clear from residual effect from inlineStyle (if was)
                        }),
                        variants([
                            rule(':not(.firstRow)', [
                                layout({
                                    /*
                                    * we use `marginBlockStart` as the replacement of the stripped out `rowGap`
                                    * we use `marginBlockStart` instead of `marginBlockEnd`
                                    * because finding grid's items at the first row is much easier than at the last row
                                    * (we don't need to count the number of grid's item)
                                    */
                                    marginBlockStart: cssProps.rowGap,
                                }),
                            ]),
                        ]),
                    ]),
                }),
            ]),
            rule(orientationInlineSelector, [
                layout({
                    // layouts:
                    display: 'inline-grid',
                    gridAutoFlow: 'column',
                    gridAutoColumns: cssProps.itemsRaiseSize,
                    gridTemplateRows: `repeat(auto-fill, minmax(${cssProps.itemsMinColumnSize}, 1fr))`,
                    // child default sizes:
                    alignItems: 'stretch',
                    // justifyItems        : 'stretch', // distorting the item's width a bit for consistent multiplies of `itemsRaiseSize` // causing the ResizeObserver doesn't work
                    justifyItems: 'start',
                    // spacings:
                    columnGap: [[0], '!important'],
                    // children:
                    ...children('*', [
                        layout({
                            gridRowEnd: [['unset'], '!important'], // clear from residual effect from blockStyle (if was)
                        }),
                        variants([
                            rule(':not(.firstRow)', [
                                layout({
                                    /*
                                    * we use `marginInlineStart` as the replacement of the stripped out `columnGap`
                                    * we use `marginInlineStart` instead of `marginInlineEnd`
                                    * because finding grid's items at the first row is much easier than at the last row
                                    * (we don't need to count the number of grid's item)
                                    */
                                    marginInlineStart: cssProps.rowGap,
                                }),
                            ]),
                        ]),
                    ]),
                }),
            ]),
        ]),
    ]);
};
export const usesMasonryVariants = () => {
    // dependencies:
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    return composition([
        imports([
            // variants:
            usesContentVariants(),
            // layouts:
            sizes(),
        ]),
    ]);
};
export const useMasonrySheet = createUseSheet(() => [
    mainComposition([
        imports([
            // layouts:
            usesMasonryLayout(),
            // variants:
            usesMasonryVariants(),
        ]),
    ]),
], /*sheetId :*/ 'fiuyy1jxpx'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names
// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        //#region spacings
        columnGap: spacers.sm,
        columnGapSm: spacers.xs,
        columnGapLg: spacers.md,
        rowGap: spacers.sm,
        rowGapSm: spacers.xs,
        rowGapLg: spacers.md,
        //#endregion spacings
        //#region sizes
        itemsRaiseSize: '3px',
        itemsRaiseSizeSm: '2px',
        itemsRaiseSizeLg: '4px',
        itemsMinColumnSize: '200px',
        itemsMinColumnSizeSm: '120px',
        itemsMinColumnSizeLg: '320px', // 8 * 40
        //#endregion sizes
    };
}, { prefix: 'msry' });
export function Masonry(props) {
    // styles:
    const sheet = useMasonrySheet();
    // variants:
    const orientationVariant = useOrientationVariant(props);
    const orientationHorizontal = (orientationVariant.class === 'inline');
    // dom effects:
    const masonryRef = useRef(null);
    useIsomorphicLayoutEffect(() => {
        const masonry = masonryRef.current;
        if (!masonry)
            return; // masonry was unloaded => nothing to do
        // fn props:
        const isBlockStyle = props.orientation !== 'inline'; // default is block if inline was not specified
        const itemsRaiseSize = Math.max(1, // limits the precision to 1px, any value less than 1px will be scaled up to 1px
        (isBlockStyle
            ?
                Number.parseInt(getComputedStyle(masonry).gridAutoRows)
            :
                Number.parseInt(getComputedStyle(masonry).gridAutoColumns))
            ||
                1 // if parsing error (NaN) => falsy => default is 1px
        );
        // functions:
        const delay = (interval = 1) => new Promise((resolve) => setTimeout(() => resolve(), interval));
        const handleUpdate = async (item) => {
            await delay(); // low priority task => limits dominating the cpu usage
            // we're working with [height on blockStyle] or [width on inlineStyle]
            const offsetSize = isBlockStyle ? item.offsetHeight : item.offsetWidth;
            // const offsetSize = isBlockStyle ? item.getBoundingClientRect().height : item.getBoundingClientRect().width; // use more precise measurement
            // calculate the related margins too:
            const marginSize = (() => {
                const style = getComputedStyle(item);
                if (isBlockStyle) {
                    return (Number.parseInt(style.marginBlockStart)
                        +
                            Number.parseInt(style.marginBlockEnd));
                }
                else { // isInlineStyle
                    return (Number.parseInt(style.marginInlineStart)
                        +
                            Number.parseInt(style.marginInlineEnd));
                } // if
            })();
            // calculate the total size including margins:
            const totalSize = offsetSize + marginSize;
            const spansNeeded = `span ${Math.round(totalSize / itemsRaiseSize)}`;
            if (isBlockStyle) {
                item.style.gridRowEnd = spansNeeded;
                item.style.gridColumnEnd = ''; // clear from residual effect from inlineStyle (if was)
            }
            else { // isInlineStyle
                item.style.gridRowEnd = ''; // clear from residual effect from blockStyle (if was)
                item.style.gridColumnEnd = spansNeeded;
            } // if
        };
        let firstRowItems = [];
        const updateFirstRowItems = async () => {
            const newFirstRowItems = (() => {
                const items = Array.from(masonry.children);
                let index = -1;
                let prevPos = -1;
                for (const item of items) {
                    /*
                        whatever the item's parent (Masonry) is positioned element ('relative' or 'absolute') or not is not problem
                        because we just watching the *shifting* of the offsetLeft/offsetTop
                        in order to detect the presence of a new row.
                    */
                    const currentPos = (isBlockStyle ? item.offsetLeft : item.offsetTop);
                    if (currentPos < prevPos)
                        break;
                    prevPos = currentPos + (isBlockStyle ? item.offsetWidth : item.offsetHeight);
                    index++;
                } // for
                return items.slice(0, index + 1);
            })();
            const removedItems = firstRowItems.filter((item) => !newFirstRowItems.includes(item)); // old_items are not exist   in new_items
            const addedItems = newFirstRowItems.filter((item) => !firstRowItems.includes(item)); // new_items are not already in old_items
            removedItems.forEach((removedItem) => removedItem.classList.remove('firstRow'));
            addedItems.forEach((addedItem) => addedItem.classList.add('firstRow'));
            firstRowItems = newFirstRowItems;
        };
        // setups:
        // update for the first time:
        (async () => {
            await updateFirstRowItems(); // needs to be called first before handleUpdate, because the item's margin affected the resizing calculation
            for (const item of Array.from(masonry.children))
                await handleUpdate(item);
        })();
        //#region update in the future
        //#region when items resized
        let initialResizeEvent = null;
        const resizeObserver = ResizeObserver ? new ResizeObserver(async (entries) => {
            // ignores the insertion dom event:
            if (initialResizeEvent) {
                initialResizeEvent = false;
                return;
            } // if
            // ignores the removal dom event:
            const items = entries.map((e) => e.target).filter((item) => {
                if (masonry.parentElement) { // masonry is still exist on the document
                    // check if the item is the child of masonry
                    if (item.parentElement === masonry)
                        return true; // confirmed
                } // if
                resizeObserver?.unobserve(item); // no longer exist => remove from observer
                return false; // not the child of masonry
            });
            if (!items.length)
                return; // no existing items => nothing to do
            // update after being resized:
            await updateFirstRowItems(); // needs to be called first before handleUpdate, because the item's margin affected the resizing calculation
            for (const item of items)
                await handleUpdate(item);
        }) : null;
        if (resizeObserver) {
            Array.from(masonry.children).forEach((item) => {
                // update in the future:
                initialResizeEvent = true; // prevent the insertion dom event
                resizeObserver.observe(item, { box: 'border-box' });
            });
        } // if
        //#endregion when items resized
        //#region when items added/removed
        const mutationObserver = MutationObserver ? new MutationObserver(async (entries) => {
            // update after being added/removed:
            // any adding/removing of items causing the first_row_items need to be recalculated:
            await updateFirstRowItems(); // needs to be called first before handleUpdate, because the item's margin affected the resizing calculation
            for (const entry of entries) {
                // added items:
                for (const item of Array.from(entry.addedNodes)) {
                    // update after being added/removed:
                    await handleUpdate(item);
                    // update in the future:
                    initialResizeEvent = true; // prevent the insertion dom event
                    resizeObserver?.observe(item, { box: 'border-box' });
                } // for
                // removed items:
                if (resizeObserver) {
                    Array.from(entry.removedNodes).forEach((item) => {
                        // stop updating in the future:
                        resizeObserver.unobserve(item);
                    });
                } // if
            } // for
        }) : null;
        if (mutationObserver) {
            mutationObserver.observe(masonry, {
                childList: true,
                subtree: false,
                attributes: false, // don't care for any attribute changes
            });
        } // if
        //#endregion when items added/removed
        //#endregion update in the future
        // cleanups:
        return () => {
            resizeObserver?.disconnect();
            mutationObserver?.disconnect();
            firstRowItems.forEach((firstRowItem) => firstRowItem.classList.remove('firstRow'));
        };
    }, [props.orientation, props.size]); // (re)run the setups & cleanups on every time the masonry's orientation & size changes
    // jsx:
    return (React.createElement(Content, { ...props, 
        // essentials:
        elmRef: (elm) => {
            setRef(props.elmRef, elm);
            setRef(masonryRef, elm);
        }, "aria-orientation": props['aria-orientation'] ?? (orientationHorizontal ? 'horizontal' : 'vertical'), 
        // classes:
        mainClass: props.mainClass ?? sheet.main, variantClasses: [...(props.variantClasses ?? []),
            orientationVariant.class,
        ] }, props.children));
}
export { Masonry as default };
